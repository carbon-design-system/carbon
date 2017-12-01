import React from 'react';
import InteriorLeftNavList from '../InteriorLeftNavList';
import InteriorLeftNavItem from '../InteriorLeftNavItem';
import Icon from '../Icon';
import { shallow, mount } from 'enzyme';

describe('InteriorLeftNavList', () => {
  describe('Renders as expected', () => {
    const openList = shallow(
      <InteriorLeftNavList className="extra-class" title="test-title" open>
        <InteriorLeftNavItem href="">
          <a href="http://www.carbondesignsystem.com">test-title</a>
        </InteriorLeftNavItem>
      </InteriorLeftNavList>
    );

    const closedList = shallow(
      <InteriorLeftNavList>
        <InteriorLeftNavItem href="">
          <a href="http://www.carbondesignsystem.com">test-title</a>
        </InteriorLeftNavItem>
      </InteriorLeftNavList>
    );

    const expectedChildrenList = shallow(
      <InteriorLeftNavList>
        <InteriorLeftNavItem href="" className="test-child">
          <a href="http://www.carbondesignsystem.com">test-title</a>
        </InteriorLeftNavItem>
        <InteriorLeftNavItem href="" className="test-child">
          <a href="http://www.carbondesignsystem.com">test-title</a>
        </InteriorLeftNavItem>
      </InteriorLeftNavList>
    );

    it('renders a interior left nav list', () => {
      expect(openList.length).toEqual(1);
    });
    it('has the expected classes', () => {
      expect(openList.hasClass('left-nav-list__item--has-children')).toEqual(
        true
      );
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
      expect(closedList.hasClass('left-nav-list__item--expanded')).toEqual(
        false
      );
    });
    it('should use correct icon', () => {
      const icon = openList.find(Icon);
      expect(icon.props().name).toEqual('chevron--down');
    });
    it('should use correct icon class names', () => {
      const icon = openList.find(Icon);
      expect(icon.props().className).toEqual(
        'left-nav-list__item-icon bx--interior-left-nav__icon'
      );
    });
    it('should render children as expected', () => {
      expect(
        expectedChildrenList.find('.left-nav-list__item-link').length
      ).toEqual(1);
      expect(
        expectedChildrenList.find('.left-nav-list--nested').length
      ).toEqual(1);
      expect(expectedChildrenList.find('.test-child').length).toEqual(2);
    });
  });

  describe('Check that functions passed in as props are called', () => {
    const onListClick = jest.fn();
    const wrapper = mount(<InteriorLeftNavList onListClick={onListClick} />);

    it('should call onListClick', () => {
      wrapper.simulate('click');
      expect(onListClick).toBeCalled();
    });
  });

  describe('calling the close method should close the list when open', () => {
    const wrapper = shallow(<InteriorLeftNavList open />);

    it('should close the list', () => {
      wrapper.instance().close();
      expect(wrapper.state().open).toEqual(false);
    });
  });

  describe('actions', () => {
    const list = mount(
      <InteriorLeftNavList title="test-title">
        <InteriorLeftNavItem href="">
          <a href="http://www.carbondesignsystem.com">test-title</a>
        </InteriorLeftNavItem>
      </InteriorLeftNavList>
    );

    it('handles click to leftNavList as expected', () => {
      list.setState({ open: false });
      list.simulate('click');
      expect(list.state().open).toEqual(true);
    });

    it('should toggle the leftNavList on Enter', () => {
      list.setState({ open: false });
      list.simulate('keypress', { which: 13 });
      expect(list.state().open).toEqual(true);
      list.simulate('keypress', { which: 13 });
      expect(list.state().open).toEqual(false);
    });

    it('should toggle the leftNavList on Space', () => {
      list.setState({ open: false });
      list.simulate('keypress', { which: 32 });
      expect(list.state().open).toEqual(true);
      list.simulate('keypress', { which: 32 });
      expect(list.state().open).toEqual(false);
    });
  });
});
