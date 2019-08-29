/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const babel = require('@babel/core');
const fs = require('fs');
const path = require('path');
const util = require('util');
const plugin = require('../');

const readFile = util.promisify(fs.readFile);

const fixtures = path.resolve(__dirname, '../__testfixtures__');
const defineTest = (testName, fixtureName, options = {}) => {
  const inputFile = path.join(fixtures, `${fixtureName}.input.js`);
  const outputFile = path.join(fixtures, `${fixtureName}.output.js`);
  test(testName, async () => {
    const [input, output] = await Promise.all([
      readFile(inputFile, 'utf8'),
      readFile(outputFile, 'utf8'),
    ]);
    const result = babel.transform(input, {
      plugins: [[plugin, options]],
    });
    expect(result.code.trim()).toBe(output.trim());
  });
};

defineTest('Single import', 'single-import');
defineTest('Rename single', 'rename-single');
defineTest('Multiple imports', 'multiple-imports');
defineTest('Rename multiple', 'rename-multiple');
defineTest('Default and Specifier', 'default-and-specifier');
defineTest('Default and Specifier renamed', 'default-and-specifier-rename');
defineTest('Bug: Data Table 1', 'bug-data-table-1');
defineTest('Bug: MultiSelect 1', 'bug-multiselect-1');

test('throws on namespace specifiers', () => {
  const input = `
import * as Carbon from 'carbon-components-react';
`;

  expect(() => {
    babel.transform(input, {
      plugins: [plugin],
    });
  }).toThrow();
});

test('does not throw on namespace specifiers if option is given', () => {
  const input = `
import * as Carbon from 'carbon-components-react';
`;

  expect(() => {
    babel.transform(input, {
      plugins: [[plugin, { throwOnNamespace: false }]],
    });
  }).not.toThrow();
});

test('throws on unknown import', () => {
  const input = `
import { Foo } from 'carbon-components-react';
  `;

  expect(() => {
    babel.transform(input, {
      plugins: [plugin],
    });
  }).toThrow();
});
