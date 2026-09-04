/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Localized label helpers for date picker calendar renderers.
 */

import { plainDateToDate } from './temporal-utils.js';

/**
 * Number of days in a week.
 */
const DAYS_IN_WEEK = 7;

/**
 * A date known to be a Sunday, used as the anchor for generating weekday names
 * in order. Can be any Sunday.
 */
const SUNDAY_ANCHOR = new Date(2024, 0, 7);

/**
 * Locale used when the caller supplies a structurally invalid BCP 47 tag.
 */
const FALLBACK_LOCALE = 'en';

/**
 * Resolve a caller-supplied locale to one that is safe to hand to `Intl`.
 *
 * Gracefully fallback to FALLBACK_LOCALE when an invalid BCP 47 locale is provided
 *
 * @param {string} locale - Candidate BCP 47 locale tag.
 * @returns {string} The original locale if structurally valid, else `'en'`.
 */
function resolveLocale(locale: string): string {
  try {
    Intl.getCanonicalLocales(locale);
    return locale;
  } catch {
    return FALLBACK_LOCALE;
  }
}

/**
 * Whether a locale is English. Carbon renders single-letter weekday headers
 * for English only; other locales keep their localized short names.
 *
 * @param {string} locale - BCP 47 locale tag.
 * @returns {boolean} True if the locale is a form of English.
 */
function isEnglishLocale(locale: string): boolean {
  return locale.toLowerCase().startsWith('en');
}

/**
 * Get the month-and-year heading for the calendar (e.g. "January 2026").
 *
 * @param {Temporal.PlainDate} viewDate - Any date within the displayed month.
 * @param {string} locale - BCP 47 locale tag (default 'en').
 * @returns {string} Localized "month year" label.
 */
export function getMonthYearLabel(
  viewDate: Temporal.PlainDate,
  locale = 'en'
): string {
  return new Intl.DateTimeFormat(resolveLocale(locale), {
    month: 'long',
    year: 'numeric',
  }).format(plainDateToDate(viewDate));
}

/**
 * Get a full, localized label for a single date (e.g. "January 1, 2026"),
 * suitable for a day cell's `aria-label`.
 *
 * @param {Temporal.PlainDate} date - The date to label.
 * @param {string} locale - BCP 47 locale tag (default 'en').
 * @returns {string} Localized full-date label.
 */
export function getFullDateLabel(
  date: Temporal.PlainDate,
  locale = 'en'
): string {
  return new Intl.DateTimeFormat(resolveLocale(locale), {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(plainDateToDate(date));
}

/**
 * Get the ordered weekday header labels.
 *
 * For English locales this returns `S M T W Th F S`,
 * with `Th` disambiguating Thursday from Tuesday). Other
 * locales get their `Intl` short weekday names unchanged.
 *
 * @param {string} locale - BCP 47 locale tag (default 'en').
 * @param {number} weekStartsOn - First day of the week: 0 = Sunday (default) through 6 = Saturday.
 * @returns {string[]} Seven weekday labels, ordered from `weekStartsOn`.
 */
export function getWeekdayLabels(locale = 'en', weekStartsOn = 0): string[] {
  const safeLocale = resolveLocale(locale);
  const formatter = new Intl.DateTimeFormat(safeLocale, { weekday: 'short' });
  const english = isEnglishLocale(safeLocale);
  const labels: string[] = [];

  for (let i = 0; i < DAYS_IN_WEEK; i++) {
    const offset = (weekStartsOn + i) % DAYS_IN_WEEK;
    const date = new Date(
      SUNDAY_ANCHOR.getFullYear(),
      SUNDAY_ANCHOR.getMonth(),
      SUNDAY_ANCHOR.getDate() + offset
    );
    const short = formatter.format(date);
    labels.push(english ? (short === 'Thu' ? 'Th' : short.charAt(0)) : short);
  }

  return labels;
}
