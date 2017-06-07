import React from 'react';
import { storiesOf } from '@storybook/react';
import OrderedList from '../../components/OrderedList';
import UnorderedList from '../../components/UnorderedList';
import ListItem from '../../components/ListItem';

storiesOf('Lists', module)
  .addWithInfo(
    'ordered',
    `
      Ordered lists typically show content lists where order might be important and thus suggests a sequence.
    `,
    () => (
      <OrderedList>
        <ListItem>Ordered List level 1
          <OrderedList nested>
            <ListItem>Ordered List level 2</ListItem>
            <ListItem>Ordered List level 2</ListItem>
          </OrderedList>
        </ListItem>
        <ListItem>Ordered List level 1</ListItem>
        <ListItem>Ordered List level 1</ListItem>
      </OrderedList>
    ),
  )
  .addWithInfo(
    'unordered',
    `
      Unordered lists typically show content lists where items have equal value and order is not necessarily important.
    `,
    () => (
      <UnorderedList>
        <ListItem>Unordered List level 1
          <UnorderedList nested>
            <ListItem>Unordered List level 2</ListItem>
            <ListItem>Unordered List level 2</ListItem>
          </UnorderedList>
        </ListItem>
        <ListItem>Unordered List level 1</ListItem>
        <ListItem>Unordered List level 1</ListItem>
      </UnorderedList>
    ),
  );
