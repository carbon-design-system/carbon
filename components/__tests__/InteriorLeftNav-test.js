import React from 'react';
import InteriorLeftNav from '../InteriorLeftNav';
import InteriorLeftNavList from '../InteriorLeftNavList';
import InteriorLeftNavItem from '../InteriorLeftNavItem';
import { mount } from 'enzyme';

describe('InteriorLeftNav', () => {
  describe('Renders as expected', () => {
    const wrapper = mount(
      <InteriorLeftNav
        className="extra-class"
      />
    );

    it('renders a interior left nav', () => {
      expect(wrapper.length).toEqual(1);
    });
    it('has the expected classes', () => {
      expect(wrapper.hasClass('bx--inline-left-nav')).toEqual(true);
    });
    it('should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });
    it('should render children as expected', () => {
      const interiorLeftNav = mount(
        <InteriorLeftNav>
          <InteriorLeftNavList className="test-child" />
          <InteriorLeftNavItem href="#" title="test-title" className="test-child">
            <a href="#">test-title</a>
          </InteriorLeftNavItem>
        </InteriorLeftNav>
      );
      expect(interiorLeftNav.find('.left-nav-list').length).toEqual(2);
      expect(interiorLeftNav.find('.test-child').length).toEqual(2);
      expect(interiorLeftNav.find('.bx--inline-left-nav-collapse').length).toEqual(1);
    });
  });

  describe('clicking on one list should close any currently opened lists', () => {
    const twoLists = mount(
      <InteriorLeftNav>
        <InteriorLeftNavList className="first" />
        <InteriorLeftNavList className="second" open />
      </InteriorLeftNav>
    );
    const first = twoLists.find('.first');
    const second = twoLists.find('.second');

    it('should close the second list when the first is clicked', () => {
      expect(second.hasClass('left-nav-list__item--expanded')).toBe(true);
      first.simulate('click');
      expect(second.hasClass('left-nav-list__item--expanded')).toBe(false);
    });
  });

  describe('actions', () => {
    const onToggleClick = jest.fn();
    const interiorLeftNav = mount(
      <InteriorLeftNav onToggle={onToggleClick}>
        <InteriorLeftNavList />
        <InteriorLeftNavItem href="#first">
          <a href="#first">test-title</a>
        </InteriorLeftNavItem>
      </InteriorLeftNav>
    );

    const item = interiorLeftNav.find(InteriorLeftNavItem).first();
    const toggler = interiorLeftNav.find('.bx--inline-left-nav-collapse').first();

    it('handles item click as expected', () => {
      interiorLeftNav.setState({ activeHref: '#' });
      item.simulate('click');
      expect(interiorLeftNav.state().activeHref).toEqual('#first');
    });

    it('should set activeHref to items href on Enter', () => {
      interiorLeftNav.setState({ activeHref: '#' });
      item.simulate('keypress', { which: 13 });
      expect(interiorLeftNav.state().activeHref).toEqual('#first');
    });

    it('should set activeHref to items href on Space', () => {
      interiorLeftNav.setState({ activeHref: '#' });
      item.simulate('keypress', { which: 32 });
      expect(interiorLeftNav.state().activeHref).toEqual('#first');
    });

    it('should close the nav when the toggler is clicked', () => {
      toggler.simulate('click');
      expect(interiorLeftNav.hasClass('bx--inline-left-nav--collapsed')).toBe(true);
      expect(interiorLeftNav.state().open).toBe(false);
    });
  });
});
