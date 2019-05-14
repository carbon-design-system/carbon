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
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('DatePicker', () => {
  describe('Renders as expected', () => {
    const wrapper = mount(
      <DatePicker onChange={() => {}} className="extra-class">
        <div className="test-child" />
        <div className="test-child" />
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
        <div className="test-child" />
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

    it('should not initalize a calendar', () => {
      expect(wrapper.cal).toEqual(undefined);
    });
  });

  describe('Single date picker', () => {
    const wrapper = mount(
      <DatePicker
        onChange={() => {}}
        datePickerType="single"
        className="extra-class">
        <div className="test-child">
          <input type="text" className={`${prefix}--date-picker__input`} />
        </div>
      </DatePicker>
    );
    const datepicker = wrapper.childAt(0);
    const input = wrapper.find(`.${prefix}--date-picker__input`);
    const icon = wrapper.find('svg');

    it('has the single date picker class', () => {
      expect(
        datepicker.children().hasClass(`${prefix}--date-picker--single`)
      ).toBe(true);
    });

    it('should initalize a calendar', () => {
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

    it('should not render an icon', () => {
      expect(icon.length).toEqual(0);
    });
  });

  describe('Single date picker with initial value', () => {
    const wrapper = mount(
      <DatePicker
        datePickerType="single"
        dateFormat="m/d/Y"
        value={'02/26/2017'}
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
  });

  describe('Range date picker', () => {
    const wrapper = mount(
      <DatePicker
        onChange={() => {}}
        datePickerType="range"
        className="extra-class">
        <div className="test-child">
          <input
            type="text"
            className={`${prefix}--date-picker__input`}
            id="input-from"
          />
        </div>
        <div className="test-child">
          <input
            type="text"
            className={`${prefix}--date-picker__input`}
            id="input-to"
          />
        </div>
      </DatePicker>
    );
    const datepicker = wrapper.childAt(0);

    it('has the range date picker class', () => {
      expect(
        datepicker.children().hasClass(`${prefix}--date-picker--range`)
      ).toBe(true);
    });

    it('should initalize a calendar', () => {
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
        <div className="test-child">
          <input
            type="text"
            className={`${prefix}--date-picker__input`}
            id="input-from"
          />
        </div>
        <div className="test-child">
          <input
            type="text"
            className={`${prefix}--date-picker__input`}
            id="input-to"
          />
        </div>
      </DatePicker>
    );

    const wrapperNoLocale = mount(
      <DatePicker
        onChange={() => {}}
        datePickerType="range"
        className="extra-class">
        <div className="test-child">
          <input
            type="text"
            className={`${prefix}--date-picker__input`}
            id="input-from"
          />
        </div>
        <div className="test-child">
          <input
            type="text"
            className={`${prefix}--date-picker__input`}
            id="input-to"
          />
        </div>
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
    beforeEach(done => {
      const spy = {};
      spy.console = jest.spyOn(console, 'error').mockImplementation(e => {
        done.fail(e);
      });
      done();
    });

    it('date picker should not throw exception when mounted or unmounted', () => {
      const wrapper = shallow(
        <DatePicker
          onChange={() => {}}
          datePickerType="range"
          className="extra-class"
          locale="es">
          <div className="test-child">
            <input
              type="text"
              className={`${prefix}--date-picker__input`}
              id="input-from"
            />
          </div>
          <div className="test-child">
            <input
              type="text"
              className={`${prefix}--date-picker__input`}
              id="input-to"
            />
          </div>
        </DatePicker>
      );
      expect(wrapper.find('DatePicker')).toBeDefined();
      wrapper.unmount();
    });
  });

  describe('Date picker with minDate and maxDate', () => {
    console.error = jest.fn(); // eslint-disable-line no-console

    const wrapper = mount(
      <DatePicker
        onChange={() => {}}
        datePickerType="range"
        className="extra-class"
        minDate="01/01/2018"
        maxDate="01/30/2018">
        <div className="test-child">
          <input
            type="text"
            className={`${prefix}--date-picker__input`}
            id="input-from"
          />
        </div>
        <div className="test-child">
          <input
            type="text"
            className={`${prefix}--date-picker__input`}
            id="input-to"
          />
        </div>
      </DatePicker>
    );

    it('has the range date picker with min and max dates', () => {
      const datepicker = wrapper.find('DatePicker');
      expect(datepicker.props().minDate).toBe('01/01/2018');
      expect(datepicker.props().maxDate).toBe('01/30/2018');
    });

    it('should not have "console.error" being created', () => {
      expect(console.error).not.toBeCalled(); // eslint-disable-line no-console
    });
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
