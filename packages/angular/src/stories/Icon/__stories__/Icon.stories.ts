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
import { IconComponent } from '@carbon/angular/icon';
import Add16 from '@carbon/icons/es/add/16.js';
import ChevronRight16 from '@carbon/icons/es/chevron--right/16.js';
import Search16 from '@carbon/icons/es/search/16.js';

// ─── WC-parity stories (one-for-one with @carbon/web-components Icon) ────────

const defaultArgs = {
  size: 16,
  class: '',
  ariaLabel: '',
};

const controls: ArgTypes = {
  size: {
    control: 'select',
    options: [16, 20, 24, 32],
    description: 'Specify the size of the icon',
  },
  class: {
    control: 'text',
    description: 'Specify a custom CSS class for the icon',
  },
  ariaLabel: {
    control: 'text',
    description: 'Specify an aria-label for the icon',
  },
};

const flexRow = componentWrapperDecorator(
  (story) =>
    `<div style="display: flex; gap: 1rem; align-items: center;">${story}</div>`
);

const meta: Meta = {
  title: 'Elements/Icon',
  decorators: [
    moduleMetadata({
      imports: [IconComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj;

// WC: Default
export const Default: Story = {
  args: defaultArgs,
  argTypes: controls,
  decorators: [flexRow],
  render: ({ size, class: className, ariaLabel }) => ({
    props: {
      size,
      className,
      ariaLabel,
      add: Add16,
      chevronRight: ChevronRight16,
      search: Search16,
    },
    template: `
      <cds-ng-icon
        [icon]="add"
        [size]="size"
        [class]="className"
        [ariaLabel]="ariaLabel || null"></cds-ng-icon>
      <cds-ng-icon
        [icon]="chevronRight"
        [size]="size"
        [class]="className"
        [ariaLabel]="ariaLabel || null"></cds-ng-icon>
      <cds-ng-icon
        [icon]="search"
        [size]="size"
        [class]="className"
        [ariaLabel]="ariaLabel || null"></cds-ng-icon>
    `,
  }),
};

// WC: WithCustomSVG
export const WithCustomSVG: Story = {
  args: {
    ...defaultArgs,
    ariaLabel: 'Custom shape',
  },
  argTypes: controls,
  parameters: {
    controls: {
      exclude: ['size'],
    },
  },
  decorators: [flexRow],
  render: ({ class: className, ariaLabel }) => ({
    props: { className, ariaLabel },
    template: `
      <cds-ng-icon [class]="className" [ariaLabel]="ariaLabel || null">
        <svg width="16" height="16" viewBox="0 0 16 16">
          <circle cx="8" cy="8" r="6" fill="currentColor" />
        </svg>
      </cds-ng-icon>
      <cds-ng-icon [class]="className" [ariaLabel]="ariaLabel || null">
        <svg width="16" height="16" viewBox="0 0 16 16">
          <rect x="2" y="2" width="12" height="12" fill="currentColor" />
        </svg>
      </cds-ng-icon>
      <cds-ng-icon [class]="className" [ariaLabel]="ariaLabel || null">
        <svg width="16" height="16" viewBox="0 0 16 16">
          <polygon points="8,2 14,14 2,14" fill="currentColor" />
        </svg>
      </cds-ng-icon>
    `,
  }),
};

// WC: WithCustomClasses
export const WithCustomClasses: Story = {
  args: {
    ...defaultArgs,
  },
  argTypes: controls,
  parameters: {
    controls: {
      // Story purpose is demonstrating distinct color classes; keep class control off.
      exclude: ['class'],
    },
  },
  decorators: [flexRow],
  render: ({ size, ariaLabel }) => ({
    props: {
      size,
      ariaLabel,
      add: Add16,
      chevronRight: ChevronRight16,
      search: Search16,
    },
    styles: [
      `
      .blue {
        color: blue;
      }
      .green {
        color: green;
      }
      .red {
        color: red;
      }
    `,
    ],
    template: `
      <cds-ng-icon
        [icon]="add"
        [size]="size"
        class="blue"
        [ariaLabel]="ariaLabel || null"></cds-ng-icon>
      <cds-ng-icon
        [icon]="chevronRight"
        [size]="size"
        class="green"
        [ariaLabel]="ariaLabel || null"></cds-ng-icon>
      <cds-ng-icon
        [icon]="search"
        [size]="size"
        class="red"
        [ariaLabel]="ariaLabel || null"></cds-ng-icon>
    `,
  }),
};

// WC: WithAriaLabel
export const WithAriaLabel: Story = {
  args: {
    ...defaultArgs,
    ariaLabel: 'Add item',
  },
  argTypes: controls,
  decorators: [flexRow],
  render: ({ size, class: className, ariaLabel }) => ({
    props: {
      size,
      className,
      ariaLabel,
      add: Add16,
      chevronRight: ChevronRight16,
      search: Search16,
    },
    template: `
      <cds-ng-icon
        [icon]="add"
        [size]="size"
        [class]="className"
        [ariaLabel]="ariaLabel || null"></cds-ng-icon>
      <cds-ng-icon
        [icon]="chevronRight"
        [size]="size"
        [class]="className"
        [ariaLabel]="ariaLabel || null"></cds-ng-icon>
      <cds-ng-icon
        [icon]="search"
        [size]="size"
        [class]="className"
        [ariaLabel]="ariaLabel || null"></cds-ng-icon>
    `,
  }),
};
