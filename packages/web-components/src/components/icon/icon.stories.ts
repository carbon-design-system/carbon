/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import Add16 from '@carbon/icons/es/add/16.js';
import ChevronRight16 from '@carbon/icons/es/chevron--right/16.js';
import Search16 from '@carbon/icons/es/search/16.js';
import './icon';

export const Default = {
  decorators: [
    (story) =>
      html`<div style="display: flex; gap: 1rem; align-items: center;">
        ${story()}
      </div>`,
  ],
  render: () => html`
    <cds-icon .icon=${Add16}></cds-icon>
    <cds-icon .icon=${ChevronRight16}></cds-icon>
    <cds-icon .icon=${Search16}></cds-icon>
  `,
};

export const WithCustomSVG = {
  decorators: [
    (story) =>
      html`<div style="display: flex; gap: 1rem; align-items: center;">
        ${story()}
      </div>`,
  ],
  render: () => html`
    <cds-icon>
      <svg width="16" height="16" viewBox="0 0 16 16">
        <circle cx="8" cy="8" r="6" fill="currentColor" />
      </svg>
    </cds-icon>
    <cds-icon>
      <svg width="16" height="16" viewBox="0 0 16 16">
        <rect x="2" y="2" width="12" height="12" fill="currentColor" />
      </svg>
    </cds-icon>
    <cds-icon>
      <svg width="16" height="16" viewBox="0 0 16 16">
        <polygon points="8,2 14,14 2,14" fill="currentColor" />
      </svg>
    </cds-icon>
  `,
};

export const WithCustomClasses = {
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
  render: () => html`
    <cds-icon .icon=${Add16} class="blue"></cds-icon>
    <cds-icon .icon=${ChevronRight16} class="green"></cds-icon>
    <cds-icon .icon=${Search16} class="red"></cds-icon>
  `,
};

export const WithAriaLabel = {
  decorators: [
    (story) =>
      html`<div style="display: flex; gap: 1rem; align-items: center;">
        ${story()}
      </div>`,
  ],
  render: () => html`
    <cds-icon .icon=${Add16} aria-label="Add item"></cds-icon>
    <cds-icon .icon=${ChevronRight16} aria-label="Navigate forward"></cds-icon>
    <cds-icon .icon=${Search16} aria-label="Search"></cds-icon>
  `,
};

const meta = {
  title: 'Elements/Icon',
};

export default meta;
