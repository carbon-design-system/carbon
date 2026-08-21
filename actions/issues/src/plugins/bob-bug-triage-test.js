/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import plugin, {
  createBobEnvironment,
  parseBobStreamLine,
  runBobBugTriage,
  validateBobTriage,
} from './bob-bug-triage.js';
import { plugins } from './index.js';
import * as core from '@actions/core';

jest.mock(
  '@actions/core',
  () => ({
    getInput: jest.fn(),
    info: jest.fn(),
    setSecret: jest.fn(),
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

describe('parseBobStreamLine', () => {
  it('logs tool progress without exposing parameters or tool output', () => {
    const toolNames = new Map();
    const toolUse = parseBobStreamLine(
      JSON.stringify({
        type: 'tool_use',
        tool_id: 'tool-1',
        tool_name: 'browser_action',
        parameters: { apiKey: 'secret', prompt: 'private reasoning' },
      }),
      toolNames
    );
    const toolResult = parseBobStreamLine(
      JSON.stringify({
        type: 'tool_result',
        tool_id: 'tool-1',
        status: 'success',
        output: 'sensitive page contents',
      }),
      toolNames
    );

    expect(toolUse).toEqual({
      stage: 'running browser_action',
      message: '[bob-triage] Bob started tool=browser_action',
    });
    expect(toolResult).toEqual({
      stage: 'completed browser_action (success)',
      message: '[bob-triage] Bob completed tool=browser_action; status=success',
    });
    expect(JSON.stringify([toolUse, toolResult])).not.toMatch(
      /secret|private reasoning|sensitive page contents/
    );
  });

  it('suppresses model messages and returns non-events as final output', () => {
    expect(
      parseBobStreamLine(
        JSON.stringify({
          type: 'message',
          content: 'internal model response',
        })
      )
    ).toEqual({ stage: 'generating response' });
    expect(parseBobStreamLine('Move this valid bug to Backlog.')).toEqual({
      output: 'Move this valid bug to Backlog.',
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

  it('runs only for opened or typed formal Bugs', () => {
    function conditionsPass(action, issueType) {
      const context = {
        payload: { action, issue: { type: { name: issueType } } },
      };
      return plugin.conditions.every((condition) => condition.run(context));
    }

    expect(conditionsPass('opened', 'Bug')).toBe(true);
    expect(conditionsPass('typed', 'Bug')).toBe(true);
    expect(conditionsPass('labeled', 'Bug')).toBe(false);
    expect(conditionsPass('typed', 'Feature')).toBe(false);
  });
});

describe('runBobBugTriage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('skips typed-event inference when Bob already commented on opened', async () => {
    const context = {
      payload: {
        action: 'typed',
        issue: {
          number: 42,
          type: { name: 'Bug' },
        },
        repository: {
          owner: { login: 'carbon-design-system' },
          name: 'carbon',
        },
      },
    };
    const listComments = jest.fn();
    const octokit = {
      paginate: jest.fn().mockResolvedValue([
        {
          id: 99,
          body: '<!-- bob-preliminary-triage -->\n\nExisting assessment.',
        },
      ]),
      rest: { issues: { listComments } },
    };
    const runBob = jest.fn();

    await runBobBugTriage(context, octokit, runBob);

    expect(octokit.paginate).toHaveBeenCalledWith(listComments, {
      owner: 'carbon-design-system',
      repo: 'carbon',
      issue_number: 42,
      per_page: 100,
    });
    expect(core.getInput).not.toHaveBeenCalled();
    expect(runBob).not.toHaveBeenCalled();
  });
});
