import React from 'react';
import InteriorLeftNavItem from '../InteriorLeftNavItem';
import { shallow, mount } from 'enzyme';

describe('InteriorLeftNavItem', () => {
  describe('Renders as expected', () => {
    const wrapper = mount(
      <InteriorLeftNavItem
        className="extra-class"
        href="test-href"
        activeHref="test-href">
        <a href="test-href">link</a>
      </InteriorLeftNavItem>
    );
    const wrapperNoChild = mount(
      <InteriorLeftNavItem
        className="extra-class"
        href="test-href"
        activeHref="test-href"
      />
    );

    it('renders a interior left nav item', () => {
      expect(wrapper.length).toEqual(1);
    });

    it('has the expected classes', () => {
      expect(wrapper.children().hasClass('left-nav-list__item')).toEqual(true);
    });

    it('should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });

    it('should contain a default label', () => {
      expect(wrapper.find('a').text()).toEqual('link');
    });

    it('should contain an href', () => {
      expect(wrapper.find('a').props().href).toEqual(wrapper.props().href);
    });

    it('should add active class to item when activeHref is matched', () => {
      expect(
        wrapper.children().hasClass('left-nav-list__item--active')
      ).toEqual(true);
    });

    it('has an anchor with the expected class', () => {
      expect(wrapper.find('a').hasClass('left-nav-list__item-link')).toEqual(
        true
      );
    });

    it('can render without a child ', () => {
      expect(wrapperNoChild.length).toEqual(1);
    });

    it('has an anchor that matches label when no child is given', () => {
      expect(wrapperNoChild.find('a').text()).toEqual(
        wrapperNoChild.props().label
      );
    });
  });

  describe('actions', () => {
    const onClick = jest.fn();

    const wrapper = shallow(
      <InteriorLeftNavItem onClick={onClick} href="">
        <a href="http://www.carbondesignsystem.com">test-title</a>
      </InteriorLeftNavItem>
    );

    it('handles click to leftNavList as expected', () => {
      wrapper.simulate('click');
      expect(onClick).toBeCalled();
    });

    it('should toggle the leftNavList on Enter', () => {
      wrapper.simulate('keypress', { which: 13 });
      expect(onClick).toBeCalled();
    });

    it('should toggle the leftNavList on Space', () => {
      wrapper.simulate('keypress', { which: 32 });
      expect(onClick).toBeCalled();
    });
  });
});
