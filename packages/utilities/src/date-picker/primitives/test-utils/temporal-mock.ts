/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Shared Temporal.PlainDate mock for tests.
 *
 * Node 22 does not ship Temporal natively. This minimal implementation covers
 * everything the date-picker state machine needs: from, compare, Now, add,
 * with, until, toString, daysInMonth.
 */

/**
 * Creates a minimal PlainDate-like object from a native Date.
 *
 * @param {Date} date - The native Date to wrap (interpreted as UTC).
 * @returns A PlainDate-compatible object.
 */
function createPlainDate(date: Date) {
  // Normalise to midnight UTC so arithmetic is day-based
  const d = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );

  const obj = {
    year: d.getUTCFullYear(),
    month: d.getUTCMonth() + 1,
    day: d.getUTCDate(),
    get daysInMonth() {
      return new Date(
        Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)
      ).getUTCDate();
    },
    toString() {
      const y = d.getUTCFullYear();
      const mo = String(d.getUTCMonth() + 1).padStart(2, '0');
      const dy = String(d.getUTCDate()).padStart(2, '0');
      return `${y}-${mo}-${dy}`;
    },
    with(dateLike: { year?: number; month?: number; day?: number }) {
      return createPlainDate(
        new Date(
          Date.UTC(
            dateLike.year ?? d.getUTCFullYear(),
            (dateLike.month ?? d.getUTCMonth() + 1) - 1,
            dateLike.day ?? d.getUTCDate()
          )
        )
      );
    },
    add(duration: { days?: number; months?: number; years?: number }) {
      const next = new Date(d);
      if (duration.years) {
        next.setUTCFullYear(next.getUTCFullYear() + duration.years);
      }
      if (duration.months) {
        next.setUTCMonth(next.getUTCMonth() + duration.months);
      }
      if (duration.days) {
        next.setUTCDate(next.getUTCDate() + duration.days);
      }
      return createPlainDate(next);
    },
    until(other: { toString(): string }) {
      const otherDate = new Date(`${other.toString()}T00:00:00.000Z`);
      const diffMs = otherDate.getTime() - d.getTime();
      return { days: Math.round(diffMs / 86_400_000) };
    },
  };

  return obj;
}

const mockTemporal = {
  PlainDate: {
    from(input: string | { year: number; month: number; day: number }) {
      const date =
        typeof input === 'string'
          ? new Date(`${input}T00:00:00.000Z`)
          : new Date(Date.UTC(input.year, input.month - 1, input.day));
      return createPlainDate(date);
    },
    compare(a: { toString(): string }, b: { toString(): string }) {
      return a.toString().localeCompare(b.toString());
    },
  },
  Now: {
    plainDateISO() {
      return createPlainDate(new Date('2026-01-15T00:00:00.000Z'));
    },
  },
};

(globalThis as unknown as { Temporal: typeof mockTemporal }).Temporal =
  mockTemporal;
