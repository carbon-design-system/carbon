/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './index';
import '../accordion/index';
import '../button/index';
import '../tag/index';
import '../text-input/index';
import '../stack/index';
import docs from './layout.mdx';
import { LAYOUT_SIZES, LAYOUT_DENSITIES } from './layout';

const Demo = () => html`
  <cds-stack gap="6">
    <cds-stack orientation="horizontal" gap="6">
      <cds-text-input
        label="&lt;cds-text-input /&gt;"
        placeholder="Placeholder">
      </cds-text-input>

      <div style="display:flex; align-items:flex-end;">
        <cds-button>&#60;cds-button /&#62;</cds-button>
      </div>

      <div style="display:flex; align-items:flex-end;">
        <cds-tag>&#60;cds-tag /&#62;</cds-tag>
      </div>

      <cds-text-input
        size="sm"
        label='&lt;cds-text-input size="sm" /&gt;'
        placeholder="Placeholder">
      </cds-text-input>

      <div style="display:flex; align-items:flex-end;">
        <cds-button size="sm">&#60;cds-button size="sm" /&#62;</cds-button>
      </div>

      <div style="display:flex; align-items:flex-end;">
        <cds-tag type="blue" size="sm">&#60;cds-tag size="sm" /&#62;</cds-tag>
      </div>
    </cds-stack>

    <cds-accordion>
      <cds-accordion-item title="&lt;cds-accordion-item /&gt;">
        Content
      </cds-accordion-item>
    </cds-accordion>
  </cds-stack>
`;

export const Default = {
  argTypes: {
    size: {
      control: 'select',
      description: 'Specify the size of components within the layout context.',
      options: [...LAYOUT_SIZES],
    },
    density: {
      control: 'radio',
      description:
        'Specify the density of components within the layout context.',
      options: [...LAYOUT_DENSITIES],
    },
  },
  render: ({ size, density }) => html`
    <div style="display: flex; flex-direction: column; gap: 2.5rem;">
      <h1>Layout demo</h1>
      <div>
        <h2 style="margin-block-end: 1rem">Outside of &lt;cds-layout&gt;</h2>
        ${Demo()}
      </div>

      <div>
        <h2 style="margin-block-end: 1rem">Inside of &lt;cds-layout&gt;</h2>
        <cds-layout size=${size ?? ''} density=${density ?? ''}>
          ${Demo()}
        </cds-layout>
      </div>
    </div>
  `,
};

const meta = {
  title: 'Preview/preview__Layout',
  component: 'cds-layout',
  parameters: {
    docs: {
      page: docs,
    },
  },
  argTypes: {
    styles: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
