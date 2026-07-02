/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as relative from './relative';

const locale = 'en-US';
const styles = ['long', 'short', 'narrow'];
const tests = [
  ['minutes', 1, 60],
  ['minutes', 59, 60],
  ['hours', 1, 60 * 60],
  ['hours', 23, 60 * 60],
  ['days', 1, 60 * 60 * 24],
  ['days', 6, 60 * 60 * 24],
  ['weeks', 1, 60 * 60 * 24 * 7],
  ['weeks', 3, 60 * 60 * 24 * 7],
  ['months', 1, 60 * 60 * 24 * 7 * 4],
  ['months', 12, 60 * 60 * 24 * 7 * 4],
  ['years', 1, 60 * 60 * 24 * 365],
  ['years', 2, 60 * 60 * 24 * 365],
];

describe(locale, () => {
  styles.forEach((style) => {
    describe(style, () => {
      const nowFormatted = new Intl.RelativeTimeFormat(locale, {
        style,
        numeric: 'auto',
      }).format(0, 'seconds');
      test(`-30 seconds → ${nowFormatted}`, () => {
        const actualOutput = relative.format(Date.now() - 1000 * 30, {
          locale,
        });

        expect(actualOutput).toBe(nowFormatted);
      });

      const rtf = new Intl.RelativeTimeFormat(locale, { style });

      tests.forEach(([unit, unitsPassed, secondsInUnit]) => {
        const datePast = Date.now() - 1000 * unitsPassed * secondsInUnit;
        const expectedPast = rtf.format(unitsPassed * -1, unit);

        test(`-${unitsPassed} ${unit} → ${expectedPast}`, () => {
          const actualOutput = relative.format(datePast, { locale, style });
          expect(actualOutput).toBe(expectedPast);
        });

        const dateFuture = Date.now() + 1000 * unitsPassed * secondsInUnit;
        const expectedFuture = rtf.format(unitsPassed, unit);

        test(`+${unitsPassed} ${unit} → ${expectedFuture}`, () => {
          const actualOutput = relative.format(dateFuture, { locale, style });
          expect(actualOutput).toBe(expectedFuture);
        });
      });
    });
  });
});

describe('relative month clamping', () => {
  const DAY = 1000 * 60 * 60 * 24;

  test('a date 364 days in the past never reports more than 12 months', () => {
    const output = relative.format(Date.now() - 364 * DAY, { locale: 'en-US' });
    expect(output).not.toBe('13 months ago');
    expect(output).toBe('12 months ago');
  });

  test('a date 364 days in the future never reports more than 12 months', () => {
    const output = relative.format(Date.now() + 364 * DAY, { locale: 'en-US' });
    expect(output).not.toBe('in 13 months');
    expect(output).toBe('in 12 months');
  });
});
