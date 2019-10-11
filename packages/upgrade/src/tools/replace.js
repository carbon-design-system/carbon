/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

'use strict';

const diff = require('jest-diff');
const fs = require('fs-extra');
const glob = require('fast-glob');
const path = require('path');
const { reporter } = require('../reporter');

// Given a glob of files, a replacement table, and dry
async function replace(globs, changes, options) {
  const { cwd, ignore } = options;
  const files = await glob(['**/*.scss'], {
    cwd,
    ignore: ['node_modules', ...ignore].filter(Boolean),
  });

  return Promise.all(files.map(file => replaceInFile(file, changes, options)));
}

const diffOptions = {
  expand: false,
};

async function replaceInFile(file, changes, options) {
  const { dry } = options;
  const original = await fs.readFile(file, 'utf8');
  let contents = original;

  for (const change of changes) {
    if (dry) {
      const match = contents.match(change.from);
      if (match) {
        console.log();
        // TODO: handle case where change.to is a function
        reporter.info(
          `Replace \`${match[0]}\` with \`${change.to}\` in file ` +
            path.join(options.cwd, file)
        );
        console.log();
        console.log(
          diff(original.replace(change.from, change.to), original, diffOptions)
        );
        console.log();
      }
      continue;
    }

    contents = contents.replace(change.from, change.to);
  }

  if (contents !== original) {
    await fs.writeFile(file, contents);
  }
}

module.exports = {
  replace,
};
