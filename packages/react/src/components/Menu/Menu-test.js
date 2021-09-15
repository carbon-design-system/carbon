/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Menu, {
  MenuItem,
  MenuRadioGroup,
  MenuSelectableItem,
  MenuDivider,
} from '../Menu';
import { mount } from 'enzyme';
import { settings } from 'carbon-components';

const { prefix } = settings;

describe('Menu', () => {
  describe('renders as expected', () => {
    describe('menu', () => {
      it("isn't rendered when closed", () => {
        const wrapper = mount(<Menu />);
        expect(wrapper.getDOMNode()).toBe(null);
      });

      it('receives the expected classes when opened', () => {
        const wrapper = mount(<Menu open />);
        const container = wrapper.getDOMNode();

        expect(container.classList.contains(`${prefix}--menu`)).toBe(true);
        expect(container.classList.contains(`${prefix}--menu--open`)).toBe(
          true
        );
      });
    });

    describe('option', () => {
      it('receives the expected classes', () => {
        const wrapper = mount(<MenuItem label="Copy" />);
        const container = wrapper.childAt(0).childAt(0);

        expect(container.hasClass(`${prefix}--menu-option`)).toBe(true);
      });

      it('renders props.label', () => {
        const wrapper = mount(<MenuItem label="Copy" />);

        expect(wrapper.find(`span.${prefix}--menu-option__label`).text()).toBe(
          'Copy'
        );
        expect(
          wrapper.find(`span.${prefix}--menu-option__label`).prop('title')
        ).toBe('Copy');
      });

      it('renders props.shortcut when provided', () => {
        const wrapper = mount(<MenuItem label="Copy" shortcut="⌘C" />);

        expect(
          wrapper.find(`div.${prefix}--menu-option__info`).length
        ).toBeGreaterThan(0);
        expect(wrapper.find(`div.${prefix}--menu-option__info`).text()).toBe(
          '⌘C'
        );
      });

      it('respects props.disabled', () => {
        const wrapper = mount(<MenuItem label="Copy" disabled />);
        const content = wrapper.find(`div.${prefix}--menu-option__content`);

        expect(
          content.hasClass(`${prefix}--menu-option__content--disabled`)
        ).toBe(true);
        expect(
          wrapper.find(`li.${prefix}--menu-option`).prop('aria-disabled')
        ).toBe(true);
      });

      it('supports danger kind', () => {
        const wrapper = mount(<MenuItem label="Delete" kind="danger" />);
        const option = wrapper.find(`.${prefix}--menu-option`);

        expect(option.hasClass(`${prefix}--menu-option--danger`)).toBe(true);
      });

      it('renders props.children as submenu', () => {
        const wrapper = mount(
          <Menu open>
            <MenuItem label="Format">
              <MenuItem label="Bold" />
              <MenuItem label="Italic" />
            </MenuItem>
          </Menu>
        );

        const level1 = wrapper.find(`li.${prefix}--menu-option`).at(0);

        expect(level1.find(`ul.${prefix}--menu`).length).toBeGreaterThan(0);
      });
    });

    describe('radiogroup', () => {
      it('children have role "menuitemradio"', () => {
        const wrapper = mount(
          <MenuRadioGroup label="Share with" items={['None', 'All']} />
        );
        const options = wrapper.find(`li.${prefix}--menu-option`);

        expect(options.every('li[role="menuitemradio"]')).toBe(true);
      });
    });

    describe('selectable', () => {
      it('has role "menuitemcheckbox"', () => {
        const wrapper = mount(<MenuSelectableItem label="Publish" />);
        const container = wrapper.childAt(0);

        expect(container.prop('role')).toBe('menuitemcheckbox');
      });
    });

    describe('divider', () => {
      it('receives the expected classes', () => {
        const wrapper = mount(<MenuDivider />);
        const container = wrapper.childAt(0);

        expect(container.hasClass(`${prefix}--menu-divider`)).toBe(true);
      });

      it('has role "separator"', () => {
        const wrapper = mount(<MenuDivider />);
        const container = wrapper.childAt(0);

        expect(container.prop('role')).toBe('separator');
      });
    });
  });
});
