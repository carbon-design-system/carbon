/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import { SideNavMenu } from '../SideNavMenu';
import { SideNavMenuItem } from '../';

const prefix = 'bx';
describe('SideNavMenu', () => {
  let mockProps, wrapper;

  beforeEach(() => {
    mockProps = {
      buttonRef: jest.fn(),
      className: 'custom-classname',
      children: 'text',
      renderIcon: () => <div>icon</div>,
      isActive: false,
      title: 'title',
    };
  });

  afterEach(() => {
    wrapper && wrapper.unmount();
  });

  it('should render', () => {
    wrapper = mount(<SideNavMenu {...mockProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should expand the menu when the button ref is clicked', () => {
    wrapper = mount(<SideNavMenu {...mockProps} />);
    expect(wrapper.state('isExpanded')).toBe(false);
    expect(mockProps.buttonRef).toHaveBeenCalledTimes(1);
    wrapper.find('button').simulate('click');
    expect(wrapper.state('isExpanded')).toBe(true);
  });

  it('should collapse the menu when the Esc key is pressed', () => {
    wrapper = mount(<SideNavMenu {...mockProps} defaultExpanded={true} />);
    expect(wrapper.state('isExpanded')).toBe(true);
    wrapper.simulate('keydown', {
      key: 'Escape',
      keyCode: 27,
      which: 27,
    });
    expect(wrapper.state('isExpanded')).toBe(false);
  });

  it('should reset expanded state if the isSideNavExpanded prop is false', () => {
    wrapper = mount(<SideNavMenu {...mockProps} />);
    expect(wrapper.state('isExpanded')).toBe(false);
    expect(wrapper.state('wasPreviouslyExpanded')).toBe(false);
    wrapper.setState({ isExpanded: true });
    expect(wrapper.state('isExpanded')).toBe(true);
    expect(wrapper.state('wasPreviouslyExpanded')).toBe(false);
    // set the prop to false. This should force isExpanded from true to false, and update wasPreviouslyExpanded to true
    wrapper.setProps({ isSideNavExpanded: false });
    expect(wrapper.state('isExpanded')).toBe(false);
    expect(wrapper.state('wasPreviouslyExpanded')).toBe(true);
  });

  it('should reset expanded state if the SideNav was collapsed/expanded', () => {
    wrapper = mount(<SideNavMenu {...mockProps} />);
    wrapper.setState({ isExpanded: false, wasPreviouslyExpanded: true });
    // set the prop to false. This should force isExpanded from true to false, and update wasPreviouslyExpanded to true
    wrapper.setProps({ isSideNavExpanded: true });
    expect(wrapper.state('isExpanded')).toBe(true);
    expect(wrapper.state('wasPreviouslyExpanded')).toBe(false);
  });

  it('should add the correct active class if a child is active', () => {
    wrapper = mount(<SideNavMenu {...mockProps} />);
    expect(
      wrapper.find('li').hasClass(`${prefix}--side-nav__item--active`)
    ).toBe(false);
    // add a (single) child which is active
    wrapper.setProps({
      children: <SideNavMenuItem isActive={true}>Test</SideNavMenuItem>,
    });
    expect(
      wrapper.find('li').at(0).hasClass(`${prefix}--side-nav__item--active`)
    ).toBe(true);
    wrapper.setProps({
      children: [
        <SideNavMenuItem key="first">entry one</SideNavMenuItem>,
        <SideNavMenuItem key="second" aria-current="page">
          entry two
        </SideNavMenuItem>,
      ],
    });
    expect(
      wrapper.find('li').at(0).hasClass(`${prefix}--side-nav__item--active`)
    ).toBe(true);
  });

  it('should include a css class to render the large variant is large prop is set', () => {
    wrapper = mount(<SideNavMenu {...mockProps} />);
    expect(
      wrapper.find('li').hasClass(`${prefix}--side-nav__item--large`)
    ).toBe(false);
    wrapper.setProps({ large: true });
    expect(
      wrapper.find('li').hasClass(`${prefix}--side-nav__item--large`)
    ).toBe(true);
  });
});
