/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import './ordered-list';
import './list-item';
import { boolean } from '@storybook/addon-knobs';
import storyDocs from './list-story.mdx';
import { prefix } from '../../globals/settings';

export const Default = () => html`<cds-ordered-list>
  <cds-list-item>Ordered List level 1</cds-list-item>
  <cds-list-item>Ordered List level 1</cds-list-item>
  <cds-list-item>Ordered List level 1</cds-list-item>
  <cds-list-item>Ordered List level 1</cds-list-item>
  <cds-list-item>Ordered List level 1</cds-list-item>
  <cds-list-item>Ordered List level 1</cds-list-item>
  <cds-list-item>Ordered List level 1</cds-list-item>
  <cds-list-item>Ordered List level 1</cds-list-item>
  <cds-list-item>Ordered List level 1</cds-list-item>
  <cds-list-item>Ordered List level 1</cds-list-item>
  <cds-list-item>Ordered List level 1</cds-list-item>
  <cds-list-item>Ordered List level 1</cds-list-item>
  <cds-list-item>Ordered List level 1</cds-list-item>
</cds-ordered-list>`;

export default {
  title: 'Components/Ordered List',
};

export const NativeListStyles = () => html`<cds-ordered-list native>
  <cds-list-item>Ordered List level 1</cds-list-item>
  <cds-list-item>Ordered List level 1</cds-list-item>
  <cds-list-item>Ordered List level 1</cds-list-item>
  <cds-list-item>
    Ordered List level 1
    <cds-ordered-list native>
      <cds-list-item>Ordered List level 2</cds-list-item>
      <cds-list-item>Ordered List level 2</cds-list-item>
      <cds-list-item>Ordered List level 2</cds-list-item>
      <cds-list-item>Ordered List level 2</cds-list-item>
    </cds-ordered-list>
  </cds-list-item>
  <cds-list-item>Ordered List level 1</cds-list-item>
  <cds-list-item>Ordered List level 1</cds-list-item>
  <cds-list-item>Ordered List level 1</cds-list-item>
  <cds-list-item>Ordered List level 1</cds-list-item>
  <cds-list-item>Ordered List level 1</cds-list-item>
  <cds-list-item>Ordered List level 1</cds-list-item>
  <cds-list-item>Ordered List level 1</cds-list-item>
  <cds-list-item>Ordered List level 1</cds-list-item>
</cds-ordered-list>`;

export const Nested = () => html`<cds-ordered-list>
  <cds-list-item>
    Ordered List level 1
    <cds-ordered-list native>
      <cds-list-item>Ordered List level 2</cds-list-item>
      <cds-list-item>
        Ordered List level 2
        <cds-ordered-list native>
          <cds-list-item>Ordered List level 3</cds-list-item>
          <cds-list-item>Ordered List level 3</cds-list-item>
        </cds-ordered-list>
      </cds-list-item>
    </cds-ordered-list>
  </cds-list-item>
  <cds-list-item>Ordered List level 1</cds-list-item>
  <cds-list-item>Ordered List level 1</cds-list-item>
</cds-ordered-list>`;

export const Playground = (args) => {
  const { isExpressive, native } = args?.[`${prefix}-list`] ?? {};
  return html`
    <cds-ordered-list ?isExpressive="${isExpressive}" ?native="${native}">
      <cds-list-item>
        Ordered List level 1
        <cds-ordered-list ?isExpressive="${isExpressive}" ?native="${native}">
          <cds-list-item>Ordered List level 2</cds-list-item>
          <cds-list-item>
            Ordered List level 2
            <cds-ordered-list ?isExpressive="${isExpressive}" ?native="${native}">
              <cds-list-item>Ordered List level 2</cds-list-item>
              <cds-list-item>Ordered List level 2</cds-list-item>
            </cds-ordered-list>
          </cds-list-item>
        </cds-ordered-list>
      </cds-list-item>
      <cds-list-item>Ordered List level 1</cds-list-item>
      <cds-list-item>Ordered List level 1</cds-list-item>
      <cds-list-item>Ordered List level 1</cds-list-item>
      <cds-list-item>Ordered List level 1</cds-list-item>
      <cds-list-item>Ordered List level 1</cds-list-item>
      <cds-list-item>Ordered List level 1</cds-list-item>
      <cds-list-item>Ordered List level 1</cds-list-item>
      <cds-list-item>Ordered List level 1</cds-list-item>
      <cds-list-item>Ordered List level 1</cds-list-item>
      <cds-list-item>Ordered List level 1</cds-list-item>
      <cds-list-item>Ordered List level 1</cds-list-item>
      <cds-list-item>Ordered List level 1</cds-list-item>
    </cds-ordered-list>
  </cds-ordered-list>
  `;
};

Playground.parameters = {
  ...storyDocs.parameters,
  knobs: {
    [`${prefix}-list`]: () => ({
      isExpressive: boolean('Expressive (isExpressive)', false),
      native: boolean('Native (native)', false),
    }),
  },
};
