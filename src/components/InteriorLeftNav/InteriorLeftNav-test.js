import React from 'react';
import InteriorLeftNav from '../InteriorLeftNav';
import InteriorLeftNavList from '../InteriorLeftNavList';
import InteriorLeftNavItem from '../InteriorLeftNavItem';
import { mount } from 'enzyme';

describe('InteriorLeftNav', () => {
  describe('Renders as expected', () => {
    const wrapper = mount(<InteriorLeftNav className="extra-class" />);

    it('renders a interior left nav', () => {
      expect(wrapper.length).toEqual(1);
    });

    it('has the expected classes', () => {
      expect(wrapper.children().hasClass('bx--interior-left-nav')).toEqual(
        true
      );
    });

    it('should add extra classes that are passed via className', () => {
      expect(wrapper.hasClass('extra-class')).toEqual(true);
    });

    it('should render children as expected', () => {
      const interiorLeftNav = mount(
        <InteriorLeftNav>
          <InteriorLeftNavList className="test-child" />
          <InteriorLeftNavItem
            href=""
            title="test-title"
            className="test-child">
            <a href="http://www.carbondesignsystem.com">test-title</a>
          </InteriorLeftNavItem>
        </InteriorLeftNav>
      );
      expect(interiorLeftNav.find('.left-nav-list').length).toEqual(2);
      expect(interiorLeftNav.find('.test-child').length).toEqual(4);
      expect(
        interiorLeftNav.find('.bx--interior-left-nav-collapse').length
      ).toEqual(1);
    });
  });

  describe('clicking on one list should close any currently opened lists', () => {
    const twoLists = mount(
      <InteriorLeftNav>
        <InteriorLeftNavList className="first" />
        <InteriorLeftNavList className="second" open />
      </InteriorLeftNav>
    );
    const first = () => twoLists.find('li.first');
    const second = () => twoLists.find('li.second');

    it('should close the second list when the first is clicked', () => {
      expect(second().hasClass('left-nav-list__item--expanded')).toBe(true);
      first().simulate('click');
      expect(second().hasClass('left-nav-list__item--expanded')).toBe(false);
    });
  });

  describe('actions', () => {
    const interiorLeftNav = mount(
      <InteriorLeftNav>
        <InteriorLeftNavList />
        <InteriorLeftNavItem href="#first">
          <a href="#first">test-title</a>
        </InteriorLeftNavItem>
      </InteriorLeftNav>
    );

    const item = interiorLeftNav.find(InteriorLeftNavItem).first();
    const toggler = interiorLeftNav
      .find('.bx--interior-left-nav-collapse')
      .first();

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
      expect(
        interiorLeftNav.children().hasClass('bx--interior-left-nav--collapsed')
      ).toBe(true);
      expect(interiorLeftNav.state().open).toBe(false);
    });
  });

  describe('check accordion behaviour', () => {
    const twoLists = mount(
      <InteriorLeftNav>
        <InteriorLeftNavList className="first" isExpanded />
        <InteriorLeftNavList className="second" isExpanded open />
      </InteriorLeftNav>
    );

    const first = () => twoLists.find('li.first');
    const second = () => twoLists.find('li.second');

    it('should keep the second list open when the first is clicked', () => {
      expect(first().hasClass('left-nav-list__item--expanded')).toBe(false);
      expect(second().hasClass('left-nav-list__item--expanded')).toBe(true);
      first().simulate('click');
      expect(first().hasClass('left-nav-list__item--expanded')).toBe(true);
      expect(second().hasClass('left-nav-list__item--expanded')).toBe(true);
    });
  });
});
