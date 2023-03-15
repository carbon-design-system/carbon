/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { radios } from '@storybook/addon-knobs';
import { prefix } from '../../globals/settings';
import storyDocs from './layer-story.mdx';
import styles from './layer-story.scss';
import './index.ts';

const levels = {
  'First layer': '0',
  'Second layer': '1',
  'Third layer': '2',
};

export const Default = () => {
  return html`
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
  `;
};

Default.storyName = 'Default';

export const CustomLevel = () => {
  return html`
    <cds-layer level="0">
      <div class="example-layer-test-component">Test component</div>
    </cds-layer>
    <style>
      ${styles}
    </style>
  `;
};

CustomLevel.storyName = 'Custom level';

export const UseLayer = () => {
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
};

UseLayer.storyName = 'useLayer';

export const Playground = (args) => {
  const { level } = args?.[`${prefix}-layer-playground`] ?? {};
  return html`
    <cds-layer level="${level}">
      <div class="example-layer-test-component">Test component</div>
    </cds-layer>
    <style>
      ${styles}
    </style>
  `;
};

Playground.parameters = {
  percy: {
    skip: true,
  },
  knobs: {
    [`${prefix}-layer-playground`]: () => ({
      level: radios('Specify the layer level', levels, '0'),
    }),
  },
};

export default {
  title: 'Components/Layer',
  parameters: {
    ...storyDocs.parameters,
  },
};
