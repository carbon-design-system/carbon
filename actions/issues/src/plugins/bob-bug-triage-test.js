/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import plugin, {
  createBobEnvironment,
  validateBobTriage,
} from './bob-bug-triage.js';
import { plugins } from './index.js';

jest.mock(
  '@actions/core',
  () => ({
    getInput: jest.fn(),
    info: jest.fn(),
  }),
  { virtual: true }
);

describe('validateBobTriage', () => {
  it('accepts concise prose and removes terminal color codes', () => {
    expect(
      validateBobTriage(
        '\u001b[32mThis looks valid. Move it to Backlog.\u001b[0m'
      )
    ).toBe('This looks valid. Move it to Backlog.');
  });

  it('accepts two or three bullet items', () => {
    expect(validateBobTriage('- First finding\n- Second finding')).toBe(
      '- First finding\n- Second finding'
    );
  });

  it.each([
    ['', '1-600 characters'],
    ['# Heading', 'heading or code fence'],
    ['<!-- hidden -->\nVisible', 'HTML comment'],
    ['One\nTwo', 'single paragraph'],
    ['- Only one', '2-3 items'],
    ['One. Two. Three. Four.', 'at most 3 sentences'],
  ])('rejects invalid output: %s', (output, message) => {
    expect(() => validateBobTriage(output)).toThrow(message);
  });
});

describe('createBobEnvironment', () => {
  it('removes GitHub tokens and includes only the Bob API key', () => {
    expect(
      createBobEnvironment(
        {
          GH_TOKEN: 'carbon-gh-token',
          GITHUB_TOKEN: 'carbon-github-token',
          INPUT_BOB_GITHUB_TOKEN: 'bob-github-token',
          INPUT_GITHUB_TOKEN: 'carbon-input-token',
          NPM_TOKEN: 'unrelated-secret',
          PATH: '/usr/bin',
        },
        'bob-api-key'
      )
    ).toEqual({
      BOBSHELL_API_KEY: 'bob-api-key',
      PATH: '/usr/bin',
    });
  });
});

describe('Bob bug triage plugin conditions', () => {
  it('uses the dedicated Bob Automation token input', () => {
    expect(plugin.githubTokenInput).toBe('BOB_GITHUB_TOKEN');
  });

  it('is the only registered plugin that uses an alternate GitHub token', () => {
    expect(plugins.filter(({ githubTokenInput }) => githubTokenInput)).toEqual([
      plugin,
    ]);
  });

  it('runs only for opened events', () => {
    expect(plugin.conditions[0].run({ payload: { action: 'opened' } })).toBe(
      true
    );
    expect(plugin.conditions[0].run({ payload: { action: 'typed' } })).toBe(
      false
    );
  });
});
