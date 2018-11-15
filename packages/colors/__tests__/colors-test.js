/**
 * @jest-environment node
 */

'use strict';

import { colors, tokens } from '../src';

test('colors', () => {
  expect(colors).toMatchSnapshot();
});

test('tokens', () => {
  expect(tokens).toMatchSnapshot();
});
