/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import storyDocs from './list.mdx';
import './index';

const defaultArgs = {
  isExpressive: false,
};

const controls = {
  isExpressive: {
    control: 'boolean',
    description: 'Specify whether this ordered list expressive or not.',
  },
};

export const Default = {
  render: () => html`<cds-unordered-list>
    <cds-list-item>Unordered List level 1</cds-list-item>
    <cds-list-item>Unordered List level 1</cds-list-item>
    <cds-list-item>Unordered List level 1</cds-list-item>
  </cds-unordered-list>`,
};

export const Nested = {
  render: () => html`<cds-unordered-list>
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
  </cds-unordered-list>`,
};

export const Playground = {
  args: defaultArgs,
  argTypes: controls,

  render: ({ isExpressive }) => html`
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
  `,
};

const meta = {
  title: 'Components/Unordered list',
  parameters: {
    docs: {
      page: storyDocs,
    },
  },
};

export default meta;
