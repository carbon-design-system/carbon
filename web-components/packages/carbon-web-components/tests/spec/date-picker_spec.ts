/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import pick from 'lodash-es/pick';
import flatpickr from 'flatpickr';
import EventManager from '../utils/event-manager';

import BXDatePicker from '../../src/components/date-picker/date-picker';
import BXDatePickerInput from '../../src/components/date-picker/date-picker-input';
import {
  Default,
  singleWithCalendar,
  rangeWithCalendar,
} from '../../src/components/date-picker/date-picker-story';

const defaultTemplate = (props?) => {
  const {
    colorScheme,
    disabled,
    hideLabel,
    invalid,
    labelText,
    name,
    value,
    placeholder,
    size,
    sizeHorizontal,
    validityMessage,
  } = props ?? {};
  return Default({
    'bx-date-picker': { disabled, name, value },
    'bx-date-picker-input': {
      colorScheme,
      hideLabel,
      invalid,
      labelText,
      placeholder,
      size,
      sizeHorizontal,
      validityMessage,
    },
  });
};

const singleWithCalendarTemplate = (props?) => {
  const {
    colorScheme,
    dateFormat,
    disabled,
    enabledRange,
    hideLabel,
    invalid,
    labelText,
    name,
    open,
    placeholder,
    size,
    validityMessage,
    value,
    onChanged,
    onFlatpickrError,
    onInput,
  } = props ?? {};
  return singleWithCalendar({
    'bx-date-picker': {
      dateFormat,
      disabled,
      enabledRange,
      name,
      open,
      value,
      onChanged,
      onFlatpickrError,
    },
    'bx-date-picker-input': {
      colorScheme,
      hideLabel,
      invalid,
      labelText,
      placeholder,
      size,
      validityMessage,
      onInput,
    },
  });
};

const rangeWithCalendarTemplate = (props?) => {
  const {
    colorScheme,
    dateFormat,
    disabled,
    enabledRange,
    hideLabel,
    invalid,
    labelText,
    name,
    open,
    placeholder,
    size,
    validityMessage,
    value,
    onChanged,
    onFlatpickrError,
    onInput,
  } = props ?? {};
  return rangeWithCalendar({
    'bx-date-picker': {
      dateFormat,
      disabled,
      enabledRange,
      name,
      open,
      value,
      onChanged,
      onFlatpickrError,
    },
    'bx-date-picker-input': {
      colorScheme,
      hideLabel,
      invalid,
      labelText,
      placeholder,
      size,
      validityMessage,
      onInput,
    },
  });
};

/**
 * @param formData A `FormData` instance.
 * @returns The given `formData` converted to a classic key-value pair.
 */
const getValues = (formData: FormData) => {
  const values = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of formData.entries()) {
    values[key] = value;
  }
  return values;
};

describe('bx-date-picker', function () {
  const events = new EventManager();

  describe('Simple mode', function () {
    let datePicker: BXDatePicker | null;

    beforeEach(async function () {
      render(defaultTemplate(), document.body);
      await Promise.resolve();
      datePicker = document.body.querySelector('bx-date-picker');
    });

    it('Should not instantiate Flatpickr', async function () {
      const { calendar } = datePicker!;
      expect(calendar).toBeFalsy();
    });
  });

  describe('Single mode', function () {
    let datePicker: BXDatePicker | null;
    let datePickerInput: BXDatePickerInput | null;

    beforeEach(async function () {
      render(singleWithCalendarTemplate(), document.body);
      await Promise.resolve();
      datePicker = document.body.querySelector('bx-date-picker');
      datePickerInput = document.body.querySelector('bx-date-picker-input');
    });

    it('Should instantiate Flatpickr', async function () {
      const { calendar } = datePicker!;
      expect(calendar).toBeTruthy();
      const { config, loadedPlugins } = datePicker!.calendar!;
      expect(
        pick(config, [
          'allowInput',
          'appendTo',
          'dateFormat',
          'locale',
          'maxDate',
          'minDate',
          'positionElement',
        ])
      ).toEqual({
        allowInput: true,
        appendTo: datePicker!.shadowRoot!.getElementById(
          'floating-menu-container'
        )!,
        dateFormat: 'm/d/Y',
        locale: flatpickr.l10ns.default,
        maxDate: undefined,
        minDate: undefined,
        positionElement: datePickerInput!.input,
      });
      expect(loadedPlugins.sort()).toEqual([
        'carbonFlatpickrAppendToPlugin',
        'carbonFlatpickrCSSClassPlugin',
        'carbonFlatpickrFixEventsPlugin',
        'carbonFlatpickrFocusPlugin',
        'carbonFlatpickrIconPlugin',
        'carbonFlatpickrMonthSelectPlugin',
        'carbonFlatpickrShadowDOMEventsPlugin',
        'carbonFlatpickrStateHandshakePlugin',
      ]);
    });

    it('Should support programmatic change of the date', async function () {
      datePicker!.value = '2000-07-15';
      await Promise.resolve();
      expect(
        datePicker!.calendar!.selectedDates.map((item) => item.getTime())
      ).toEqual([new Date(2000, 6, 15).getTime()]);
    });
  });

  describe('Range mode', function () {
    let datePicker: BXDatePicker | null;
    let datePickerInputStart: BXDatePickerInput | null;
    let datePickerInputEnd: BXDatePickerInput | null;

    beforeEach(async function () {
      render(rangeWithCalendarTemplate(), document.body);
      await Promise.resolve();
      datePicker = document.body.querySelector('bx-date-picker');
      datePickerInputStart = document.body.querySelector(
        'bx-date-picker-input[kind="from"]'
      );
      datePickerInputEnd = document.body.querySelector(
        'bx-date-picker-input[kind="to"]'
      );
    });

    it('Should instantiate Flatpickr', async function () {
      const { calendar } = datePicker!;
      expect(calendar).toBeTruthy();
      const { config, loadedPlugins } = datePicker!.calendar!;
      expect(
        pick(config, [
          'allowInput',
          'appendTo',
          'dateFormat',
          'locale',
          'maxDate',
          'minDate',
          'positionElement',
        ])
      ).toEqual({
        allowInput: true,
        appendTo: datePicker!.shadowRoot!.getElementById(
          'floating-menu-container'
        )!,
        dateFormat: 'm/d/Y',
        locale: flatpickr.l10ns.default,
        maxDate: undefined,
        minDate: undefined,
        positionElement: datePickerInputStart!.input,
      });
      expect(loadedPlugins.sort()).toEqual([
        'carbonFlatpickrAppendToPlugin',
        'carbonFlatpickrCSSClassPlugin',
        'carbonFlatpickrFixEventsPlugin',
        'carbonFlatpickrFocusPlugin',
        'carbonFlatpickrIconPlugin',
        'carbonFlatpickrMonthSelectPlugin',
        'carbonFlatpickrShadowDOMEventsPlugin',
        'carbonFlatpickrStateHandshakePlugin',
        'range',
      ]);
    });

    it('Should support programmatic change of the date', async function () {
      datePicker!.value = '2000-07-10/2000-07-20';
      await Promise.resolve();
      expect(
        datePicker!.calendar!.selectedDates.map((item) => item.getTime())
      ).toEqual([
        new Date(2000, 6, 10).getTime(),
        new Date(2000, 6, 20).getTime(),
      ]);
    });

    it('Should support opening calendar dropdown by clicking on calendar icon for the start date', async function () {
      datePickerInputStart!
        .shadowRoot!.querySelector('svg')!
        .dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await Promise.resolve();
      const { calendar } = datePicker!;
      expect(calendar!.isOpen).toBe(true);
    });

    it('Should support opening calendar dropdown by clicking on calendar icon for the end date', async function () {
      datePickerInputEnd!
        .shadowRoot!.querySelector('svg')!
        .dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await Promise.resolve();
      const { calendar } = datePicker!;
      expect(calendar!.isOpen).toBe(true);
    });
  });

  describe('Form validation', function () {
    let elem: Element;

    beforeEach(async function () {
      render(defaultTemplate(), document.body);
      await Promise.resolve();
      elem = document.body.querySelector('bx-date-picker-input')!;
    });

    it('should support checking if required value exists', async function () {
      const input = elem as BXDatePickerInput;
      input.required = true;
      const spyInvalid = jasmine.createSpy('invalid');
      events.on(input, 'invalid', spyInvalid);
      expect(input.checkValidity()).toBe(false);
      expect(spyInvalid).toHaveBeenCalled();
      expect(input.invalid).toBe(true);
      expect(input.validityMessage).toBe('Please fill out this field.');
      input.value = 'value-foo';
      expect(input.checkValidity()).toBe(true);
      expect(input.invalid).toBe(false);
      expect(input.validityMessage).toBe('');
    });

    it('should support canceling required check', async function () {
      const input = elem as BXDatePickerInput;
      input.required = true;
      events.on(input, 'invalid', (event) => {
        event.preventDefault();
      });
      expect(input.checkValidity()).toBe(false);
      expect(input.invalid).toBe(false);
      expect(input.validityMessage).toBe('');
    });

    it('should treat empty custom validity message as not invalid', async function () {
      const input = elem as BXDatePickerInput;
      input.setCustomValidity('');
      expect(input.invalid).toBe(false);
      expect(input.validityMessage).toBe('');
    });

    it('should treat non-empty custom validity message as invalid', async function () {
      const input = elem as BXDatePickerInput;
      input.setCustomValidity('validity-message-foo');
      expect(input.invalid).toBe(true);
      expect(input.validityMessage).toBe('validity-message-foo');
    });
  });

  describe('Event-based form participation', function () {
    it('Should respond to `formdata` event', async function () {
      render(
        html`
          <form>
            ${singleWithCalendarTemplate({
              name: 'name-foo',
              value: '2000-01-01',
            })}
          </form>
        `,
        document.body
      );
      await Promise.resolve();
      const formData = new FormData();
      const event = new CustomEvent('formdata', {
        bubbles: true,
        cancelable: false,
        composed: false,
      });
      (event as any).formData = formData; // TODO: Wait for `FormDataEvent` being available in `lib.dom.d.ts`
      const form = document.querySelector('form');
      form!.dispatchEvent(event);
      expect(getValues(formData)).toEqual({ 'name-foo': '2000-01-01' });
    });

    it('Should not respond to `formdata` event if disabled', async function () {
      render(
        html`
          <form>
            ${singleWithCalendarTemplate({
              disabled: true,
              name: 'name-foo',
              value: '2000-01-01',
            })}
          </form>
        `,
        document.body
      );
      await Promise.resolve();
      const formData = new FormData();
      const event = new CustomEvent('formdata', {
        bubbles: true,
        cancelable: false,
        composed: false,
      });
      (event as any).formData = formData; // TODO: Wait for `FormDataEvent` being available in `lib.dom.d.ts`
      const form = document.querySelector('form');
      form!.dispatchEvent(event);
      expect(getValues(formData)).toEqual({});
    });

    it('Should respond to `formdata` event in range mode', async function () {
      render(
        html`
          <form>
            ${rangeWithCalendarTemplate({
              name: 'name-foo',
              value: '2000-01-01/2000-01-31',
            })}
          </form>
        `,
        document.body
      );
      await Promise.resolve();
      const formData = new FormData();
      const event = new CustomEvent('formdata', {
        bubbles: true,
        cancelable: false,
        composed: false,
      });
      (event as any).formData = formData; // TODO: Wait for `FormDataEvent` being available in `lib.dom.d.ts`
      const form = document.querySelector('form');
      form!.dispatchEvent(event);
      expect(getValues(formData)).toEqual({
        'name-foo': '2000-01-01/2000-01-31',
      });
    });
  });

  afterEach(async function () {
    events.reset();
    await render(undefined!, document.body);
  });
});
