/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './ordered-list';
import './unordered-list';
import './list-item';
import { boolean } from '@storybook/addon-knobs';
import storyDocs from './list-story.mdx';

export const ordered = (args) => {
  const { isExpressive } = args?.['bx-list'] ?? {};
  return html`
    <bx-ordered-list ?isExpressive="${isExpressive}">
      <bx-list-item>
        Ordered List level 1
        <bx-ordered-list ?isExpressive="${isExpressive}">
          <bx-list-item>Ordered List level 2</bx-list-item>
          <bx-list-item>
            Ordered List level 2
            <bx-ordered-list ?isExpressive="${isExpressive}">
              <bx-list-item>Ordered List level 2</bx-list-item>
              <bx-list-item>Ordered List level 2</bx-list-item>
            </bx-ordered-list>
          </bx-list-item>
        </bx-ordered-list>
      </bx-list-item>
      <bx-list-item>Ordered List level 1</bx-list-item>
      <bx-list-item>Ordered List level 1</bx-list-item>
    </bx-ordered-list>
  `;
};

export const unordered = (args) => {
  const { isExpressive } = args?.['bx-list'] ?? {};
  return html`
    <bx-unordered-list ?isExpressive="${isExpressive}">
      <bx-list-item>
        Unordered List level 1
        <bx-unordered-list ?isExpressive="${isExpressive}">
          <bx-list-item>Unordered List level 2</bx-list-item>
          <bx-list-item>
            Unordered List level 2
            <bx-unordered-list ?isExpressive="${isExpressive}">
              <bx-list-item>Unordered List level 2</bx-list-item>
              <bx-list-item>Unordered List level 2</bx-list-item>
            </bx-unordered-list>
          </bx-list-item>
        </bx-unordered-list>
      </bx-list-item>
      <bx-list-item>Unordered List level 1</bx-list-item>
      <bx-list-item>Unordered List level 1</bx-list-item>
    </bx-unordered-list>
  `;
};

export default {
  title: 'Components/List',
  parameters: {
    ...storyDocs.parameters,
    knobs: {
      'bx-list': () => ({
        isExpressive: boolean('Expressive (isExpressive)', false),
      }),
    },
  },
};
