/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const METADATA_OUTPUT = path.resolve(__dirname, '../metadata.yml');
const file = yaml.safeLoad(fs.readFileSync(METADATA_OUTPUT, 'utf8'));

fs.writeFileSync(
  path.resolve(__dirname, '../metadata.json'),
  JSON.stringify(file)
);
