/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { prefix } from '../../globals/settings';
import styles from './layer-story.scss?lit';
import storyDocs from './layer.mdx';
import './index';

const levels = {
  'First layer': '0',
  'Second layer': '1',
  'Third layer': '2',
};

const defaultArgs = {
  level: '0',
};

const controls = {
  level: {
    control: 'radio',
    options: levels,
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

export const CustomLevel = {
  name: 'Custom level',
  render: () => html`
    <cds-layer level="0">
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
      layer.querySelector(
        '.example-layer-test-component.use-layer'
      ).innerText = `The current layer level is: ${level + 1}`;
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

export const Playground = {
  args: defaultArgs,
  argTypes: controls,
  parameters: {
    percy: {
      skip: true,
    },
  },
  render: ({ level }) => html`
    <cds-layer level="${level}">
      <div class="example-layer-test-component">Test component</div>
    </cds-layer>
    <style>
      ${styles}
    </style>
  `,
};

const meta = {
  title: 'Components/Layer',
  parameters: {
    docs: {
      page: storyDocs,
    },
  },
};

export default meta;
