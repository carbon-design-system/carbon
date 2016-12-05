import React from 'react';
import SecondaryButton from '../SecondaryButton';
import { shallow, mount } from 'enzyme';

describe('SecondaryButton', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <SecondaryButton className="extra-class">
        <div className="child">Test</div>
        <div className="child">Test</div>
      </SecondaryButton>
    );

    it('Renders children as expected', () => {
      expect(wrapper.find('.child').length).toBe(2);
      expect(wrapper.find('svg').length).toBe(0);
    });

    it('Has the expected classes', () => {
      expect(wrapper.hasClass('bx--btn--secondary')).toEqual(true);
    });

    it('Should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });

    describe('Renders icon buttons', () => {
      const iconButton = mount(<SecondaryButton icon="search" iconDescription="Search">Search</SecondaryButton>);
      const icon = iconButton.find('svg');
      it('should have the appropriate icon', () => {
        expect(icon.hasClass('bx--btn--right-icon__icon')).toBe(true);
        expect(icon.hasClass('bx--btn--right-icon__use')).toBe(true);
      });
    });
  });
});
