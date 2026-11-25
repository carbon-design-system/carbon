/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const {
  EXTENSION_NAMESPACE,
  FORMAT_SCHEMA_URL,
  RESOLVER_SCHEMA_URL,
  checkResolverFile,
  checkTokenFile,
} = require('../tokens');

function withFiles(files, callback) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'tokens-test-'));
  for (const [name, contents] of Object.entries(files)) {
    fs.writeFileSync(path.join(directory, name), JSON.stringify(contents));
  }
  try {
    return callback(directory);
  } finally {
    fs.rmSync(directory, { recursive: true });
  }
}

function check(tokens) {
  return withFiles({ 'test.tokens.json': tokens }, (directory) => {
    return checkTokenFile(path.join(directory, 'test.tokens.json'));
  });
}

function checkResolver(resolver, files = {}) {
  return withFiles(
    { 'test.resolver.json': resolver, ...files },
    (directory) => {
      return checkResolverFile(path.join(directory, 'test.resolver.json'));
    }
  );
}

const color = {
  colorSpace: 'srgb',
  components: [0.059, 0.384, 0.996],
  hex: '#0f62fe',
};

describe('checkTokenFile', () => {
  test('passes a conformant file', () => {
    const results = check({
      $schema: FORMAT_SCHEMA_URL,
      blue: {
        60: {
          $type: 'color',
          $value: color,
          $extensions: { [EXTENSION_NAMESPACE]: { status: 'stable' } },
        },
      },
      background: {
        $root: { $type: 'color', $value: '{blue.60}' },
        brand: { $type: 'color', $value: '{blue.60}' },
      },
    });

    expect(results).toEqual({
      schema: [],
      'schema-url': [],
      'token-values': [],
      'root-tokens': [],
      'extension-namespace': [],
    });
  });

  test('reports schema violations', () => {
    const results = check({
      $schema: FORMAT_SCHEMA_URL,
      spacing: { $type: 'dimension', $value: 0.25 },
    });

    expect(results.schema).not.toEqual([]);
  });

  test('reports a missing or outdated $schema', () => {
    const results = check({ $schema: 'https://tr.designtokens.org/format/' });

    expect(results['schema-url']).toEqual([
      '$schema is "https://tr.designtokens.org/format/"',
    ]);
  });

  test('reports tokens without $value, which validate as empty groups', () => {
    const results = check({
      $schema: FORMAT_SCHEMA_URL,
      background: {
        $type: 'color',
        $extensions: { 'carbon.themes': { white: '{white}' } },
      },
      alias: { $type: 'color', $ref: '#/blue/60/$value' },
    });

    expect(results.schema).toEqual([]);
    expect(results['token-values']).toEqual(['background has no $value']);
  });

  test('reports nodes that are both a token and a group', () => {
    const results = check({
      $schema: FORMAT_SCHEMA_URL,
      background: {
        $type: 'color',
        $value: color,
        hover: { $type: 'color', $value: color },
      },
    });

    expect(results['root-tokens']).toEqual([
      'background has both $value and children',
    ]);
  });

  test('reports extension namespaces other than Carbon', () => {
    const results = check({
      $schema: FORMAT_SCHEMA_URL,
      a: {
        $type: 'color',
        $value: color,
        $extensions: { 'carbon.themes': {}, 'org.carbon': {} },
      },
      b: {
        $type: 'color',
        $value: color,
        $extensions: { 'org.carbon': {} },
      },
    });

    expect(results['extension-namespace']).toEqual([
      'uses $extensions["carbon.themes"]',
      'uses $extensions["org.carbon"]',
    ]);
  });
});

describe('checkResolverFile', () => {
  const resolver = {
    $schema: RESOLVER_SCHEMA_URL,
    version: '2025.10',
    sets: {
      palette: { sources: [{ $ref: 'palette.tokens.json' }] },
    },
    modifiers: {
      theme: {
        contexts: {
          light: [{ $ref: 'light.tokens.json' }],
          dark: [{ $ref: 'dark.tokens.json' }],
        },
        default: 'light',
      },
    },
    resolutionOrder: [
      { $ref: '#/sets/palette' },
      { $ref: '#/modifiers/theme' },
    ],
  };
  const files = {
    'palette.tokens.json': {},
    'light.tokens.json': {},
    'dark.tokens.json': {},
  };

  test('passes a conformant file', () => {
    expect(checkResolver(resolver, files)).toEqual([]);
  });

  test('reports schema violations', () => {
    const { version, ...invalid } = resolver;

    expect(checkResolver(invalid, files)).not.toEqual([]);
  });

  test('reports a missing or outdated $schema', () => {
    const { $schema, ...invalid } = resolver;

    expect(checkResolver(invalid, files)).toEqual(['$schema is undefined']);
  });

  test('reports referenced token files that do not exist', () => {
    const { 'dark.tokens.json': dark, ...missing } = files;

    expect(checkResolver(resolver, missing)).toEqual([
      'dark.tokens.json does not exist',
    ]);
  });
});
