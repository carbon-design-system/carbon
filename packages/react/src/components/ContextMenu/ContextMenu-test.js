/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ContextMenu, {
  ContextMenuItem,
  ContextMenuRadioGroup,
  ContextMenuSelectableItem,
  ContextMenuDivider,
} from '../ContextMenu';
import { mount } from 'enzyme';
import { settings } from 'carbon-components';
import { describe, expect } from 'window-or-global';

const { prefix } = settings;

describe('ContextMenu', () => {
  describe('renders as expected', () => {
    describe('menu', () => {
      it('receives the expected classes when closed', () => {
        const wrapper = mount(<ContextMenu />);
        const container = wrapper.childAt(0).childAt(0);

        expect(container.hasClass(`${prefix}--context-menu`)).toBe(true);
        expect(container.hasClass(`${prefix}--context-menu--open`)).toBe(false);
      });

      it('receives the expected classes when opened', () => {
        const wrapper = mount(<ContextMenu open />);

        const container = wrapper.childAt(0).childAt(0);

        expect(container.hasClass(`${prefix}--context-menu`)).toBe(true);
        expect(container.hasClass(`${prefix}--context-menu--open`)).toBe(true);
      });
    });

    describe('option', () => {
      it('receives the expected classes', () => {
        const wrapper = mount(<ContextMenuItem label="Copy" />);
        const container = wrapper.childAt(0).childAt(0);

        expect(container.hasClass(`${prefix}--context-menu-option`)).toBe(true);
      });

      it('renders props.label', () => {
        const wrapper = mount(<ContextMenuItem label="Copy" />);

        expect(
          wrapper.find(`span.${prefix}--context-menu-option__label`).text()
        ).toBe('Copy');
        expect(
          wrapper
            .find(`span.${prefix}--context-menu-option__label`)
            .prop('title')
        ).toBe('Copy');
      });

      it('renders props.shortcut when provided', () => {
        const wrapper = mount(<ContextMenuItem label="Copy" shortcut="⌘C" />);

        expect(
          wrapper.find(`div.${prefix}--context-menu-option__info`).length
        ).toBeGreaterThan(0);
        expect(
          wrapper.find(`div.${prefix}--context-menu-option__info`).text()
        ).toBe('⌘C');
      });

      it('respects props.disabled', () => {
        const wrapper = mount(<ContextMenuItem label="Copy" disabled />);
        const content = wrapper.find(
          `div.${prefix}--context-menu-option__content`
        );

        expect(
          content.hasClass(`${prefix}--context-menu-option__content--disabled`)
        ).toBe(true);
        expect(
          wrapper
            .find(`li.${prefix}--context-menu-option`)
            .prop('aria-disabled')
        ).toBe(true);
      });

      it('supports danger kind', () => {
        const wrapper = mount(<ContextMenuItem label="Delete" kind="danger" />);
        const option = wrapper.find(`.${prefix}--context-menu-option`);

        expect(option.hasClass(`${prefix}--context-menu-option--danger`)).toBe(
          true
        );
      });

      it('ignores danger kind when it has children', () => {
        const wrapper = mount(
          <ContextMenu>
            <ContextMenuItem label="Remove" kind="danger">
              <ContextMenuItem label="Move to trash" />
              <ContextMenuItem label="Delete" />
            </ContextMenuItem>
          </ContextMenu>
        );
        const option = wrapper.find(`.${prefix}--context-menu-option`).at(0);

        expect(option.hasClass(`${prefix}--context-menu-option--danger`)).toBe(
          false
        );
      });

      it('renders props.children as submenu', () => {
        const wrapper = mount(
          <ContextMenu>
            <ContextMenuItem label="Format">
              <ContextMenuItem label="Bold" />
              <ContextMenuItem label="Italic" />
            </ContextMenuItem>
          </ContextMenu>
        );

        const level1 = wrapper.find(`li.${prefix}--context-menu-option`).at(0);

        expect(
          level1.find(`ul.${prefix}--context-menu`).length
        ).toBeGreaterThan(0);
      });
    });

    describe('radiogroup', () => {
      it('children have role "menuitemradio"', () => {
        const wrapper = mount(
          <ContextMenuRadioGroup label="Share with" items={['None', 'All']} />
        );
        const options = wrapper.find(`li.${prefix}--context-menu-option`);

        expect(options.every('li[role="menuitemradio"]')).toBe(true);
      });
    });

    describe('selectable', () => {
      it('has role "menuitemcheckbox"', () => {
        const wrapper = mount(<ContextMenuSelectableItem label="Publish" />);
        const container = wrapper.childAt(0);

        expect(container.prop('role')).toBe('menuitemcheckbox');
      });
    });

    describe('divider', () => {
      it('receives the expected classes', () => {
        const wrapper = mount(<ContextMenuDivider />);
        const container = wrapper.childAt(0);

        expect(container.hasClass(`${prefix}--context-menu-divider`)).toBe(
          true
        );
      });

      it('has role "separator"', () => {
        const wrapper = mount(<ContextMenuDivider />);
        const container = wrapper.childAt(0);

        expect(container.prop('role')).toBe('separator');
      });
    });
  });
});
