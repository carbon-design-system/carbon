/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import DatePicker from './DatePicker';
import { mount } from 'enzyme';
import DatePickerInput from '../../DatePickerInput/next/DatePickerInput';

const prefix = 'bx';

function getFlatpickrCalendar() {
  return document.querySelector(`.${prefix}--date-picker__calendar`);
}

describe('DatePicker', () => {
  describe('Renders as expected', () => {
    let wrapper;
    let datepicker;

    beforeEach(() => {
      wrapper = mount(
        <DatePicker
          onChange={() => {}}
          className="extra-class"
          dateFormat="m/d/Y">
          <DatePickerInput
            id="date-picker-input-id-start"
            placeholder="mm/dd/yyyy"
            labelText="Start date"
          />
          <DatePickerInput
            id="date-picker-input-id-finish"
            placeholder="mm/dd/yyyy"
            labelText="End date"
          />
        </DatePicker>
      );
      datepicker = wrapper.childAt(0);
    });

    it('should add extra classes that are passed via className', () => {
      expect(datepicker.hasClass('extra-class')).toBe(true);
    });

    it('should add the date picker type as expected', () => {
      expect(wrapper.props().datePickerType).toEqual(undefined);
      wrapper.setProps({ datePickerType: 'simple' });
      expect(wrapper.props().datePickerType).toEqual('simple');
    });

    it('should add the date format as expected', () => {
      expect(wrapper.props().dateFormat).toEqual('m/d/Y');
      wrapper.setProps({ dateFormat: 'd/m/Y' });
      expect(wrapper.props().dateFormat).toEqual('d/m/Y');
    });

    it('has the value as expected', () => {
      expect(wrapper.props().value).toEqual(undefined);
      wrapper.setProps({ value: '11/08/2017' });
      expect(wrapper.props().value).toEqual('11/08/2017');
    });

    it('should render the children as expected', () => {
      expect(wrapper.props().children.length).toEqual(2);
    });
  });

  describe('Simple date picker', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <DatePicker datePickerType="simple" className="extra-class">
          <DatePickerInput
            placeholder="mm/dd/yyyy"
            labelText="Date Picker label"
            id="date-picker-single"
          />
        </DatePicker>
      );
    });

    it('has the value as expected', () => {
      expect(wrapper.props().value).toEqual(undefined);
      wrapper.setProps({ value: '11/08/2017' });
      expect(wrapper.props().value).toEqual('11/08/2017');
    });

    it('should not initialize a calendar', () => {
      expect(getFlatpickrCalendar()).not.toBeInTheDocument();
    });
  });

  describe('Single date picker', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(
        <DatePicker
          onChange={() => {}}
          datePickerType="single"
          className="extra-class">
          <DatePickerInput
            placeholder="mm/dd/yyyy"
            labelText="Date Picker label"
            id="date-picker-single"
          />
        </DatePicker>
      );
    });

    it('should initialize a calendar', () => {
      expect(getFlatpickrCalendar()).toBeInTheDocument();
    });

    it('should update the classnames', () => {
      expect(
        getFlatpickrCalendar().classList.contains(
          `${prefix}--date-picker__calendar`
        )
      ).toBe(true);
    });

    it('has the value as expected', () => {
      expect(wrapper.props().value).toEqual(undefined);
      wrapper.setProps({ value: '11/08/2017' });
      expect(wrapper.props().value).toEqual('11/08/2017');
    });
  });

  describe('Date picker with locale', () => {
    let wrapper;
    let wrapperNoLocale;
    beforeEach(() => {
      wrapper = mount(
        <DatePicker
          onChange={() => {}}
          datePickerType="range"
          className="extra-class"
          locale="es">
          <DatePickerInput
            id="date-picker-input-id-start"
            placeholder="mm/dd/yyyy"
            labelText="Start date"
          />
          <DatePickerInput
            id="date-picker-input-id-finish"
            placeholder="mm/dd/yyyy"
            labelText="End date"
          />
        </DatePicker>
      );

      wrapperNoLocale = mount(
        <DatePicker
          onChange={() => {}}
          datePickerType="range"
          className="extra-class">
          <DatePickerInput
            id="date-picker-input-id-start"
            placeholder="mm/dd/yyyy"
            labelText="Start date"
          />
          <DatePickerInput
            id="date-picker-input-id-finish"
            placeholder="mm/dd/yyyy"
            labelText="End date"
          />
        </DatePicker>
      );
    });

    it('has the range date picker locale', () => {
      const datepicker = wrapper.find('DatePicker');
      expect(datepicker.props().locale).toBe('es');
    });

    it('has the range date picker without locale defined', () => {
      const datepicker = wrapperNoLocale.find('DatePicker');
      expect(datepicker.props().locale).toBe(undefined);
    });
  });

  describe('Date picker with minDate and maxDate', () => {
    let mockConsoleError;
    let wrapper;

    beforeEach(() => {
      mockConsoleError = jest.spyOn(console, 'error');
      wrapper = mount(
        <DatePicker
          onChange={() => {}}
          datePickerType="range"
          className="extra-class"
          minDate="01/01/2018"
          maxDate="01/30/2018">
          <DatePickerInput
            id="date-picker-input-id-start"
            placeholder="mm/dd/yyyy"
            labelText="Start date"
          />
          <DatePickerInput
            id="date-picker-input-id-finish"
            placeholder="mm/dd/yyyy"
            labelText="End date"
          />
        </DatePicker>
      );
    });

    afterEach(() => {
      mockConsoleError.mockRestore();
    });

    it('has the range date picker with min and max dates', () => {
      const datepicker = wrapper.find('DatePicker');
      expect(datepicker.props().minDate).toBe('01/01/2018');
      expect(datepicker.props().maxDate).toBe('01/30/2018');
    });

    it('should not have "console.error" being created', () => {
      expect(mockConsoleError).not.toHaveBeenCalled();
    });
  });
});
