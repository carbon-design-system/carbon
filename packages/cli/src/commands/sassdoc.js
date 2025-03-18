/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import glob from 'fast-glob';
import fs from 'fs-extra';
import path from 'path';
import { createLogger } from '../logger.js';
import { createJson, createMarkdown } from './sassdoc/tools.js';

const logger = createLogger('sassdoc');

async function sassdoc({
  glob: pattern,
  ignore = [],
  json = false,
  output = 'docs',
} = {}) {
  logger.start('sassdoc');

  const cwd = process.cwd();
  const DOCS_DIR = path.resolve(cwd, output);
  const JSON_FILE = path.resolve(DOCS_DIR, 'sass.json');
  const MARKDOWN_FILE = path.resolve(DOCS_DIR, 'sass.md');
  const files = await glob(pattern, {
    cwd,
    ignore,
  });

  logger.info(
    `Creating sassdoc for pattern: '${pattern}', ignoring: '${ignore}'`
  );

  if (json) {
    try {
      const jsonFile = await createJson(files);
      await fs.ensureDir(DOCS_DIR);
      await fs.writeFile(JSON_FILE, JSON.stringify(jsonFile, null, 2));
    } catch (error) {
      logger.info(`Sassdoc error: ${error}`);
      process.exit(1);
    }
  } else {
    try {
      const markdownFile = await createMarkdown(files);
      await fs.ensureDir(DOCS_DIR);
      await fs.writeFile(MARKDOWN_FILE, markdownFile);
    } catch (error) {
      logger.info(`Sassdoc error: ${error}`);
      process.exit(1);
    }
  }

  logger.stop();
}

export const builder = (yargs) => {
  yargs.positional('glob', {
    type: 'string',
    describe: 'glob pattern for files to check',
  });

  yargs.options({
    i: {
      alias: 'ignore',
      describe: 'provide a glob pattern of files to ignore',
      type: 'string',
    },
    j: {
      alias: 'json',
      describe: 'output as json file',
      type: 'boolean',
    },
    o: {
      alias: 'output',
      describe: 'specify the directory in which the files are output',
      type: 'string',
    },
  });
};

export const command = 'sassdoc <glob>';
export const desc = 'generate sassdoc as markdown';
export const handler = sassdoc;
