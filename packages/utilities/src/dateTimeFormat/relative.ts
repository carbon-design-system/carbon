/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export function format(
  date: Date | number,
  options?: Partial<{
    locale: string;
    style: Intl.RelativeTimeFormatStyle;
  }>
): string {
  const rtf = new Intl.RelativeTimeFormat(options?.locale, {
    style: options?.style ?? 'long',
  });

  const d = typeof date === 'number' ? new Date(date) : date;
  const now = Date.now();

  const seconds = Math.floor((now - d.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(weeks / 4);
  const years = Math.floor(days / 365);

  if (Math.abs(seconds) < 60) {
    return new Intl.RelativeTimeFormat(options?.locale, {
      numeric: 'auto',
      style: options?.style ?? 'long',
    }).format(0, 'seconds');
  }

  if (Math.abs(minutes) < 60) {
    return rtf.format(minutes * -1, 'minutes');
  }

  if (Math.abs(hours) < 24) {
    return rtf.format(hours * -1, 'hours');
  }

  if (Math.abs(days) < 7) {
    return rtf.format(days * -1, 'days');
  }

  if (Math.abs(weeks) < 4) {
    return rtf.format(weeks * -1, 'weeks');
  }

  if (Math.abs(days) < 365) {
    return rtf.format(months * -1, 'months');
  }

  return rtf.format(years * -1, 'years');
}
