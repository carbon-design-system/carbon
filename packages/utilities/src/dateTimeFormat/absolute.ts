/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export function formatTime(
  date: Date | number,
  options?: Partial<{
    locale: string;
    style: Intl.DateTimeFormatOptions['timeStyle'];
    timeZone: Intl.DateTimeFormatOptions['timeZone'];
  }>
): string {
  const dtf = new Intl.DateTimeFormat(options?.locale, {
    timeStyle: options?.style ?? 'short',
    timeZone: options?.timeZone,
  });

  return dtf.format(date);
}

export function formatDate(
  date: Date | number,
  options?: Partial<{
    locale: string;
    style: Intl.DateTimeFormatOptions['dateStyle'];
    timeZone: Intl.DateTimeFormatOptions['timeZone'];
  }>
): string {
  const dtf = new Intl.DateTimeFormat(options?.locale, {
    dateStyle: options?.style ?? 'medium',
    timeZone: options?.timeZone,
  });

  return dtf.format(date);
}

export function format(
  date: Date | number,
  options?: Partial<{
    locale: string;
    style: Intl.DateTimeFormatOptions['timeStyle'] | 'tooltip';
    timeStyle: Intl.DateTimeFormatOptions['timeStyle'];
    dateStyle: Intl.DateTimeFormatOptions['dateStyle'];
    timeZone: Intl.DateTimeFormatOptions['timeZone'];
  }>
) {
  const timeStyle =
    options?.timeStyle ??
    (options?.style === 'tooltip' ? 'long' : options?.style) ??
    'short';

  const dateStyle =
    options?.dateStyle ??
    (options?.style === 'tooltip' ? 'full' : options?.style) ??
    'medium';

  const dtf = new Intl.DateTimeFormat(options?.locale, {
    timeStyle,
    dateStyle,
    timeZone: options?.timeZone,
  });

  return dtf.format(date);
}

export function formatRange(
  startDate: Date | number,
  endDate: Date | number,
  options?: Partial<{
    locale: string;
    style: Intl.DateTimeFormatOptions['timeStyle'];
    timeStyle: Intl.DateTimeFormatOptions['timeStyle'] | null;
    dateStyle: Intl.DateTimeFormatOptions['dateStyle'] | null;
    timeZone: Intl.DateTimeFormatOptions['timeZone'];
  }>
) {
  const timeStyle =
    options?.timeStyle === null
      ? undefined
      : (options?.timeStyle ?? options?.style ?? 'short');

  const dateStyle =
    options?.dateStyle === null
      ? undefined
      : (options?.dateStyle ?? options?.style ?? 'medium');

  const dtf = new Intl.DateTimeFormat(options?.locale, {
    timeStyle,
    dateStyle,
    timeZone: options?.timeZone,
  });

  return dtf.formatRange(startDate, endDate);
}
