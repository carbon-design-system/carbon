/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as duration from './duration';

const locale = 'en-US';
const styles = ['long', 'short', 'narrow', 'digital'];
const time = {
  hours: 1,
  minutes: 23,
  seconds: 45,
};

describe(locale, () => {
  describe('format', () => {
    test('should default to narrow style', () => {
      const expectedOutput = duration.format(time, { locale, style: 'narrow' });
      const actualOutput = duration.format(time, { locale });
      expect(actualOutput).toBe(expectedOutput);
    });

    styles.forEach((style) => {
      const df = new Intl.DurationFormat(locale, { style });
      const expectedOutput = df.format(time);

      test(`${style} → ${expectedOutput}`, () => {
        const actualOutput = duration.format(time, { locale, style });
        expect(actualOutput).toBe(expectedOutput);
      });
    });
  });
});
