/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs-extra');
const path = require('path');
const { flatMapAsync } = require('./tools');

const blacklist = new Set(['.DS_Store']);

async function _search(directory) {
  const filenames = (await fs.readdir(directory)).filter(name => {
    return !blacklist.has(name);
  });

  const files = await flatMapAsync(filenames, async filename => {
    const filepath = path.join(directory, filename);
    const stats = await fs.stat(filepath);

    if (await stats.isDirectory()) {
      const dirname = path.basename(filepath);
      if (isNaN(dirname)) {
        return await _search(filepath);
      }
      const results = await _search(filepath);
      return results.map(result => ({
        ...result,
        size: parseInt(dirname, 10),
      }));
    }

    return {
      filepath,
      filename,
      basename: path.basename(filename, '.svg'),
    };
  });

  return files;
}

async function search(directory) {
  if (!(await fs.pathExists(directory))) {
    throw new Error(`Unable to find directory at: \`${directory}\``);
  }

  const files = await _search(directory);
  const prefixed = files.map(file => {
    const { filepath } = file;
    const dirname = path.dirname(filepath);
    const prefix = path
      .relative(directory, dirname)
      .split('/')
      .filter(Boolean);
    return {
      ...file,
      prefix,
    };
  });

  return prefixed;
}

module.exports = search;
