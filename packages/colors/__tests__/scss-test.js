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
  it('should emit no side-effects if mixins are included', async () => {
    const [calls] = await testSassString(`
@import './mixins.scss';

$test: test(mixin-exists(carbon--colors));
$test: test(global-variable-exists(carbon--blue-50));
`);

    expect(calls[0].getValue()).toBe(true);
    expect(calls[1].getValue()).toBe(false);
  });

  it('should include color variables as globals if the mixin is called', async () => {
    const [calls] = await testSassString(`
@import './mixins.scss';

@include carbon--colors();
$test: test(variable-exists(carbon--blue-50));
$test: test(global-variable-exists(carbon--blue-50));
`);
    expect(calls[0].getValue()).toBe(true);
    expect(calls[1].getValue()).toBe(true);
  });

  it('should include color variables in the default entrypoint', async () => {
    const [calls] = await testSassString(`
@import './colors.scss';

$test: test(mixin-exists(carbon--colors));
$test: test(variable-exists(carbon--blue-50));
$test: test(global-variable-exists(carbon--blue-50));
`);
    expect(calls[0].getValue()).toBe(true);
    expect(calls[1].getValue()).toBe(true);
    expect(calls[2].getValue()).toBe(true);
  });

  describe('deprecated', () => {
    it('should provide a map of color values', async () => {
      const [calls] = await testSassString(`
@import './colors.scss';

$map: test($ibm-color-map);
$swatch: test(map-get($ibm-color-map, 'black'));
$value: test(map-get(map-get($ibm-color-map, 'black'), 100));
$null: test(map-get($ibm-color-map, black));
`);

      expect(calls[0]).toBeInstanceOf(types.Map);
      expect(calls[1]).toBeInstanceOf(types.Map);
      expect(calls[2]).toBeInstanceOf(types.Color);
      expect(calls[3]).toBeInstanceOf(types.Null);
    });
  });
});
