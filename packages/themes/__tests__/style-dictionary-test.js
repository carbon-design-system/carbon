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
  preprocessor: jsonPointerReferences,
} = require('../style-dictionary/preprocessors/json-pointer-references');
const { readResolver } = require('../style-dictionary/resolver');

describe('carbon/json-pointer-references', () => {
  const gray = {
    50: {
      $type: 'color',
      $value: {
        colorSpace: 'srgb',
        components: [0.552941, 0.552941, 0.552941],
        hex: '#8d8d8d',
      },
    },
  };

  test('resolves references inside token values', () => {
    const tokens = jsonPointerReferences({
      gray,
      'background-hover': {
        $type: 'color',
        $value: {
          colorSpace: { $ref: '#/gray/50/$value/colorSpace' },
          components: { $ref: '#/gray/50/$value/components' },
          alpha: 0.12,
        },
      },
    });

    expect(tokens['background-hover'].$value).toEqual({
      colorSpace: 'srgb',
      components: [0.552941, 0.552941, 0.552941],
      alpha: 0.12,
    });
  });

  test('resolves references to values that are references', () => {
    const tokens = jsonPointerReferences({
      gray,
      a: {
        $type: 'color',
        $value: {
          colorSpace: 'srgb',
          components: { $ref: '#/gray/50/$value/components' },
        },
      },
      b: {
        $type: 'color',
        $value: {
          colorSpace: 'srgb',
          components: { $ref: '#/a/$value/components' },
        },
      },
    });

    expect(tokens.b.$value.components).toEqual([0.552941, 0.552941, 0.552941]);
  });

  test('leaves curly-brace aliases for Style Dictionary', () => {
    const tokens = jsonPointerReferences({
      gray,
      background: { $type: 'color', $value: '{gray.50}' },
    });

    expect(tokens.background.$value).toBe('{gray.50}');
  });

  test('throws for references that do not resolve', () => {
    expect(() => {
      jsonPointerReferences({
        a: {
          $type: 'color',
          $value: {
            colorSpace: 'srgb',
            components: { $ref: '#/gray/50/$value/components' },
          },
        },
      });
    }).toThrow('Reference "#/gray/50/$value/components" does not resolve');
  });

  test('throws for circular references', () => {
    expect(() => {
      jsonPointerReferences({
        a: {
          $type: 'color',
          $value: {
            colorSpace: 'srgb',
            components: { $ref: '#/a/$value/components' },
          },
        },
      });
    }).toThrow('Circular reference');
  });

  test('throws for whole-token references', () => {
    expect(() => {
      jsonPointerReferences({
        gray,
        background: { $type: 'color', $ref: '#/gray/50' },
      });
    }).toThrow('Whole-token `$ref` aliases are not supported');
  });
});

describe('readResolver', () => {
  let directory;

  function write(document) {
    const filepath = path.join(directory, 'test.resolver.json');
    fs.writeFileSync(filepath, JSON.stringify(document));
    return filepath;
  }

  const document = {
    version: '2025.10',
    sets: {
      palette: { sources: [{ $ref: '../palette.tokens.json' }] },
    },
    modifiers: {
      theme: {
        contexts: {
          light: [
            { $ref: 'light/a.tokens.json' },
            { $ref: 'light/b.tokens.json' },
          ],
          dark: [{ $ref: 'dark/a.tokens.json' }],
        },
        default: 'light',
      },
    },
    resolutionOrder: [
      { $ref: '#/sets/palette' },
      { $ref: '#/modifiers/theme' },
    ],
  };

  beforeEach(() => {
    directory = fs.mkdtempSync(path.join(os.tmpdir(), 'resolver-test-'));
  });

  afterEach(() => {
    fs.rmSync(directory, { recursive: true });
  });

  test('lists the contexts of a modifier', () => {
    expect(readResolver(write(document)).contexts('theme')).toEqual([
      'light',
      'dark',
    ]);
  });

  test('resolves the token files of a context', () => {
    expect(readResolver(write(document)).resolve({ theme: 'dark' })).toEqual({
      include: [path.resolve(directory, '../palette.tokens.json')],
      source: [path.join(directory, 'dark/a.tokens.json')],
    });
  });

  test('uses the default context of a modifier', () => {
    expect(readResolver(write(document)).resolve().source).toEqual([
      path.join(directory, 'light/a.tokens.json'),
      path.join(directory, 'light/b.tokens.json'),
    ]);
  });

  test('throws for an unknown context', () => {
    expect(() => {
      readResolver(write(document)).resolve({ theme: 'sepia' });
    }).toThrow('unknown theme context "sepia"');
  });

  test('throws for sources that are not token file references', () => {
    const inline = {
      ...document,
      sets: { palette: { sources: [{ gray: {} }] } },
    };

    expect(() => {
      readResolver(write(inline)).resolve();
    }).toThrow('only sources that reference a token file are supported');
  });

  test('throws when a set follows a modifier', () => {
    const reordered = {
      ...document,
      resolutionOrder: [...document.resolutionOrder].reverse(),
    };

    expect(() => {
      readResolver(write(reordered)).resolve();
    }).toThrow('sets must come before modifiers');
  });
});
