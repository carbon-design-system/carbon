import React from 'react';
import PrimaryButton from '../PrimaryButton';
import { shallow } from 'enzyme';

describe('PrimaryButton', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <PrimaryButton className="extra-class">
        <div className="child">Test</div>
        <div className="child">Test</div>
      </PrimaryButton>
    );

    it('Renders children as expected', () => {
      expect(wrapper.find('.child').length).toBe(2);
    });

    it('Has the expected classes', () => {
      expect(wrapper.hasClass('bx--btn')).toEqual(true);
    });

    it('Should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });
  });
});
