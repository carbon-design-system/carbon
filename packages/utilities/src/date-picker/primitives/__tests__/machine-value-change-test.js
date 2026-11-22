/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../test-utils/temporal-mock.js';
import { DatePickerStateMachine } from '../machine';
import { DatePickerEvent, DatePickerState } from '../states';

describe('DatePickerStateMachine VALUE_CHANGE', () => {
  it('commits a typed valid date from CALENDAR_OPEN and keeps the calendar open', () => {
    const machine = new DatePickerStateMachine({
      mode: 'single',
      dateFormat: 'm/d/Y',
      allowInput: true,
    });

    machine.send(DatePickerEvent.INPUT_FOCUS, { inputType: 'from' });
    machine.send(DatePickerEvent.CALENDAR_OPEN);

    expect(machine.getState()).toBe(DatePickerState.CALENDAR_OPEN);

    machine.send(DatePickerEvent.VALUE_CHANGE, {
      value: '01/15/2026',
      inputType: 'from',
    });

    const context = machine.getContext();
    expect(machine.getState()).toBe(DatePickerState.CALENDAR_OPEN);
    expect(context.isOpen).toBe(true);
    expect(context.startDate?.toString()).toBe('2026-01-15');
    expect(context.value).toBe('2026-01-15');
  });

  it('ignores incomplete typed values', () => {
    const machine = new DatePickerStateMachine({
      mode: 'single',
      dateFormat: 'm/d/Y',
      allowInput: true,
    });

    machine.send(DatePickerEvent.INPUT_FOCUS, { inputType: 'from' });
    machine.send(DatePickerEvent.CALENDAR_OPEN);
    machine.send(DatePickerEvent.VALUE_CHANGE, {
      value: '01/15/202',
      inputType: 'from',
    });

    expect(machine.getContext().startDate).toBeNull();
  });

  it('does not commit typed values when allowInput is false', () => {
    const machine = new DatePickerStateMachine({
      mode: 'single',
      dateFormat: 'm/d/Y',
      allowInput: false,
    });

    machine.send(DatePickerEvent.CALENDAR_ICON_CLICK);
    machine.send(DatePickerEvent.VALUE_CHANGE, {
      value: '01/15/2026',
      inputType: 'from',
    });

    expect(machine.getContext().startDate).toBeNull();
  });
});
