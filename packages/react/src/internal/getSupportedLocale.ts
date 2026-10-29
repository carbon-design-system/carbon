/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const DEFAULT_LOCALE = 'en-US';

/**
 * Returns the provided locale if it is supported by the runtime's
 * `Intl.NumberFormat`, otherwise falls back to the provided fallback
 * (or `'en-US'` when no fallback is given).
 */
export function getSupportedLocale(
  locale: string | undefined,
  fallback: string = DEFAULT_LOCALE
): string {
  if (!locale) {
    return fallback;
  }
  try {
    Intl.NumberFormat(locale);
    return locale;
  } catch {
    return fallback;
  }
}
