/**
 * Copyright IBM Corp. 2026
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
const glob = require('glob');

// Define the global DTCG specification schema URL
const GLOBAL_DTCG_SCHEMA_URL =
  'https://www.designtokens.org/schemas/2025.10/format.json';

// Timeout for schema fetch
const SCHEMA_FETCH_TIMEOUT = 10000;

/**
 * Pre-processes token data before schema validation to handle two Carbon-specific
 * patterns that are structurally valid for Carbon's use case but don't conform
 * to the strict DTCG oneOf schema:
 *
 * 1. Composite nodes: tokens that have both a $value and child tokens (e.g.
 *    `background` which has a base value AND variants like `background-active`).
 *    Renaming these would be a breaking change, so we strip $value/$type before
 *    validation, treating them as pure groups.
 *
 * 2. Component tokens: intentionally have no $value — their per-theme values
 *    live in $extensions.carbon.themes and are consumed by the DTCG build
 *    pipeline to generate Sass maps. We strip $type so the schema treats them
 *    as group nodes rather than invalid tokens.
 */
function prepareForValidation(obj) {
  if (!obj || typeof obj !== 'object') return obj;

  const DOLLAR_KEYS = new Set([
    '$type',
    '$value',
    '$description',
    '$extensions',
    '$deprecated',
    '$ref',
    '$schema',
  ]);

  const childKeys = Object.keys(obj).filter((k) => !DOLLAR_KEYS.has(k));
  const hasValue = '$value' in obj;
  const hasType = '$type' in obj;

  let result = { ...obj };

  if (hasValue && childKeys.length > 0) {
    // Composite node: has both $value and children — strip token properties
    // so schema treats it as a group. Source files are not modified.
    delete result['$value'];
    delete result['$type'];
  } else if (
    hasType &&
    !hasValue &&
    !('$ref' in result) &&
    childKeys.length === 0
  ) {
    // Component token: has $type but no $value — intentional pattern where
    // per-theme values live in $extensions.carbon.themes. Strip $type so
    // schema treats it as a valid group/extension node.
    delete result['$type'];
  }

  // Recurse into children
  for (const k of childKeys) {
    result[k] = prepareForValidation(result[k]);
  }

  return result;
}

describe('DTCG Schema Validation', () => {
  let globalSchema;
  let ajv;
  let validate;

  beforeAll(async () => {
    try {
      const response = await fetch(GLOBAL_DTCG_SCHEMA_URL);
      globalSchema = await response.json();

      ajv = new Ajv({
        allErrors: true,
        strict: false,
        validateFormats: true,
      });
      addFormats(ajv);

      validate = ajv.compile(globalSchema);
    } catch (error) {
      console.error('Failed to fetch DTCG schema:', error.message);
      throw error;
    }
  }, SCHEMA_FETCH_TIMEOUT + 5000);

  function getDTCGTokenFiles() {
    const dtcgDir = path.join(__dirname, '../src/dtcg');
    const pattern = path.join(dtcgDir, '**/*.json');
    const files = glob.sync(pattern, {
      ignore: ['**/node_modules/**', '**/schema/**'],
    });
    return files;
  }

  function validateTokenFile(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const tokens = JSON.parse(fileContent);
    const tokensForValidation = prepareForValidation(tokens);
    const valid = validate(tokensForValidation);

    return {
      valid,
      errors: validate.errors,
      filePath,
      fileName: path.basename(filePath),
    };
  }

  test('should successfully fetch the global DTCG schema', () => {
    expect(globalSchema).toBeDefined();
    expect(globalSchema.$schema).toBeDefined();
  });

  test('should have a valid Ajv validator compiled', () => {
    expect(validate).toBeDefined();
    expect(typeof validate).toBe('function');
  });

  describe('Theme token files', () => {
    const themeFiles = ['white.json', 'g10.json', 'g90.json', 'g100.json'].map(
      (file) => path.join(__dirname, '../src/dtcg', file)
    );

    test.each(themeFiles)('should validate %s against DTCG schema', (file) => {
      const result = validateTokenFile(file);

      if (!result.valid) {
        console.error(`\n❌ Validation errors in ${result.fileName}:`);
        result.errors.forEach((err) => {
          console.error(
            `  - Path: ${err.instancePath || '/'} | Message: ${err.message}`
          );
          if (err.params) {
            console.error(`    Params:`, JSON.stringify(err.params, null, 2));
          }
        });
      }

      expect(result.valid).toBe(true);
    });
  });

  describe('Component token files', () => {
    const componentDir = path.join(__dirname, '../src/dtcg/components');
    const componentFiles = fs
      .readdirSync(componentDir)
      .filter((file) => file.endsWith('.json'))
      .map((file) => path.join(componentDir, file));

    test.each(componentFiles)('should validate against DTCG schema', (file) => {
      const result = validateTokenFile(file);

      if (!result.valid) {
        console.error(`\n❌ Validation errors in ${result.fileName}:`);
        result.errors.forEach((err) => {
          console.error(
            `  - Path: ${err.instancePath || '/'} | Message: ${err.message}`
          );
          if (err.params) {
            console.error(`    Params:`, JSON.stringify(err.params, null, 2));
          }
        });
      }

      expect(result.valid).toBe(true);
    });
  });

  describe('All DTCG token files', () => {
    test('should validate all DTCG token files in the repository', () => {
      const tokenFiles = getDTCGTokenFiles();
      expect(tokenFiles.length).toBeGreaterThan(0);

      const results = tokenFiles.map(validateTokenFile);
      const failedFiles = results.filter((r) => !r.valid);

      if (failedFiles.length > 0) {
        console.error('\n❌ Failed validations:');
        failedFiles.forEach((result) => {
          console.error(`\n  File: ${result.fileName}`);
          result.errors.forEach((err) => {
            console.error(
              `    - Path: ${err.instancePath || '/'} | Message: ${err.message}`
            );
          });
        });
      }

      expect(failedFiles).toHaveLength(0);
    });
  });
});
