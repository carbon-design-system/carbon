import React from 'react';
import OverflowMenu from '../OverflowMenu';
import Icon from '../Icon';
import { shallow, mount } from 'enzyme';

describe('OverflowMenu', () => {
  describe('Renders as expected', () => {
    const rootWrapper = shallow(
      <OverflowMenu className="extra-class">
        <div className="test-child" />
        <div className="test-child" />
      </OverflowMenu>
    );
    const menu = rootWrapper.childAt(0);
    const icon = menu.find(Icon);

    it('should render an Icon', () => {
      expect(icon.length).toBe(1);
      expect(icon.hasClass('bx--overflow-menu__icon')).toEqual(true);
    });

    it('should use correct overflow-menu icon', () => {
      expect(icon.props().name).toEqual('overflow-menu');
    });

    it('has the expected classes', () => {
      expect(menu.hasClass('bx--overflow-menu')).toBe(true);
      expect(menu.hasClass('bx--overflow-menu--open')).not.toBe(true);
    });

    it('should render a ul with the appropriate class', () => {
      const list = menu.find('ul');

      expect(list.length).toEqual(1);
      expect(list.hasClass('bx--overflow-menu-options')).toEqual(true);
    });

    it('should add extra classes that are passed via className', () => {
      expect(menu.hasClass('extra-class')).toEqual(true);
    });

    it('should render children as expected', () => {
      expect(menu.find('.test-child').length).toEqual(2);
    });

    it('should set tabIndex if one is passed via props', () => {
      rootWrapper.setProps({ tabIndex: 2 });

      expect(rootWrapper.childAt(0).props().tabIndex).toEqual(2);
    });

    it('should set ariaLabel if one is passed via props', () => {
      rootWrapper.setProps({ ariaLabel: 'test label' });
      expect(rootWrapper.childAt(0).props()['aria-label']).toEqual(
        'test label'
      );
    });

    it('should set id if one is passed via props', () => {
      rootWrapper.setProps({ id: 'uniqueId' });
      expect(rootWrapper.childAt(0).props().id).toEqual('uniqueId');
    });

    it('should apply a tabindex to the menu', () => {
      const defaultMenu = shallow(
        <OverflowMenu>
          <div>Child</div>
        </OverflowMenu>
      ).childAt(0);
      expect(defaultMenu.props().tabIndex).toBe(0);
    });
  });

  describe('open and closed states', () => {
    it('open state should be false by default', () => {
      const rootWrapper = mount(<OverflowMenu />);
      expect(rootWrapper.state().open).toEqual(false);
      expect(rootWrapper.props().open).toEqual(false);
    });

    it('should set expected class when state is open', () => {
      const rootWrapper = mount(<OverflowMenu />);
      const menuOptions = rootWrapper.find('ul');
      const openClass = 'bx--overflow-menu-options--open';

      expect(menuOptions.hasClass(openClass)).not.toEqual(true);
      rootWrapper.setState({ open: true });
      expect(rootWrapper.find('ul').hasClass(openClass)).not.toEqual(false);
    });

    it('should be in an open state after icon is clicked', () => {
      const rootWrapper = mount(<OverflowMenu />);
      const menu = rootWrapper.childAt(0);
      const icon = menu.find(Icon);

      icon.simulate('click');
      expect(rootWrapper.state().open).toEqual(true);
    });

    it('should toggle state in response to Enter or Space', () => {
      const enterKey = 13;
      const spaceKey = 32;
      const rootWrapper = shallow(<OverflowMenu />);
      const menu = rootWrapper.childAt(0);

      rootWrapper.setState({ open: true });

      menu.simulate('keydown', { which: spaceKey });
      expect(rootWrapper.state().open).toEqual(false);
      menu.simulate('keydown', { which: enterKey });
      expect(rootWrapper.state().open).toEqual(true);
    });

    // Removed until a better solution appears
    //
    // it('should be hidden when it loses focus', () => {
    //   const rootWrapper = mount(
    //     <OverflowMenu className="extra-class">
    //       <div className="test-child"></div>
    //       <div className="test-child"></div>
    //     </OverflowMenu>
    //   );
    //   const menu = rootWrapper.childAt(0);

    //   rootWrapper.setState({ open: true });

    //   menu.simulate('blur');
    //   expect(rootWrapper.state().open).toEqual(false);
    // });

    it('should be in a closed state after handleOutsideClick() is invoked', () => {
      const rootWrapper = shallow(<OverflowMenu />);

      expect(rootWrapper.state().open).toEqual(false);

      rootWrapper.setState({ open: true });

      rootWrapper.props().onClickOutside();

      expect(rootWrapper.state().open).toEqual(false);
    });

    it('open state should be controlled by open props', () => {
      const rootWrapper = mount(<OverflowMenu />);

      rootWrapper.setProps({ open: true });

      expect(rootWrapper.state().open).toEqual(true);
    });
  });
});
