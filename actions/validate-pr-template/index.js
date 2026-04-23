function getLines(markdown) {
  return markdown.split('\n').map((line) => line.trim());
}

function isHeading(line) {
  return line.startsWith('#');
}

function isHtmlComment(line) {
  return line.startsWith('<!--') && line.endsWith('-->');
}

function normalizeChecklistLine(line) {
  let normalized = line.trim();

  while (normalized.startsWith('~')) {
    normalized = normalized.slice(1).trimStart();
  }

  while (normalized.endsWith('~')) {
    normalized = normalized.slice(0, -1).trimEnd();
  }

  if (normalized.startsWith('-')) {
    normalized = normalized.slice(1).trimStart();
  }

  if (normalized.startsWith('[ ]')) {
    normalized = normalized.slice(3).trimStart();
  } else if (normalized.startsWith('[x]') || normalized.startsWith('[X]')) {
    normalized = normalized.slice(3).trimStart();
  }

  while (normalized.startsWith('~')) {
    normalized = normalized.slice(1).trimStart();
  }

  while (normalized.endsWith('~')) {
    normalized = normalized.slice(0, -1).trimEnd();
  }

  return normalized.trim();
}

function getTemplateHeadings(templateBody) {
  return getLines(templateBody).filter((line) => {
    return isHeading(line);
  });
}

function getChecklistItemsFromTemplate(templateBody) {
  const lines = getLines(templateBody);
  const checklistHeadingIndex = lines.findIndex(
    (line) => line === '## PR Checklist'
  );

  if (checklistHeadingIndex === -1) {
    return [];
  }

  const checklistItems = [];

  for (let index = checklistHeadingIndex + 1; index < lines.length; index++) {
    const line = lines[index];

    if (!line) {
      continue;
    }

    if (isHeading(line)) {
      break;
    }

    if (isHtmlComment(line)) {
      continue;
    }

    if (line.includes('[ ]') || line.includes('[x]') || line.includes('[X]')) {
      const item = normalizeChecklistLine(line);

      if (item) {
        checklistItems.push(item);
      }
    }
  }

  return checklistItems;
}

function getMissingHeadings(templateHeadings, prBody) {
  const prLines = getLines(prBody);

  return templateHeadings.filter((heading) => {
    return !prLines.includes(heading);
  });
}

function getMissingChecklistItems(templateChecklistItems, prBody) {
  const normalizedPRBody = prBody.toLowerCase();

  return templateChecklistItems.filter((item) => {
    return !normalizedPRBody.includes(item.toLowerCase());
  });
}

async function getJobUrl({
  github,
  core,
  owner,
  repo,
  runId,
  runAttempt,
  issueNumber,
  jobName,
  fallbackUrl,
}) {
  try {
    const jobs = await github.paginate(
      github.rest.actions.listJobsForWorkflowRunAttempt,
      {
        owner,
        repo,
        run_id: runId,
        attempt_number: runAttempt,
        per_page: 100,
      }
    );

    const currentJob = jobs.find((job) => {
      return job.name === jobName;
    });

    if (currentJob) {
      return `https://github.com/${owner}/${repo}/actions/runs/${runId}/job/${currentJob.id}?pr=${issueNumber}`;
    }
  } catch (error) {
    core.warning(`Unable to resolve workflow job URL: ${error.message}`);
  }

  return fallbackUrl;
}

module.exports = async ({ github, context, core }) => {
  const upstreamOwner = 'carbon-design-system';
  const upstreamRepo = 'carbon';
  const templatePath = '.github/PULL_REQUEST_TEMPLATE.md';
  const labelName = 'status: invalid description';
  const commentMarker = '<!-- pr-template-check -->';
  const owner = context.repo.owner;
  const repo = context.repo.repo;
  const base = context.payload.pull_request.base;
  const baseRepo = base.repo;
  const baseOwner = baseRepo.owner.login;
  const baseRepoName = baseRepo.name;
  const baseRef = base.ref ?? context.payload.repository.default_branch;
  const issueNumber = context.issue.number;
  const body = context.payload.pull_request.body || '';
  const templateUrl =
    `https://github.com/${baseOwner}/${baseRepoName}/blob/${baseRef}/${templatePath}`;
  const runUrl = `https://github.com/${owner}/${repo}/actions/runs/${context.runId}?pr=${issueNumber}`;
  const jobUrl = await getJobUrl({
    github,
    core,
    owner,
    repo,
    runId: context.runId,
    runAttempt: context.runAttempt,
    issueNumber,
    jobName: 'Follows PR template',
    fallbackUrl: runUrl,
  });

  const comments = await github.paginate(github.rest.issues.listComments, {
    owner,
    repo,
    issue_number: issueNumber,
    per_page: 100,
  });

  const existingComment = comments.find((comment) => {
    return (
      comment.user?.type === 'Bot' && comment.body?.includes(commentMarker)
    );
  });

  async function addLabel() {
    await github.rest.issues.addLabels({
      owner,
      repo,
      issue_number: issueNumber,
      labels: [labelName],
    });
  }

  async function removeLabel() {
    try {
      await github.rest.issues.removeLabel({
        owner,
        repo,
        issue_number: issueNumber,
        name: labelName,
      });
    } catch (error) {
      if (error.status !== 404) {
        throw error;
      }
    }
  }

  async function upsertComment(commentBody) {
    if (existingComment) {
      await github.rest.issues.updateComment({
        owner,
        repo,
        comment_id: existingComment.id,
        body: commentBody,
      });
      return;
    }

    await github.rest.issues.createComment({
      owner,
      repo,
      issue_number: issueNumber,
      body: commentBody,
    });
  }

  const { data: templateFile } = await github.rest.repos.getContent({
    owner: baseOwner ?? upstreamOwner,
    repo: baseRepoName ?? upstreamRepo,
    path: templatePath,
    ref: baseRef,
  });

  const templateBody = Buffer.from(templateFile.content, templateFile.encoding)
    .toString('utf8')
    .trim();

  const templateHeadings = getTemplateHeadings(templateBody);
  const templateChecklistItems = getChecklistItemsFromTemplate(templateBody);
  const missingHeadings = getMissingHeadings(templateHeadings, body);
  const missingChecklistItems = getMissingChecklistItems(
    templateChecklistItems,
    body
  );
  const isValid =
    missingHeadings.length === 0 && missingChecklistItems.length === 0;

  if (!isValid) {
    const failureDetails = [];

    if (missingHeadings.length > 0) {
      failureDetails.push(`Missing headings: ${missingHeadings.join(', ')}`);
    }

    if (missingChecklistItems.length > 0) {
      failureDetails.push(
        `Missing checklist items: ${missingChecklistItems.join(', ')}`
      );
    }

    const failureComment = [
      commentMarker,
      '> [!IMPORTANT]',
      `> Pull requests must use the pull request [template](${templateUrl}). Please edit the description above to resolve this [error](${jobUrl}).`,
      '',
      '<details><summary>View the template</summary>',
      '<p>',
      '',
      '```markdown',
      templateBody,
      '```',
      '',
      '</p>',
      '</details>',
    ].join('\n');

    await addLabel();
    await upsertComment(failureComment);

    core.setFailed(
      [
        'Pull request body is missing required content from the PR template.',
        ...failureDetails.map((detail) => `- ${detail}`),
        `Template: ${templateUrl}`,
        `Workflow run: ${jobUrl}`,
        'Edit the PR description to restore the missing headings and checklist item text, then save the PR to rerun this check.',
      ].join('\n')
    );

    return;
  }

  await removeLabel();

  if (existingComment) {
    await upsertComment(
      'Thanks for using the pull request description template! 👍'
    );
  }
};
