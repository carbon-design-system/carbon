/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import storyDocs from './unordered-list.mdx';
import './index';

const defaultArgs = {
  isExpressive: false,
  nested: false,
};

const controls = {
  isExpressive: {
    control: 'boolean',
    description: 'Specify whether this ordered list expressive or not.',
  },
};

export const Default = {
  args: {
    ...defaultArgs,
  },
  argTypes: {
    ...controls,
    nested: {
      control: 'boolean',
      description: 'Specify whether to use nested styling for child lists.',
    },
  },
  render: ({ isExpressive, nested }) =>
    html`<cds-unordered-list ?is-expressive="${isExpressive}" ?nested=${nested}>
      <cds-list-item>Unordered List level 1</cds-list-item>
      <cds-list-item>Unordered List level 1</cds-list-item>
      <cds-list-item>Unordered List level 1</cds-list-item>
    </cds-unordered-list>`,
};

export const Nested = {
  render: () =>
    html`<cds-unordered-list>
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

const meta = {
  title: 'Components/Unordered list',
  parameters: {
    docs: {
      page: storyDocs,
    },
  },
};

export default meta;
