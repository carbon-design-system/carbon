/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Idempotent metadata initialization for formal Bug issues. It copies a
 * reporter's required severity suggestion only into an empty issue field,
 * ensures Project 39 defaults, and adds community-help metadata for Medium/Low.
 */
import * as core from '@actions/core';
import { events, or } from '../conditions.js';
import { manageComment } from '../manage-comment.js';

const API_VERSION = '2026-03-10';
// Issue fields currently use repository-level API IDs, while Area and Effort
// are Project 39 fields discovered by name through GraphQL.
const PROJECT_NUMBER = 39;
const SEVERITY_FIELD_ID = 43109003;
const SEVERITY_FIELD_NAME = 'Severity';
const AREA_FIELD_NAME = 'Area';
const EFFORT_FIELD_NAME = 'Effort';
const SUPPORT_AREA_NAME = 'Support';
const DEFAULT_EFFORT = 3;
const MAX_PROJECT_LOOKUPS = 3;
const COMMUNITY_CONTRIBUTION_LABELS = [
  'status: help wanted 👐',
  'needs: community contribution',
  'needs: code contribution',
  'good first issue 👋',
];
const COMMUNITY_COMMENT_HEADER = '<!-- lower-severity-community-help -->';

// Keep this mapping separate from the form's descriptive copy. The stable
// Severity number is what lets older and newer form wording parse identically.
const severityByNumber = new Map([
  ['1', 'Critical'],
  ['2', 'High'],
  ['3', 'Medium'],
  ['4', 'Low'],
]);

// One query loads the project schema, issue membership, and which project fields
// already have values. The mutation helpers below then make only missing writes.
const PROJECT_STATE_QUERY = `
  query BugMetadataProjectState(
    $organization: String!
    $repository: String!
    $issueNumber: Int!
    $projectNumber: Int!
  ) {
    organization(login: $organization) {
      projectV2(number: $projectNumber) {
        id
        fields(first: 100) {
          nodes {
            ... on ProjectV2Field {
              id
              name
            }
            ... on ProjectV2SingleSelectField {
              id
              name
              options {
                id
                name
              }
            }
          }
        }
      }
    }
    repository(owner: $organization, name: $repository) {
      issue(number: $issueNumber) {
        id
        projectItems(first: 100) {
          nodes {
            id
            project {
              id
            }
            fieldValues(first: 100) {
              nodes {
                ... on ProjectV2ItemFieldNumberValue {
                  field {
                    ... on ProjectV2Field {
                      id
                    }
                  }
                }
                ... on ProjectV2ItemFieldSingleSelectValue {
                  field {
                    ... on ProjectV2SingleSelectField {
                      id
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// Used only when Project 39 auto-add has not created an item yet.
const ADD_PROJECT_ITEM_MUTATION = `
  mutation AddBugToProject($projectId: ID!, $contentId: ID!) {
    addProjectV2ItemById(
      input: { projectId: $projectId, contentId: $contentId }
    ) {
      item {
        id
      }
    }
  }
`;

// Single-select fields take an option ID, not the human-readable option name.
const UPDATE_SINGLE_SELECT_MUTATION = `
  mutation SetBugProjectSingleSelect(
    $projectId: ID!
    $itemId: ID!
    $fieldId: ID!
    $optionId: String!
  ) {
    updateProjectV2ItemFieldValue(
      input: {
        projectId: $projectId
        itemId: $itemId
        fieldId: $fieldId
        value: { singleSelectOptionId: $optionId }
      }
    ) {
      projectV2Item {
        id
      }
    }
  }
`;

// Number fields take a floating-point GraphQL value; Effort defaults to 3.
const UPDATE_NUMBER_MUTATION = `
  mutation SetBugProjectNumber(
    $projectId: ID!
    $itemId: ID!
    $fieldId: ID!
    $value: Float!
  ) {
    updateProjectV2ItemFieldValue(
      input: {
        projectId: $projectId
        itemId: $itemId
        fieldId: $fieldId
        value: { number: $value }
      }
    ) {
      projectV2Item {
        id
      }
    }
  }
`;

/** Read the first answer line beneath the issue form's generated heading. */
function getSuggestedSeverityAnswer(body) {
  if (!body) {
    return null;
  }

  const match = body.match(
    /^### Suggested Severity\s*\r?\n+\s*([^\r\n]+)\s*$/im
  );
  return match?.[1].trim() || null;
}

/** Treat legacy optional-form placeholders as intentionally unanswered. */
function isEmptySeverityAnswer(answer) {
  return !answer || /^none$/i.test(answer) || /^_no response_$/i.test(answer);
}

/**
 * Read the answer under the Suggested Severity issue-form heading.
 *
 * @param {string | null | undefined} body
 * @returns {string | null}
 */
export function parseSuggestedSeverity(body) {
  const answer = getSuggestedSeverityAnswer(body);
  if (isEmptySeverityAnswer(answer)) {
    return null;
  }

  const number =
    answer.match(/^Severity\s+([1-4])\b/i)?.[1] ??
    answer.match(/^[^(]+\(Severity\s+([1-4])\)/i)?.[1];
  return severityByNumber.get(number) ?? null;
}

function isBug(issue) {
  // Labels are user-editable; the formal GitHub Issue Type is the trusted gate.
  return issue.type?.name === 'Bug';
}

/** Find a project field by its maintainer-visible name. */
function findField(project, name) {
  return project.fields.nodes.find((field) => field?.name === name);
}

/**
 * Find Support without depending on its leading first-aid emoji or spacing.
 * This keeps the automation stable if maintainers adjust the decoration.
 */
function findSupportOption(areaField) {
  return areaField?.options?.find((option) => {
    return option.name.replace(/\s+/g, ' ').trim().endsWith(SUPPORT_AREA_NAME);
  });
}

/** Find this issue's item specifically in Project 39. */
function findProjectItem(issue, projectId) {
  return issue.projectItems.nodes.find((item) => {
    return item?.project.id === projectId;
  });
}

/**
 * A ProjectV2 field-value node exists only when that field has a value. We use
 * presence rather than inspecting the value because every existing value must
 * be preserved, including zero or a non-Support Area.
 */
function hasProjectFieldValue(item, fieldId) {
  return item.fieldValues.nodes.some((value) => value?.field?.id === fieldId);
}

/** Recognize the expected error when GitHub's auto-add races this plugin. */
function isDuplicateProjectItemError(error) {
  return /already exists|already.*project|content.*exists/i.test(error.message);
}

/** Injectable delay used by project-race retries and replaced by a mock in tests. */
function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

/** Load and validate the Project 39 and issue state needed by later operations. */
async function getProjectState(octokit, variables) {
  core.info(
    `[bug-metadata] Loading Project ${PROJECT_NUMBER} state for issue #${variables.issueNumber}`
  );
  const data = await octokit.graphql(PROJECT_STATE_QUERY, variables);
  const project = data.organization?.projectV2;
  const issue = data.repository?.issue;

  if (!project) {
    throw new Error(`Could not find project ${PROJECT_NUMBER}`);
  }
  if (!issue) {
    throw new Error(`Could not find issue #${variables.issueNumber}`);
  }

  core.info(
    `[bug-metadata] Loaded project ${project.id}; issue has ${issue.projectItems.nodes.length} project items`
  );
  return { issue, project };
}

/**
 * Copy the suggested severity only when the issue's Severity field is empty.
 * The returned effective value drives Medium/Low community defaults even when
 * a maintainer had already set a different severity before this run.
 */
async function ensureSeverity(context, octokit, suggestedSeverity) {
  const { issue, repository } = context.payload;
  const request = {
    owner: repository.owner.login,
    repo: repository.name,
    issue_number: issue.number,
    headers: {
      accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': API_VERSION,
    },
  };
  const { data: values } = await octokit.request(
    'GET /repos/{owner}/{repo}/issues/{issue_number}/issue-field-values',
    { ...request, per_page: 100 }
  );
  core.info(
    `[bug-metadata] Loaded ${values.length} issue-field values for issue #${issue.number}`
  );
  const existingSeverity = values.find((value) => {
    return (
      value.issue_field_id === SEVERITY_FIELD_ID ||
      value.issue_field_name === SEVERITY_FIELD_NAME
    );
  });

  if (existingSeverity) {
    // Existing values are authoritative and must never be overwritten by the
    // reporter's original suggestion.
    const existingName = existingSeverity.single_select_option?.name;
    core.info(
      `[bug-metadata] Severity is already set to ${existingName ?? 'an unknown option'}; preserving it`
    );
    return existingName ?? null;
  }

  if (!suggestedSeverity) {
    core.info(
      '[bug-metadata] No existing or recognized suggested Severity is available'
    );
    return null;
  }

  core.info(
    `[bug-metadata] Setting empty Severity field to ${suggestedSeverity}`
  );
  await octokit.request(
    // The issue-fields API accepts an array even though this operation writes
    // only Severity. Other fields remain untouched.
    'POST /repos/{owner}/{repo}/issues/{issue_number}/issue-field-values',
    {
      ...request,
      issue_field_values: [
        {
          field_id: SEVERITY_FIELD_ID,
          value: suggestedSeverity,
        },
      ],
    }
  );
  core.info(`[bug-metadata] Severity set to ${suggestedSeverity}`);
  return suggestedSeverity;
}

/**
 * Return the existing Project 39 item or add one. If repository auto-add wins
 * the race, retry the query briefly until GitHub exposes the resulting item.
 */
async function ensureProjectItem(
  octokit,
  variables,
  project,
  issue,
  delay = wait
) {
  const existingItem = findProjectItem(issue, project.id);
  if (existingItem) {
    core.info(
      `[bug-metadata] Issue is already in Project ${PROJECT_NUMBER} as item ${existingItem.id}`
    );
    return existingItem;
  }

  core.info(
    `[bug-metadata] Issue is not in Project ${PROJECT_NUMBER}; adding it now`
  );
  try {
    const data = await octokit.graphql(ADD_PROJECT_ITEM_MUTATION, {
      projectId: project.id,
      contentId: issue.id,
    });
    const item = {
      ...data.addProjectV2ItemById.item,
      fieldValues: { nodes: [] },
    };
    core.info(
      `[bug-metadata] Added issue to Project ${PROJECT_NUMBER} as item ${item.id}`
    );
    return item;
  } catch (error) {
    if (!isDuplicateProjectItemError(error)) {
      throw error;
    }
    core.info(
      `[bug-metadata] Project auto-add won the membership race: ${error.message}`
    );
  }

  for (let attempt = 1; attempt <= MAX_PROJECT_LOOKUPS; attempt++) {
    // Short linear backoff gives ProjectV2 time to reach read-after-write
    // consistency without making the workflow wait for many seconds.
    const delayMilliseconds = attempt * 250;
    core.info(
      `[bug-metadata] Waiting ${delayMilliseconds}ms before project lookup ${attempt}/${MAX_PROJECT_LOOKUPS}`
    );
    await delay(delayMilliseconds);
    const nextState = await getProjectState(octokit, variables);
    const item = findProjectItem(nextState.issue, nextState.project.id);
    if (item) {
      core.info(
        `[bug-metadata] Found auto-added project item ${item.id} on lookup ${attempt}`
      );
      return item;
    }
    core.info(
      `[bug-metadata] Project item is not visible after lookup ${attempt}`
    );
  }

  throw new Error(
    `Issue was added to project ${PROJECT_NUMBER}, but its item was not found`
  );
}

/**
 * Default only empty Project 39 fields. Area and Effort are deliberately
 * independent mutations so a pre-existing value in one does not block the other.
 */
async function ensureProjectMetadata(context, octokit, delay) {
  const { issue, repository } = context.payload;
  const variables = {
    organization: repository.owner.login,
    repository: repository.name,
    issueNumber: issue.number,
    projectNumber: PROJECT_NUMBER,
  };
  const { issue: projectIssue, project } = await getProjectState(
    octokit,
    variables
  );
  const areaField = findField(project, AREA_FIELD_NAME);
  const effortField = findField(project, EFFORT_FIELD_NAME);
  const supportOption = findSupportOption(areaField);

  if (!areaField || !supportOption) {
    throw new Error('Could not find the Support option in the Area field');
  }
  if (!effortField) {
    throw new Error('Could not find the Effort field');
  }

  core.info(
    `[bug-metadata] Resolved project fields: Area=${areaField.id}; Support=${supportOption.id}; Effort=${effortField.id}`
  );

  const item = await ensureProjectItem(
    octokit,
    variables,
    project,
    projectIssue,
    delay
  );

  if (!hasProjectFieldValue(item, areaField.id)) {
    core.info(
      `[bug-metadata] Area is empty on item ${item.id}; setting it to Support`
    );
    await octokit.graphql(UPDATE_SINGLE_SELECT_MUTATION, {
      projectId: project.id,
      itemId: item.id,
      fieldId: areaField.id,
      optionId: supportOption.id,
    });
    core.info(`[bug-metadata] Area set to Support on item ${item.id}`);
  } else {
    core.info(`[bug-metadata] Area already has a value on item ${item.id}`);
  }

  if (!hasProjectFieldValue(item, effortField.id)) {
    core.info(
      `[bug-metadata] Effort is empty on item ${item.id}; setting it to ${DEFAULT_EFFORT}`
    );
    await octokit.graphql(UPDATE_NUMBER_MUTATION, {
      projectId: project.id,
      itemId: item.id,
      fieldId: effortField.id,
      value: DEFAULT_EFFORT,
    });
    core.info(
      `[bug-metadata] Effort set to ${DEFAULT_EFFORT} on item ${item.id}`
    );
  } else {
    core.info(`[bug-metadata] Effort already has a value on item ${item.id}`);
  }
}

/**
 * Add the four contribution labels for Medium/Low Bugs on both opened and typed
 * events. The explanatory comment is restricted to opened and managed by a
 * stable header so rerunning the same webhook cannot create a duplicate.
 */
async function ensureCommunityContributionMetadata(context, octokit, severity) {
  const normalizedSeverity = severity?.toLowerCase();
  if (!['low', 'medium'].includes(normalizedSeverity)) {
    core.info(
      `[bug-metadata] Severity ${severity ?? 'unset'} does not need community-contribution defaults`
    );
    return;
  }

  const { action, issue, repository } = context.payload;
  const existingLabels = new Set((issue.labels ?? []).map(({ name }) => name));
  const missingLabels = COMMUNITY_CONTRIBUTION_LABELS.filter(
    (label) => !existingLabels.has(label)
  );
  core.info(
    `[bug-metadata] ${severity} severity requires community-contribution metadata; missing labels=${missingLabels.join(', ') || 'none'}`
  );

  if (missingLabels.length > 0) {
    await octokit.rest.issues.addLabels({
      owner: repository.owner.login,
      repo: repository.name,
      issue_number: issue.number,
      labels: missingLabels,
    });
    core.info(
      `[bug-metadata] Added ${missingLabels.length} community-contribution labels`
    );
  }

  if (action !== 'opened') {
    // A later type change should initialize fields and labels, but the reporter
    // should not receive an opening-time notice on an older issue.
    core.info(
      `[bug-metadata] Action is ${action}; lower-severity comment is only managed on opened`
    );
    return;
  }

  const body = `Just a quick heads-up: for ${normalizedSeverity} severity issues, it may be a while before the core team can get to this. If you’re up for opening a PR, that’ll likely be the quickest path to a fix, but no worries if not. Thanks!`;
  const result = await manageComment(context, octokit, {
    // Replace behaves as create-if-missing and unchanged-if-identical, which is
    // the one-time behavior required for webhook reruns.
    operation: 'replace',
    header: COMMUNITY_COMMENT_HEADER,
    body,
  });
  core.info(
    `[bug-metadata] Lower-severity comment completed with action=${result.action}`
  );
}

/**
 * Initialize metadata for a formal Bug issue without replacing existing values.
 *
 * @param {object} context
 * @param {object} octokit
 * @param {Function} delay
 */
export async function initializeBugMetadata(context, octokit, delay = wait) {
  const { action, issue } = context.payload;
  core.info(
    `[bug-metadata] Initializing issue #${issue.number}; action=${action}; type=${issue.type?.name ?? 'none'}`
  );
  if (!isBug(issue)) {
    core.info('[bug-metadata] Formal issue type is not Bug; skipping');
    return;
  }

  const suggestedSeverityAnswer = getSuggestedSeverityAnswer(issue.body);
  const suggestedSeverity = parseSuggestedSeverity(issue.body);
  core.info(
    `[bug-metadata] Parsed suggested Severity=${suggestedSeverity ?? 'none'}`
  );
  if (!suggestedSeverity && !isEmptySeverityAnswer(suggestedSeverityAnswer)) {
    core.warning(
      '[bug-metadata] Suggested Severity was not recognized; leaving it unset'
    );
  }

  const effectiveSeverity = await ensureSeverity(
    context,
    octokit,
    suggestedSeverity
  );
  core.info(
    `[bug-metadata] Effective Severity=${effectiveSeverity ?? 'unset'}`
  );
  await ensureCommunityContributionMetadata(
    context,
    octokit,
    effectiveSeverity
  );
  // Community labels/comments do not depend on ProjectV2. Apply them first so a
  // project permission or propagation error does not suppress those defaults.
  await ensureProjectMetadata(context, octokit, delay);
  core.info(`[bug-metadata] Finished initializing issue #${issue.number}`);
}

const plugin = {
  name: 'Initialize bug metadata',
  conditions: [or(events.issues.opened, events.issues.typed)],
  run: initializeBugMetadata,
};

export default plugin;
