/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as core from '@actions/core';
import { manageComment } from '../manage-comment.js';
import {
  default as plugin,
  initializeBugMetadata,
  parseSuggestedSeverity,
} from './initialize-bug-metadata.js';

jest.mock(
  '@actions/core',
  () => ({
    info: jest.fn(),
    warning: jest.fn(),
  }),
  { virtual: true }
);
jest.mock('../manage-comment.js', () => ({
  manageComment: jest.fn().mockResolvedValue({ action: 'created' }),
}));

const project = {
  id: 'project-id',
  fields: {
    nodes: [
      {
        id: 'area-field-id',
        name: 'Area',
        options: [
          { id: 'other-option-id', name: 'Other' },
          { id: 'support-option-id', name: '⛑️  Support' },
        ],
      },
      { id: 'effort-field-id', name: 'Effort' },
    ],
  },
};

function createContext(overrides = {}) {
  return {
    payload: {
      action: 'opened',
      issue: {
        body: '### Suggested Severity\n\nHigh (Severity 2) = description',
        labels: [],
        number: 123,
        type: { name: 'Bug' },
        ...overrides,
      },
      repository: {
        name: 'carbon',
        owner: { login: 'carbon-design-system' },
      },
    },
  };
}

function createProjectState({
  item = {
    id: 'item-id',
    project: { id: project.id },
    fieldValues: { nodes: [] },
  },
} = {}) {
  return {
    organization: { projectV2: project },
    repository: {
      issue: {
        id: 'issue-id',
        projectItems: { nodes: item ? [item] : [] },
      },
    },
  };
}

function createOctokit({ issueFields = [], projectStates = [] } = {}) {
  return {
    request: jest
      .fn()
      .mockResolvedValueOnce({ data: issueFields })
      .mockResolvedValue({ data: [] }),
    graphql: jest.fn().mockImplementation(() => {
      const state = projectStates.shift();
      if (state instanceof Error) {
        throw state;
      }
      return Promise.resolve(state);
    }),
    rest: {
      issues: {
        addLabels: jest.fn().mockResolvedValue({}),
      },
    },
  };
}

describe('parseSuggestedSeverity', () => {
  it.each([
    ['Severity 1 = existing form text', 'Critical'],
    ['Critical (Severity 1) = named form text', 'Critical'],
    ['Severity 2 = existing form text', 'High'],
    ['High (Severity 2) = named form text', 'High'],
    ['Severity 3 = existing form text', 'Medium'],
    ['Medium (Severity 3) = named form text', 'Medium'],
    ['Severity 4 = existing form text', 'Low'],
    ['Low (Severity 4) = named form text', 'Low'],
  ])('maps %s to %s', (answer, expected) => {
    expect(parseSuggestedSeverity(`### Suggested Severity\n\n${answer}`)).toBe(
      expected
    );
  });

  it.each([null, '', '### Suggested Severity\n\nNone', '### Other\n\n1'])(
    'returns null for a missing or empty answer',
    (body) => {
      expect(parseSuggestedSeverity(body)).toBeNull();
    }
  );

  it('does not guess an unrecognized answer', () => {
    expect(
      parseSuggestedSeverity('### Suggested Severity\n\nUrgent within 1 day')
    ).toBeNull();
  });
});

describe('initializeBugMetadata', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does nothing for an issue whose formal type is not Bug', async () => {
    const octokit = createOctokit();

    await initializeBugMetadata(
      createContext({ type: { name: 'Feature' } }),
      octokit
    );

    expect(octokit.request).not.toHaveBeenCalled();
    expect(octokit.graphql).not.toHaveBeenCalled();
  });

  it('preserves existing Severity, Area, and Effort values', async () => {
    const item = {
      id: 'item-id',
      project: { id: project.id },
      fieldValues: {
        nodes: [
          { field: { id: 'area-field-id' } },
          { field: { id: 'effort-field-id' } },
        ],
      },
    };
    const octokit = createOctokit({
      issueFields: [
        {
          issue_field_id: 43109003,
          issue_field_name: 'Severity',
          single_select_option: { name: 'Critical' },
        },
      ],
      projectStates: [createProjectState({ item })],
    });

    await initializeBugMetadata(createContext(), octokit);

    expect(octokit.request).toHaveBeenCalledTimes(1);
    expect(octokit.graphql).toHaveBeenCalledTimes(1);
    expect(core.info).toHaveBeenCalledWith(
      '[bug-metadata] Severity is already set to Critical; preserving it'
    );
  });

  it('does not warn when the old optional severity answer is None', async () => {
    const item = {
      id: 'item-id',
      project: { id: project.id },
      fieldValues: {
        nodes: [
          { field: { id: 'area-field-id' } },
          { field: { id: 'effort-field-id' } },
        ],
      },
    };
    const octokit = createOctokit({
      projectStates: [createProjectState({ item })],
    });

    await initializeBugMetadata(
      createContext({ body: '### Suggested Severity\n\nNone' }),
      octokit
    );

    expect(core.warning).not.toHaveBeenCalled();
    expect(octokit.request).toHaveBeenCalledTimes(1);
  });

  it('warns instead of guessing an unrecognized severity', async () => {
    const item = {
      id: 'item-id',
      project: { id: project.id },
      fieldValues: {
        nodes: [
          { field: { id: 'area-field-id' } },
          { field: { id: 'effort-field-id' } },
        ],
      },
    };
    const octokit = createOctokit({
      projectStates: [createProjectState({ item })],
    });

    await initializeBugMetadata(
      createContext({ body: '### Suggested Severity\n\nUrgent within 1 day' }),
      octokit
    );

    expect(core.warning).toHaveBeenCalledWith(
      '[bug-metadata] Suggested Severity was not recognized; leaving it unset'
    );
    expect(octokit.request).toHaveBeenCalledTimes(1);
  });

  it('sets missing Severity and defaults fields on an existing item', async () => {
    const octokit = createOctokit({
      projectStates: [createProjectState()],
    });

    await initializeBugMetadata(createContext(), octokit);

    expect(octokit.request).toHaveBeenNthCalledWith(
      2,
      'POST /repos/{owner}/{repo}/issues/{issue_number}/issue-field-values',
      expect.objectContaining({
        issue_field_values: [{ field_id: 43109003, value: 'High' }],
      })
    );
    expect(octokit.graphql).toHaveBeenCalledTimes(3);
    expect(octokit.graphql).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining('SetBugProjectSingleSelect'),
      expect.objectContaining({
        itemId: 'item-id',
        optionId: 'support-option-id',
      })
    );
    expect(octokit.graphql).toHaveBeenNthCalledWith(
      3,
      expect.stringContaining('SetBugProjectNumber'),
      expect.objectContaining({ itemId: 'item-id', value: 3 })
    );
  });

  it('adds a missing project item before setting its defaults', async () => {
    const octokit = createOctokit({
      projectStates: [
        createProjectState({ item: null }),
        { addProjectV2ItemById: { item: { id: 'added-item-id' } } },
        { updateProjectV2ItemFieldValue: { projectV2Item: {} } },
        { updateProjectV2ItemFieldValue: { projectV2Item: {} } },
      ],
    });

    await initializeBugMetadata(createContext(), octokit);

    expect(octokit.graphql).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining('AddBugToProject'),
      { contentId: 'issue-id', projectId: 'project-id' }
    );
    expect(octokit.graphql).toHaveBeenNthCalledWith(
      3,
      expect.stringContaining('SetBugProjectSingleSelect'),
      expect.objectContaining({ itemId: 'added-item-id' })
    );
  });

  it('recovers when project auto-add wins the membership race', async () => {
    const racedItem = {
      id: 'raced-item-id',
      project: { id: project.id },
      fieldValues: {
        nodes: [{ field: { id: 'area-field-id' } }],
      },
    };
    const octokit = createOctokit({
      projectStates: [
        createProjectState({ item: null }),
        new Error('Content already exists in this project'),
        createProjectState({ item: racedItem }),
        { updateProjectV2ItemFieldValue: { projectV2Item: {} } },
      ],
    });
    const delay = jest.fn().mockResolvedValue();

    await initializeBugMetadata(createContext(), octokit, delay);

    expect(delay).toHaveBeenCalledTimes(1);
    expect(octokit.graphql).toHaveBeenCalledTimes(4);
    expect(octokit.graphql).toHaveBeenLastCalledWith(
      expect.stringContaining('SetBugProjectNumber'),
      expect.objectContaining({ itemId: 'raced-item-id', value: 3 })
    );
  });

  it.each([
    ['Medium (Severity 3) = description', 'medium'],
    ['Low (Severity 4) = description', 'low'],
  ])(
    'adds community labels and the one-time comment for %s',
    async (answer, severity) => {
      const item = {
        id: 'item-id',
        project: { id: project.id },
        fieldValues: {
          nodes: [
            { field: { id: 'area-field-id' } },
            { field: { id: 'effort-field-id' } },
          ],
        },
      };
      const octokit = createOctokit({
        projectStates: [createProjectState({ item })],
      });

      await initializeBugMetadata(
        createContext({ body: `### Suggested Severity\n\n${answer}` }),
        octokit
      );

      expect(octokit.rest.issues.addLabels).toHaveBeenCalledWith(
        expect.objectContaining({
          labels: [
            'status: help wanted 👐',
            'needs: community contribution',
            'needs: code contribution',
            'good first issue 👋',
          ],
        })
      );
      expect(manageComment).toHaveBeenCalledWith(
        expect.anything(),
        octokit,
        expect.objectContaining({
          header: '<!-- lower-severity-community-help -->',
          body: expect.stringContaining(`for ${severity} severity issues`),
        })
      );
    }
  );

  it('adds low-severity labels but does not comment on typed', async () => {
    const item = {
      id: 'item-id',
      project: { id: project.id },
      fieldValues: {
        nodes: [
          { field: { id: 'area-field-id' } },
          { field: { id: 'effort-field-id' } },
        ],
      },
    };
    const octokit = createOctokit({
      issueFields: [
        {
          issue_field_id: 43109003,
          issue_field_name: 'Severity',
          single_select_option: { name: 'Low' },
        },
      ],
      projectStates: [createProjectState({ item })],
    });

    const context = createContext({ body: null });
    context.payload.action = 'typed';
    await initializeBugMetadata(context, octokit);

    expect(octokit.rest.issues.addLabels).toHaveBeenCalled();
    expect(manageComment).not.toHaveBeenCalled();
  });
});

describe('plugin conditions', () => {
  it.each(['opened', 'typed'])('runs for the %s issue event', (action) => {
    expect(plugin.conditions[0].run({ payload: { action } })).toBe(true);
  });

  it('does not run for unrelated issue events', () => {
    expect(plugin.conditions[0].run({ payload: { action: 'edited' } })).toBe(
      false
    );
  });
});
