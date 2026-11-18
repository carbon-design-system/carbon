/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  moduleMetadata,
  type Meta,
  type StoryObj,
  type ArgTypes,
} from '@storybook/angular';
import { OverflowMenuComponent } from '@carbon/angular/overflow-menu';
import {
  MenuComponent,
  MenuItemComponent,
  MenuItemDividerComponent,
  MenuItemGroupComponent,
} from '@carbon/angular/menu';
import OverflowMenuVertical16 from '@carbon/icons/es/overflow-menu--vertical/16.js';
import Filter16 from '@carbon/icons/es/filter/16.js';
import { iconToSvg } from '../../../../.storybook/helpers/icon-to-svg';

// ─── WC-parity stories (one-for-one with @carbon/web-components OverflowMenu) ─
//
// Only the v12 (menu-composition) implementation is documented. The legacy
// `cds-ng-overflow-menu-body` / `cds-ng-overflow-menu-item` structure is not
// shown. The WC feature-flag stories wrap the component in
// `<feature-flags enable-v12-overflowmenu>`. There is no Angular wrapper for
// `feature-flags`, so these stories enable the menu-composition implementation
// with the `[enableV12Overflowmenu]` input of `cds-ng-overflow-menu` instead.

const defaultArgs = {
  open: false,
  label: 'Options',
  menuAlignment: 'bottom-start',
  size: 'md',
  align: 'top',
};

const menuAlignmentOptions = [
  'bottom-start',
  'bottom-end',
  'top-start',
  'top-end',
];

const tooltipAlignOptions = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
];

const controls: ArgTypes = {
  autoAlign: {
    control: 'boolean',
    description:
      'Specify whether the menu should automatically choose the best alignment.',
  },
  open: {
    control: 'boolean',
    description: '<code>true</code> if the menu should be open.',
  },
  label: {
    control: 'text',
    description:
      "A label describing the options available. Is used in the trigger tooltip and as the menu's accessible label.",
  },
  menuAlignment: {
    control: 'select',
    description:
      'Specify how the menu should align with the button element <code>bottom-start</code> <code>bottom-end</code> <code>top-start</code> <code>top-end</code>.',
    options: menuAlignmentOptions,
  },
  size: {
    control: 'radio',
    description:
      'Specify the size of the OverflowMenu. Currently supports either <code>xs</code>, <code>sm</code>, <code>md</code> (default) or <code>lg</code> as an option.',
    options: ['xs', 'sm', 'md', 'lg'],
  },
  align: {
    control: 'select',
    description: 'Specify how the trigger should align with the tooltip.',
    options: tooltipAlignOptions,
  },
};

const overflowMenuIcon = iconToSvg(OverflowMenuVertical16, {
  class: 'cds-ng--overflow-menu__icon',
  slot: 'icon',
});

const filterIcon = iconToSvg(Filter16, {
  class: 'cds-ng--overflow-menu__icon',
  slot: 'icon',
});

const defaultMenu = `
  <cds-ng-menu>
    <cds-ng-menu-item label="Stop app"></cds-ng-menu-item>
    <cds-ng-menu-item label="Restart app"></cds-ng-menu-item>
    <cds-ng-menu-item label="Rename app"></cds-ng-menu-item>
    <cds-ng-menu-item label="Edit routes and access"></cds-ng-menu-item>
    <cds-ng-menu-item-divider></cds-ng-menu-item-divider>
    <cds-ng-menu-item label="Delete app" kind="danger"></cds-ng-menu-item>
  </cds-ng-menu>
`;

/**
 * Renders a menu-composition `cds-ng-overflow-menu`. Bindings are read from
 * the template context, so `overrides` replaces a binding with a literal.
 */
const overflowMenuTemplate = (
  menu: string = defaultMenu,
  overrides: { menuAlignment?: string; align?: string; icon?: string } = {}
) => `
  <cds-ng-overflow-menu
    [enableV12Overflowmenu]="true"
    [autoalign]="autoAlign"
    [open]="open"
    [label]="label"
    [menuAlignment]="${overrides.menuAlignment ? `'${overrides.menuAlignment}'` : 'menuAlignment'}"
    [size]="size"
    [align]="${overrides.align ? `'${overrides.align}'` : 'align'}">
    ${overrides.icon ?? overflowMenuIcon}
    ${menu}
  </cds-ng-overflow-menu>
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<any> = {
  title: 'Components/OverflowMenu',
  args: defaultArgs,
  argTypes: controls,
  decorators: [
    moduleMetadata({
      imports: [
        OverflowMenuComponent,
        MenuComponent,
        MenuItemComponent,
        MenuItemDividerComponent,
        MenuItemGroupComponent,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

// WC: Default
export const Default: Story = {
  parameters: {
    controls: {
      include: ['autoAlign', 'open', 'label', 'menuAlignment', 'align', 'size'],
    },
  },
  render: ({ autoAlign: _autoAlign, ...args }) => ({
    props: args,
    template: overflowMenuTemplate(),
  }),
};

// WC: AutoAlign
export const AutoAlign: Story = {
  args: {
    autoAlign: true,
  },
  argTypes: {
    autoAlign: {
      table: { readonly: true },
    },
  },
  render: (args) => {
    requestAnimationFrame(() => {
      document
        .querySelector('cds-ng-overflow-menu[autoalign]')
        ?.scrollIntoView({
          block: 'center',
          inline: 'center',
        });
    });

    return {
      props: args,
      template: `
        <div style="width: 4900px; height: 4900px; position: relative;">
          <div style="position: absolute; top: 2450px; left: 2450px;">
            ${overflowMenuTemplate()}
          </div>
        </div>
      `,
    };
  },
};

// TODO(parity): the WC story also sets `enable-v12-dynamic-floating-styles` on
// `<feature-flags>`. There is no Angular wrapper for `feature-flags`, so only
// the `enable-v12-overflowmenu` part of the flag scope is applied here.
// WC: FloatingStyles
export const FloatingStyles: Story = {
  render: ({ autoAlign: _autoAlign, ...args }) => ({
    props: args,
    template: overflowMenuTemplate(),
  }),
};

// WC: Nested
export const Nested: Story = {
  render: ({ autoAlign: _autoAlign, ...args }) => ({
    props: args,
    template: overflowMenuTemplate(`
      <cds-ng-menu>
        <cds-ng-menu-item label="Level 1"></cds-ng-menu-item>
        <cds-ng-menu-item label="Level 1"></cds-ng-menu-item>
        <cds-ng-menu-item label="Level 1">
          <cds-ng-menu-item-group slot="submenu">
            <cds-ng-menu-item label="Level 2">
              <cds-ng-menu-item-group slot="submenu">
                <cds-ng-menu-item label="Level 3"></cds-ng-menu-item>
                <cds-ng-menu-item label="Level 3">
                  <cds-ng-menu-item-group slot="submenu">
                    <cds-ng-menu-item label="Level 4"></cds-ng-menu-item>
                  </cds-ng-menu-item-group>
                </cds-ng-menu-item>
              </cds-ng-menu-item-group>
            </cds-ng-menu-item>
            <cds-ng-menu-item label="Level 2"></cds-ng-menu-item>
            <cds-ng-menu-item label="Level 2"></cds-ng-menu-item>
          </cds-ng-menu-item-group>
        </cds-ng-menu-item>
        <cds-ng-menu-item label="Level 1"></cds-ng-menu-item>
      </cds-ng-menu>
    `),
  }),
};

// WC: RenderCustomIcon
export const RenderCustomIcon: Story = {
  parameters: {
    controls: {
      include: ['autoAlign', 'open', 'label', 'menuAlignment', 'align', 'size'],
    },
  },
  render: ({ autoAlign: _autoAlign, ...args }) => ({
    props: args,
    template: overflowMenuTemplate(
      `
      <cds-ng-menu>
        <cds-ng-menu-item label="Filter A"></cds-ng-menu-item>
        <cds-ng-menu-item label="Filter B"></cds-ng-menu-item>
      </cds-ng-menu>
    `,
      { icon: filterIcon }
    ),
  }),
};

// TODO(parity): the WC story also sets `enable-v12-dynamic-floating-styles` on
// `<feature-flags>` (see FloatingStyles).
// WC: WithMenuAlignment
export const WithMenuAlignment: Story = {
  parameters: {
    controls: {
      include: ['autoAlign', 'label', 'open', 'size'],
    },
  },
  render: ({ autoAlign, label, open, size }) => ({
    props: { autoAlign, label, open, size, align: 'top' },
    template: `
      <div style="display: flex; justify-content: space-between;">
        ${overflowMenuTemplate(defaultMenu, { menuAlignment: 'bottom-start' })}
        ${overflowMenuTemplate(defaultMenu, { menuAlignment: 'bottom-end' })}
      </div>

      <div style="display: flex; justify-content: space-between; margin-top: 15rem;">
        ${overflowMenuTemplate(defaultMenu, {
          menuAlignment: 'top-start',
          align: 'bottom',
        })}
        ${overflowMenuTemplate(defaultMenu, {
          menuAlignment: 'top-end',
          align: 'bottom',
        })}
      </div>
    `,
  }),
};
