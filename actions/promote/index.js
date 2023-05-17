/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const core = require('@actions/core');
const execa = require('execa');
const glob = require('fast-glob');
const fs = require('fs-extra');
const got = require('got');
const path = require('path');

const denylist = new Set(['carbon-components', '@carbon/icons-vue']);

async function main() {
  const npmToken = core.getInput('NPM_TOKEN', {
    required: true,
  });
  const dryRun = core.getInput('DRY_RUN') === 'true';

  const ROOT_DIRECTORY = process.cwd();
  const workspaces = [];
  const queue = [ROOT_DIRECTORY];

  while (queue.length > 0) {
    const directory = queue.shift();
    const packageJsonPath = path.join(directory, 'package.json');

    if (!fs.existsSync(packageJsonPath)) {
      continue;
    }

    const packageJson = await fs.readJson(packageJsonPath);
    const workspace = {
      directory,
      packageJson,
    };

    workspaces.push(workspace);

    if (packageJson.workspaces) {
      const candidates = await Promise.all(
        packageJson.workspaces.map(async (pattern) => {
          const matches = await glob([pattern], {
            cwd: directory,
            onlyDirectories: true,
          });
          return matches.map((match) => {
            return path.join(directory, match);
          });
        })
      ).then((result) => {
        return result.flat();
      });
      queue.push(...candidates);
    }
  }

  const NPMRC_FILEPATH = path.join(ROOT_DIRECTORY, '.npmrc');
  await fs.writeFile(
    NPMRC_FILEPATH,
    `//registry.npmjs.org/:_authToken=${npmToken}`
  );

  try {
    const updates = [];

    for (const workspace of workspaces) {
      const { name, version } = workspace.packageJson;

      core.info(`Checking workspace: ${name}`);

      if (workspace.packageJson.private) {
        core.info(`Skipping workspace ${name} due to private field`);
        continue;
      }

      if (denylist.has(name)) {
        core.info(`Skipping workspace ${name} due to denylist`);
        continue;
      }

      const npm = await got(name, {
        prefixUrl: 'https://registry.npmjs.org',
      }).json();

      if (version === npm['dist-tags'].latest) {
        core.info(`Skipping workspace ${name} due to dist-tags are in sync`);
        continue;
      }

      updates.push({
        name,
        latest: version,
        previous: npm['dist-tags'].latest,
      });

      core.info(`npm dist-tag add ${name}@${version} latest`);

      if (!dryRun) {
        await execa(
          'npm',
          ['dist-tag', 'add', `${name}@${version}`, 'latest'],
          {
            stdio: 'inherit',
            cwd: ROOT_DIRECTORY,
          }
        );
      }
    }

    await core.summary
      .addHeading('Packages')
      .addTable([
        [
          {
            data: 'Package',
            header: true,
          },
          {
            data: 'Previous',
            header: true,
          },
          {
            data: 'Latest',
            header: true,
          },
        ],
        ...updates.map((update) => {
          return [update.name, update.previous, update.latest];
        }),
      ])
      .write();
  } finally {
    await fs.remove(NPMRC_FILEPATH);
  }
}

main().catch((error) => {
  console.log(error);
  process.exit(1);
});
