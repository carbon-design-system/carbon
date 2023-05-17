/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import ListItem from '../ListItem';
import UnorderedList from '../UnorderedList';
import { withKnobs, boolean } from '@storybook/addon-knobs';

const props = {
  regular: () => {
    return {
      isExpressive: boolean('Expressive', false),
    };
  },
};

export default {
  title: 'Components/UnorderedList',
  component: UnorderedList,
  subcomponents: {
    ListItem,
  },
  decorators: [withKnobs],
};

export const Default = () => (
  <UnorderedList>
    <ListItem>Unordered List level 1</ListItem>
    <ListItem>Unordered List level 1</ListItem>
    <ListItem>Unordered List level 1</ListItem>
  </UnorderedList>
);

export const Nested = () => {
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

export const Playground = (args) => (
  <UnorderedList {...args}>
    <ListItem>Unordered List level 1</ListItem>
    <ListItem>Unordered List level 1</ListItem>
    <ListItem>Unordered List level 1</ListItem>
  </UnorderedList>
);

Playground.argTypes = {
  isExpressive: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
};
