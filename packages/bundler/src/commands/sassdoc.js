/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs-extra');
const path = require('path');
const { createJson, createMarkdown } = require('../tools/sassdoc.js');
const { reporter } = require('@carbon/cli-reporter');

async function sassdoc(entrypoint, { cwd, json, output } = {}) {
  const SRC_DIR = path.resolve(cwd, entrypoint);
  const DOCS_DIR = path.resolve(cwd, output);
  const JSON_FILE = path.resolve(DOCS_DIR, 'sass.json');
  const MARKDOWN_FILE = path.resolve(DOCS_DIR, 'sass.md');

  if (json) {
    reporter.info(`Creating sassdoc json for: '${SRC_DIR}'`);

    try {
      const jsonFile = await createJson(SRC_DIR);
      await fs.ensureDir(DOCS_DIR);
      await fs.writeFile(JSON_FILE, JSON.stringify(jsonFile, null, 2));
    } catch {
      reporter.error(`Sassdoc error: ${error}`);
      process.exit(1);
    }

    reporter.success('Done! 🎉');
  } else {
    reporter.info(`Creating sassdoc markdown for: '${SRC_DIR}'`);

    try {
      const markdownFile = await createMarkdown(SRC_DIR);
      await fs.ensureDir(DOCS_DIR);
      await fs.writeFile(MARKDOWN_FILE, markdownFile);
    } catch (error) {
      reporter.error(`Sassdoc error: ${error}`);
      process.exit(1);
    }

    reporter.success('Done! 🎉');
  }

  process.exit(0);
}

module.exports = sassdoc;
