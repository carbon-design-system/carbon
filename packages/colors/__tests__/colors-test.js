/**
 * @jest-environment node
 */

'use strict';

const { colors, tokens } = require('../src');

test('colors', () => {
  expect(colors).toMatchSnapshot();
});

test('tokens', () => {
  expect(tokens).toMatchSnapshot();
});
