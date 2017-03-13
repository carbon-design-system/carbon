import React from 'react';
import InteriorLeftNavItem from '../InteriorLeftNavItem';
import { shallow } from 'enzyme';

describe('InteriorLeftNavItem', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <InteriorLeftNavItem
        className="extra-class"
        href="test-href"
      >
        <a href="test-href" >test-title</a>
      </InteriorLeftNavItem>
    );
    const matchingHrefs = shallow(
      <InteriorLeftNavItem
        href="www.google.com"
        activeHref="www.google.com"
      >
        <a href="www.google.com" >test-title</a>
      </InteriorLeftNavItem>
    );

    it('renders a interior left nav item', () => {
      expect(wrapper.length).toEqual(1);
    });
    it('has the expected classes', () => {
      expect(wrapper.hasClass('left-nav-list__item')).toEqual(true);
    });
    it('should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });
    it('should contain a title', () => {
      expect(wrapper.find('a').text()).toEqual('test-title');
    });
    it('should contain an href', () => {
      expect(wrapper.find('a').props().href).toEqual('test-href');
    });
    it('should add active class to item when activeHref is matched', () => {
      expect(matchingHrefs.hasClass('left-nav-list__item--active')).toEqual(true);
    });
    it('has an anchor with the expected class', () => {
      expect(wrapper.find('a').hasClass('left-nav-list__item-link')).toEqual(true);
    });
  });

  describe('actions', () => {
    const onClick = jest.fn();

    const wrapper = shallow(
      <InteriorLeftNavItem onClick={onClick} href="#">
        <a href="#">test-title</a>
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
