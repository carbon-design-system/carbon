/**
 * Copyright IBM Corp. 2015, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const fs = require('fs-extra');
const path = require('path');
const { render, types } = require('node-sass');
const { colors } = require('../src/colors');

function sassAsync(options) {
  return new Promise((resolve, reject) => {
    render(options, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
}

const SCSS_DIR = path.resolve(__dirname, '../scss');

function importer(url, prev, done) {
  const file = url.includes('.scss')
    ? path.join(SCSS_DIR, url)
    : path.join(SCSS_DIR, `${url}.scss`);
  done({ file });
}

async function testSassString(data) {
  const calls = [];
  const result = await sassAsync({
    data,
    importer,
    functions: {
      test(args) {
        calls.push(args);
        return types.String('test');
      },
    },
  });

  return [calls, result];
}

describe('colors.scss', () => {
  it('should provide a map of color values', async () => {
    const [calls] = await testSassString(`
@import './colors.scss';

$map: test($ibm-colors);
$swatch: test(map-get($ibm-colors, 'black'));
$value: test(map-get(map-get($ibm-colors, 'black'), '100'));
$null: test(map-get($ibm-colors, black));
`);

    expect(calls[0]).toBeInstanceOf(types.Map);
    expect(calls[1]).toBeInstanceOf(types.Map);
    expect(calls[2]).toBeInstanceOf(types.Color);
    expect(calls[3]).toBeInstanceOf(types.Null);
  });

  it('should provide variables for each color value', async () => {
    const [calls] = await testSassString(`
@import './colors.scss';

@each $swatch, $values in $ibm-colors {
  @each $grade, $value in $values {
    $test: test(global-variable-exists(ibm-colors__#{$swatch}-#{$grade}));
  }
}`);

    for (const call of calls) {
      expect(call).toBeInstanceOf(types.Boolean);
      expect(call.getValue()).toBe(true);
    }
  });

  it('should provide a fallback ibm-color-map variable', async () => {
    const [calls] = await testSassString(`
@import './colors.scss';

$map: test($ibm-color-map);
`);

    expect(calls[0]).toBeInstanceOf(types.Map);
  });
});
