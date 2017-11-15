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
    it('Has the expected kind set to "primary"', () => {
      expect(wrapper.props().kind).toEqual('primary');
    });
    it('Has the expected small property set to true', () => {
      expect(wrapper.props().small).toEqual(true);
    });
    it('Should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });

    describe('Renders icon buttons', () => {
      const iconButton = mount(
        <PrimaryButton icon="search" iconDescription="Search">
          Search
        </PrimaryButton>
      );
      const icon = iconButton.find('svg');
      it('should have the appropriate icon', () => {
        expect(icon.hasClass('bx--btn__icon')).toBe(true);
      });
    });
  });
});
