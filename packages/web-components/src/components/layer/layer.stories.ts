/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { prefix } from '../../globals/settings';
import styles from './layer-story.scss?lit';
import './index';

const defaultArgs = {
  level: '0',
};

const controls = {
  level: {
    control: 'select',
    options: [0, 1, 2],
    description: `Specify the layer level.`,
  },
};

export const Default = {
  render: () => html`
    <cds-layer>
      <div class="example-layer-test-component">Test component</div>
      <cds-layer>
        <div class="example-layer-test-component">Test component</div>
        <cds-layer>
          <div class="example-layer-test-component">Test component</div>
        </cds-layer>
      </cds-layer>
    </cds-layer>
    <style>
      ${styles}
    </style>
  `,
};

export const withBackground = {
  render: () => html`
    <cds-layer with-background>
      <div class="example-layer-test-component-no-background">
        Test component
      </div>
      <cds-layer with-background>
        <div class="example-layer-test-component-no-background">
          Test component
        </div>
        <cds-layer with-background>
          <div class="example-layer-test-component-no-background">
            Test component
          </div>
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
    level: 2,
  },
  argTypes: controls,
  render: ({ level }) => html`
    <cds-layer level="${level}">
      <div class="example-layer-test-component">Test component</div>
    </cds-layer>
    <style>
      ${styles}
    </style>
  `,
};

export const UseLayer = {
  name: 'useLayer',
  render: () => {
    document.addEventListener(`${prefix}-use-layer`, (e) => {
      const { layer, level } = (e as any).detail;
      layer.querySelector('.example-layer-test-component.use-layer').innerText =
        `The current layer level is: ${level + 1}`;
    });

    return html`
      <cds-layer>
        <div class="example-layer-test-component use-layer"></div>
        <cds-layer>
          <div class="example-layer-test-component use-layer"></div>
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
