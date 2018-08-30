/**
 * @jest-environment node
 */

'use strict';

const { colors } = require('../src');

test('colors', () => {
  expect(colors).toMatchSnapshot();
});
