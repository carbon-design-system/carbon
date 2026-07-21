/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Plugin for a read-only Bob assessment of newly opened formal Bugs. Bob sees
 * issue context and repository guidance, returns plain text, and never receives
 * a GitHub token; the Bob Automation client posts validated output afterward.
 */
import * as core from '@actions/core';
import { execFile } from 'node:child_process';
import { access, mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { promisify } from 'node:util';
import { events } from '../conditions.js';
import { manageComment } from '../manage-comment.js';

const execFileAsync = promisify(execFile);
const BOB_COMMENT_HEADER = '<!-- bob-preliminary-triage -->';
const BOB_CONTEXT_DIRECTORY = '.bob-triage';
const BOB_CONTEXT_FILE = 'issue.json';
const BOB_TIMEOUT = 12 * 60 * 1000;
// Use an allowlist rather than copying process.env. Action inputs are exposed as
// environment variables, so copying everything would leak the GitHub token.
const BOB_ENVIRONMENT_VARIABLES = [
  'CI',
  'HOME',
  'HTTP_PROXY',
  'HTTPS_PROXY',
  'LANG',
  'LC_ALL',
  'NODE_EXTRA_CA_CERTS',
  'NO_PROXY',
  'PATH',
  'SSL_CERT_DIR',
  'SSL_CERT_FILE',
  'TEMP',
  'TMP',
  'TMPDIR',
  'XDG_CONFIG_HOME',
];

/**
 * Remove terminal formatting and unsafe control characters from CLI output
 * while preserving newlines used by the allowed bullet-list format.
 *
 * @param {string} value
 * @returns {string}
 */
function stripTerminalCharacters(value) {
  return (
    value
      // Bob is a terminal program, so remove ANSI escape sequences from stdout.
      // eslint-disable-next-line no-control-regex
      .replace(/\u001b\[[0-?]*[ -/]*[@-~]/g, '')
      // Preserve newlines while removing other control characters.
      // eslint-disable-next-line no-control-regex
      .replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, '')
      .trim()
  );
}

/**
 * Validate and normalize Bob's plain-text output before it can be posted.
 *
 * @param {string} raw
 * @returns {string}
 */
export function validateBobTriage(raw) {
  const text = stripTerminalCharacters(raw);
  const lines = text.split('\n').filter((line) => line.trim());
  const words = text.split(/\s+/).filter(Boolean);

  if (!text || text.length > 600 || words.length > 100) {
    throw new Error(
      'Bob triage must contain 1-600 characters and at most 100 words'
    );
  }
  if (/^#{1,6}\s/m.test(text) || text.includes('```')) {
    throw new Error('Bob triage must not contain a heading or code fence');
  }
  if (text.includes('<!--')) {
    throw new Error('Bob triage must not contain an HTML comment');
  }

  const isBulletList = lines.every((line) => /^[-*]\s+\S/.test(line));
  if (isBulletList) {
    // Lists are intentionally short so the automated response does not crowd
    // out the reporter or appear to be a final maintainer decision.
    if (lines.length < 2 || lines.length > 3) {
      throw new Error('Bob triage bullet lists must contain 2-3 items');
    }
    return text;
  }

  if (lines.length !== 1) {
    throw new Error('Bob triage prose must be a single paragraph');
  }
  const withoutUrls = text.replace(/https?:\/\/\S+/g, (url) => {
    // URL punctuation should count as sentence punctuation, but dots inside a
    // hostname must not inflate the sentence count.
    const punctuation = url.match(/[.!?]+$/)?.[0] ?? '';
    return `URL${punctuation}`;
  });
  const sentences = withoutUrls.split(/(?<=[.!?])\s+/).filter(Boolean);
  if (sentences.length > 3) {
    throw new Error('Bob triage prose must contain at most 3 sentences');
  }

  return text;
}

/**
 * Reduce the webhook to the issue data Bob needs. Avoid writing the complete
 * event payload, which may grow to include unrelated or sensitive fields.
 */
function buildIssueContext(context) {
  const { issue, repository } = context.payload;
  return {
    repository: repository.full_name,
    issue: {
      number: issue.number,
      url: issue.html_url,
      title: issue.title,
      body: issue.body,
      type: issue.type,
      author: issue.user.login,
    },
  };
}

/**
 * Give Bob only the environment it needs, explicitly excluding GitHub tokens.
 *
 * @param {object} environment
 * @param {string} apiKey
 * @returns {object}
 */
export function createBobEnvironment(environment, apiKey) {
  const bobEnvironment = {};
  for (const name of BOB_ENVIRONMENT_VARIABLES) {
    if (environment[name]) {
      bobEnvironment[name] = environment[name];
    }
  }
  bobEnvironment.BOBSHELL_API_KEY = apiKey;
  return bobEnvironment;
}

/**
 * Invoke the pinned Bob executable in the repository workspace. Bob's custom
 * mode supplies read-only capabilities and the child environment supplies only
 * the explicit allowlist plus its API key.
 */
async function executeBob(workspace, apiKey) {
  // Passing the prompt as an argv value avoids shell interpolation of any issue
  // content. The issue itself is read from the generated JSON file.
  const argumentsList = [
    '--accept-license',
    '--auth-method',
    'api-key',
    '--chat-mode',
    'bug-triage',
    '--hide-intermediary-output',
    '--output-format',
    'text',
    'Follow @/.github/prompts/bob-bug-triage.md to triage @/.bob-triage/issue.json. Return only the comment text.',
  ];

  core.info(
    '[bob-triage] Starting Bob CLI with bug-triage mode and no GitHub token in its environment'
  );
  const result = await execFileAsync('bob', argumentsList, {
    cwd: workspace,
    env: createBobEnvironment(process.env, apiKey),
    maxBuffer: 1024 * 1024,
    timeout: BOB_TIMEOUT,
  });
  core.info('[bob-triage] Bob CLI exited successfully');
  if (result.stderr?.trim()) {
    core.info(
      `[bob-triage] Bob stderr: ${stripTerminalCharacters(result.stderr)}`
    );
  }
  return result.stdout;
}

/**
 * Generate and post Bob's preliminary triage for a newly opened formal Bug.
 *
 * @param {object} context
 * @param {object} octokit
 * @param {Function} runBob
 */
export async function runBobBugTriage(context, octokit, runBob = executeBob) {
  const { issue } = context.payload;
  core.info(
    `[bob-triage] Evaluating issue #${issue.number}; type=${issue.type?.name ?? 'none'}`
  );
  if (issue.type?.name !== 'Bug') {
    core.info('[bob-triage] Formal issue type is not Bug; skipping Bob');
    return;
  }

  const apiKey = core.getInput('BOBSHELL_API_KEY', { required: true });
  core.info('[bob-triage] Bob API key input is present');
  const workspace = process.env.GITHUB_WORKSPACE || process.cwd();
  const contextDirectory = join(workspace, BOB_CONTEXT_DIRECTORY);
  const contextPath = join(contextDirectory, BOB_CONTEXT_FILE);
  const promptPath = join(workspace, '.github', 'prompts', 'bob-bug-triage.md');
  const modePath = join(workspace, '.bob', 'custom_modes.yaml');

  // Fail before invoking Bob when a checkout is missing either half of the
  // runtime contract. This produces a clearer error than a generic CLI failure.
  core.info(`[bob-triage] Workspace=${workspace}`);
  core.info(`[bob-triage] Verifying prompt at ${promptPath}`);
  await access(promptPath);
  core.info(`[bob-triage] Verifying custom mode at ${modePath}`);
  await access(modePath);

  try {
    // Use a predictable ignored-style directory inside the workspace so Bob can
    // reference it with @/ syntax. The finally block always removes it.
    await mkdir(contextDirectory, { recursive: true });
    const issueContext = buildIssueContext(context);
    await writeFile(contextPath, `${JSON.stringify(issueContext, null, 2)}\n`);
    core.info(
      `[bob-triage] Wrote issue context for #${issue.number} to ${contextPath}`
    );

    const rawOutput = await runBob(workspace, apiKey);
    core.info(
      `[bob-triage] Received ${rawOutput.length} characters from Bob; validating output`
    );
    const triage = validateBobTriage(rawOutput);
    core.info(
      `[bob-triage] Validated Bob output (${triage.split(/\s+/).length} words): ${triage}`
    );

    const result = await manageComment(context, octokit, {
      // Replace makes reruns idempotent: it creates the header once, then updates
      // that same managed comment rather than posting duplicates.
      operation: 'replace',
      header: BOB_COMMENT_HEADER,
      body: triage,
    });
    core.info(
      `[bob-triage] Preliminary triage comment completed with action=${result.action}`
    );
  } finally {
    await rm(contextDirectory, { recursive: true, force: true });
    core.info('[bob-triage] Removed temporary issue context');
  }
}

const plugin = {
  name: 'Generate preliminary Bob bug triage',
  conditions: [events.issues.opened],
  // The runner creates an Octokit client from this input only for this plugin.
  // That makes Bob's managed comment the Bob Automation app's only output.
  githubTokenInput: 'BOB_GITHUB_TOKEN',
  run: runBobBugTriage,
};

export default plugin;
