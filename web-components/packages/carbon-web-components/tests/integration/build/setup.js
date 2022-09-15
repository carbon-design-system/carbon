/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const { promisify } = require('util');
const { exec } = require('child-process-promise');
const { setup } = require('jest-environment-puppeteer');
const { mkdir, track } = require('temp');

const packs = {
  'carbon-web-components': path.resolve(__dirname, '../../..'),
};

/**
 * Puts the build artifacts in the given temporary directory
 * and resolves dependencies in `package.json` to use such build artifacts.
 *
 * @param {string} tmpDir The temporary directory.
 */
async function setupPackages(tmpDir) {
  const commands = Object.keys(packs).reduce((acc, pack) => {
    acc.push(`cd ${packs[pack]} && yarn pack --filename ${tmpDir}/${pack}.tar.gz`);
    return acc;
  }, []);
  // eslint-disable-next-line no-restricted-syntax
  for (const command of commands) {
    // eslint-disable-next-line no-await-in-loop
    const { stdout, stderr } = await exec(command);
    console.log(stdout); // eslint-disable-line no-console
    console.error(stderr); // eslint-disable-line no-console
  }
}

module.exports = async config => {
  if (!process.env.LAUNCH_TIMEOUT) {
    process.env.LAUNCH_TIMEOUT = 120000;
  }
  const tmpDir = await promisify(mkdir)('cce-');
  process.env.CCE_EXAMPLE_TMPDIR = tmpDir;
  process.env.NODE_OPTIONS = '--max-old-space-size=8192';
  process.env.YARN_CACHE_FOLDER = `${tmpDir}/.yarn-cache`;
  track();
  await setup(config);
  await setupPackages(tmpDir);
};
