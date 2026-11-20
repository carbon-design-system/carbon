/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  componentWrapperDecorator,
  moduleMetadata,
  type Meta,
  type StoryObj,
  type ArgTypes,
} from '@storybook/angular';
import { ComboButtonComponent } from '@carbon/angular/combo-button';
import {
  MenuComponent,
  MenuItemComponent,
  MenuItemDividerComponent,
} from '@carbon/angular/menu';
import CopyFile16 from '@carbon/icons/es/copy--file/16.js';
import Export16 from '@carbon/icons/es/export/16.js';
import { iconToSvg } from '../../../../.storybook/helpers/icon-to-svg';

// ─── WC-parity stories (one-for-one with @carbon/web-components ComboButton) ─

const sharedArgs = {
  disabled: false,
  label: 'Primary action',
  menuAlignment: 'bottom',
  size: 'lg',
  tooltipAlignment: 'top',
  tooltipContent: 'Additional actions',
};

const controls: ArgTypes = {
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
  // `cds-ng-combo-button` exposes the primary action handler as the `onClick`
  // input, so the story binds this action arg with `[onClick]`.
  onClick: {
    action: 'onClick',
    description:
      'Provide an optional function to be called when the primary action element is clicked.',
  },
  size: {
    control: 'radio',
    description: 'Specify the size of the button and menu.',
    options: ['xs', 'sm', 'md', 'lg'],
  },
  tooltipAlignment: {
    control: 'select',
    description: 'Specify how the trigger tooltip should be aligned.',
    options: [
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'right',
    ],
  },
  tooltipContent: {
    control: 'text',
    description: 'Specify the content of the trigger tooltip.',
  },
};

const parameters = {
  controls: {
    include: Object.keys(controls),
  },
};

/** Wraps menu content in a `cds-ng-combo-button` bound to the story args. */
const comboButtonTemplate = (menu: string) => `
  <cds-ng-combo-button
    [label]="label"
    [menuAlignment]="menuAlignment"
    [size]="size"
    [tooltipAlignment]="tooltipAlignment"
    [tooltipContent]="tooltipContent"
    [disabled]="disabled"
    [onClick]="onClick">
    <cds-ng-menu>
      ${menu}
    </cds-ng-menu>
  </cds-ng-combo-button>
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<any> = {
  title: 'Components/Combo Button',
  decorators: [
    moduleMetadata({
      imports: [
        ComboButtonComponent,
        MenuComponent,
        MenuItemComponent,
        MenuItemDividerComponent,
      ],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div style="display: flex; justify-content: center">${story}</div>`
    ),
  ],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

// WC: Default
export const Default: Story = {
  args: sharedArgs,
  argTypes: controls,
  parameters,
  render: (args) => ({
    props: args,
    template: comboButtonTemplate(`
      <cds-ng-menu-item label="Second action with a long label description"></cds-ng-menu-item>
      <cds-ng-menu-item label="Third action"></cds-ng-menu-item>
      <cds-ng-menu-item label="Fourth action" disabled></cds-ng-menu-item>
      <cds-ng-menu-item-divider></cds-ng-menu-item-divider>
      <cds-ng-menu-item label="Danger action" kind="danger"></cds-ng-menu-item>
    `),
  }),
};

// WC: ExperimentalAutoAlign
export const ExperimentalAutoAlign: Story = {
  args: sharedArgs,
  argTypes: controls,
  parameters,
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 5000px; height: 5000px;">
        <div style="position: absolute; bottom: 20px">
          ${comboButtonTemplate(`
            <cds-ng-menu-item label="Second action with a long label description"></cds-ng-menu-item>
            <cds-ng-menu-item label="Third action"></cds-ng-menu-item>
            <cds-ng-menu-item label="Fourth action" disabled></cds-ng-menu-item>
          `)}
        </div>
      </div>
    `,
  }),
};

// WC: withDanger
export const withDanger: Story = {
  args: sharedArgs,
  argTypes: controls,
  parameters,
  render: (args) => ({
    props: args,
    template: comboButtonTemplate(`
      <cds-ng-menu-item label="Second action with a long label description"></cds-ng-menu-item>
      <cds-ng-menu-item label="Third action"></cds-ng-menu-item>
      <cds-ng-menu-item label="Fourth action"></cds-ng-menu-item>
      <cds-ng-menu-item-divider></cds-ng-menu-item-divider>
      <cds-ng-menu-item label="Danger action" kind="danger"></cds-ng-menu-item>
    `),
  }),
};

// WC: withIcons
export const withIcons: Story = {
  args: {
    ...sharedArgs,
    label: 'Save record',
  },
  argTypes: controls,
  parameters,
  render: (args) => ({
    props: args,
    template: comboButtonTemplate(`
      <cds-ng-menu-item label="Save as a copy">
        ${iconToSvg(CopyFile16, { slot: 'render-icon' })}
      </cds-ng-menu-item>
      <cds-ng-menu-item label="Export">
        ${iconToSvg(Export16, { slot: 'render-icon' })}
      </cds-ng-menu-item>
    `),
  }),
};
