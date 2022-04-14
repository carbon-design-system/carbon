/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getCellId } from '../cells';

describe('cells tools', () => {
  describe('getCellId', () => {
    it('should return a string for the given rowId and header', () => {
      expect(getCellId('a', 'header')).toBe('a:header');
    });
  });
});
