/**
 * Copyright IBM Corp. 2020, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as github from '@actions/github';
import * as core from '@actions/core';
import { plugins } from './plugins/index.js';

/**
 * Main Docker-action entrypoint. It builds the default Carbon Automation
 * Octokit client, creates an alternate client only when a plugin explicitly
 * requests one, and logs the complete condition and token-routing decision path.
 */
async function run() {
  core.info('[triage] Starting issue triage action');
  const enabled = core.getInput('enabled');
  core.info(`[triage] Action enabled input=${enabled || 'not set'}`);
  if (enabled === 'false') {
    core.info('[triage] Action is disabled; exiting');
    return;
  }

  const { context } = github;
  core.info(
    `[triage] Event=${context.eventName}; action=${context.payload.action ?? 'none'}`
  );
  const carbonToken = core.getInput('GITHUB_TOKEN', {
    required: true,
  });
  core.info('[triage] Carbon Automation GitHub token input is present');
  const carbonOctokit = github.getOctokit(carbonToken);
  const { issue } = context.payload;

  // workflow_call and future event types may not contain an issue. Treat those
  // payloads as a successful no-op instead of failing while reading properties.
  if (!issue) {
    core.info('[triage] Event has no issue payload; nothing to process');
    return;
  }

  core.info(
    `[triage] Processing issue #${issue.number}; type=${issue.type?.name ?? 'none'}; labels=${issue.labels?.length ?? 0}`
  );
  if (issue.pull_request) {
    core.info('[triage] Payload is a Pull Request; exiting');
    return;
  }

  core.info(`[triage] Evaluating ${plugins.length} registered plugins`);
  // Continue after an individual plugin error so independent plugins can run
  // and leave their own diagnostic trail. The action still fails at the end.
  const pluginFailures = [];
  for (const plugin of plugins) {
    core.startGroup(`[triage] Plugin: ${plugin.name}`);
    let failedCondition;

    try {
      for (const condition of plugin.conditions) {
        // Conditions are intentionally evaluated in order and stop at the first
        // failure; the failed key explains exactly why the plugin was skipped.
        const passed = condition.run(context, carbonOctokit);
        core.info(
          `[triage] Condition ${condition.key} ${passed ? 'passed' : 'failed'}`
        );
        if (passed) {
          continue;
        }
        failedCondition = condition;
        break;
      }

      if (failedCondition) {
        core.info(
          `[triage] Skipping ${plugin.name}; failed condition=${failedCondition.key}`
        );
        continue;
      }

      // Carbon Automation is the default. A plugin must opt in explicitly to a
      // different token input, keeping alternate app identities narrowly scoped.
      let pluginOctokit = carbonOctokit;
      if (plugin.githubTokenInput) {
        const pluginToken = core.getInput(plugin.githubTokenInput, {
          required: true,
        });
        core.info(
          `[triage] ${plugin.name} is using the dedicated ${plugin.githubTokenInput} GitHub client`
        );
        pluginOctokit = github.getOctokit(pluginToken);
      } else {
        core.info(
          `[triage] ${plugin.name} is using the Carbon Automation GitHub client`
        );
      }

      const startedAt = Date.now();
      core.info(`[triage] Running ${plugin.name}`);
      await plugin.run(context, pluginOctokit);
      core.info(
        `[triage] Completed ${plugin.name} in ${Date.now() - startedAt}ms`
      );
    } catch (error) {
      const message = error instanceof Error ? error.stack : String(error);
      core.error(`[triage] ${plugin.name} failed: ${message}`);
      pluginFailures.push(plugin.name);
    } finally {
      core.endGroup();
    }
  }

  if (pluginFailures.length > 0) {
    // A single summary failure makes the workflow red without discarding logs
    // from plugins that ran successfully after the first failure.
    throw new Error(
      `${pluginFailures.length} issue triage plugin(s) failed: ${pluginFailures.join(', ')}`
    );
  }

  core.info('[triage] Issue triage action completed successfully');
}

run().catch((error) => {
  // setFailed reports the error through the Actions toolkit and sets a non-zero
  // action result without terminating before buffered logs are flushed.
  const message = error instanceof Error ? error.stack : String(error);
  core.setFailed(`[triage] Action failed: ${message}`);
});
