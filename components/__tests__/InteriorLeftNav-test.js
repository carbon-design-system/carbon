import React from 'react';
import InteriorLeftNav from '../InteriorLeftNav';
import InteriorLeftNavHeader from '../InteriorLeftNavHeader';
import InteriorLeftNavList from '../InteriorLeftNavList';
import InteriorLeftNavItem from '../InteriorLeftNavItem';
import { shallow, mount } from 'enzyme';

describe('InteriorLeftNav', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <InteriorLeftNav
        className="extra-class"
        previousPageText="Projects"
        previousPageHref="#projects"
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
      const interiorLeftNav = shallow(
        <InteriorLeftNav>
          <InteriorLeftNavList className="test-child" />
          <InteriorLeftNavItem href="#" title="test-title" className="test-child" />
        </InteriorLeftNav>
      );
      expect(interiorLeftNav.find(InteriorLeftNavHeader).length).toEqual(1);
      expect(interiorLeftNav.find('.left-nav-list').length).toEqual(1);
      expect(interiorLeftNav.find('.test-child').length).toEqual(2);
    });
  });

  describe('actions', () => {
    const interiorLeftNav = mount(
      <InteriorLeftNav>
        <InteriorLeftNavList />
        <InteriorLeftNavItem href="#first" title="test-title" />
      </InteriorLeftNav>
    );

    const item = interiorLeftNav.find(InteriorLeftNavItem).first();

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
  });
});
