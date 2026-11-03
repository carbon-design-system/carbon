/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import Add16 from '@carbon/icons/es/add/16.js';
import ChevronRight16 from '@carbon/icons/es/chevron--right/16.js';
import Search16 from '@carbon/icons/es/search/16.js';
import './icon';

const defaultArgs = {
  size: 16,
  class: '',
  ariaLabel: '',
};

const controls = {
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

export const Default = {
  args: defaultArgs,
  argTypes: controls,
  decorators: [
    (story) =>
      html`<div style="display: flex; gap: 1rem; align-items: center;">
        ${story()}
      </div>`,
  ],
  render: ({ size, class: className, ariaLabel }) => html`
    <cds-icon
      .icon=${Add16}
      .size=${size}
      class=${ifDefined(className || undefined)}
      aria-label=${ifDefined(ariaLabel || undefined)}></cds-icon>
    <cds-icon
      .icon=${ChevronRight16}
      .size=${size}
      class=${ifDefined(className || undefined)}
      aria-label=${ifDefined(ariaLabel || undefined)}></cds-icon>
    <cds-icon
      .icon=${Search16}
      .size=${size}
      class=${ifDefined(className || undefined)}
      aria-label=${ifDefined(ariaLabel || undefined)}></cds-icon>
  `,
};

export const WithCustomSVG = {
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
  decorators: [
    (story) =>
      html`<div style="display: flex; gap: 1rem; align-items: center;">
        ${story()}
      </div>`,
  ],
  render: ({ class: className, ariaLabel }) => html`
    <cds-icon
      class=${ifDefined(className || undefined)}
      aria-label=${ifDefined(ariaLabel || undefined)}>
      <svg width="16" height="16" viewBox="0 0 16 16">
        <circle cx="8" cy="8" r="6" fill="currentColor" />
      </svg>
    </cds-icon>
    <cds-icon
      class=${ifDefined(className || undefined)}
      aria-label=${ifDefined(ariaLabel || undefined)}>
      <svg width="16" height="16" viewBox="0 0 16 16">
        <rect x="2" y="2" width="12" height="12" fill="currentColor" />
      </svg>
    </cds-icon>
    <cds-icon
      class=${ifDefined(className || undefined)}
      aria-label=${ifDefined(ariaLabel || undefined)}>
      <svg width="16" height="16" viewBox="0 0 16 16">
        <polygon points="8,2 14,14 2,14" fill="currentColor" />
      </svg>
    </cds-icon>
  `,
};

export const WithCustomClasses = {
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
  decorators: [
    (story) =>
      html`<style>
          .blue {
            color: blue;
          }
          .green {
            color: green;
          }
          .red {
            color: red;
          }
        </style>
        <div style="display: flex; gap: 1rem; align-items: center;">
          ${story()}
        </div>`,
  ],
  render: ({ size, ariaLabel }) => html`
    <cds-icon
      .icon=${Add16}
      .size=${size}
      class="blue"
      aria-label=${ifDefined(ariaLabel || undefined)}></cds-icon>
    <cds-icon
      .icon=${ChevronRight16}
      .size=${size}
      class="green"
      aria-label=${ifDefined(ariaLabel || undefined)}></cds-icon>
    <cds-icon
      .icon=${Search16}
      .size=${size}
      class="red"
      aria-label=${ifDefined(ariaLabel || undefined)}></cds-icon>
  `,
};

export const WithAriaLabel = {
  args: {
    ...defaultArgs,
    ariaLabel: 'Add item',
  },
  argTypes: controls,
  decorators: [
    (story) =>
      html`<div style="display: flex; gap: 1rem; align-items: center;">
        ${story()}
      </div>`,
  ],
  render: ({ size, class: className, ariaLabel }) => html`
    <cds-icon
      .icon=${Add16}
      .size=${size}
      class=${ifDefined(className || undefined)}
      aria-label=${ifDefined(ariaLabel || undefined)}></cds-icon>
    <cds-icon
      .icon=${ChevronRight16}
      .size=${size}
      class=${ifDefined(className || undefined)}
      aria-label=${ifDefined(ariaLabel || undefined)}></cds-icon>
    <cds-icon
      .icon=${Search16}
      .size=${size}
      class=${ifDefined(className || undefined)}
      aria-label=${ifDefined(ariaLabel || undefined)}></cds-icon>
  `,
};

const meta = {
  title: 'Elements/Icon',
};

export default meta;
