/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as core from '@actions/core';
import { runPlugins } from './run.js';

jest.mock(
  '@actions/core',
  () => ({
    endGroup: jest.fn(),
    error: jest.fn(),
    getInput: jest.fn(),
    info: jest.fn(),
    setFailed: jest.fn(),
    startGroup: jest.fn(),
  }),
  { virtual: true }
);

jest.mock(
  '@actions/github',
  () => ({
    context: { payload: {} },
    getOctokit: jest.fn(),
  }),
  { virtual: true }
);

describe('runPlugins', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('runs Carbon plugins before reporting a missing eligible Bob token', async () => {
    const carbonOctokit = { identity: 'carbon' };
    const context = {
      payload: {
        action: 'typed',
        issue: { number: 42, type: { name: 'Bug' } },
      },
    };
    const condition = { key: 'eligible', run: jest.fn(() => true) };
    const initializeMetadata = {
      name: 'Initialize bug metadata',
      conditions: [condition],
      run: jest.fn(),
    };
    const bobTriage = {
      name: 'Generate preliminary Bob bug triage',
      conditions: [condition],
      githubTokenInput: 'BOB_GITHUB_TOKEN',
      run: jest.fn(),
    };
    core.getInput.mockImplementation((name, options) => {
      if (name === 'BOB_GITHUB_TOKEN' && options?.required) {
        throw new Error('Input required and not supplied: BOB_GITHUB_TOKEN');
      }
      return '';
    });

    await expect(
      runPlugins(context, carbonOctokit, [initializeMetadata, bobTriage])
    ).rejects.toThrow(
      '1 issue triage plugin(s) failed: Generate preliminary Bob bug triage'
    );

    expect(initializeMetadata.run).toHaveBeenCalledWith(context, carbonOctokit);
    expect(bobTriage.run).not.toHaveBeenCalled();
    expect(core.error).toHaveBeenCalledWith(
      expect.stringContaining(
        'Input required and not supplied: BOB_GITHUB_TOKEN'
      )
    );
  });
});
