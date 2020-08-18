import React from 'react';
import OrderedList from '../OrderedList';
import ListItem from '../ListItem';
import mdx from './OrderedList.mdx';

export default {
  title: 'OrderedList',

  parameters: {
    component: OrderedList,
    docs: {
      page: mdx,
    },

    subcomponents: {
      ListItem,
    },
  },
};

export const Default = () => (
  <OrderedList>
    <ListItem>Ordered List level 1</ListItem>
    <ListItem>Ordered List level 1</ListItem>
    <ListItem>Ordered List level 1</ListItem>
  </OrderedList>
);

Default.storyName = 'default';

export const Nested = () => (
  <OrderedList>
    <ListItem>
      Ordered List level 1
      <OrderedList nested>
        <ListItem>Ordered List level 2</ListItem>
        <ListItem>
          Ordered List level 2
          <OrderedList nested>
            <ListItem>Ordered List level 2</ListItem>
            <ListItem>Ordered List level 2</ListItem>
          </OrderedList>
        </ListItem>
      </OrderedList>
    </ListItem>
    <ListItem>Ordered List level 1</ListItem>
    <ListItem>Ordered List level 1</ListItem>
  </OrderedList>
);

Nested.storyName = 'nested';
