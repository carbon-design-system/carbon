/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

type Order = 'month-year' | 'year-month';

const _orderCache = new Map<string, Order>();

function getMonthYearOrder(locale: string): Order {
  const cached = _orderCache.get(locale);
  if (cached) return cached;

  const parts = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
  }).formatToParts(new Date(2000, 0, 1));

  const monthIndex = parts.findIndex((p) => p.type === 'month');
  const yearIndex = parts.findIndex((p) => p.type === 'year');

  const order: Order = monthIndex < yearIndex ? 'month-year' : 'year-month';
  _orderCache.set(locale, order);
  return order;
}

const isMonthFirst = (locale: string) =>
  getMonthYearOrder(locale) === 'month-year';

export const datePartsOrder = {
  getMonthYearOrder,
  isMonthFirst,
};
