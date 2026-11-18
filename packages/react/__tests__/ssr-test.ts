/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

import { expect, jest, test } from '@jest/globals';

test('should load', () => {
  expect(() => jest.requireActual('../lib')).not.toThrow();
});
