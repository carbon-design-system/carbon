/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

'use strict';

const fs = require('fs-extra');
const path = require('path');
const yaml = require('js-yaml');

const METADATA_PATH = path.resolve(__dirname, '../metadata.yml');
const METADATA_OUTPUT = path.resolve(__dirname, '../metadata.json');

async function build() {
  const metadata = yaml.safeLoad(await fs.readFile(METADATA_PATH, 'utf8'));

  await fs.writeJson(METADATA_OUTPUT, metadata, {
    spaces: 2,
  });
}

build().catch(error => {
  console.log(error);
  process.exitCode = 1;
});
