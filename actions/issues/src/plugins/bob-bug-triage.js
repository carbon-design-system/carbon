/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Plugin for one read-only Bob assessment when an issue opens or becomes a
 * formal Bug. Bob sees issue context and repository guidance, streams
 * content-free progress diagnostics, and never receives a GitHub token; the
 * Bob Automation client posts validated output afterward.
 */
import * as core from '@actions/core';
import { spawn } from 'node:child_process';
import { access, mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { events, or } from '../conditions.js';
import { manageComment } from '../manage-comment.js';

const BOB_COMMENT_HEADER = '<!-- bob-preliminary-triage -->';
const BOB_CONTEXT_DIRECTORY = '.bob-triage';
const BOB_CONTEXT_FILE = 'issue.json';
const BOB_TIMEOUT = 12 * 60 * 1000;
const BOB_FORCE_KILL_DELAY = 5 * 1000;
const BOB_HEARTBEAT_INTERVAL = 60 * 1000;
const BOB_MAX_COMMENT_OUTPUT = 1024 * 1024;
const BOB_STDERR_TAIL_LENGTH = 8 * 1024;
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
 * Look for Bob's hidden header before spending inference time. The `typed`
 * fallback may arrive after an `opened` run, so this read makes the two eligible
 * events behave as one logical operation.
 *
 * @param {object} context
 * @param {object} octokit
 * @returns {Promise<boolean>}
 */
async function hasExistingBobTriage(context, octokit) {
  const { issue, repository } = context.payload;
  core.info(
    `[bob-triage] Checking issue #${issue.number} for an existing managed Bob comment`
  );
  const comments = await octokit.paginate(octokit.rest.issues.listComments, {
    owner: repository.owner.login,
    repo: repository.name,
    issue_number: issue.number,
    per_page: 100,
  });
  const existingComment = comments.find((comment) => {
    return comment.body?.trim().startsWith(BOB_COMMENT_HEADER);
  });
  if (existingComment) {
    core.info(
      `[bob-triage] Found managed Bob comment ${existingComment.id}; skipping duplicate inference`
    );
    return true;
  }
  core.info('[bob-triage] No managed Bob comment exists; inference is needed');
  return false;
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
  // Keep the GitHub Actions secret/input name descriptive, then translate it
  // at the process boundary to the fixed environment variable Bob Shell 1.0.6
  // reads when `--auth-method api-key` is used.
  bobEnvironment.BOBSHELL_API_KEY = apiKey;
  return bobEnvironment;
}

/**
 * Convert one newline-delimited Bob stream event into a safe log message.
 * Message content, tool parameters, and tool output are deliberately discarded
 * so Actions logs show progress without exposing Bob's reasoning or inputs.
 *
 * Lines that are not recognized stream events are returned as final comment
 * output. With `--hide-intermediary-output`, Bob writes only its final answer
 * this way.
 *
 * @param {string} line
 * @param {Map<string, string>} toolNames
 * @returns {{ output?: string, stage?: string, message?: string }}
 */
export function parseBobStreamLine(line, toolNames = new Map()) {
  let event;
  try {
    event = JSON.parse(line);
  } catch {
    return { output: line };
  }

  if (!event || typeof event !== 'object' || typeof event.type !== 'string') {
    return { output: line };
  }

  if (event.type === 'init') {
    return {
      stage: 'initialized',
      message: '[bob-triage] Bob stream initialized',
    };
  }

  if (event.type === 'message') {
    // Content-bearing model messages are intentionally neither returned nor
    // logged. The heartbeat still reports that Bob is generating a response.
    return { stage: 'generating response' };
  }

  if (event.type === 'tool_use') {
    // Tool names and statuses should be fixed protocol values. Restrict them to
    // a small character set before interpolating them into workflow logs.
    const toolName = /^[\w.:-]{1,80}$/.test(event.tool_name)
      ? event.tool_name
      : 'unknown-tool';
    if (typeof event.tool_id === 'string') {
      toolNames.set(event.tool_id, toolName);
    }
    return {
      stage: `running ${toolName}`,
      message: `[bob-triage] Bob started tool=${toolName}`,
    };
  }

  if (event.type === 'tool_result') {
    const toolName = toolNames.get(event.tool_id) ?? 'unknown-tool';
    const status = /^[\w.:-]{1,40}$/.test(event.status)
      ? event.status
      : 'unknown-status';
    return {
      stage: `completed ${toolName} (${status})`,
      message: `[bob-triage] Bob completed tool=${toolName}; status=${status}`,
    };
  }

  if (event.type === 'result') {
    const status = /^[\w.:-]{1,40}$/.test(event.status)
      ? event.status
      : event.success === true
        ? 'success'
        : event.success === false
          ? 'error'
          : 'unknown';
    return {
      stage: `result ${status}`,
      message: `[bob-triage] Bob emitted result event; status=${status}`,
    };
  }

  const eventType = /^[\w.:-]{1,80}$/.test(event.type)
    ? event.type
    : 'unknown-event';
  return {
    stage: `event ${eventType}`,
    message: `[bob-triage] Bob emitted event type=${eventType}`,
  };
}

/**
 * Keep only the tail of diagnostic text so a failure remains useful without
 * retaining unbounded child-process output in memory.
 */
function appendTail(current, addition, maximumLength) {
  return `${current}${addition}`.slice(-maximumLength);
}

/**
 * Redact common credential shapes before diagnostic stderr reaches Actions.
 * GitHub also masks registered secrets, but this provides defense in depth.
 */
function redactBobDiagnostic(value, apiKey) {
  let diagnostic = stripTerminalCharacters(value);
  if (apiKey) {
    diagnostic = diagnostic.replaceAll(apiKey, '[REDACTED]');
  }
  return diagnostic
    .replace(/Bearer\s+\S+/gi, 'Bearer [REDACTED]')
    .replace(
      /\b(api[_ -]?key|authorization|token)(\s*[:=]\s*)\S+/gi,
      '$1$2[REDACTED]'
    );
}

/**
 * Invoke the pinned Bob executable in the repository workspace. Structured
 * streaming makes long runs visible while the custom mode and environment keep
 * the process read-only and exclude every GitHub token.
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
    '--debug',
    '--hide-intermediary-output',
    '--output-format',
    'stream-json',
    'Follow @/.github/prompts/bob-bug-triage.md to triage @/.bob-triage/issue.json. Return only the comment text.',
  ];

  core.info(
    `[bob-triage] Starting Bob CLI with bug-triage mode, structured progress, debug diagnostics, and a ${BOB_TIMEOUT / 60000}-minute timeout; mapping the inference input to BOBSHELL_API_KEY and excluding GitHub tokens`
  );

  return new Promise((resolve, reject) => {
    const startedAt = Date.now();
    const toolNames = new Map();
    const finalOutputLines = [];
    let finalOutputLength = 0;
    let stdoutBuffer = '';
    let stderrTail = '';
    let stdoutBytes = 0;
    let stderrBytes = 0;
    let lastStage = 'starting';
    let timedOut = false;
    let closed = false;

    const child = spawn('bob', argumentsList, {
      cwd: workspace,
      env: createBobEnvironment(process.env, apiKey),
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    core.info(
      `[bob-triage] Bob process spawned; pid=${child.pid ?? 'unavailable'}`
    );

    /** Parse a complete stdout line as either progress or final comment text. */
    function handleStdoutLine(line) {
      const parsed = parseBobStreamLine(line, toolNames);
      if (parsed.stage) {
        lastStage = parsed.stage;
      }
      if (parsed.message) {
        core.info(parsed.message);
      }
      if (parsed.output !== undefined) {
        finalOutputLength += Buffer.byteLength(parsed.output);
        if (finalOutputLength > BOB_MAX_COMMENT_OUTPUT) {
          core.error(
            `[bob-triage] Bob final output exceeded ${BOB_MAX_COMMENT_OUTPUT} bytes; terminating the process`
          );
          child.kill('SIGTERM');
          return;
        }
        finalOutputLines.push(parsed.output);
      }
    }

    child.stdout.on('data', (chunk) => {
      stdoutBytes += chunk.length;
      stdoutBuffer += chunk.toString('utf8');
      const lines = stdoutBuffer.split(/\r?\n/);
      stdoutBuffer = lines.pop() ?? '';
      for (const line of lines) {
        handleStdoutLine(line);
      }
    });

    child.stderr.on('data', (chunk) => {
      stderrBytes += chunk.length;
      stderrTail = appendTail(
        stderrTail,
        chunk.toString('utf8'),
        BOB_STDERR_TAIL_LENGTH
      );
    });

    const heartbeat = setInterval(() => {
      const elapsedSeconds = Math.round((Date.now() - startedAt) / 1000);
      core.info(
        `[bob-triage] Bob CLI is still running after ${elapsedSeconds}s; last stage=${lastStage}; stdout bytes=${stdoutBytes}; stderr bytes=${stderrBytes}`
      );
    }, BOB_HEARTBEAT_INTERVAL);

    const timeout = setTimeout(() => {
      timedOut = true;
      const elapsedSeconds = Math.round((Date.now() - startedAt) / 1000);
      core.error(
        `[bob-triage] Bob exceeded its ${elapsedSeconds}s timeout; sending SIGTERM; last stage=${lastStage}; stdout bytes=${stdoutBytes}; stderr bytes=${stderrBytes}`
      );
      child.kill('SIGTERM');
      setTimeout(() => {
        if (!closed) {
          core.error(
            `[bob-triage] Bob did not exit within ${BOB_FORCE_KILL_DELAY / 1000}s of SIGTERM; sending SIGKILL`
          );
          child.kill('SIGKILL');
        }
      }, BOB_FORCE_KILL_DELAY).unref();
    }, BOB_TIMEOUT);

    child.on('error', (error) => {
      clearInterval(heartbeat);
      clearTimeout(timeout);
      reject(
        new Error(
          `Could not start Bob CLI: ${error.message}; last stage=${lastStage}`
        )
      );
    });

    child.on('close', (code, signal) => {
      closed = true;
      clearInterval(heartbeat);
      clearTimeout(timeout);
      if (stdoutBuffer) {
        handleStdoutLine(stdoutBuffer);
      }

      const elapsedSeconds = Math.round((Date.now() - startedAt) / 1000);
      core.info(
        `[bob-triage] Bob process closed after ${elapsedSeconds}s; exit code=${code ?? 'none'}; signal=${signal ?? 'none'}; timed out=${timedOut}; last stage=${lastStage}; stdout bytes=${stdoutBytes}; stderr bytes=${stderrBytes}`
      );

      const diagnosticTail = redactBobDiagnostic(stderrTail, apiKey);
      if (diagnosticTail) {
        const level = timedOut || code !== 0 ? core.error : core.info;
        level(
          `[bob-triage] Bob stderr tail (${Buffer.byteLength(diagnosticTail)} bytes after sanitizing):\n${diagnosticTail}`
        );
      }

      if (timedOut || code !== 0) {
        reject(
          new Error(
            `Bob CLI ${timedOut ? 'timed out' : 'failed'} after ${elapsedSeconds}s (exit code=${code ?? 'none'}, signal=${signal ?? 'none'}, last stage=${lastStage}, stdout bytes=${stdoutBytes}, stderr bytes=${stderrBytes})`
          )
        );
        return;
      }

      core.info('[bob-triage] Bob CLI exited successfully');
      resolve(finalOutputLines.join('\n'));
    });
  });
}

/**
 * Generate and post Bob's preliminary triage once for a formal Bug. Supporting
 * both opened and typed handles GitHub applying an issue form's type in a
 * separate event without producing duplicate inference or comments.
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

  if (await hasExistingBobTriage(context, octokit)) {
    return;
  }

  const apiKey = core.getInput('BOB_INFERENCE_API_KEY', { required: true });
  // Register the inference key with Actions' masker before Bob can emit any
  // diagnostics. The child-process redaction remains a second safeguard.
  core.setSecret(apiKey);
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
  conditions: [
    or(events.issues.opened, events.issues.typed),
    {
      // Check the formal type before the runner requests Bob's optional token.
      // Labels are user-editable and are not a trusted substitute for Issue Type.
      key: 'formal_bug',
      run(context) {
        return context.payload.issue?.type?.name === 'Bug';
      },
    },
  ],
  // The runner creates an Octokit client from this input only for this plugin.
  // That makes Bob's managed comment the Bob Automation app's only output.
  githubTokenInput: 'BOB_GITHUB_TOKEN',
  run: runBobBugTriage,
};

export default plugin;
