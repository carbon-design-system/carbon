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
  type: {
    control: {
      type: 'select',
    },
    options: ['disc', 'circle', 'square', 'hyphen', 'custom'],
  },
  customMarker: {
    control: {
      type: 'text',
    },
    if: { arg: 'type', eq: 'custom' },
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

export const MarkerTypes = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3>Disc (default filled circle)</h3>
        <UnorderedList type="disc">
          <ListItem>Item with disc marker</ListItem>
          <ListItem>Item with disc marker</ListItem>
          <ListItem>Item with disc marker</ListItem>
        </UnorderedList>
      </div>
      <div>
        <h3>Circle (hollow circle)</h3>
        <UnorderedList type="circle">
          <ListItem>Item with circle marker</ListItem>
          <ListItem>Item with circle marker</ListItem>
          <ListItem>Item with circle marker</ListItem>
        </UnorderedList>
      </div>
      <div>
        <h3>Square</h3>
        <UnorderedList type="square">
          <ListItem>Item with square marker</ListItem>
          <ListItem>Item with square marker</ListItem>
          <ListItem>Item with square marker</ListItem>
        </UnorderedList>
      </div>
      <div>
        <h3>Hyphen (default for top-level)</h3>
        <UnorderedList type="hyphen">
          <ListItem>Item with hyphen marker</ListItem>
          <ListItem>Item with hyphen marker</ListItem>
          <ListItem>Item with hyphen marker</ListItem>
        </UnorderedList>
      </div>
      <div>
        <h3>Custom marker</h3>
        <UnorderedList type="custom" customMarker="→">
          <ListItem>Item with custom arrow marker</ListItem>
          <ListItem>Item with custom arrow marker</ListItem>
          <ListItem>Item with custom arrow marker</ListItem>
        </UnorderedList>
      </div>
    </div>
  );
};

MarkerTypes.storyName = 'marker types';

export const NestedWithMarkerTypes = () => {
  return (
    <UnorderedList type="disc">
      <ListItem>
        Level 1 with disc
        <UnorderedList nested type="circle">
          <ListItem>Level 2 with circle</ListItem>
          <ListItem>
            Level 2 with circle
            <UnorderedList nested type="square">
              <ListItem>Level 3 with square</ListItem>
              <ListItem>Level 3 with square</ListItem>
            </UnorderedList>
          </ListItem>
        </UnorderedList>
      </ListItem>
      <ListItem>Level 1 with disc</ListItem>
      <ListItem>Level 1 with disc</ListItem>
    </UnorderedList>
  );
};

NestedWithMarkerTypes.storyName = 'nested with marker types';
