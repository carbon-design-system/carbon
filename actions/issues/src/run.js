/**
 * Copyright IBM Corp. 2020, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const github = require('@actions/github');
const core = require('@actions/core');
const { plugins } = require('./plugins');

async function run() {
  const enabled = core.getInput('enabled') || true;
  if (!enabled) {
    core.info('Action is not enabled. Exiting');
    return;
  }

  const { context } = github;
  const token = core.getInput('GITHUB_TOKEN', {
    required: true,
  });
  const octokit = new github.GitHub(token);
  const { issue } = context.payload;

  if (issue.pull_request) {
    core.info('Action ran for a Pull Request that does not apply. Exiting');
    return;
  }

  for (const plugin of plugins) {
    let failedCondition;

    for (const condition of plugin.conditions) {
      if (condition.run(context, octokit)) {
        continue;
      }
      failedCondition = condition;
      break;
    }

    if (failedCondition) {
      core.info(
        `Skipping plugin \`${plugin.name}\` due to failing ` +
          `condition: \`${failedCondition.key}\``
      );
      continue;
    }

    core.info(`Running plugin: \`${plugin.name}\``);
    await plugin.run(context, octokit);
  }
}

run().catch((error) => {
  console.log(error);
  process.exit(1);
});
