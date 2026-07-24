/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Utilities for idempotently managing automation-owned issue comments. A
 * hidden HTML header provides a stable identity even when the visible text is
 * replaced, appended, deleted, or collapsed in a later workflow run.
 */
import * as core from '@actions/core';

// Keep the supported operations explicit so misspelled configuration fails
// loudly instead of accidentally creating a comment.
const operations = new Set([
  'replace',
  'append',
  'create',
  'ignore',
  'delete',
  'collapse',
]);

const MINIMIZE_COMMENT_MUTATION = `
  mutation MinimizeManagedComment(
    $commentId: ID!
    $classifier: ReportedContentClassifiers!
  ) {
    minimizeComment(
      input: { subjectId: $commentId, classifier: $classifier }
    ) {
      minimizedComment {
        isMinimized
      }
    }
  }
`;

/**
 * Normalize visible text and attach the hidden identifier used by later runs.
 * Operations that create or update content require a non-empty body.
 *
 * @param {string | undefined} header
 * @param {string | undefined} body
 * @returns {string}
 */
function formatComment(header, body) {
  const content = body?.trim();
  if (!content) {
    throw new Error('A non-empty comment body is required for this operation');
  }
  return header ? `${header}\n\n${content}` : content;
}

/**
 * Create one issue comment through the REST API and return GitHub's comment
 * object so callers can report the resulting ID.
 */
async function createComment(context, octokit, body) {
  const { issue, repository } = context.payload;
  core.info(`[comment] Creating comment on issue #${issue.number}`);
  const response = await octokit.rest.issues.createComment({
    owner: repository.owner.login,
    repo: repository.name,
    issue_number: issue.number,
    body,
  });
  core.info(`[comment] Created comment ${response.data.id}`);
  return response.data;
}

/**
 * Load every comment, not just the first page, because long-running issues can
 * contain an old managed comment beyond GitHub's default page size.
 */
async function listComments(context, octokit) {
  const { issue, repository } = context.payload;
  const parameters = {
    owner: repository.owner.login,
    repo: repository.name,
    issue_number: issue.number,
    per_page: 100,
  };

  core.info(`[comment] Listing comments for issue #${issue.number}`);
  const comments = await octokit.paginate(
    octokit.rest.issues.listComments,
    parameters
  );
  core.info(`[comment] Found ${comments.length} comments`);
  return comments;
}

/**
 * Find the newest comment with the managed header. The exact-body fallback
 * adopts comments created by the retired workflows before headers existed,
 * preventing a duplicate during the transition.
 */
function findComment(comments, header, body) {
  const legacyBody = body?.trim();
  const matches = comments.filter((comment) => {
    const existingBody = comment.body?.trim();
    return (
      existingBody?.startsWith(header) ||
      (legacyBody && existingBody === legacyBody)
    );
  });
  return matches.at(-1);
}

/**
 * Create or manage an issue comment identified by a hidden header.
 *
 * @param {object} context
 * @param {object} octokit
 * @param {object} options
 * @param {string} options.operation
 * @param {string} [options.header]
 * @param {string} [options.body]
 * @returns {Promise<{ action: string, comment?: object }>}
 */
export async function manageComment(
  context,
  octokit,
  { operation, header, body }
) {
  if (!operations.has(operation)) {
    throw new Error(`Unsupported comment operation: ${operation}`);
  }

  core.info(
    `[comment] Starting ${operation} operation` +
      (header ? ` for header ${header}` : '')
  );

  if (operation === 'ignore') {
    core.info('[comment] Ignore requested; no API calls are necessary');
    return { action: 'ignored' };
  }

  if (operation === 'create') {
    // "create" deliberately skips the lookup and always makes a new comment.
    const comment = await createComment(
      context,
      octokit,
      formatComment(header, body)
    );
    return { action: 'created', comment };
  }

  if (!header) {
    throw new Error(`A comment header is required for ${operation}`);
  }

  const comments = await listComments(context, octokit);
  const existingComment = findComment(comments, header, body);
  core.info(
    existingComment
      ? `[comment] Matched existing comment ${existingComment.id}`
      : '[comment] No existing comment matched'
  );

  if (operation === 'delete') {
    // Deleting an already-absent managed comment is an idempotent no-op.
    if (!existingComment) {
      core.info('[comment] Nothing to delete');
      return { action: 'not-found' };
    }
    const { repository } = context.payload;
    await octokit.rest.issues.deleteComment({
      owner: repository.owner.login,
      repo: repository.name,
      comment_id: existingComment.id,
    });
    core.info(`[comment] Deleted comment ${existingComment.id}`);
    return { action: 'deleted', comment: existingComment };
  }

  if (operation === 'collapse') {
    // REST handles comment content, but minimizing a comment is available only
    // through GraphQL's minimizeComment mutation.
    if (!existingComment) {
      core.info('[comment] Nothing to collapse');
      return { action: 'not-found' };
    }
    if (existingComment.minimized) {
      core.info(`[comment] Comment ${existingComment.id} is already collapsed`);
      return { action: 'unchanged', comment: existingComment };
    }
    await octokit.graphql(MINIMIZE_COMMENT_MUTATION, {
      commentId: existingComment.node_id,
      classifier: 'OUTDATED',
    });
    core.info(`[comment] Collapsed comment ${existingComment.id}`);
    return { action: 'collapsed', comment: existingComment };
  }

  const managedBody = formatComment(header, body);
  if (!existingComment) {
    core.info(`[comment] ${operation} will create the missing comment`);
    const comment = await createComment(context, octokit, managedBody);
    return { action: 'created', comment };
  }

  const nextBody =
    operation === 'append'
      ? // Append retains the existing header/content and adds a separated block.
        `${existingComment.body.trimEnd()}\n\n${body.trim()}`
      : managedBody;
  if (nextBody === existingComment.body) {
    core.info(
      `[comment] Comment ${existingComment.id} already has this content`
    );
    return { action: 'unchanged', comment: existingComment };
  }

  const { repository } = context.payload;
  const response = await octokit.rest.issues.updateComment({
    owner: repository.owner.login,
    repo: repository.name,
    comment_id: existingComment.id,
    body: nextBody,
  });
  core.info(
    `[comment] ${operation === 'append' ? 'Appended to' : 'Replaced'} comment ${existingComment.id}`
  );
  return { action: 'updated', comment: response.data };
}
