import React from 'react';
import { storiesOf } from '@storybook/react';
import OrderedList from '../OrderedList';
import ListItem from '../ListItem';

storiesOf('OrderedList', module)
  .add(
    'default',
    () => (
      <OrderedList>
        <ListItem>Unordered List level 1</ListItem>
        <ListItem>Unordered List level 1</ListItem>
        <ListItem>Unordered List level 1</ListItem>
      </OrderedList>
    ),
    {
      info: {
        text: `Lists consist of related content grouped together and organized vertically. Ordered lists are used to present content in a numbered list.`,
      },
    }
  )
  .add(
    'nested',
    () => (
      <OrderedList>
        <ListItem>Unordered List level 1</ListItem>
        <OrderedList nested>
          <ListItem>Unordered List level 2</ListItem>
          <ListItem>Unordered List level 2</ListItem>
          <OrderedList nested>
            <ListItem>Unordered List level 2</ListItem>
            <ListItem>Unordered List level 2</ListItem>
          </OrderedList>
        </OrderedList>
        <ListItem>Unordered List level 1</ListItem>
        <ListItem>Unordered List level 1</ListItem>
      </OrderedList>
    ),
    {
      info: {
        text: `Lists consist of related content grouped together and organized vertically. Ordered lists are used to present content in a numbered list.`,
      },
    }
  );
