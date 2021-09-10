/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import ListItem from '../ListItem';
import UnorderedList from '../UnorderedList';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import mdx from './UnorderedList.mdx';

const props = {
  regular: () => {
    return {
      isExpressive: boolean('Expressive', false),
    };
  },
};

export default {
  title: 'Components/UnorderedList',
  decorators: [withKnobs],

  parameters: {
    component: UnorderedList,
    docs: {
      page: mdx,
    },
    subcomponents: {
      ListItem,
    },
  },
};

export const Default = () => (
  <UnorderedList>
    <ListItem>Unordered List level 1</ListItem>
    <ListItem>Unordered List level 1</ListItem>
    <ListItem>Unordered List level 1</ListItem>
  </UnorderedList>
);

Default.storyName = 'default';

Default.parameters = {
  info: {
    text:
      'Lists consist of related content grouped together and organized ' +
      'vertically. Unordered lists are used to present content of equal ' +
      'status or value.',
  },
};

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

Nested.parameters = {
  info: {
    text:
      'Lists consist of related content grouped together and organized ' +
      'vertically. Unordered lists are used to present content of equal ' +
      'status or value.',
  },
};
