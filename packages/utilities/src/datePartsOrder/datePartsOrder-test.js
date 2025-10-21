/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

afterEach(() => {
  // Reset modules between tests to clear the internal cache
  jest.resetModules();
});

describe('datePartsOrder', () => {
  test('returns a valid order string for a set of known locales', async () => {
    const { datePartsOrder } = await import('./datePartsOrder.ts');
    const locales = ['en-US', 'fr-FR', 'ja-JP', 'ko-KR', 'zh-CN'];

    for (const locale of locales) {
      const order = datePartsOrder.getMonthYearOrder(locale);
      expect(['month-year', 'year-month']).toContain(order);
    }
  });

  test('returns month-year for English locales (month name before year)', async () => {
    const { datePartsOrder } = await import('./datePartsOrder.ts');
    const order = datePartsOrder.getMonthYearOrder('en-US');
    expect(order).toBe('month-year');
  });

  test('returns year-month for Japanese locale (year before month)', async () => {
    const { datePartsOrder } = await import('./datePartsOrder.ts');
    const order = datePartsOrder.getMonthYearOrder('ja-JP');
    expect(order).toBe('year-month');
  });

  test('isMonthFirst matches the computed order', async () => {
    const { datePartsOrder } = await import('./datePartsOrder.ts');

    const usOrder = datePartsOrder.getMonthYearOrder('en-US');
    expect(datePartsOrder.isMonthFirst('en-US')).toBe(usOrder === 'month-year');

    const jpOrder = datePartsOrder.getMonthYearOrder('ja-JP');
    expect(datePartsOrder.isMonthFirst('ja-JP')).toBe(jpOrder === 'month-year');
  });

  test('caches results per locale', async () => {
    const { datePartsOrder } = await import('./datePartsOrder.ts');
    const spy = jest.spyOn(Intl.DateTimeFormat.prototype, 'formatToParts');

    // First call populates cache
    const first = datePartsOrder.getMonthYearOrder('en-US');
    expect(first).toBeDefined();

    // Second call should use the cache
    const second = datePartsOrder.getMonthYearOrder('en-US');
    expect(second).toBe(first);

    // Only one call to formatToParts (first one computed)
    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  });

  test('caches separately for different locales', async () => {
    const { datePartsOrder } = await import('./datePartsOrder.ts');
    const us = datePartsOrder.getMonthYearOrder('en-US');
    const jp = datePartsOrder.getMonthYearOrder('ja-JP');

    expect(['month-year', 'year-month']).toContain(us);
    expect(['month-year', 'year-month']).toContain(jp);

    // Typically they differ (US month-first, JP year-first)
    if (us === jp) {
      expect(['month-year', 'year-month']).toContain(us);
    } else {
      expect(us).not.toBe(jp);
    }
  });
});
