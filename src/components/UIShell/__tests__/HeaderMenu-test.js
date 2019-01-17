/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import { HeaderMenu, HeaderMenuItem } from '../';

describe('HeaderMenu', () => {
  let mountNode;
  let mockProps;

  beforeEach(() => {
    mountNode = document.createElement('div');
    mockProps = {
      'aria-label': 'Accessibility label',
      className: 'custom-class',
      // We use `ref` instead of `focusRef` becase `HeaderMenu` forwards the ref
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

  describe('menu button', () => {
    it.skip('should set the given ref on the menu button', () => {});

    it.skip('should open and close the menu when interacted with by a mouse', () => {});

    it.skip('should focus the first item in the menu if DOWN is pressed', () => {});

    it.skip('should focus the last item in the menu if UP is pressed', () => {});
  });

  describe('menu', () => {
    // https://www.w3.org/TR/wai-aria-practices/examples/menubar/menubar-1/menubar-1.html#kbd2_label
    it.skip('should close the menu if RIGHT or LEFT are pressed', () => {});

    it.skip('should close the menu and set focus on the menu button if ESC is pressed', () => {});

    it.skip('should focus the first item if HOME is pressed', () => {});

    it.skip('should focus the last item if END is pressed', () => {});

    it.skip('should support movement with UP and DOWN keys', () => {});

    it.skip('should close the menu if blur occurs that is not in the menu or menubar', () => {});
  });
});
