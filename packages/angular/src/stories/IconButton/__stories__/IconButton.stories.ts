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
import { IconButtonComponent } from '@carbon/angular/icon-button';
import { BadgeIndicatorComponent } from '@carbon/angular/badge-indicator';
import Edit16 from '@carbon/icons/es/edit/16.js';
import Notification16 from '@carbon/icons/es/notification/16.js';
import { iconToSvg } from '../../../../.storybook/helpers/icon-to-svg';

// ─── WC-parity stories (one-for-one with @carbon/web-components IconButton) ──

const kinds = {
  'Primary button (primary)': 'primary',
  'Secondary button (secondary)': 'secondary',
  'Tertiary button (tertiary)': 'tertiary',
  'Danger button (danger)': 'danger',
  'Danger tertiary button (danger-tertiary)': 'danger-tertiary',
  'Danger ghost button (danger-ghost)': 'danger-ghost',
  'Ghost button (ghost)': 'ghost',
};

const tooltipAlignments = {
  top: 'top',
  'top-left': 'top-left',
  'top-right': 'top-right',
  bottom: 'bottom',
  'bottom-left': 'bottom-left',
  'bottom-right': 'bottom-right',
  left: 'left',
  right: 'right',
};

const sizes = ['sm', 'md', 'lg'];

const args = {
  align: 'bottom',
  closeOnActivation: true,
  defaultOpen: true,
  disabled: false,
  enterDelayMs: 100,
  isSelected: false,
  kind: 'primary',
  label: 'Custom label',
  leaveDelayMs: 100,
  size: 'lg',
};

const argTypes: ArgTypes = {
  align: {
    control: 'select',
    description: 'Specify how the trigger should align with the tooltip.',
    options: Object.values(tooltipAlignments),
  },
  autoalign: {
    control: 'boolean',
    description: 'Specify whether auto alignment should be applied.',
  },
  closeOnActivation: {
    control: 'boolean',
    description:
      'Determines whether the tooltip should close when inner content is activated (click, Enter or Space).',
  },
  defaultOpen: {
    control: 'boolean',
    description:
      'Specify whether the tooltip should be open when it first renders.',
  },
  disabled: {
    control: 'boolean',
    description: 'Specify whether the Button should be disabled, or not.',
  },
  enterDelayMs: {
    control: 'number',
    description:
      'Specify the duration in milliseconds to delay before displaying the tooltip.',
  },
  isSelected: {
    control: 'boolean',
    description: 'Specify whether the Icon Button is currently selected.',
  },
  kind: {
    control: 'select',
    description:
      'Specify the type of button to be used as the base for the Icon Button.',
    options: Object.values(kinds),
  },
  label: {
    control: 'text',
    description:
      'Provide the label to be rendered inside of the Tooltip. The label will use <code>aria-labelledby</code> and will fully describe the child node that is provided. This means that if you have text in the child node it will not be announced to the screen reader.',
  },
  leaveDelayMs: {
    control: 'number',
    description:
      'Specify the duration in milliseconds to delay before hiding the tooltip.',
  },
  size: {
    control: 'select',
    description: 'Specify the size of the Button. Defaults to <code>lg</code>.',
    options: sizes,
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<any> = {
  title: 'Components/Icon Button',
  decorators: [
    moduleMetadata({
      imports: [IconButtonComponent, BadgeIndicatorComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

// WC: Default
export const Default: Story = {
  args,
  argTypes,
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 3rem">
        <cds-ng-icon-button
          [align]="align"
          [autoalign]="autoalign"
          [closeOnActivation]="closeOnActivation"
          [defaultOpen]="defaultOpen"
          [disabled]="disabled"
          [enterDelayMs]="enterDelayMs"
          [isSelected]="isSelected"
          [kind]="kind"
          [leaveDelayMs]="leaveDelayMs"
          [size]="size">
          ${iconToSvg(Edit16, { slot: 'icon' })}
          <span slot="tooltip-content">{{ label }}</span>
        </cds-ng-icon-button>
      </div>
    `,
  }),
};

// WC: withBadgeIndicator
export const withBadgeIndicator: Story = {
  argTypes: {
    badgeCount: {
      control: {
        type: 'number',
        min: 0,
      },
      description:
        'The count prop for "cds-badge-indicator" when slotted into the button',
    },
    disabled: argTypes['disabled'],
    href: {
      control: 'text',
      description:
        'Optionally specify a URL for the Icon Button to render as a link.',
    },
    label: argTypes['label'],
  },
  args: {
    badgeCount: 4,
    disabled: false,
    href: 'https://www.example.com',
    label: 'Notifications',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 3rem">
        <cds-ng-icon-button
          kind="ghost"
          size="lg"
          [href]="href"
          [disabled]="disabled">
          ${iconToSvg(Notification16, { slot: 'icon' })}
          <span slot="tooltip-content">{{ label }}</span>
          <cds-ng-badge-indicator
            [count]="badgeCount > 0 ? badgeCount : undefined"></cds-ng-badge-indicator>
        </cds-ng-icon-button>
      </div>
    `,
  }),
};
