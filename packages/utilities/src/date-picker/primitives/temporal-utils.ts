/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Temporal API utilities for date picker
 * Uses the modern Temporal API for robust date handling
 */

/**
 * Convert a Date object to Temporal.PlainDate
 *
 * @param {Date} date - JavaScript Date object
 * @returns Temporal.PlainDate
 */
export function dateToPlainDate(date: Date): Temporal.PlainDate {
  return Temporal.PlainDate.from({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  });
}

/**
 * Convert Temporal.PlainDate to Date object
 *
 * @param {Temporal.PlainDate} plainDate - Temporal.PlainDate
 * @returns JavaScript Date object
 */
export function plainDateToDate(plainDate: Temporal.PlainDate): Date {
  return new Date(plainDate.year, plainDate.month - 1, plainDate.day);
}

/**
 * Convert Temporal.PlainDate to ISO date string (YYYY-MM-DD)
 *
 * @param {Temporal.PlainDate} plainDate - Temporal.PlainDate
 * @returns ISO date string
 */
export function plainDateToISOString(plainDate: Temporal.PlainDate): string {
  return plainDate.toString();
}

/**
 * Parse ISO date string to Temporal.PlainDate
 *
 * @param {string} isoString - ISO date string (YYYY-MM-DD)
 * @returns Temporal.PlainDate or null if invalid
 */
export function parseISOToPlainDate(
  isoString: string
): Temporal.PlainDate | null {
  try {
    return Temporal.PlainDate.from(isoString);
  } catch {
    return null;
  }
}

/**
 * Parse a date string in various formats to Temporal.PlainDate
 * Supports: ISO (YYYY-MM-DD), US (MM/DD/YYYY), and JavaScript Date objects
 *
 * @param {string | Date} dateInput - Date string or Date object
 * @returns Temporal.PlainDate or null if invalid
 */
export function parseDateToPlainDate(
  dateInput: string | Date | null | undefined
): Temporal.PlainDate | null {
  if (!dateInput) {
    return null;
  }

  // Handle Date objects
  if (dateInput instanceof Date) {
    return dateToPlainDate(dateInput);
  }

  // Try ISO format first (YYYY-MM-DD)
  try {
    return Temporal.PlainDate.from(dateInput);
  } catch {
    // Not ISO format, try parsing MM/DD/YYYY or M/D/YYYY
    const parts = dateInput.split('/');
    if (parts.length === 3) {
      const month = parseInt(parts[0], 10);
      const day = parseInt(parts[1], 10);
      const year = parseInt(parts[2], 10);

      if (!isNaN(month) && !isNaN(day) && !isNaN(year)) {
        try {
          return Temporal.PlainDate.from({
            year,
            month,
            day,
          });
        } catch {
          return null;
        }
      }
    }
    return null;
  }
}

/**
 * Compare two Temporal.PlainDate objects
 *
 * @param {Temporal.PlainDate} date1 - First date
 * @param {Temporal.PlainDate} date2 - Second date
 * @returns -1 if date1 < date2, 0 if equal, 1 if date1 > date2
 */
export function comparePlainDates(
  date1: Temporal.PlainDate,
  date2: Temporal.PlainDate
): number {
  return Temporal.PlainDate.compare(date1, date2);
}

/**
 * Check if a date is within a range
 *
 * @param {Temporal.PlainDate} date - Date to check
 * @param {Temporal.PlainDate | null} minDate - Minimum date (inclusive)
 * @param {Temporal.PlainDate | null} maxDate - Maximum date (inclusive)
 * @returns True if date is within range
 */
export function isDateInRange(
  date: Temporal.PlainDate,
  minDate: Temporal.PlainDate | null,
  maxDate: Temporal.PlainDate | null
): boolean {
  if (minDate && comparePlainDates(date, minDate) < 0) {
    return false;
  }
  if (maxDate && comparePlainDates(date, maxDate) > 0) {
    return false;
  }
  return true;
}

/**
 * Format a Temporal.PlainDate according to a format string
 * Supports Flatpickr-compatible format tokens:
 * - Y: 4-digit year (e.g., 2026)
 * - y: 2-digit year (e.g., 26)
 * - m: 2-digit month with leading zero (01-12)
 * - n: month without leading zero (1-12)
 * - d: 2-digit day with leading zero (01-31)
 * - j: day without leading zero (1-31)
 *
 * @param {Temporal.PlainDate} date - Date to format
 * @param {string} format - Format string (e.g., 'd/m/Y', 'm/d/Y', 'Y-m-d')
 * @returns Formatted date string
 */
export function formatPlainDate(
  date: Temporal.PlainDate,
  format: string
): string {
  const year4 = date.year.toString();
  const year2 = year4.slice(-2);
  const month2 = date.month.toString().padStart(2, '0');
  const month1 = date.month.toString();
  const day2 = date.day.toString().padStart(2, '0');
  const day1 = date.day.toString();

  // Replace tokens in order of specificity (longer tokens first)
  return format
    .replace(/Y/g, year4)
    .replace(/y/g, year2)
    .replace(/m/g, month2)
    .replace(/n/g, month1)
    .replace(/d/g, day2)
    .replace(/j/g, day1);
}
/**
 * Get today's date as Temporal.PlainDate
 *
 * @returns Today's date
 */
export function getToday(): Temporal.PlainDate {
  return Temporal.Now.plainDateISO();
}

/**
 * Add days to a date
 *
 * @param {Temporal.PlainDate} date - Starting date
 * @param {number} days - Number of days to add (can be negative)
 * @returns New date
 */
export function addDays(
  date: Temporal.PlainDate,
  days: number
): Temporal.PlainDate {
  return date.add({ days });
}

/**
 * Add months to a date
 *
 * @param {Temporal.PlainDate} date - Starting date
 * @param {number} months - Number of months to add (can be negative)
 * @returns New date
 */
export function addMonths(
  date: Temporal.PlainDate,
  months: number
): Temporal.PlainDate {
  return date.add({ months });
}

/**
 * Get the number of days between two dates
 *
 * @param {Temporal.PlainDate} date1 - First date
 * @param {Temporal.PlainDate} date2 - Second date
 * @returns Number of days (positive if date2 is after date1)
 */
export function daysBetween(
  date1: Temporal.PlainDate,
  date2: Temporal.PlainDate
): number {
  return date1.until(date2).days;
}

/**
 * Check if two dates are equal
 *
 * @param {Temporal.PlainDate} date1 - First date
 * @param {Temporal.PlainDate} date2 - Second date
 * @returns True if dates are equal
 */
export function areDatesEqual(
  date1: Temporal.PlainDate | null,
  date2: Temporal.PlainDate | null
): boolean {
  if (date1 === null && date2 === null) {
    return true;
  }
  if (date1 === null || date2 === null) {
    return false;
  }
  return comparePlainDates(date1, date2) === 0;
}

/**
 * Get the start of the month for a given date
 *
 * @param {Temporal.PlainDate} date - Input date
 * @returns First day of the month
 */
export function getMonthStart(date: Temporal.PlainDate): Temporal.PlainDate {
  return date.with({ day: 1 });
}

/**
 * Get the end of the month for a given date
 *
 * @param {Temporal.PlainDate} date - Input date
 * @returns Last day of the month
 */
export function getMonthEnd(date: Temporal.PlainDate): Temporal.PlainDate {
  return date.with({ day: date.daysInMonth });
}

/**
 * Check if a date is today
 *
 * @param {Temporal.PlainDate} date - Date to check
 * @returns True if date is today
 */
export function isToday(date: Temporal.PlainDate): boolean {
  return areDatesEqual(date, getToday());
}

/**
 * Check if a date is in the past
 *
 * @param {Temporal.PlainDate} date - Date to check
 * @returns True if date is before today
 */
export function isPast(date: Temporal.PlainDate): boolean {
  return comparePlainDates(date, getToday()) < 0;
}

/**
 * Check if a date is in the future
 *
 * @param {Temporal.PlainDate} date - Date to check
 * @returns True if date is after today
 */
export function isFuture(date: Temporal.PlainDate): boolean {
  return comparePlainDates(date, getToday()) > 0;
}

/**
 * Parse a date string with a specific format
 * Supports common format tokens: Y, m, d
 *
 * @param {string} dateString - Date string to parse
 * @param {string} format - Format string (e.g., 'm/d/Y', 'Y-m-d')
 * @returns Temporal.PlainDate or null if invalid
 */
export function parseDateString(
  dateString: string,
  format: string
): Temporal.PlainDate | null {
  try {
    // Simple parser for common formats
    // In production, consider using a more robust parser
    const formatParts = format.split(/[^YmdHis]/);
    const dateParts = dateString.split(/[^0-9]/);

    if (formatParts.length !== dateParts.length) {
      return null;
    }

    let year = 0;
    let month = 0;
    let day = 0;

    formatParts.forEach((part, index) => {
      const value = parseInt(dateParts[index], 10);
      if (part === 'Y') {
        year = value;
      } else if (part === 'm') {
        month = value;
      } else if (part === 'd') {
        day = value;
      }
    });

    return Temporal.PlainDate.from({ year, month, day });
  } catch {
    return null;
  }
}

/**
 * Polyfill check for Temporal API
 *
 * @returns True if Temporal API is available
 */
export function isTemporalAvailable(): boolean {
  return (
    typeof Temporal !== 'undefined' && typeof Temporal.PlainDate !== 'undefined'
  );
}

/**
 * Get a fallback date handler if Temporal is not available
 * This provides a migration path for browsers without Temporal support
 */
export function getDateHandler() {
  if (isTemporalAvailable()) {
    return {
      type: 'temporal' as const,
      toISOString: plainDateToISOString,
      fromISOString: parseISOToPlainDate,
      compare: comparePlainDates,
      format: formatPlainDate,
      isInRange: isDateInRange,
    };
  }

  // Fallback to Date objects
  return {
    type: 'date' as const,
    /**
     *
     * @param {Temporal.PlainDate} date - The date to convert
     */
    toISOString: (date: Date) => date.toISOString().split('T')[0],
    /**
     *
     * @param {string} str - The ISO string to parse
     */
    fromISOString: (str: string) => {
      const date = new Date(str);
      return isNaN(date.getTime()) ? null : date;
    },
    /**
     *
     * @param {Temporal.PlainDate} d1 - First date
     * @param {Temporal.PlainDate} d2 - Second date
     */
    compare: (d1: Date, d2: Date) => d1.getTime() - d2.getTime(),
    /**
     *
     * @param {Temporal.PlainDate} date - The date to format
     * @param {string} format - The format string
     */
    format: (date: Date, format: string) => {
      const year = date.getFullYear().toString();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return format.replace('Y', year).replace('m', month).replace('d', day);
    },
    /**
     *
     * @param {Temporal.PlainDate} date - The date to check
     * @param {Temporal.PlainDate | null} min - Minimum date
     * @param {Temporal.PlainDate | null} max - Maximum date
     */
    isInRange: (date: Date, min: Date | null, max: Date | null) => {
      if (min && date < min) {
        return false;
      }
      if (max && date > max) {
        return false;
      }
      return true;
    },
  };
}
