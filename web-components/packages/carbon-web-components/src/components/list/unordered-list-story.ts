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

export const Default = (args) => {
  const { isExpressive } = args?.['cds-list'] ?? {};
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

Default.storyName = 'Default';

export default {
  title: 'Components/Unordered List',
  parameters: {
    ...storyDocs.parameters,
    knobs: {
      'cds-list': () => ({
        isExpressive: boolean('Expressive (isExpressive)', false),
      }),
    },
  },
};
