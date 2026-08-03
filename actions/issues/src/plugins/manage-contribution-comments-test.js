/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { manageComment } from '../manage-comment.js';
import plugin from './manage-contribution-comments.js';

jest.mock(
  '@actions/core',
  () => ({
    info: jest.fn(),
  }),
  { virtual: true }
);
jest.mock('../manage-comment.js', () => ({
  manageComment: jest.fn().mockResolvedValue({ action: 'created' }),
}));

function createContext(action, issueLabels, eventLabel) {
  return {
    payload: {
      action,
      issue: {
        labels: issueLabels.map((name) => ({ name })),
        number: 123,
      },
      label: eventLabel ? { name: eventLabel } : undefined,
    },
  };
}

describe('manage contribution comments plugin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('posts the proposal-open comment for an opened enhancement', async () => {
    await plugin.run(createContext('opened', ['type: enhancement 💡']), {});

    expect(manageComment).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.objectContaining({
        header: '<!-- contribution-proposal-open -->',
      })
    );
  });

  it('posts the accepted comment when both required labels are present', async () => {
    await plugin.run(
      createContext(
        'labeled',
        ['proposal: accepted', 'needs: community contribution'],
        'needs: community contribution'
      ),
      {}
    );

    expect(manageComment).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.objectContaining({
        header: '<!-- contribution-proposal-accepted -->',
      })
    );
  });

  it('posts the not-pursuing comment for that label', async () => {
    await plugin.run(
      createContext(
        'labeled',
        ['proposal: not pursuing'],
        'proposal: not pursuing'
      ),
      {}
    );

    expect(manageComment).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.objectContaining({
        header: '<!-- contribution-proposal-not-pursuing -->',
      })
    );
  });

  it('posts the ready comment when a contribution label is removed', async () => {
    await plugin.run(
      createContext('unlabeled', [], 'needs: code contribution'),
      {}
    );

    expect(manageComment).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.objectContaining({
        header: '<!-- contribution-ready-to-be-worked -->',
      })
    );
  });

  it('does nothing when no rule matches', async () => {
    await plugin.run(createContext('labeled', [], 'unrelated'), {});

    expect(manageComment).not.toHaveBeenCalled();
  });
});
