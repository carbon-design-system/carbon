/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as absolute from './absolute';

const locale = 'en-US';
const styles = ['full', 'long', 'medium', 'short'];
const date = new Date('2016-04-28T19:12:47Z');
const endDate = new Date('2018-07-01T09:00:02Z');
const sameDayEndDate = new Date('2016-04-28T21:04:30Z');
const timeZones = ['UTC', 'Asia/Tokyo'];

describe(locale, () => {
  describe('formatTime', () => {
    styles.forEach((style) => {
      const dtf = new Intl.DateTimeFormat(locale, { timeStyle: style });
      const expectedOutput = dtf.format(date);

      test(`${style} → ${expectedOutput}`, () => {
        const actualOutput = absolute.formatTime(date, { locale, style });
        expect(actualOutput).toBe(expectedOutput);
      });
    });

    timeZones.forEach((timeZone) => {
      const style = styles[0];
      const dtf = new Intl.DateTimeFormat(locale, {
        timeStyle: style,
        timeZone,
      });
      const expectedOutput = dtf.format(date);

      test(`timeZone ${timeZone} → ${expectedOutput}`, () => {
        const actualOutput = absolute.formatTime(date, {
          locale,
          style,
          timeZone,
        });
        expect(actualOutput).toBe(expectedOutput);
      });
    });
  });

  describe('formatDate', () => {
    styles.forEach((style) => {
      const dtf = new Intl.DateTimeFormat(locale, { dateStyle: style });
      const expectedOutput = dtf.format(date);

      test(`${style} → ${expectedOutput}`, () => {
        const actualOutput = absolute.formatDate(date, { locale, style });
        expect(actualOutput).toBe(expectedOutput);
      });
    });

    timeZones.forEach((timeZone) => {
      const style = styles[0];
      const dtf = new Intl.DateTimeFormat(locale, {
        dateStyle: style,
        timeZone,
      });
      const expectedOutput = dtf.format(date);

      test(`timeZone ${timeZone} → ${expectedOutput}`, () => {
        const actualOutput = absolute.formatDate(date, {
          locale,
          style,
          timeZone,
        });
        expect(actualOutput).toBe(expectedOutput);
      });
    });
  });

  describe('format', () => {
    styles.forEach((timeStyle) => {
      const dtf = new Intl.DateTimeFormat(locale, {
        timeStyle,
        dateStyle: timeStyle,
      });
      const expectedOutput = dtf.format(date);

      test(`${timeStyle} → ${expectedOutput}`, () => {
        const actualOutput = absolute.format(date, {
          locale,
          style: timeStyle,
        });
        expect(actualOutput).toBe(expectedOutput);
      });

      describe('manual', () => {
        styles.forEach((dateStyle) => {
          const dtf = new Intl.DateTimeFormat(locale, { timeStyle, dateStyle });
          const expectedOutput = dtf.format(date);

          test(`time: ${timeStyle}, date: ${dateStyle} → ${expectedOutput}`, () => {
            const actualOutput = absolute.format(date, {
              locale,
              timeStyle,
              dateStyle,
            });
            expect(actualOutput).toBe(expectedOutput);
          });
        });
      });
    });

    timeZones.forEach((timeZone) => {
      const timeStyle = styles[0];
      const dtf = new Intl.DateTimeFormat(locale, {
        timeStyle,
        dateStyle: timeStyle,
        timeZone,
      });
      const expectedOutput = dtf.format(date);

      test(`timeZone ${timeZone} → ${expectedOutput}`, () => {
        const actualOutput = absolute.format(date, {
          locale,
          style: timeStyle,
          timeZone,
        });
        expect(actualOutput).toBe(expectedOutput);
      });
    });

    const dtf = new Intl.DateTimeFormat(locale, {
      timeStyle: 'long',
      dateStyle: 'full',
    });
    const expectedOutput = dtf.format(date);

    test(`tooltip → ${expectedOutput}`, () => {
      const actualOutput = absolute.format(date, { locale, style: 'tooltip' });
      expect(actualOutput).toBe(expectedOutput);
    });
  });

  describe('formatRange', () => {
    styles.forEach((dateStyle) => {
      const dtf = new Intl.DateTimeFormat(locale, {
        timeStyle: dateStyle,
        dateStyle,
      });
      const expectedOutput = dtf.formatRange(date, endDate);

      test(`${dateStyle} → ${expectedOutput}`, () => {
        const actualOutput = absolute.formatRange(date, endDate, {
          locale,
          style: dateStyle,
        });
        expect(actualOutput).toBe(expectedOutput);
      });

      describe('manual', () => {
        [...styles, null].forEach((timeStyle) => {
          const dtf = new Intl.DateTimeFormat(locale, {
            timeStyle: timeStyle ?? undefined,
            dateStyle: dateStyle ?? undefined,
          });
          const expectedOutput = dtf.formatRange(date, endDate);

          test(`time: ${timeStyle}, date: ${dateStyle} → ${expectedOutput}`, () => {
            const actualOutput = absolute.formatRange(date, endDate, {
              locale,
              timeStyle,
              dateStyle,
            });
            expect(actualOutput).toBe(expectedOutput);
          });
        });

        [...styles].forEach((timeStyle) => {
          const dtf = new Intl.DateTimeFormat(locale, {
            timeStyle: timeStyle,
            dateStyle: undefined,
          });

          const expectedOutput = dtf.formatRange(date, sameDayEndDate);

          test(`time: ${timeStyle}, date: null → ${expectedOutput}`, () => {
            const actualOutput = absolute.formatRange(date, sameDayEndDate, {
              locale,
              timeStyle,
              dateStyle: null,
            });
            expect(actualOutput).toBe(expectedOutput);
          });
        });
      });
    });

    timeZones.forEach((timeZone) => {
      const dateStyle = styles[0];
      const dtf = new Intl.DateTimeFormat(locale, {
        timeStyle: dateStyle,
        dateStyle,
        timeZone,
      });
      const expectedOutput = dtf.formatRange(date, endDate);

      test(`timeZone ${timeZone} → ${expectedOutput}`, () => {
        const actualOutput = absolute.formatRange(date, endDate, {
          locale,
          style: dateStyle,
          timeZone,
        });
        expect(actualOutput).toBe(expectedOutput);
      });
    });
  });
});
