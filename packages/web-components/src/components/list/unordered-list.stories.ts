/**
 * Copyright IBM Corp. 2019, 2026
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
    description: 'Specify whether this unordered list is expressive.',
  },
  nested: {
    control: 'boolean',
    description: 'Specify whether to use nested styling for child lists.',
  },
};

export const Default = {
  render: ({ isExpressive, nested }) =>
    html`<cds-unordered-list ?is-expressive="${isExpressive}" ?nested=${nested}>
      <cds-list-item>Review pull requests</cds-list-item>
      <cds-list-item>Update dependencies</cds-list-item>
      <cds-list-item>Publish the release notes</cds-list-item>
    </cds-unordered-list>`,
};

export const Nested = {
  args: {
    nested: true,
  },
  argTypes: {
    ...controls,
    nested: {
      ...controls.nested,
      table: { readonly: true },
    },
  },
  render: ({ isExpressive, nested }) =>
    html`<cds-unordered-list ?is-expressive="${isExpressive}">
      <cds-list-item>
        Prepare the release
        <cds-unordered-list ?is-expressive="${isExpressive}" ?nested=${nested}>
          <cds-list-item>Review pull requests</cds-list-item>
          <cds-list-item>
            Update dependencies
            <cds-unordered-list
              ?is-expressive="${isExpressive}"
              ?nested=${nested}>
              <cds-list-item>Run the test suite</cds-list-item>
              <cds-list-item>Resolve security alerts</cds-list-item>
            </cds-unordered-list>
          </cds-list-item>
        </cds-unordered-list>
      </cds-list-item>
      <cds-list-item>Publish the release notes</cds-list-item>
      <cds-list-item>Notify maintainers</cds-list-item>
    </cds-unordered-list>`,
};

const meta = {
  title: 'Components/Unordered list',
  args: defaultArgs,
  argTypes: controls,
  parameters: {
    docs: {
      page: storyDocs,
    },
  },
};

export default meta;
