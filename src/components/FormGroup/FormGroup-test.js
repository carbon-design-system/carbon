import React from 'react';
import FormGroup from '../FormGroup';
import { shallow } from 'enzyme';

describe('FormGroup', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <FormGroup className="extra-class" legendText="legendtest" />
    );

    it('renders children as expected', () => {
      expect(wrapper.find('.child').length).toBe(0);
    });
    it('renders wrapper as expected', () => {
      expect(wrapper.length).toBe(1);
    });
    it('has the expected classes', () => {
      expect(wrapper.hasClass('bx--fieldset')).toEqual(true);
    });
    it('renders extra classes passed in via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });
    it('should not render the data-invalid property by default', () => {
      expect(wrapper.props()['data-invalid']).toBe(undefined);
    });
    it('should render the data-invalid attribute when invalid is set', () => {
      const formgroup = shallow(<FormGroup legendText="legendtest" invalid />);
      expect(formgroup.props()['data-invalid']).toBe('');
    });
    it('should render wrapper as expected', () => {
      const formGroup = shallow(
        <FormGroup legendText="legendtest">
          <div className="test-child1" />
          <div className="test-child2" />
        </FormGroup>
      );
      expect(formGroup.length).toEqual(1);
    });
    it('should render children as expected', () => {
      const formGroup1 = shallow(
        <FormGroup legendText="legendtest">
          <div className="test-child" />
          <div className="test-child" />
        </FormGroup>
      );
      expect(formGroup1.find('.test-child').length).toBe(2);
    });
  });
});
