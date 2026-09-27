/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export function format(
  duration: Partial<Record<Intl.DurationFormatUnit, number>>,
  options?: Partial<{
    locale: string;
    style: Intl.DurationFormatOptions['style'];
  }>
) {
  const df = new Intl.DurationFormat(options?.locale, {
    style: options?.style ?? 'narrow',
  });

  return df.format(duration);
}
