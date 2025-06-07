/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './index';
import CopyFile16 from '@carbon/icons/lib/copy--file/16';
import Export16 from '@carbon/icons/lib/export/16';

const args = {
  label: 'Primary action',
  size: 'lg',
  menuAlignment: 'bottom',
};

const argTypes = {
  disabled: {
    control: 'boolean',
    description: 'Specify whether the ComboButton should be disabled, or not.',
  },
  label: {
    control: 'text',
    description: 'Provide the label to be rendered on the trigger button.',
  },
  menuAlignment: {
    control: 'select',
    description:
      'Experimental property. Specify how the menu should align with the button element',
    options: [
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
    ],
  },
  onClick: {
    control: true,
    description:
      'Provide an optional function to be called when the primary action element is clicked.',
  },
  size: {
    control: 'radio',
    description: `Specify the size of the button and menu.
'sm'
'md'
'lg'`,
    options: ['sm', 'md', 'lg'],
  },
  tooltipAlignment: {
    control: 'radio',
    description: 'Specify how the trigger tooltip should be aligned.',
  },
};

export const Default = {
  argTypes: argTypes,
  args: args,
  render: ({
    disabled,
    label,
    menuAlignment,
    size,
    tooltipAlignment,
    onClick,
  }) => html`
    <cds-combo-button
      label="${label}"
      menu-alignment=${menuAlignment}
      size=${size}
      ?disabled=${disabled}
      .tooltip-alignment="${tooltipAlignment}"
      .onClick=${onClick}>
      <cds-menu>
        <cds-menu-item
          label="Second action with a long label description"></cds-menu-item>
        <cds-menu-item label="Third action"></cds-menu-item>
        <cds-menu-item label="Fourth action" disabled></cds-menu-item>
        <cds-menu-item-divider></cds-menu-item-divider>
        <cds-menu-item label="Danger action" kind="danger"></cds-menu-item>
      </cds-menu>
    </cds-combo-button>
  `,
};

export const ExperimentalAutoAlign = {
  argTypes: argTypes,
  args: args,
  render: ({
    disabled,
    label,
    menuAlignment,
    size,
    tooltipAlignment,
    onClick,
  }) => html`
    <div style="width: 5000px; height: 5000px;">
      <div style="position: absolute; bottom: 20px">
        <cds-combo-button
          label="${label}"
          menu-alignment=${menuAlignment}
          size=${size}
          ?disabled=${disabled}
          .tooltip-alignment="${tooltipAlignment}">
          <cds-menu>
            <cds-menu-item
              label="Second action with a long label description"></cds-menu-item>
            <cds-menu-item label="Third action"></cds-menu-item>
            <cds-menu-item label="Fourth action" disabled></cds-menu-item>
          </cds-menu>
        </cds-combo-button>
      </div>
    </div>
  `,
};

export const withDanger = {
  argTypes: argTypes,
  args: args,
  render: ({ disabled, label, menuAlignment, size, tooltipAlignment }) => html`
    <cds-combo-button
      label="${label}"
      menu-alignment=${menuAlignment}
      size=${size}
      ?disabled=${disabled}
      .tooltip-alignment="${tooltipAlignment}">
      <cds-menu>
        <cds-menu-item
          label="Second action with a long label description"></cds-menu-item>
        <cds-menu-item label="Third action"></cds-menu-item>
        <cds-menu-item label="Fourth action"></cds-menu-item>
        <cds-menu-item-divider></cds-menu-item-divider>
        <cds-menu-item label="Danger action" kind="danger"></cds-menu-item>
      </cds-menu>
    </cds-combo-button>
  `,
};

export const withIcons = {
  argTypes: argTypes,
  args: {
    label: 'Save record',
    size: 'lg',
    menuAlignment: 'bottom',
  },
  render: ({ disabled, label, menuAlignment, size, tooltipAlignment }) => html`
    <cds-combo-button
      label="${label}"
      menu-alignment=${menuAlignment}
      size=${size}
      ?disabled=${disabled}
      .tooltip-alignment="${tooltipAlignment}">
      <cds-menu>
        <cds-menu-item label="Save as a copy">
          ${CopyFile16({ slot: 'render-icon' })}
        </cds-menu-item>
        <cds-menu-item label="Export">
          ${Export16({ slot: 'render-icon' })}
        </cds-menu-item>
      </cds-menu>
    </cds-combo-button>
  </div>
  `,
};

export const withMenuAlignment = {
  render: () => html`
    <div style="display: flex; justify-content: space-between;">
      <cds-combo-button label="Bottom" menu-alignment="bottom">
        <cds-menu>
          <cds-menu-item
            label="Second action with a long label description"></cds-menu-item>
          <cds-menu-item label="Third action"></cds-menu-item>
          <cds-menu-item label="Fourth action" disabled></cds-menu-item>
        </cds-menu>
      </cds-combo-button>

      <cds-combo-button label="Bottom start" menu-alignment="bottom-start">
        <cds-menu>
          <cds-menu-item
            label="Second action with a long label description"></cds-menu-item>
          <cds-menu-item label="Third action"></cds-menu-item>
          <cds-menu-item label="Fourth action" disabled></cds-menu-item>
        </cds-menu>
      </cds-combo-button>

      <cds-combo-button label="Bottom end" menu-alignment="bottom-end">
        <cds-menu>
          <cds-menu-item
            label="Second action with a long label description"></cds-menu-item>
          <cds-menu-item label="Third action"></cds-menu-item>
          <cds-menu-item label="Fourth action" disabled></cds-menu-item>
        </cds-menu>
      </cds-combo-button>
    </div>

    <div
      style="display: flex; justify-content: space-between; margin-top: 15rem">
      <cds-combo-button
        label="Top"
        menu-alignment="top"
        tooltip-alignment="bottom">
        <cds-menu>
          <cds-menu-item
            label="Second action with a long label description"></cds-menu-item>
          <cds-menu-item label="Third action"></cds-menu-item>
          <cds-menu-item label="Fourth action" disabled></cds-menu-item>
        </cds-menu>
      </cds-combo-button>

      <cds-combo-button
        label="Top start"
        menu-alignment="top-start"
        tooltip-alignment="bottom">
        <cds-menu>
          <cds-menu-item
            label="Second action with a long label description"></cds-menu-item>
          <cds-menu-item label="Third action"></cds-menu-item>
          <cds-menu-item label="Fourth action" disabled></cds-menu-item>
        </cds-menu>
      </cds-combo-button>

      <cds-combo-button
        label="Top end"
        menu-alignment="top-end"
        tooltip-alignment="bottom">
        <cds-menu>
          <cds-menu-item
            label="Second action with a long label description"></cds-menu-item>
          <cds-menu-item label="Third action"></cds-menu-item>
          <cds-menu-item label="Fourth action" disabled></cds-menu-item>
        </cds-menu>
      </cds-combo-button>
    </div>
  `,
};

const meta = {
  title: 'Components/Combo Button',
};

export default meta;
