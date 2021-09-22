/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs-extra');
const path = require('path');
const template = require('lodash.template');

const TEMPLATES_DIR = path.join(__dirname, 'templates');
const blocklist = new Set(['.DS_Store']);

async function loadTemplates() {
  const files = await fs.readdir(TEMPLATES_DIR).then((names) => {
    return names
      .filter((name) => {
        return !blocklist.has(name);
      })
      .map((name) => {
        const extension = path.extname(name);
        return {
          name: path.basename(name, `.template${extension}`),
          filepath: path.join(TEMPLATES_DIR, name),
        };
      });
  });

  const templates = {};

  for (const { name, filepath } of files) {
    const contents = await fs.readFile(filepath, 'utf8');
    const compile = template(contents);
    templates[name] = {
      compile,
    };
  }

  return templates;
}

module.exports = {
  loadTemplates,
};
