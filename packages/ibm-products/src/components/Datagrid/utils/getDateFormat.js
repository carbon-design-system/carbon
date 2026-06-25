/**
 * Copyright IBM Corp. 2022, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Example usage of mapping locale to flatpickr date format or placeholder value (m/d/Y or mm/dd/yyyy)
export const getDateFormat = (lang, full) => {
  const formatObj = new Intl.DateTimeFormat(lang).formatToParts(new Date());
  return formatObj
    .map(({ type, value }) => {
      switch (type) {
        case 'day':
          return full ? 'dd' : 'd';
        case 'month':
          return full ? 'mm' : 'm';
        case 'year':
          return full ? 'yyyy' : 'Y';
        default:
          return value;
      }
    })
    .join('');
};
