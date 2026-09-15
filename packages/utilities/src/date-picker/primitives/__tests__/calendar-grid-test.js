/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../test-utils/temporal-mock.js';
import { generateCalendarGrid } from '../calendar-grid';

// The Temporal mock pins "today" to 2026-01-15 (a Thursday).
const viewDate = Temporal.PlainDate.from('2026-01-15');

function flat(grid) {
  return grid.flat();
}

describe('generateCalendarGrid', () => {
  it('returns a 6x7 grid (42 day cells)', () => {
    const grid = generateCalendarGrid(viewDate);
    expect(grid).toHaveLength(6);
    grid.forEach((week) => expect(week).toHaveLength(7));
    expect(flat(grid)).toHaveLength(42);
  });

  it('pads with leading days from the previous month when the week starts on Sunday', () => {
    // Jan 2026 starts on a Thursday, so the grid begins on Sun 2025-12-28.
    const grid = generateCalendarGrid(viewDate);
    const first = grid[0][0];
    expect(first.date.toString()).toBe('2025-12-28');
    expect(first.isCurrentMonth).toBe(false);
  });

  it('tags the viewed month, today, and adjacent-month days correctly', () => {
    const cells = flat(generateCalendarGrid(viewDate));

    const jan15 = cells.find((c) => c.date.toString() === '2026-01-15');
    expect(jan15.isCurrentMonth).toBe(true);
    expect(jan15.isToday).toBe(true);

    const dec28 = cells.find((c) => c.date.toString() === '2025-12-28');
    expect(dec28.isCurrentMonth).toBe(false);
    expect(dec28.isToday).toBe(false);
  });

  it('marks days outside the min/max range as disabled', () => {
    const minDate = Temporal.PlainDate.from('2026-01-10');
    const maxDate = Temporal.PlainDate.from('2026-01-20');
    const cells = flat(generateCalendarGrid(viewDate, minDate, maxDate));

    const byDate = (iso) => cells.find((c) => c.date.toString() === iso);

    expect(byDate('2026-01-09').isDisabled).toBe(true); // before min
    expect(byDate('2026-01-10').isDisabled).toBe(false); // min inclusive
    expect(byDate('2026-01-15').isDisabled).toBe(false); // in range
    expect(byDate('2026-01-20').isDisabled).toBe(false); // max inclusive
    expect(byDate('2026-01-21').isDisabled).toBe(true); // after max
  });

  it('honors a Monday week start', () => {
    // Jan 2026 starts Thursday; a Monday-first grid begins on Mon 2025-12-29.
    const grid = generateCalendarGrid(viewDate, null, null, 1);
    expect(grid[0][0].date.toString()).toBe('2025-12-29');
  });
});
