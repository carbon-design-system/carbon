import React from 'react';
import OverflowMenuItem from '../OverflowMenuItem';
import { shallow } from 'enzyme';

const shallowRender = props => shallow(<OverflowMenuItem {...props} />);

describe('OverflowMenuItem', () => {
  describe('Renders as expected', () => {
    it('should render a button and text as expected', () => {
      const wrapper = shallowRender({
        itemText: 'testing',
        onSelect() {},
      });

      const button = wrapper.find('button');

      expect(button.length).toEqual(1);
      expect(button.text()).toEqual('testing');
      expect(wrapper.type()).toEqual('li');
    });

    it('should have the correct classes', () => {
      const wrapper = shallowRender({
        itemText: 'testing',
        onSelect() {},
      });

      const button = wrapper.find('button');
      expect(button.hasClass('bx--overflow-menu-options__btn')).toEqual(true);
    });

    it('should have the correct class when hasDivider is true', () => {
      const wrapper = shallowRender({
        itemText: 'testing',
        onSelect() {},
        hasDivider: true,
      });

      expect(wrapper.hasClass('bx--overflow-menu--divider')).toEqual(true);
    });
  });
});
