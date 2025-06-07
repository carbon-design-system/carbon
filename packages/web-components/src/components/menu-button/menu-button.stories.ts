/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { html } from 'lit';
import './index';
import Asset16 from '@carbon/icons/lib/asset/16.js';
import User16 from '@carbon/icons/lib/user/16.js';
import Group16 from '@carbon/icons/lib/group/16.js';

const args = {
  label: 'Actions',
  kind: 'primary',
  size: 'lg',
  menuAlignment: 'bottom',
};

const argTypes = {
  disabled: {
    control: 'boolean',
    description: 'Specify whether the MenuButton should be disabled, or not.',
  },
  kind: {
    control: 'radio',
    description:
      'Specify the type of button to be used as the base for the trigger button.',
    options: ['primary', 'tertiary', 'ghost'],
  },
  label: {
    control: 'text',
    description: `Provide the label to be rendered on the trigger button.`,
  },
  menuAlignment: {
    control: 'select',
    description: `Experimental property. Specify how the menu should align with the button element`,
    options: [
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
    ],
  },
  size: {
    control: 'radio',
    description: `Specify the size of the button and menu.
'sm'
'md'
'lg'`,
    options: ['sm', 'md', 'lg'],
  },
  tabIndex: {
    control: 'number',
    description: `Specify the tabIndex of the button.`,
  },
};

export const Default = {
  argTypes: argTypes,
  args: args,
  render: ({ disabled, kind, label, menuAlignment, size, tabIndex }) => html`
    <cds-menu-button
      label="${label}"
      kind=${kind}
      menu-alignment=${menuAlignment}
      size=${size}
      ?disabled=${disabled}
      tab-index=${tabIndex}>
      <cds-menu>
        <cds-menu-item
          label="First action with a long label description"></cds-menu-item>
        <cds-menu-item label="Second action"></cds-menu-item>
        <cds-menu-item label="Third action" disabled></cds-menu-item>
      </cds-menu>
    </cds-menu-button>
  `,
};

export const ExperimentalAutoAlign = {
  argTypes: argTypes,
  args: args,
  render: ({ disabled, kind, label, menuAlignment, size, tabIndex }) => html`
    <div style="width: 5000px; height: 5000px;">
      <div style="position: absolute; bottom: 20px">
        <cds-menu-button
          label="${label}"
          kind=${kind}
          menu-alignment=${menuAlignment}
          size=${size}
          ?disabled=${disabled}
          tab-index=${tabIndex}>
          <cds-menu>
            <cds-menu-item label="First action"></cds-menu-item>
            <cds-menu-item
              label="Second action that is a longer item to test overflow and title."></cds-menu-item>
            <cds-menu-item label="Third action" disabled></cds-menu-item>
          </cds-menu>
        </cds-menu-button>
      </div>
    </div>
  `,
};

export const withDanger = {
  argTypes: argTypes,
  args: args,
  render: ({ disabled, kind, label, menuAlignment, size, tabIndex }) => html`
    <cds-menu-button
      label="${label}"
      kind=${kind}
      menu-alignment=${menuAlignment}
      size=${size}
      ?disabled=${disabled}
      tab-index=${tabIndex}>
      <cds-menu>
        <cds-menu-item label="First action"></cds-menu-item>
        <cds-menu-item label="Second action"></cds-menu-item>
        <cds-menu-item label="Third action"></cds-menu-item>
        <cds-menu-item-divider></cds-menu-item-divider>
        <cds-menu-item label="Danger action" kind="danger"></cds-menu-item>
      </cds-menu>
    </cds-menu-button>
  `,
};

export const withDividers = {
  argTypes: argTypes,
  args: args,
  render: ({ disabled, kind, label, menuAlignment, size, tabIndex }) => html`
    <cds-menu-button
      label="${label}"
      kind=${kind}
      menu-alignment=${menuAlignment}
      size=${size}
      ?disabled=${disabled}
      tab-index=${tabIndex}>
      <cds-menu>
        <cds-menu-item label="Create service request"></cds-menu-item>
        <cds-menu-item label="Create work order"></cds-menu-item>
        <cds-menu-item-divider></cds-menu-item-divider>
        <cds-menu-item label="Add plan"></cds-menu-item>
        <cds-menu-item label="Add flag"></cds-menu-item>
        <cds-menu-item-divider></cds-menu-item-divider>
        <cds-menu-item label="Edit source location"></cds-menu-item>
        <cds-menu-item label="Recalculate source"></cds-menu-item>
      </cds-menu>
    </cds-menu-button>
  `,
};

export const withIcons = {
  argTypes: argTypes,
  args: {
    label: 'Add',
    kind: 'primary',
    size: 'lg',
    menuAlignment: 'bottom',
  },
  render: ({ disabled, kind, label, menuAlignment, size, tabIndex }) => html`
    <cds-menu-button
      label="${label}"
      kind=${kind}
      menu-alignment=${menuAlignment}
      size=${size}
      ?disabled=${disabled}
      tab-index=${tabIndex}>
      <cds-menu>
        <cds-menu-item label="Asset">
          ${Asset16({ slot: 'render-icon' })}
        </cds-menu-item>
        <cds-menu-item label="User">
          ${User16({ slot: 'render-icon' })}
        </cds-menu-item>
        <cds-menu-item label="User group">
          ${Group16({ slot: 'render-icon' })}
        </cds-menu-item>
      </cds-menu>
    </cds-menu-button>
  `,
};

export const withNestedMenu = {
  argTypes: argTypes,
  args: args,
  render: ({ disabled, kind, label, menuAlignment, size, tabIndex }) => html`
    <cds-menu-button
      label="${label}"
      kind=${kind}
      menu-alignment=${menuAlignment}
      size=${size}
      ?disabled=${disabled}
      tab-index=${tabIndex}>
      <cds-menu>
        <cds-menu-item label="Save" shortcut="⌘S"></cds-menu-item>
        <cds-menu-item label="Save as" shortcut="⌥⌘S"></cds-menu-item>
        <cds-menu-item label="Export as">
          <cds-menu-item-group slot="submenu">
            <cds-menu-item label="PDF"></cds-menu-item>
            <cds-menu-item label="JPG"></cds-menu-item>
            <cds-menu-item label="PNG"></cds-menu-item>
          </cds-menu-item-group>
        </cds-menu-item>
        <cds-menu-item-divider></cds-menu-item-divider>
        <cds-menu-item label="Delete" kind="danger"></cds-menu-item>
      </cds-menu>
    </cds-menu-button>
  `,
};

export const withMenuAlignment = {
  render: () => html`
    <div style="display: flex; justify-content: space-between;">
      <cds-menu-button label="Bottom" menu-alignment="bottom">
        <cds-menu>
          <cds-menu-item label="first"></cds-menu-item>
          <cds-menu-item
            label="second action with a really long text"></cds-menu-item>
          <cds-menu-item label="Third action" disabled></cds-menu-item>
        </cds-menu>
      </cds-menu-button>

      <cds-menu-button label="Bottom start" menu-alignment="bottom-start">
        <cds-menu>
          <cds-menu-item label="first"></cds-menu-item>
          <cds-menu-item
            label="second action with a really long text"></cds-menu-item>
          <cds-menu-item label="Third action" disabled></cds-menu-item>
        </cds-menu>
      </cds-menu-button>

      <cds-menu-button label="Bottom end" menu-alignment="bottom-end">
        <cds-menu>
          <cds-menu-item label="first"></cds-menu-item>
          <cds-menu-item
            label="second action with a really long text"></cds-menu-item>
          <cds-menu-item label="Third action" disabled></cds-menu-item>
        </cds-menu>
      </cds-menu-button>
    </div>

    <div
      style="display: flex; justify-content: space-between; margin-top: 15rem">
      <cds-menu-button label="Top" menu-alignment="top">
        <cds-menu>
          <cds-menu-item label="first"></cds-menu-item>
          <cds-menu-item
            label="second action with a really long text"></cds-menu-item>
          <cds-menu-item label="Third action" disabled></cds-menu-item>
        </cds-menu>
      </cds-menu-button>

      <cds-menu-button label="Top start" menu-alignment="top-start">
        <cds-menu>
          <cds-menu-item label="first"></cds-menu-item>
          <cds-menu-item
            label="second action with a really long text"></cds-menu-item>
          <cds-menu-item label="Third action" disabled></cds-menu-item>
        </cds-menu>
      </cds-menu-button>

      <cds-menu-button label="Top end" menu-alignment="top-end">
        <cds-menu>
          <cds-menu-item label="first"></cds-menu-item>
          <cds-menu-item
            label="second action with a really long text"></cds-menu-item>
          <cds-menu-item label="Third action" disabled></cds-menu-item>
        </cds-menu>
      </cds-menu-button>
    </div>
  `,
};

const meta = {
  title: 'Components/Menu Button',
};

export default meta;
