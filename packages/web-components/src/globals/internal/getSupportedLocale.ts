/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Returns `locale` if it is supported by `Intl.NumberFormat`, otherwise
 * returns `defaultLocale`.
 */
export function getSupportedLocale(
  locale: Intl.LocalesArgument,
  defaultLocale: string
): Intl.LocalesArgument {
  try {
    Intl.NumberFormat.supportedLocalesOf(locale as string | string[]);
    return locale;
  } catch {
    return defaultLocale;
  }
}
