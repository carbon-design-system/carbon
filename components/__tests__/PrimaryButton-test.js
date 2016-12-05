import React from 'react';
import PrimaryButton from '../PrimaryButton';
import { shallow, mount } from 'enzyme';

describe('PrimaryButton', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <PrimaryButton small className="extra-class">
        <div className="child">Test</div>
        <div className="child">Test</div>
      </PrimaryButton>
    );

    it('Renders children as expected', () => {
      expect(wrapper.find('.child').length).toBe(2);
      expect(wrapper.find('svg').length).toBe(0);
    });
    it('Renders wrapper as expected', () => {
      expect(wrapper.length).toBe(1);
    });
    it('Has the expected classes', () => {
      expect(wrapper.hasClass('bx--btn')).toEqual(true);
    });
    it('Has the expected classes for small', () => {
      expect(wrapper.hasClass('bx--btn--sm')).toEqual(true);
    });
    it('Should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });

    describe('Renders icon buttons', () => {
      const iconButton = mount(<PrimaryButton icon="search" iconDescription="Search">Search</PrimaryButton>);
      const icon = iconButton.find('svg');
      it('should have the appropriate icon', () => {
        expect(icon.hasClass('bx--btn--right-icon__icon')).toBe(true);
        expect(icon.hasClass('bx--btn--right-icon__use')).toBe(true);
      });
    });
  });
});
