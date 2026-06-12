/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { prefix } from '../../globals/settings';
import { iconLoader } from '../../globals/internal/icon-loader';
import OverflowMenuVertical16 from '@carbon/icons/es/overflow-menu--vertical/16.js';
import { OVERFLOW_MENU_SIZE } from './overflow-menu';
import './index';
import '../menu/index';
import '../feature-flags/index';
import mdx from './overflow-menu.feature-flag.mdx';
import '../../../.storybook/templates/with-feature-flags';

const args = {
  open: false,
  label: 'Options',
  menuAlignment: 'bottom-start',
  size: OVERFLOW_MENU_SIZE.MEDIUM,
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

const argTypes = {
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

const renderOverflowMenuIcon = () =>
  iconLoader(OverflowMenuVertical16, {
    class: `${prefix}--overflow-menu__icon`,
    slot: 'icon',
  });

const renderDefaultMenu = () => html`
  <cds-menu>
    <cds-menu-item label="Stop app"></cds-menu-item>
    <cds-menu-item label="Restart app"></cds-menu-item>
    <cds-menu-item label="Rename app"></cds-menu-item>
    <cds-menu-item label="Edit routes and access"></cds-menu-item>
    <cds-menu-item-divider></cds-menu-item-divider>
    <cds-menu-item label="Delete app" kind="danger"></cds-menu-item>
  </cds-menu>
`;

const renderOverflowMenu = ({
  autoalign = false,
  label = 'Options',
  menu = renderDefaultMenu(),
  menuAlignment = 'bottom-start',
  open = false,
  size = OVERFLOW_MENU_SIZE.MEDIUM,
  align = 'top',
} = {}) => html`
  <cds-overflow-menu
    ?autoalign=${autoalign}
    ?open=${open}
    label="${label}"
    menu-alignment="${menuAlignment}"
    size="${size}"
    align="${align}">
    ${renderOverflowMenuIcon()} ${menu}
  </cds-overflow-menu>
`;

export const Default = {
  args,
  argTypes,
  parameters: {
    controls: {
      include: ['open', 'label', 'menuAlignment', 'align', 'size'],
    },
  },
  render: (args) => {
    const { align, label, menuAlignment, open, size } = args ?? {};
    return html`
      <sb-template-feature-flags>
        <feature-flags enable-v12-overflowmenu="true">
          ${renderOverflowMenu({ align, label, menuAlignment, open, size })}
        </feature-flags>
      </sb-template-feature-flags>
    `;
  },
};

export const AutoAlign = {
  render: () => {
    requestAnimationFrame(() => {
      document.querySelector('cds-overflow-menu[autoalign]')?.scrollIntoView({
        block: 'center',
        inline: 'center',
      });
    });

    return html`
      <sb-template-feature-flags>
        <feature-flags enable-v12-overflowmenu="true">
          <div style="width: 4900px; height: 4900px; position: relative;">
            <div style="position: absolute; top: 2450px; left: 2450px;">
              ${renderOverflowMenu({ autoalign: true })}
            </div>
          </div>
        </feature-flags>
      </sb-template-feature-flags>
    `;
  },
};

export const FloatingStyles = {
  render: () => {
    return html`
      <sb-template-feature-flags>
        <feature-flags
          enable-v12-overflowmenu="true"
          enable-v12-dynamic-floating-styles="true">
          ${renderOverflowMenu()}
        </feature-flags>
      </sb-template-feature-flags>
    `;
  },
};

export const Nested = {
  render: () => {
    return html`
      <sb-template-feature-flags>
        <feature-flags enable-v12-overflowmenu="true">
          ${renderOverflowMenu({
            menu: html`
              <cds-menu>
                <cds-menu-item label="Level 1"></cds-menu-item>
                <cds-menu-item label="Level 1"></cds-menu-item>
                <cds-menu-item label="Level 1">
                  <cds-menu-item-group slot="submenu">
                    <cds-menu-item label="Level 2">
                      <cds-menu-item-group slot="submenu">
                        <cds-menu-item label="Level 3"></cds-menu-item>
                        <cds-menu-item label="Level 3">
                          <cds-menu-item-group slot="submenu">
                            <cds-menu-item label="Level 4"></cds-menu-item>
                          </cds-menu-item-group>
                        </cds-menu-item>
                      </cds-menu-item-group>
                    </cds-menu-item>
                    <cds-menu-item label="Level 2"></cds-menu-item>
                    <cds-menu-item label="Level 2"></cds-menu-item>
                  </cds-menu-item-group>
                </cds-menu-item>
                <cds-menu-item label="Level 1"></cds-menu-item>
              </cds-menu>
            `,
          })}
        </feature-flags>
      </sb-template-feature-flags>
    `;
  },
};

export const WithMenuAlignment = {
  render: () => {
    return html`
      <sb-template-feature-flags>
        <feature-flags
          enable-v12-overflowmenu="true"
          enable-v12-dynamic-floating-styles="true">
          <div style="display: flex; justify-content: space-between;">
            ${renderOverflowMenu({ menuAlignment: 'bottom-start' })}
            ${renderOverflowMenu({ menuAlignment: 'bottom-end' })}
          </div>

          <div
            style="display: flex; justify-content: space-between; margin-top: 15rem;">
            ${renderOverflowMenu({
              menuAlignment: 'top-start',
              align: 'bottom',
            })}
            ${renderOverflowMenu({ menuAlignment: 'top-end', align: 'bottom' })}
          </div>
        </feature-flags>
      </sb-template-feature-flags>
    `;
  },
};

const meta = {
  title: 'Components/OverflowMenu/Feature Flag',
  parameters: {
    docs: {
      page: mdx,
    },
  },
  tags: ['!autodocs'],
};

export default meta;
