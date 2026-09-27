/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { manageComment } from './manage-comment.js';

jest.mock(
  '@actions/core',
  () => ({
    info: jest.fn(),
  }),
  { virtual: true }
);

const context = {
  payload: {
    issue: { number: 123 },
    repository: {
      name: 'carbon',
      owner: { login: 'carbon-design-system' },
    },
  },
};

function createOctokit(comments = []) {
  return {
    paginate: jest.fn().mockResolvedValue(comments),
    graphql: jest.fn().mockResolvedValue({}),
    rest: {
      issues: {
        createComment: jest.fn().mockResolvedValue({ data: { id: 10 } }),
        deleteComment: jest.fn().mockResolvedValue({}),
        listComments: jest.fn(),
        updateComment: jest.fn().mockResolvedValue({ data: { id: 9 } }),
      },
    },
  };
}

describe('manageComment', () => {
  it('creates without looking for an existing comment', async () => {
    const octokit = createOctokit();

    const result = await manageComment(context, octokit, {
      operation: 'create',
      header: '<!-- test -->',
      body: 'New comment',
    });

    expect(result.action).toBe('created');
    expect(octokit.paginate).not.toHaveBeenCalled();
    expect(octokit.rest.issues.createComment).toHaveBeenCalledWith(
      expect.objectContaining({ body: '<!-- test -->\n\nNew comment' })
    );
  });

  it('ignores without making any API calls', async () => {
    const octokit = createOctokit();

    const result = await manageComment(context, octokit, {
      operation: 'ignore',
    });

    expect(result.action).toBe('ignored');
    expect(octokit.paginate).not.toHaveBeenCalled();
  });

  it('replaces a legacy exact-match comment and adds the header', async () => {
    const octokit = createOctokit([
      { id: 9, node_id: 'comment-node', body: 'New comment' },
    ]);

    const result = await manageComment(context, octokit, {
      operation: 'replace',
      header: '<!-- test -->',
      body: 'New comment',
    });

    expect(result.action).toBe('updated');
    expect(octokit.rest.issues.updateComment).toHaveBeenCalledWith(
      expect.objectContaining({
        comment_id: 9,
        body: '<!-- test -->\n\nNew comment',
      })
    );
  });

  it('creates when replace cannot find a matching comment', async () => {
    const octokit = createOctokit();

    const result = await manageComment(context, octokit, {
      operation: 'replace',
      header: '<!-- test -->',
      body: 'New comment',
    });

    expect(result.action).toBe('created');
    expect(octokit.rest.issues.createComment).toHaveBeenCalled();
  });

  it('appends to an existing comment', async () => {
    const octokit = createOctokit([
      { id: 9, node_id: 'comment-node', body: '<!-- test -->\n\nFirst' },
    ]);

    await manageComment(context, octokit, {
      operation: 'append',
      header: '<!-- test -->',
      body: 'Second',
    });

    expect(octokit.rest.issues.updateComment).toHaveBeenCalledWith(
      expect.objectContaining({ body: '<!-- test -->\n\nFirst\n\nSecond' })
    );
  });

  it('deletes an existing comment', async () => {
    const octokit = createOctokit([
      { id: 9, node_id: 'comment-node', body: '<!-- test -->\n\nFirst' },
    ]);

    const result = await manageComment(context, octokit, {
      operation: 'delete',
      header: '<!-- test -->',
    });

    expect(result.action).toBe('deleted');
    expect(octokit.rest.issues.deleteComment).toHaveBeenCalledWith(
      expect.objectContaining({ comment_id: 9 })
    );
  });

  it('collapses an existing comment with GraphQL', async () => {
    const octokit = createOctokit([
      { id: 9, node_id: 'comment-node', body: '<!-- test -->\n\nFirst' },
    ]);

    const result = await manageComment(context, octokit, {
      operation: 'collapse',
      header: '<!-- test -->',
    });

    expect(result.action).toBe('collapsed');
    expect(octokit.graphql).toHaveBeenCalledWith(
      expect.stringContaining('minimizeComment'),
      { classifier: 'OUTDATED', commentId: 'comment-node' }
    );
  });
});
