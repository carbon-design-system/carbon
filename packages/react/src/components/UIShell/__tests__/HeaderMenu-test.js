/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import { HeaderMenu, HeaderMenuItem } from '../';

const prefix = 'cds';

describe('HeaderMenu', () => {
  let mountNode;
  let mockProps;

  beforeEach(() => {
    mountNode = document.createElement('div');
    mockProps = {
      'aria-label': 'Accessibility label',
      className: 'custom-class',
      menuLinkName: 'test',
      // We use `ref` instead of `focusRef` because `HeaderMenu` forwards the ref
      // to the underlying menu button
      ref: jest.fn(),
      tabIndex: -1,
    };

    document.body.appendChild(mountNode);
  });

  afterEach(() => {
    mountNode.parentNode.removeChild(mountNode);
  });

  it('should render', () => {
    const wrapper = mount(
      <HeaderMenu {...mockProps}>
        <HeaderMenuItem href="/a">A</HeaderMenuItem>
        <HeaderMenuItem href="/b">B</HeaderMenuItem>
        <HeaderMenuItem href="/c">C</HeaderMenuItem>
      </HeaderMenu>,
      {
        attachTo: mountNode,
      }
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render aria-label', () => {
    const wrapper = mount(
      <HeaderMenu {...mockProps}>
        <HeaderMenuItem href="/a">A</HeaderMenuItem>
        <HeaderMenuItem href="/b">B</HeaderMenuItem>
        <HeaderMenuItem href="/c">C</HeaderMenuItem>
      </HeaderMenu>,
      {
        attachTo: mountNode,
      }
    );
    const headerMenu = wrapper.childAt(0);
    const headerMenuText = headerMenu
      .find(`.${prefix}--header__menu-title`)
      .prop('aria-label');

    expect(headerMenuText).toMatch('Accessibility label');
  });

  it('should render content prop', () => {
    const menuContent = () => <p>Some other text</p>;
    const wrapper = mount(
      <HeaderMenu renderMenuContent={menuContent} {...mockProps}>
        <HeaderMenuItem href="/a">A</HeaderMenuItem>
        <HeaderMenuItem href="/b">B</HeaderMenuItem>
        <HeaderMenuItem href="/c">C</HeaderMenuItem>
      </HeaderMenu>,
      {
        attachTo: mountNode,
      }
    );

    const headerMenu = wrapper.childAt(0);
    const headerMenuAnchorChildText = headerMenu
      .find(`.${prefix}--header__menu-title`)
      .childAt(1)
      .text();
    const headerMenuText = headerMenu
      .find(`.${prefix}--header__menu-title`)
      .text();

    expect(headerMenuText).not.toMatch('Accessibility label');
    expect(headerMenuAnchorChildText).toMatch('Some other text');
  });

  describe('menu button interactions', () => {
    it('should open and close', () => {
      const wrapper = mount(
        <HeaderMenu {...mockProps}>
          <HeaderMenuItem href="/a">A</HeaderMenuItem>
          <HeaderMenuItem href="/b">B</HeaderMenuItem>
          <HeaderMenuItem href="/c">C</HeaderMenuItem>
        </HeaderMenu>,
        {
          attachTo: mountNode,
        }
      );

      const headerMenu = wrapper.childAt(0);
      const headerInstance = headerMenu.instance();

      // Should start closed
      expect(headerInstance.state.expanded).toEqual(false);

      // Click should open
      headerMenu.simulate('click');
      expect(headerInstance.state.expanded).toEqual(true);

      // blur should close
      headerMenu.simulate('blur');
      expect(headerInstance.state.expanded).toEqual(false);

      // Get first link in the menu
      const menuLink = headerMenu.find('a').first();

      // After enter should open
      menuLink.simulate('keydown', { key: 'Enter', keyCode: 13, which: 13 });
      expect(headerInstance.state.expanded).toEqual(true);

      // After space should close
      menuLink.simulate('keydown', { key: 'Space', keyCode: 32, which: 32 });
      expect(headerInstance.state.expanded).toEqual(false);

      // After esc should close
      headerMenu.simulate('click');
      menuLink.simulate('keydown', { key: 'Escape', keyCode: 27, which: 27 });
      expect(headerInstance.state.expanded).toEqual(false);
    });
  });
});
