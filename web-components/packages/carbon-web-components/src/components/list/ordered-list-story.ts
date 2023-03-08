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

export const Default = (args) => {
  const { isExpressive, native } = args?.['cds-list'] ?? {};
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

Default.storyName = 'Default';

export default {
  title: 'Components/Ordered List',
  parameters: {
    ...storyDocs.parameters,
    knobs: {
      'cds-list': () => ({
        isExpressive: boolean('Expressive (isExpressive)', false),
        native: boolean('Native (native)', false),
      }),
    },
  },
};
