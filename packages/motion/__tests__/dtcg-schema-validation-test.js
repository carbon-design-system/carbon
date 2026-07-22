/**
 * Copyright IBM Corp. 2018, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const fs = require('fs');
const path = require('path');

const DTCG_SCHEMA_URL =
  'https://www.designtokens.org/schemas/2025.10/format.json';

const SCHEMA_FETCH_TIMEOUT = 10000;

describe('DTCG Schema Validation — src/dtcg/motion.json', () => {
  let validate;

  beforeAll(async () => {
    const response = await fetch(DTCG_SCHEMA_URL);
    const globalSchema = await response.json();

    const ajv = new Ajv({
      allErrors: true,
      strict: false,
      validateFormats: true,
    });
    addFormats(ajv);
    validate = ajv.compile(globalSchema);
  }, SCHEMA_FETCH_TIMEOUT + 5000);

  test('motion.json validates against the DTCG schema', () => {
    const filePath = path.resolve(__dirname, '../src/dtcg/motion.json');
    const tokens = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const valid = validate(tokens);

    if (!valid) {
      console.error('\n❌ Validation errors in motion.json:');
      validate.errors.forEach((err) => {
        console.error(
          `  - Path: ${err.instancePath || '/'} | Message: ${err.message}`
        );
        if (err.params) {
          console.error(`    Params:`, JSON.stringify(err.params, null, 2));
        }
      });
    }

    expect(valid).toBe(true);
  });
});
