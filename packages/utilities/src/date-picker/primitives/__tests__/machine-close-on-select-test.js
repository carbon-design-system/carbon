/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../test-utils/temporal-mock.js';
import { DatePickerStateMachine } from '../machine';
import { DatePickerEvent, DatePickerState } from '../states';

describe('DatePickerStateMachine closeOnSelect', () => {
  function openAndSelect(machine, isoDate) {
    machine.send(DatePickerEvent.INPUT_FOCUS, { inputType: 'from' });
    machine.send(DatePickerEvent.CALENDAR_OPEN);
    machine.send(DatePickerEvent.DATE_SELECT, {
      date: Temporal.PlainDate.from(isoDate),
    });
  }

  it('keeps the calendar open after DATE_SELECT when closeOnSelect is false', () => {
    const machine = new DatePickerStateMachine({
      mode: 'single',
      closeOnSelect: false,
    });

    openAndSelect(machine, '2026-01-01');

    expect(machine.getState()).toBe(DatePickerState.DATE_SELECTED);
    expect(machine.getContext().isOpen).toBe(true);
    expect(machine.getContext().startDate?.toString()).toBe('2026-01-01');
  });

  it('allows selecting another date while open after closeOnSelect is false', () => {
    const machine = new DatePickerStateMachine({
      mode: 'single',
      closeOnSelect: false,
    });

    openAndSelect(machine, '2026-01-01');
    machine.send(DatePickerEvent.DATE_SELECT, {
      date: Temporal.PlainDate.from('2026-01-02'),
    });

    expect(machine.getState()).toBe(DatePickerState.DATE_SELECTED);
    expect(machine.getContext().isOpen).toBe(true);
    expect(machine.getContext().startDate?.toString()).toBe('2026-01-02');
  });

  it('closes on OUTSIDE_CLICK from DATE_SELECTED when the calendar stayed open', () => {
    const machine = new DatePickerStateMachine({
      mode: 'single',
      closeOnSelect: false,
    });

    openAndSelect(machine, '2026-01-01');
    expect(machine.getContext().isOpen).toBe(true);

    machine.send(DatePickerEvent.OUTSIDE_CLICK);

    expect(machine.getState()).toBe(DatePickerState.IDLE);
    expect(machine.getContext().isOpen).toBe(false);
  });

  it('closes the calendar on DATE_SELECT when closeOnSelect is true', () => {
    const machine = new DatePickerStateMachine({
      mode: 'single',
      closeOnSelect: true,
    });

    openAndSelect(machine, '2026-01-01');

    expect(machine.getState()).toBe(DatePickerState.DATE_SELECTED);
    expect(machine.getContext().isOpen).toBe(false);
    expect(machine.getContext().shouldRestoreFocus).toBe(true);
  });
});
