/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const fs = require('fs');
const path = require('path');
const formatSchema = require('./tokens/schemas/2025.10/format.json');

// the `$schema` URL token files must declare (the stored schema's own `$id`)
const FORMAT_SCHEMA_URL = formatSchema.$id;
const EXTENSION_NAMESPACE = 'com.ibm.carbon';

/**
 * Conformance rules checked for every design token file. The JSON Schema
 * alone is not enough: a node with `$type` and `$extensions` but no `$value`
 * validates as an (empty) group, so value-less tokens need their own rule.
 */
const RULES = {
  // Validates against the DTCG 2025.10 format schema.
  schema: checkSchema,
  // `$schema` points at the 2025.10 format schema.
  'schema-url': checkSchemaUrl,
  // Every leaf node is a token with a `$value` (or a `$ref` alias).
  'token-values': checkTokenValues,
  // No node is both a token and a group; use `$root` instead.
  'root-tokens': checkRootTokens,
  // `$extensions` only uses the Carbon namespace.
  'extension-namespace': checkExtensionNamespace,
};

let validateFormat;

function checkSchema(tokens) {
  if (!validateFormat) {
    const ajv = new Ajv({ allErrors: true, strict: false });
    addFormats(ajv);
    validateFormat = ajv.compile(formatSchema);
  }
  if (validateFormat(tokens)) {
    return [];
  }
  const messages = validateFormat.errors.map((error) => {
    return `${error.instancePath || '/'} ${error.message}`;
  });
  return Array.from(new Set(messages));
}

function checkSchemaUrl(tokens) {
  if (tokens.$schema === FORMAT_SCHEMA_URL) {
    return [];
  }
  return [`$schema is ${JSON.stringify(tokens.$schema)}`];
}

function checkTokenValues(tokens) {
  const violations = [];
  walk(tokens, [], (node, keyPath, children) => {
    const isLeaf = children.length === 0 && keyPath.length > 0;
    if (isLeaf && !('$value' in node) && !('$ref' in node)) {
      violations.push(`${keyPath.join('.')} has no $value`);
    }
  });
  return violations;
}

function checkRootTokens(tokens) {
  const violations = [];
  walk(tokens, [], (node, keyPath, children) => {
    if ('$value' in node && children.length > 0) {
      violations.push(`${keyPath.join('.')} has both $value and children`);
    }
  });
  return violations;
}

function checkExtensionNamespace(tokens) {
  const namespaces = new Set();
  walk(tokens, [], (node) => {
    for (const key of Object.keys(node.$extensions ?? {})) {
      if (key !== EXTENSION_NAMESPACE) {
        namespaces.add(key);
      }
    }
  });
  return Array.from(namespaces, (key) => `uses $extensions["${key}"]`);
}

/**
 * Visits every group and token node (not `$`-prefixed properties). Token
 * values are not traversed.
 */
function walk(node, keyPath, visit) {
  const children = Object.keys(node).filter((key) => {
    return (
      !key.startsWith('$') &&
      node[key] !== null &&
      typeof node[key] === 'object'
    );
  });
  visit(node, keyPath, children);
  for (const key of children) {
    walk(node[key], [...keyPath, key], visit);
  }
}

/**
 * Returns the violations for every rule in a token file, keyed by rule name.
 */
function checkTokenFile(filepath) {
  const tokens = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  return Object.fromEntries(
    Object.entries(RULES).map(([rule, check]) => [rule, check(tokens)])
  );
}

/**
 * Defines a Jest test for every rule and token file. Rules listed in
 * `knownFailures` are expected to fail and the test fails once they pass, so
 * the list can only shrink as files are brought into conformance.
 */
function describeTokenConformance({ packageDir, files, knownFailures = {} }) {
  describe('design token conformance (DTCG 2025.10)', () => {
    test('known failures reference listed files and rules', () => {
      for (const [file, rules] of Object.entries(knownFailures)) {
        expect(files).toContain(file);
        for (const rule of rules) {
          expect(Object.keys(RULES)).toContain(rule);
        }
      }
    });

    describe.each(files)('%s', (file) => {
      const results = checkTokenFile(path.join(packageDir, file));
      const expectedFailures = knownFailures[file] ?? [];

      test.each(Object.keys(RULES))('%s', (rule) => {
        if (!expectedFailures.includes(rule)) {
          expect(results[rule]).toEqual([]);
          return;
        }
        if (results[rule].length === 0) {
          throw new Error(
            `${file} now passes "${rule}". Remove it from knownFailures.`
          );
        }
      });
    });
  });
}

module.exports = {
  EXTENSION_NAMESPACE,
  FORMAT_SCHEMA_URL,
  RULES,
  checkTokenFile,
  describeTokenConformance,
};
