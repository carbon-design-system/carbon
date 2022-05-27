/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const execa = require('execa');
const glob = require('fast-glob');
const fs = require('fs-extra');
const got = require('got');
const path = require('path');

const denylist = new Set(['carbon-components', '@carbon/icons-vue']);

const { NPM_TOKEN } = process.env;

async function main() {
  if (!NPM_TOKEN) {
    throw new Error('NPM_TOKEN is not defined as an environment variable');
  }

  const ROOT_DIRECTORY = path.resolve(__dirname, '..', '..');
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
    `//registry.npmjs.org/:_authToken=${NPM_TOKEN}`
  );

  try {
    for (const workspace of workspaces) {
      if (workspace.packageJson.private) {
        continue;
      }

      const { name, version } = workspace.packageJson;

      if (denylist.has(name)) {
        continue;
      }

      const npm = await got(name, {
        prefixUrl: 'https://registry.npmjs.org',
      }).json();

      if (version === npm['dist-tags'].latest) {
        continue;
      }

      console.log(`npm dist-tag add ${name}@${version} latest`);
      await execa('npm', ['dist-tag', 'add', `${name}@${version}`, 'latest'], {
        stdio: 'inherit',
        cwd: ROOT_DIRECTORY,
      });
    }
  } finally {
    await fs.remove(NPMRC_FILEPATH);
  }
}

main().catch((error) => {
  console.log(error);
  process.exit(1);
});
