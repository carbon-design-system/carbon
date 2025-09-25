/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit';
import pick from 'lodash-es/pick';
import flatpickr from 'flatpickr';
import EventManager from '../utils/event-manager';

import CDSDatePicker from '../../src/components/date-picker/date-picker';
import CDSDatePickerInput from '../../src/components/date-picker/date-picker-input';
import {
  Playground,
  singleWithCalendar,
  rangeWithCalendar,
} from '../../src/components/date-picker/date-picker-story';

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
const defaultTemplate = (props?: any) => {
  const {
    disabled,
    invalid,
    name,
    value,
    placeholder,
    size,
    short,
    invalidText,
  } = props ?? {};
  return Playground({
    'cds-date-picker': { disabled, name, value },
    'cds-date-picker-input': {
      invalid,
      placeholder,
      size,
      short,
      invalidText,
    },
  });
};

const singleWithCalendarTemplate = () => {
  return singleWithCalendar();
};

const rangeWithCalendarTemplate = () => {
  return rangeWithCalendar();
};

/**
 * @param formData A `FormData` instance.
 * @returns The given `formData` converted to a classic key-value pair.
 */
const getValues = (formData: FormData) => {
  const values = {};

  for (const [key, value] of formData.entries()) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
    values[key as any] = value;
  }
  return values;
};

describe('cds-date-picker', () => {
  const events = new EventManager();

  describe('Simple mode', () => {
    let datePicker: CDSDatePicker | null;

    beforeEach(async () => {
      render(defaultTemplate(), document.body);
      await Promise.resolve();
      datePicker = document.body.querySelector('cds-date-picker');
    });

    xit('Should not instantiate Flatpickr', async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      const { calendar } = datePicker!;
      expect(calendar).toBeFalsy();
    });
  });

  describe('Single mode', () => {
    let datePicker: CDSDatePicker | null;
    let datePickerInput: CDSDatePickerInput | null;

    beforeEach(async () => {
      render(singleWithCalendarTemplate(), document.body);
      await Promise.resolve();
      datePicker = document.body.querySelector('cds-date-picker');
      datePickerInput = document.body.querySelector('cds-date-picker-input');
    });

    it('Should instantiate Flatpickr', async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      const { calendar } = datePicker!;
      expect(calendar).toBeTruthy();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        appendTo: datePicker!.shadowRoot!.getElementById(
          'floating-menu-container'
        )!,
        dateFormat: 'm/d/Y',
        locale: flatpickr.l10ns.default,
        maxDate: undefined,
        minDate: undefined,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
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

    it('Should support programmatic change of the date', async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      datePicker!.value = '2000-07-15';
      await Promise.resolve();
      expect(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        datePicker!.calendar!.selectedDates.map((item) => item.getTime())
      ).toEqual([new Date(2000, 6, 15).getTime()]);
    });
  });

  describe('Range mode', () => {
    let datePicker: CDSDatePicker | null;
    let datePickerInputStart: CDSDatePickerInput | null;
    let datePickerInputEnd: CDSDatePickerInput | null;

    beforeEach(async () => {
      render(rangeWithCalendarTemplate(), document.body);
      await Promise.resolve();
      datePicker = document.body.querySelector('cds-date-picker');
      datePickerInputStart = document.body.querySelector(
        'cds-date-picker-input[kind="from"]'
      );
      datePickerInputEnd = document.body.querySelector(
        'cds-date-picker-input[kind="to"]'
      );
    });

    it('Should instantiate Flatpickr', async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      const { calendar } = datePicker!;
      expect(calendar).toBeTruthy();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        appendTo: datePicker!.shadowRoot!.getElementById(
          'floating-menu-container'
        )!,
        dateFormat: 'm/d/Y',
        locale: flatpickr.l10ns.default,
        maxDate: undefined,
        minDate: undefined,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https-github.com/carbon-design-system/carbon/issues/20071
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

    it('Should support programmatic change of the date', async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      datePicker!.value = '2000-07-10/2000-07-20';
      await Promise.resolve();
      expect(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
        datePicker!.calendar!.selectedDates.map((item) => item.getTime())
      ).toEqual([
        new Date(2000, 6, 10).getTime(),
        new Date(2000, 6, 20).getTime(),
      ]);
    });

    xit('Should support opening calendar dropdown by clicking on calendar icon for the start date', async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      datePickerInputStart!
        .shadowRoot!.querySelector('svg')!
        .dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      const { calendar } = datePicker!;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      expect(calendar!.isOpen).toBe(true);
    });

    xit('Should support opening calendar dropdown by clicking on calendar icon for the end date', async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      datePickerInputEnd!
        .shadowRoot!.querySelector('svg')!
        .dispatchEvent(new CustomEvent('click', { bubbles: true }));
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      const { calendar } = datePicker!;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      expect(calendar!.isOpen).toBe(true);
    });
  });

  describe('Form validation', () => {
    let elem: Element;

    beforeEach(async () => {
      render(defaultTemplate(), document.body);
      await Promise.resolve();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      elem = document.body.querySelector('cds-date-picker-input')!;
    });

    xit('should support checking if required value exists', async () => {
      const input = elem as CDSDatePickerInput;
      input.required = true;
      const spyInvalid = jasmine.createSpy('invalid');
      events.on(input, 'invalid', spyInvalid);
      expect(input.invalid).toBe(false);
      expect(spyInvalid).toHaveBeenCalled();
      expect(input.invalid).toBe(true);
      expect(input.invalidText).toBe('Please fill out this field.');
      input.value = 'value-foo';
      expect(input.invalid).toBe(true);
      expect(input.invalid).toBe(false);
      expect(input.invalidText).toBe('');
    });

    it('should support canceling required check', async () => {
      const input = elem as CDSDatePickerInput;
      input.required = true;
      events.on(input, 'invalid', (event) => {
        event.preventDefault();
      });
      expect(input.invalid).toBe(false);
      expect(input.invalid).toBe(false);
      expect(input.invalidText).toBe('');
    });

    it('should treat empty custom validity message as not invalid', async () => {
      const input = elem as CDSDatePickerInput;
      input.invalidText = '';
      expect(input.invalid).toBe(false);
      expect(input.invalidText).toBe('');
    });

    xit('should treat non-empty custom validity message as invalid', async () => {
      const input = elem as CDSDatePickerInput;
      input.invalidText = 'validity-message-foo';
      expect(input.invalid).toBe(true);
      expect(input.invalidText).toBe('validity-message-foo');
    });
  });

  describe('Event-based form participation', () => {
    xit('Should respond to `formdata` event', async () => {
      render(
        html` <form>${singleWithCalendarTemplate()}</form> `,
        document.body
      );
      await Promise.resolve();
      const formData = new FormData();
      const event = new CustomEvent('formdata', {
        bubbles: true,
        cancelable: false,
        composed: false,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
      (event as any).formData = formData; // TODO: Wait for `FormDataEvent` being available in `lib.dom.d.ts`
      const form = document.querySelector('form');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      form!.dispatchEvent(event);
      expect(getValues(formData)).toEqual({ 'name-foo': '2000-01-01' });
    });

    xit('Should not respond to `formdata` event if disabled', async () => {
      render(
        html` <form>${singleWithCalendarTemplate()}</form> `,
        document.body
      );
      await Promise.resolve();
      const formData = new FormData();
      const event = new CustomEvent('formdata', {
        bubbles: true,
        cancelable: false,
        composed: false,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
      (event as any).formData = formData; // TODO: Wait for `FormDataEvent` being available in `lib.dom.d.ts`
      const form = document.querySelector('form');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https-github.com/carbon-design-system/carbon/issues/20071
      form!.dispatchEvent(event);
      expect(getValues(formData)).toEqual({});
    });

    xit('Should respond to `formdata` event in range mode', async () => {
      render(
        html` <form>${rangeWithCalendarTemplate()}</form> `,
        document.body
      );
      await Promise.resolve();
      const formData = new FormData();
      const event = new CustomEvent('formdata', {
        bubbles: true,
        cancelable: false,
        composed: false,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20071
      (event as any).formData = formData; // TODO: Wait for `FormDataEvent` being available in `lib.dom.d.ts`
      const form = document.querySelector('form');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      form!.dispatchEvent(event);
      expect(getValues(formData)).toEqual({
        'name-foo': '2000-01-01/2000-01-31',
      });
    });
  });

  afterEach(async () => {
    events.reset();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
    await render(undefined!, document.body);
  });
});
