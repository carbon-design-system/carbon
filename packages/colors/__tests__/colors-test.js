/**
 * Copyright IBM Corp. 2015, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

import { colors, hoverColors } from '../src';

test('colors', () => {
  expect(colors).toMatchSnapshot();
});

test('hoverColors', () => {
  expect(hoverColors).toMatchSnapshot();
});
