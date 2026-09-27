/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../test-utils/temporal-mock.js';
import {
  getFullDateLabel,
  getMonthYearLabel,
  getWeekdayLabels,
} from '../calendar-labels';

const jan2026 = Temporal.PlainDate.from('2026-01-15');

describe('calendar-labels', () => {
  describe('getMonthYearLabel', () => {
    it('formats month and year for the default (English) locale', () => {
      expect(getMonthYearLabel(jan2026)).toBe('January 2026');
    });

    it('localizes the month name', () => {
      expect(getMonthYearLabel(jan2026, 'es')).toBe('enero de 2026');
    });

    it('falls back to English for a structurally invalid locale', () => {
      expect(getMonthYearLabel(jan2026, 'toolongsubtag123')).toBe(
        'January 2026'
      );
      expect(getMonthYearLabel(jan2026, '')).toBe('January 2026');
    });
  });

  describe('getFullDateLabel', () => {
    it('formats a full, English date label', () => {
      expect(getFullDateLabel(Temporal.PlainDate.from('2026-01-01'))).toBe(
        'January 1, 2026'
      );
    });
  });

  describe('getWeekdayLabels', () => {
    it('returns single-letter weekdays for English (Sunday start)', () => {
      expect(getWeekdayLabels('en')).toEqual([
        'S',
        'M',
        'T',
        'W',
        'Th',
        'F',
        'S',
      ]);
    });

    it('honors a Monday week start', () => {
      expect(getWeekdayLabels('en', 1)).toEqual([
        'M',
        'T',
        'W',
        'Th',
        'F',
        'S',
        'S',
      ]);
    });
  });
});
