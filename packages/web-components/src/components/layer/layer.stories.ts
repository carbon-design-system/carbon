/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { prefix } from '../../globals/settings';
import styles from './layer-story.scss?lit';
import './index';

const controls = {
  label: {
    control: 'text',
    description: 'Provide the content displayed in each layer.',
  },
  level: {
    control: 'select',
    options: [0, 1, 2],
    description: `Specify the layer level.`,
  },
};

export const Default = {
  args: {
    label: 'Workspace settings',
  },
  argTypes: {
    label: controls.label,
  },
  render: ({ label }) => html`
    <cds-layer>
      <div class="example-layer-test-component">${label}</div>
      <cds-layer>
        <div class="example-layer-test-component">${label}</div>
        <cds-layer>
          <div class="example-layer-test-component">${label}</div>
        </cds-layer>
      </cds-layer>
    </cds-layer>
    <style>
      ${styles}
    </style>
  `,
};

export const withBackground = {
  args: {
    label: 'Workspace settings',
  },
  argTypes: {
    label: controls.label,
  },
  render: ({ label }) => html`
    <cds-layer with-background>
      <div class="example-layer-test-component-no-background">${label}</div>
      <cds-layer with-background>
        <div class="example-layer-test-component-no-background">${label}</div>
        <cds-layer with-background>
          <div class="example-layer-test-component-no-background">${label}</div>
        </cds-layer>
      </cds-layer>
    </cds-layer>
    <style>
      ${styles}
    </style>
  `,
};

export const CustomLevel = {
  name: 'Custom level',
  args: {
    label: 'Workspace settings',
    level: 2,
  },
  argTypes: controls,
  render: ({ label, level }) => html`
    <cds-layer level="${level}">
      <div class="example-layer-test-component">${label}</div>
    </cds-layer>
    <style>
      ${styles}
    </style>
  `,
};

export const UseLayer = {
  name: 'useLayer',
  args: {
    label: 'Current layer level',
  },
  argTypes: {
    label: controls.label,
  },
  render: ({ label }) => {
    document.addEventListener(`${prefix}-use-layer`, (e) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      const { layer, level } = (e as any).detail;
      layer.querySelector('.use-layer-level').innerText = `${level + 1}`;
    });

    return html`
      <cds-layer>
        <div class="example-layer-test-component use-layer">
          ${label}: <span class="use-layer-level"></span>
        </div>
        <cds-layer>
          <div class="example-layer-test-component use-layer">
            ${label}: <span class="use-layer-level"></span>
          </div>
        </cds-layer>
      </cds-layer>
      <style>
        ${styles}
      </style>
    `;
  },
};

const meta = {
  title: 'Components/Layer',
};

export default meta;
