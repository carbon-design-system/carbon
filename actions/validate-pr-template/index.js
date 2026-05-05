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
  // Find any heading containing "checklist" (case-insensitive)
  const checklistHeadingIndex = lines.findIndex((line) => {
    return isHeading(line) && line.toLowerCase().includes('checklist');
  });

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

async function collectValidationData({ github, context, core }) {
  const upstreamOwner = 'carbon-design-system';
  const upstreamRepo = 'carbon';
  const templatePath = '.github/PULL_REQUEST_TEMPLATE.md';
  const base = context.payload.pull_request.base;
  const baseRepo = base.repo;
  const baseOwner = baseRepo.owner.login;
  const baseRepoName = baseRepo.name;
  const baseRef = base.ref ?? context.payload.repository.default_branch;
  const body = context.payload.pull_request.body || '';
  const templateUrl = `https://github.com/${baseOwner}/${baseRepoName}/blob/${baseRef}/${templatePath}`;

  try {
    const { data: templateFile } = await github.rest.repos.getContent({
      owner: baseOwner ?? upstreamOwner,
      repo: baseRepoName ?? upstreamRepo,
      path: templatePath,
      ref: baseRef,
    });

    const templateBody = Buffer.from(
      templateFile.content,
      templateFile.encoding
    )
      .toString('utf8')
      .trim();

    const templateHeadings = getTemplateHeadings(templateBody);
    const templateChecklistItems = getChecklistItemsFromTemplate(templateBody);
    const missingHeadings = getMissingHeadings(templateHeadings, body);
    const missingChecklistItems = getMissingChecklistItems(
      templateChecklistItems,
      body
    );

    return {
      templateUrl,
      missingHeadings,
      missingChecklistItems,
    };
  } catch (error) {
    core.setFailed(
      `Unable to validate PR template: ${error.message}\n\nPlease ensure the PR template exists at ${templateUrl}`
    );
    throw error;
  }
}

async function validateHeadings({ core }) {
  try {
    const validationData = JSON.parse(process.env.VALIDATION_DATA || '{}');

    if (!validationData.templateUrl) {
      core.setFailed(
        'Unable to validate PR template: validation data is missing or malformed'
      );
      return;
    }

    const { templateUrl, missingHeadings } = validationData;

    if (missingHeadings && missingHeadings.length > 0) {
      core.setFailed(
        [
          `Pull request body is missing required PR template headings: ${missingHeadings.join(', ')}`,
          '',
          `Please edit the PR description to include all required headings from the template: ${templateUrl}`,
        ].join('\n')
      );
    }
  } catch (error) {
    core.setFailed(`Unable to validate PR template headings: ${error.message}`);
  }
}

async function validateChecklistItems({ core }) {
  try {
    const validationData = JSON.parse(process.env.VALIDATION_DATA || '{}');

    if (!validationData.templateUrl) {
      core.setFailed(
        'Unable to validate PR template: validation data is missing or malformed'
      );
      return;
    }

    const { templateUrl, missingChecklistItems } = validationData;

    if (missingChecklistItems && missingChecklistItems.length > 0) {
      core.setFailed(
        [
          `Pull request body is missing required PR checklist items: ${missingChecklistItems.join(', ')}`,
          '',
          `Please edit the PR description to include all required checklist items from the template: ${templateUrl}`,
        ].join('\n')
      );
    }
  } catch (error) {
    core.setFailed(
      `Unable to validate PR template checklist items: ${error.message}`
    );
  }
}

// Export functions for testing and action steps
module.exports = {
  collectValidationData,
  validateHeadings,
  validateChecklistItems,
  // Export helper functions for testing
  getLines,
  isHeading,
  isHtmlComment,
  normalizeChecklistLine,
  getTemplateHeadings,
  getChecklistItemsFromTemplate,
  getMissingHeadings,
  getMissingChecklistItems,
};
