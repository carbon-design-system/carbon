/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Regression test for the date picker failing to open on engines without
 * Temporal (all of Safari, all iOS browsers, Chrome/Edge < 144).
 *
 * Unlike the other test suites in this directory, this file deliberately does NOT
 * import `../test-utils/temporal-mock.js`. Everything is imported through
 * the `@carbon/utilities/date-picker` entry point.
 */

import {
  DatePickerStateMachine,
  DatePickerEvent,
  DatePickerState,
  generateCalendarGrid,
  getMonthYearLabel,
  getWeekdayLabels,
  isTemporalAvailable,
} from '../../index.js';

describe('date picker without native Temporal', () => {
  it('has a Temporal global once the date-picker entry point is imported', () => {
    expect(isTemporalAvailable()).toBe(true);
    expect(typeof Temporal.Now.plainDateISO).toBe('function');
  });

  it('opens the calendar from IDLE on a calendar icon click', () => {
    const machine = new DatePickerStateMachine({ mode: 'single' });

    const context = machine.send(DatePickerEvent.CALENDAR_ICON_CLICK);

    expect(machine.getState()).toBe(DatePickerState.CALENDAR_OPEN);
    expect(context.isOpen).toBe(true);
    expect(context.viewDate.toString()).toBe(
      Temporal.Now.plainDateISO().toString()
    );
  });

  it('opens the calendar from FOCUSED, the path an input focus takes', () => {
    const machine = new DatePickerStateMachine({ mode: 'single' });

    machine.send(DatePickerEvent.INPUT_FOCUS, { inputType: 'from' });
    const context = machine.send(DatePickerEvent.CALENDAR_OPEN);

    expect(machine.getState()).toBe(DatePickerState.CALENDAR_OPEN);
    expect(context.isOpen).toBe(true);
    expect(context.focusedDate.toString()).toBe(
      Temporal.Now.plainDateISO().toString()
    );
  });

  it('renders a grid the calendar can draw from', () => {
    const viewDate = Temporal.PlainDate.from('2026-01-15');
    const grid = generateCalendarGrid(viewDate);

    expect(grid).toHaveLength(6);
    // Jan 2026 starts on a Thursday, so a Sunday-first grid begins 2025-12-28.
    expect(grid[0][0].date.toString()).toBe('2025-12-28');
    expect(getMonthYearLabel(viewDate, 'en')).toBe('January 2026');
  });

  it('navigates months without throwing', () => {
    const machine = new DatePickerStateMachine({ mode: 'single' });
    machine.send(DatePickerEvent.CALENDAR_ICON_CLICK);

    const start = machine.getContext().viewDate;
    const context = machine.send(DatePickerEvent.NEXT_MONTH);

    expect(context.viewDate.toString()).toBe(
      start.add({ months: 1 }).toString()
    );
  });
});
