/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { spawnSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const INSPECTOR = path.join(__dirname, 'icon-package.mjs');

/**
 * Run inspector in a separate Node process and returns parsed output
 *
 * @param {string} description - what's being inspected, used in error messages
 * @param {string[]} args - arguments for the inspector
 * @returns {any} the inspector's JSON output
 */
function run(description, args) {
  const result = spawnSync(process.execPath, [INSPECTOR, ...args], {
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
    env: { ...process.env, NODE_NO_WARNINGS: '1' },
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(
      `Could not inspect ${description} (exit ${result.status}):\n${result.stderr}`
    );
  }

  return JSON.parse(result.stdout);
}

/**
 * Return sorted export names of a package's entry point
 *
 * @param {string} packageName - package to load, e.g. `@carbon/icons`
 * @returns {string[]} sorted export names
 */
function readPackageExports(packageName) {
  return run(packageName, ['exports', packageName]);
}

/**
 * Loads every module in a built icon package and report what failed
 *
 * @param {object} options
 * @param {string} options.packageName - package to import, e.g. `@carbon/icons`
 * @param {string} options.packageDir - absolute path to the built package
 * @param {Array<{name: string, filepath: string}>} options.entries - the
 * expected export name and relative module path for each icon
 * @returns {{entryPoint: object, directPath: object}} failures by check
 */
function verifyIconPackage({ packageName, packageDir, entries }) {
  const manifest = path.join(
    os.tmpdir(),
    `carbon-${packageName.replace(/\W/g, '-')}-${process.pid}.json`
  );

  fs.writeFileSync(
    manifest,
    JSON.stringify({ packageName, packageDir, entries })
  );

  try {
    return run(packageName, ['verify', manifest]);
  } finally {
    fs.rmSync(manifest, { force: true });
  }
}

module.exports = { readPackageExports, verifyIconPackage };
