/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getCellId } from '../cells';

describe('getCellId', () => {
  it('should return a string for the given rowId and header', () => {
    expect(getCellId('a', 'header')).toBe('a:header');
  });

  it('should handle empty strings for both `rowId` and `header`', () => {
    expect(getCellId('', '')).toBe(':');
  });

  it('should handle special characters in `rowId` and `header`', () => {
    expect(getCellId('row@1', 'head#2')).toBe('row@1:head#2');
  });

  it('should handle numeric strings', () => {
    expect(getCellId('123', '456')).toBe('123:456');
  });

  it('should handle long strings', () => {
    const longRowId = 'ö'.repeat(1000000);
    const longHeader = 'ŵ'.repeat(1000000);

    expect(getCellId(longRowId, longHeader)).toBe(`${longRowId}:${longHeader}`);
  });
});
