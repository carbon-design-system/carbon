/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import './unordered-list';
import './list-item';
import { boolean } from '@storybook/addon-knobs';
import storyDocs from './list-story.mdx';
import { prefix } from '../../globals/settings';

export const Default = () => html`<cds-unordered-list>
  <cds-list-item>Unordered List level 1</cds-list-item>
  <cds-list-item>Unordered List level 1</cds-list-item>
  <cds-list-item>Unordered List level 1</cds-list-item>
</cds-unordered-list>`;

export default {
  title: 'Components/Unordered List',
};

export const Nested = () => html`<cds-unordered-list>
  <cds-list-item>
    Unordered List level 1
    <cds-unordered-list>
      <cds-list-item>Unordered List level 2</cds-list-item>
      <cds-list-item>
        Unordered List level 2
        <cds-unordered-list>
          <cds-list-item>Unordered List level 3</cds-list-item>
          <cds-list-item>Unordered List level 3</cds-list-item>
        </cds-unordered-list>
      </cds-list-item>
    </cds-unordered-list>
  </cds-list-item>
  <cds-list-item>Unordered List level 1</cds-list-item>
  <cds-list-item>Unordered List level 1</cds-list-item>
</cds-unordered-list>`;

export const Playground = (args) => {
  const { isExpressive } = args?.[`${prefix}-list`] ?? {};
  return html`
    <cds-unordered-list ?isExpressive="${isExpressive}">
      <cds-list-item>
        Unordered List level 1
        <cds-unordered-list ?isExpressive="${isExpressive}">
          <cds-list-item>Unordered List level 2</cds-list-item>
          <cds-list-item>
            Unordered List level 2
            <cds-unordered-list ?isExpressive="${isExpressive}">
              <cds-list-item>Unordered List level 2</cds-list-item>
              <cds-list-item>Unordered List level 2</cds-list-item>
            </cds-unordered-list>
          </cds-list-item>
        </cds-unordered-list>
      </cds-list-item>
      <cds-list-item>Unordered List level 1</cds-list-item>
      <cds-list-item>Unordered List level 1</cds-list-item>
    </cds-unordered-list>
  `;
};

Playground.parameters = {
  ...storyDocs.parameters,
  knobs: {
    [`${prefix}-list`]: () => ({
      isExpressive: boolean('Expressive (isExpressive)', false),
    }),
  },
};
