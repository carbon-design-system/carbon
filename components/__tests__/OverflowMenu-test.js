jest.unmock('../OverflowMenu');

import React from 'react';
import OverflowMenu from '../OverflowMenu';
import Icon from '../../elements/Icon';
import { shallow, mount } from 'enzyme';

describe('OverflowMenu', () => {
  describe('Renders as expected', () => {
    const rootWrapper = shallow(<OverflowMenu className="extra-class" />);
    const menu = rootWrapper.childAt(0);

    it('should render an Icon', () => {
      const icon = menu.find(Icon);

      expect(icon.length).toBe(1);
      expect(icon.hasClass('bx--overflow-menu__icon')).toEqual(true);
    });

    it('has the expected classes', () => {
      expect(menu.hasClass('bx--overflow-menu')).toBe(true);
      expect(menu.hasClass('bx--overflow-menu--open')).not.toBe(true);
    });

    it('should render a ul with the appropriate class', () => {
      const list = menu.find('ul');

      expect(list.length).toEqual(1);
      expect(list.hasClass('bx--overflow-menu__options')).toEqual(true);
    });

    it('should add extra classes that are passed via className', () => {
      expect(menu.hasClass('extra-class')).toEqual(true);
    });
  });

  it('should render children as expected', () => {
    const menu = shallow(
      <OverflowMenu>
        <div className="test-child"></div>
        <div className="test-child"></div>
      </OverflowMenu>
    );

    expect(menu.find('.test-child').length).toEqual(2);
  });

  it('should set tabIndex if one is passed via props', () => {
    const rootWrapper = shallow(<OverflowMenu tabIndex={2} />);
    const menu = rootWrapper.childAt(0);

    expect(menu.props().tabIndex).toEqual(2);
  });

  it('should set ariaLabel if one is passed via props', () => {
    const rootWrapper = shallow(<OverflowMenu ariaLabel="test label" />);
    const menu = rootWrapper.childAt(0);

    expect(menu.props()['aria-label']).toEqual('test label');
  });

  it('should set id if one is passed via props', () => {
    const rootWrapper = shallow(<OverflowMenu id="uniqueId" />);
    const menu = rootWrapper.childAt(0);

    expect(menu.props().id).toEqual('uniqueId');
  });

  describe('open and closed states', () => {
    it('should set expected class when state is open', () => {
      const rootWrapper = mount(<OverflowMenu />);
      const menu = rootWrapper.childAt(0);
      const openClass = 'bx--overflow-menu--open';

      expect(menu.hasClass(openClass)).not.toEqual(true);
      rootWrapper.setState({ open: true });
      expect(menu.hasClass(openClass)).toEqual(true);
    });

    it('should be in an open state after menu is clicked', () => {
      const rootWrapper = mount(<OverflowMenu />);
      const menu = rootWrapper.childAt(0);

      menu.simulate('click');
      expect(rootWrapper.state().open).toEqual(true);
    });

    it('should be in a closed state after Enter is pressed', () => {
      const rootWrapper = mount(<OverflowMenu />);

      rootWrapper.setState({ open: true });

      const keyboardEvent = new KeyboardEvent('keypress', { which: 13 });
      document.dispatchEvent(keyboardEvent);

      expect(rootWrapper.state().open).toEqual(false);
    });

    it('should be in a closed state after handleOutsideClick() is invoked', () => {
      const rootWrapper = shallow(<OverflowMenu />);

      expect(rootWrapper.state().open).toEqual(false);

      rootWrapper.setState({ open: true });

      rootWrapper.props().onClickOutside();

      expect(rootWrapper.state().open).toEqual(false);
    });
  });
});
