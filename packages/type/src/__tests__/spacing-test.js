/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

import { spacing } from '../spacing';

describe('spacing', () => {
  test.each(Object.keys(spacing))('%s should be defined', key => {
    const step = spacing[key];
    expect(step).toBeDefined();
  });
});
