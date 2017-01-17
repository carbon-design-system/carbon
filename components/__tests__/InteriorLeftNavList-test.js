import React from 'react';
import InteriorLeftNavList from '../InteriorLeftNavList';
import InteriorLeftNavItem from '../InteriorLeftNavItem';
import Icon from '../Icon';
import { shallow } from 'enzyme';

describe('InteriorLeftNavList', () => {
  describe('Renders as expected', () => {
    const openList = shallow(
      <InteriorLeftNavList
        className="extra-class"
        title="test-title"
        open
      >
        <InteriorLeftNavItem href="#" title="test-title" />
      </InteriorLeftNavList>
    );

    const closedList = shallow(
      <InteriorLeftNavList>
        <InteriorLeftNavItem href="#" title="test-title" />
      </InteriorLeftNavList>
    );

    it('renders a interior left nav list', () => {
      expect(openList.length).toEqual(1);
    });
    it('has the expected classes', () => {
      expect(openList.hasClass('left-nav-list__item--has-children')).toEqual(true);
    });
    it('should add extra classes that are passed via className', () => {
      expect(openList.hasClass('extra-class')).toEqual(true);
    });
    it('should have children with tab index of zero when open', () => {
      expect(openList.find(InteriorLeftNavItem).props().tabIndex).toEqual(0);
    });
    it('should have children with tab index of negative one when closed', () => {
      expect(closedList.find(InteriorLeftNavItem).props().tabIndex).toEqual(-1);
    });
    it('has the expected class when open', () => {
      expect(openList.hasClass('left-nav-list__item--expanded')).toEqual(true);
    });
    it('should not have the expanded class when closed', () => {
      expect(closedList.hasClass('left-nav-list__item--expanded')).toEqual(false);
    });
    it('should use correct icon', () => {
      const icon = openList.find(Icon);
      expect(icon.props().name).toEqual('chevron--down');
    });
    it('should use correct icon class names', () => {
      const icon = openList.find(Icon);
      expect(icon.props().className).toEqual('left-nav-list__item-icon bx--inline-left-nav__icon');
    });
    it('should render children as expected', () => {
      const interiorLeftNavList = shallow(
        <InteriorLeftNavList>
          <InteriorLeftNavItem href="#" title="test-title" className="test-child" />
          <InteriorLeftNavItem href="#" title="test-title" className="test-child" />
        </InteriorLeftNavList>
      );
      expect(interiorLeftNavList.find('a').length).toEqual(1);
      expect(interiorLeftNavList.find('.left-nav-list--nested').length).toEqual(1);
      expect(interiorLeftNavList.find('.test-child').length).toEqual(2);
    });
  });

  describe('actions', () => {
    const openList = shallow(
      <InteriorLeftNavList
        className="extra-class"
        title="test-title"
        open
      >
        <InteriorLeftNavItem href="#" title="test-title" />
      </InteriorLeftNavList>
    );

    it('handles click to leftNavList as expected', () => {
      expect(openList.state().open).toEqual(true);
      openList.simulate('click');
      expect(openList.state().open).toEqual(false);
    });
  });
});
