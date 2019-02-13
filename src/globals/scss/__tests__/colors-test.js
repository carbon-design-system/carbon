/**
 * Copyright IBM Corp. 2015, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

const { colors } = require('@carbon/elements');
const { paramCase } = require('change-case');
const { renderSass } = require('../../../../tools/jest/scss');

const classic = [
  // UI color scheme
  'blue-20',
  'blue-30',
  'blue-40',
  'blue-50',
  'blue-90',

  'navy-gray-1',
  'navy-gray-2',
  'navy-gray-3',
  'navy-gray-4',
  'navy-gray-5',
  'navy-gray-6',
  'navy-gray-7',
  'navy-gray-8',
  'navy-gray-9',

  'white',

  // Light UI color scheme
  'blue-51',
  'gray-1',
  'gray-2',
  'gray-3',

  // Accent colors
  'blue-10',
  'blue-60',

  'teal-10',
  'teal-20',
  'teal-30',
  'teal-40',
  'teal-50',
  'teal-60',

  'green-10',
  'green-20',
  'green-30',
  'green-40',
  'green-50',
  'green-60',

  'yellow-10',
  'yellow-20',
  'yellow-30',
  'yellow-60',

  'orange-10',
  'orange-20',
  'orange-30',
  'orange-60',

  'red-10',
  'red-30',
  'red-40',
  'red-50',
  'red-60',

  'purple-10',
  'purple-20',
  'purple-30',
  'purple-40',
  'purple-60',
];

// Map from nested colors structure to a flat list of all variables
const experimental = Object.keys(colors).reduce((variables, swatch) => {
  return variables.concat(
    Object.keys(colors[swatch]).reduce((acc, grade) => {
      return acc.concat(`${paramCase(swatch)}-${grade}`);
    }, [])
  );
}, []);

describe('_colors.scss', () => {
  describe('stable', () => {
    describe.each(classic)('%s', name => {
      it(`should be exported as $color__${name}`, async () => {
        const { calls } = await renderSass(`
@import './src/globals/scss/colors';

$c: test(global-variable-exists(color__${name}));
`);
        // Check that global-variable-exists returned true
        expect(calls[0][0].getValue()).toBe(true);
      });
    });
  });

  describe('experimental', () => {
    describe.each(experimental)('%s', name => {
      it(`should be exported as $ibm-color__${name} (deprecated)`, async () => {
        const { calls } = await renderSass(`
@import './src/globals/scss/colors';

$c: test(global-variable-exists(ibm-color__${name}));
`);
        // Check that global-variable-exists returned true
        expect(calls[0][0].getValue()).toBe(true);
      });

      it(`should be exported as $carbon--${name}`, async () => {
        const { calls } = await renderSass(`
@import './src/globals/scss/colors';

$c: test(global-variable-exists(carbon--${name}));
`);
        expect(calls[0][0].getValue()).toBe(true);
      });

      it(`should be exported as $${name}`, async () => {
        const { calls } = await renderSass(`
@import './src/globals/scss/colors';

$c: test(global-variable-exists(${name}));
`);
        expect(calls[0][0].getValue()).toBe(true);
      });
    });
  });
});
