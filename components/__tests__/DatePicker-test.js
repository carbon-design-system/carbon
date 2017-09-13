import React from 'react';
import DatePicker from '../DatePicker';
import { mount } from 'enzyme';

describe('DatePicker', () => {
  describe('Renders as expected', () => {
    const wrapper = mount(
      <DatePicker onChange={() => {}} className="extra-class">
        <div className="test-child"></div>
        <div className="test-child"></div>
      </DatePicker>
    );
    const datepicker = wrapper.childAt(0);

    it('has the expected classes', () => {
      expect(datepicker.hasClass('bx--date-picker')).toBe(true);
    });

    it('should add extra classes that are passed via className', () => {
      expect(datepicker.hasClass('extra-class')).toBe(true);
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

    it('should add the date format as expected', () => {
      expect(wrapper.props().dateFormat).toEqual('m/d/Y');
      wrapper.setProps({ dateFormat: 'd/m/Y' });
      expect(wrapper.props().dateFormat).toEqual('d/m/Y');
    });

    it('should render the children as expected', () => {
      expect(wrapper.props().children.length).toEqual(2);
    });
  });

  describe('Simple date picker', () => {
    const wrapper = mount(
      <DatePicker datePickerType="simple" className="extra-class">
        <div className="test-child"></div>
      </DatePicker>
    );
    const datepicker = wrapper.childAt(0);

    it('has the simple date picker class', () => {
      expect(datepicker.hasClass('bx--date-picker--simple')).toBe(true);
    });

    it('should not initalize a calendar', () => {
      expect(wrapper.cal).toEqual(undefined);
    });
  });

  describe('Single date picker', () => {
    const wrapper = mount(
      <DatePicker onChange={() => {}} datePickerType="single" className="extra-class">
        <div className="test-child">
          <input type="text" className="bx--date-picker__input" />
        </div>
      </DatePicker>
    );
    const datepicker = wrapper.childAt(0);
    const input = wrapper.find('.bx--date-picker__input');
    const icon = wrapper.find('svg');

    it('has the single date picker class', () => {
      expect(datepicker.hasClass('bx--date-picker--single')).toBe(true);
    });

    it('should initalize a calendar', () => {
      expect(wrapper.node.cal).toBeDefined();
    });

    it('should update the classnames', () => {
      expect(wrapper.node.cal.calendarContainer.classList.contains('bx--date-picker__calendar')).toBe(true);
    });

    it('should not render an icon', () => {
      expect(icon.length).toEqual(0);
    });
  });

  describe('Range date picker', () => {
    const wrapper = mount(
      <DatePicker onChange={() => {}} datePickerType="range" className="extra-class">
        <div className="test-child">
          <input type="text" className="bx--date-picker__input" id="input-from" />
        </div>
        <div className="test-child">
          <input type="text" className="bx--date-picker__input" id="input-to" />
        </div>
      </DatePicker>
    );
    const datepicker = wrapper.childAt(0);
    const icon = wrapper.find('svg');

    it('has the range date picker class', () => {
      expect(datepicker.hasClass('bx--date-picker--range')).toBe(true);
    });

    it('should initalize a calendar', () => {
      expect(wrapper.node.cal).toBeDefined();
    });

    it('should update the classnames', () => {
      expect(wrapper.node.cal.calendarContainer.classList.contains('bx--date-picker__calendar')).toBe(true);
    });

    it('should render an icon', () => {
      expect(icon.length).toEqual(1);
    });
  });
});
