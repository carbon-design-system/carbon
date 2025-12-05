/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import ListItem from '../ListItem';
import UnorderedList from '../UnorderedList';
import mdx from './UnorderedList.mdx';

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
  args: {
    theme: 'g10',
  },
  argTypes: {
    theme: {
      options: ['white', 'g10', 'g90', 'g100'],
      control: { type: 'select' },
      description: 'The theme to apply to the component.',
    },
  },
};

export const Default = (args) => {
  return (
    <UnorderedList {...args}>
      <ListItem>Unordered List level 1</ListItem>
      <ListItem>Unordered List level 1</ListItem>
      <ListItem>Unordered List level 1</ListItem>
    </UnorderedList>
  );
};

Default.args = {
  isExpressive: false,
};

Default.argTypes = {
  isExpressive: {
    control: {
      type: 'boolean',
    },
  },
  theme: {
    options: ['white', 'g10', 'g90', 'g100'],
    control: { type: 'select' },
    description: 'The theme to apply to the component.',
  },
};

export const Nested = () => {
  const props = {
    regular: () => {
      return {
        isExpressive: false,
      };
    },
  };
  const regularProps = props.regular();

  return (
    <UnorderedList {...regularProps}>
      <ListItem>
        Unordered List level 1
        <UnorderedList nested>
          <ListItem>Unordered List level 2</ListItem>
          <ListItem>
            Unordered List level 2
            <UnorderedList nested>
              <ListItem>Unordered List level 2</ListItem>
              <ListItem>Unordered List level 2</ListItem>
            </UnorderedList>
          </ListItem>
        </UnorderedList>
      </ListItem>
      <ListItem>Unordered List level 1</ListItem>
      <ListItem>Unordered List level 1</ListItem>
    </UnorderedList>
  );
};

Nested.storyName = 'nested';
