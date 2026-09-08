/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import ListItem from '../ListItem';
import UnorderedList from '../UnorderedList';
import mdx from './UnorderedList.mdx';

const args = {
  isExpressive: false,
  nested: false,
};

const argTypes = {
  isExpressive: {
    control: {
      type: 'boolean',
    },
  },
  nested: {
    control: {
      type: 'boolean',
    },
  },
};

export default {
  title: 'Components/UnorderedList',
  component: UnorderedList,
  subcomponents: {
    ListItem,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
  args,
  argTypes,
};

export const Default = (args) => {
  return (
    <UnorderedList {...args}>
      <ListItem>Review pull requests</ListItem>
      <ListItem>Update dependencies</ListItem>
      <ListItem>Publish the release notes</ListItem>
    </UnorderedList>
  );
};

export const Nested = ({ nested, ...listArgs }) => {
  return (
    <UnorderedList {...listArgs}>
      <ListItem>
        Prepare the release
        <UnorderedList {...listArgs} nested={nested}>
          <ListItem>Review pull requests</ListItem>
          <ListItem>
            Update dependencies
            <UnorderedList {...listArgs} nested={nested}>
              <ListItem>Run the test suite</ListItem>
              <ListItem>Resolve security alerts</ListItem>
            </UnorderedList>
          </ListItem>
        </UnorderedList>
      </ListItem>
      <ListItem>Publish the release notes</ListItem>
      <ListItem>Notify maintainers</ListItem>
    </UnorderedList>
  );
};

Nested.args = {
  nested: true,
};

Nested.argTypes = {
  ...argTypes,
  nested: {
    ...argTypes.nested,
    table: { readonly: true },
  },
};

Nested.storyName = 'nested';
