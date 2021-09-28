/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import DatePicker from '../DatePicker';
import DatePickerSkeleton from '../DatePicker/DatePicker.Skeleton';
import { mount, shallow } from 'enzyme';
import DatePickerInput from '../DatePickerInput/DatePickerInput';

const prefix = 'bx';

describe('DatePicker', () => {
  describe('Renders as expected', () => {
    const wrapper = mount(
      <DatePicker onChange={() => {}} className="extra-class">
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
    const datepicker = wrapper.childAt(0);

    it('has the expected classes', () => {
      expect(datepicker.children().hasClass(`${prefix}--date-picker`)).toBe(
        true
      );
    });

    it('should add extra classes that are passed via className', () => {
      expect(datepicker.children().hasClass('extra-class')).toBe(true);
    });

    it('should add the date picker type as expected', () => {
      expect(wrapper.props().datePickerType).toEqual(undefined);
      wrapper.setProps({ datePickerType: 'simple' });
      expect(wrapper.props().datePickerType).toEqual('simple');
    });

    it('should specify short date picker as expected', () => {
      expect(wrapper.props().short).toEqual(false);
      wrapper.setProps({ short: true });
      expect(wrapper.props().short).toEqual(true);
    });

    it('should specify light date picker as expected', () => {
      expect(wrapper.props().light).toEqual(false);
      wrapper.setProps({ light: true });
      expect(wrapper.props().light).toEqual(true);
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
    const wrapper = mount(
      <DatePicker datePickerType="simple" className="extra-class">
        <DatePickerInput
          placeholder="mm/dd/yyyy"
          labelText="Date Picker label"
          id="date-picker-single"
        />
      </DatePicker>
    );
    const datepicker = wrapper.childAt(0);

    it('has the simple date picker class', () => {
      expect(
        datepicker.children().hasClass(`${prefix}--date-picker--simple`)
      ).toBe(true);
    });

    it('has the value as expected', () => {
      expect(wrapper.props().value).toEqual(undefined);
      wrapper.setProps({ value: '11/08/2017' });
      expect(wrapper.props().value).toEqual('11/08/2017');
    });

    it('should not initialize a calendar', () => {
      expect(wrapper.cal).toEqual(undefined);
    });
  });

  describe('Single date picker', () => {
    const wrapper = mount(
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
    const datepicker = wrapper.childAt(0);

    it('has the single date picker class', () => {
      expect(
        datepicker.children().hasClass(`${prefix}--date-picker--single`)
      ).toBe(true);
    });

    it('should initialize a calendar', () => {
      expect(wrapper.instance().cal).toBeDefined();
    });

    it('should update the classnames', () => {
      expect(
        wrapper
          .instance()
          .cal.calendarContainer.classList.contains(
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

  describe('Single date picker with initial value', () => {
    const wrapper = mount(
      <DatePicker
        datePickerType="single"
        dateFormat="m/d/Y"
        value={'02/26/2017'}
        appendTo={document.body.firstChild}
        onChange={() => {}}>
        <DatePickerInput
          key="label"
          labelText="Controlled Date"
          id="date-picker-input-id"
        />
      </DatePicker>
    );

    it('has the value as expected', () => {
      // MOUNT
      expect(wrapper.props().value).toEqual('02/26/2017');

      // UPDATE
      wrapper.setProps({ value: '02/17/2017' });
      expect(wrapper.props().value).toEqual('02/17/2017');
    });

    it('sends appendTo to Flatpickr', () => {
      expect(wrapper.instance().cal.config.appendTo).toBe(
        document.body.firstChild
      );
    });
  });

  describe('Range date picker', () => {
    const wrapper = mount(
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
    const datepicker = wrapper.childAt(0);

    it('has the range date picker class', () => {
      expect(
        datepicker.children().hasClass(`${prefix}--date-picker--range`)
      ).toBe(true);
    });

    it('should initialize a calendar', () => {
      expect(wrapper.instance().cal).toBeDefined();
    });

    it('should update the classnames', () => {
      expect(
        wrapper
          .instance()
          .cal.calendarContainer.classList.contains(
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
    const wrapper = mount(
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

    const wrapperNoLocale = mount(
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

    it('has the range date picker locale', () => {
      const datepicker = wrapper.find('DatePicker');
      expect(datepicker.props().locale).toBe('es');
    });

    it('has the range date picker without locale defined', () => {
      const datepicker = wrapperNoLocale.find('DatePicker');
      expect(datepicker.props().locale).toBe('en');
    });
  });

  describe('Date picker can be used with enzyme shallow', () => {
    let spy;

    beforeEach(() => {
      spy = {};
      spy.console = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      spy.console.mockRestore();
    });

    it('date picker should not throw exception when mounted or unmounted', () => {
      const wrapper = shallow(
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
      expect(wrapper.find('DatePicker')).toBeDefined();
      wrapper.unmount();
    });
  });

  describe('Date picker with minDate and maxDate', () => {
    let mockConsoleError;

    beforeEach(() => {
      mockConsoleError = jest.spyOn(console, 'error');
    });

    afterEach(() => {
      mockConsoleError.mockRestore();
    });

    const wrapper = mount(
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

describe('DatePickerInput', () => {
  it('should call `openCalendar` on calendar icon click', () => {
    const mockOpenCalendar = jest.fn();
    const wrapper = mount(
      <DatePickerInput
        labelText="Date Picker label"
        id="input-from"
        openCalendar={mockOpenCalendar}
      />
    );
    wrapper.find('svg').simulate('click');
    expect(mockOpenCalendar).toHaveBeenCalled();
  });
});

describe('DatePickerSkeleton', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(<DatePickerSkeleton range />);

    it('Has the expected classes', () => {
      expect(wrapper.children().hasClass(`${prefix}--skeleton`)).toEqual(true);
      expect(wrapper.children().hasClass(`${prefix}--date-picker`)).toEqual(
        true
      );
      expect(
        wrapper.children().hasClass(`${prefix}--date-picker--range`)
      ).toEqual(true);
    });
  });
});

describe('Opening up calendar dropdown', () => {
  const wrapper = mount(
    <DatePicker datePickerType="range" className="extra-class">
      <DatePickerInput labelText="Date Picker label" id="input-from" />
      <DatePickerInput labelText="Date Picker label" id="input-to" />
    </DatePicker>
  );

  it('has the range date picker with min and max dates', () => {
    const datePicker = wrapper.instance();
    const input = wrapper.find('input').at(0);

    jest.spyOn(datePicker.cal, 'open');

    input
      .getDOMNode()
      .dispatchEvent(new window.KeyboardEvent('keydown', { key: 'ArrowDown' }));

    expect(datePicker.cal.open).toHaveBeenCalled();
  });
});
