/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * @param date A date.
 * @returns Date portion of the ISO8601 string of the given date, based on the local timezone.
 */
export const getISODateString = (date: Date) =>
  new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString().split('T')[0];

/**
 * @param s A date portion of an ISO8601 string, based on the local timezone.
 * @returns The date object corresponding to the given ISO8601 string.
 */
export const parseISODateString = (s: string) => {
  const utcDate = new Date(Date.parse(s));
  return new Date(utcDate.getUTCFullYear(), utcDate.getUTCMonth(), utcDate.getUTCDate());
};
