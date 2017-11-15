import React from 'react';
import DangerButton from '../DangerButton';
import { shallow, mount } from 'enzyme';

describe('DangerButton', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <DangerButton small className="extra-class">
        <div className="child">Test</div>
        <div className="child">Test</div>
      </DangerButton>
    );

    it('Renders children as expected', () => {
      expect(wrapper.find('.child').length).toBe(2);
      expect(wrapper.find('svg').length).toBe(0);
    });
    it('Renders wrapper as expected', () => {
      expect(wrapper.length).toBe(1);
    });
    it('Has kind="danger"', () => {
      expect(wrapper.props().kind).toEqual('danger');
    });
    it('Has small property', () => {
      expect(wrapper.props().small).toEqual(true);
    });
    it('Should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });

    describe('Renders icon buttons', () => {
      const iconButton = mount(
        <DangerButton icon="search" iconDescription="Search">
          Search
        </DangerButton>
      );
      const icon = iconButton.find('svg');
      it('should have the appropriate icon', () => {
        expect(icon.hasClass('bx--btn__icon')).toBe(true);
      });
    });
  });
});
