import React from 'react';
import OrderedList from '../OrderedList';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import ListItem from '../ListItem';
import mdx from './OrderedList.mdx';

const props = {
  regular: () => {
    return {
      isExpressive: boolean('Expressive', false),
    };
  },
};

export default {
  title: 'Components/OrderedList',
  decorators: [withKnobs],
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
    <ListItem>Ordered List level 1</ListItem>
    <ListItem>Ordered List level 1</ListItem>
    <ListItem>Ordered List level 1</ListItem>
    <ListItem>Ordered List level 1</ListItem>
    <ListItem>Ordered List level 1</ListItem>
    <ListItem>Ordered List level 1</ListItem>
    <ListItem>Ordered List level 1</ListItem>
    <ListItem>Ordered List level 1</ListItem>
    <ListItem>Ordered List level 1</ListItem>
    <ListItem>Ordered List level 1</ListItem>
  </OrderedList>
);

Default.storyName = 'default';

Default.parameters = {
  info: {
    text: `Lists consist of related content grouped together and organized vertically. Ordered lists are used to present content in a numbered list.`,
  },
};

export const Nested = () => {
  const regularProps = props.regular();

  return (
    <OrderedList {...regularProps}>
      <ListItem>
        Ordered List level 1
        <OrderedList nested>
          <ListItem>Ordered List level 2</ListItem>
          <ListItem>
            Ordered List level 2
            <OrderedList nested>
              <ListItem>Ordered List level 3</ListItem>
              <ListItem>Ordered List level 3</ListItem>
            </OrderedList>
          </ListItem>
        </OrderedList>
      </ListItem>
      <ListItem>Ordered List level 1</ListItem>
      <ListItem>Ordered List level 1</ListItem>
    </OrderedList>
  );
};

Nested.storyName = 'nested';

Nested.parameters = {
  info: {
    text: `Lists consist of related content grouped together and organized vertically. Ordered lists are used to present content in a numbered list.`,
  },
};

export const NativeListStyles = () => {
  const regularProps = props.regular();

  return (
    <OrderedList native {...regularProps}>
      <ListItem>Ordered List level 1</ListItem>
      <ListItem>Ordered List level 1</ListItem>
      <ListItem>Ordered List level 1</ListItem>
      <ListItem>
        Ordered List level 1
        <OrderedList nested>
          <ListItem>Ordered List level 2</ListItem>
          <ListItem>Ordered List level 2</ListItem>
          <ListItem>Ordered List level 2</ListItem>
          <ListItem>Ordered List level 2</ListItem>
        </OrderedList>
      </ListItem>
      <ListItem>Ordered List level 1</ListItem>
      <ListItem>Ordered List level 1</ListItem>
      <ListItem>Ordered List level 1</ListItem>
      <ListItem>Ordered List level 1</ListItem>
      <ListItem>Ordered List level 1</ListItem>
      <ListItem>Ordered List level 1</ListItem>
      <ListItem>Ordered List level 1</ListItem>
      <ListItem>Ordered List level 1</ListItem>
    </OrderedList>
  );
};

Default.storyName = 'native styles';

NativeListStyles.parameters = {
  info: {
    text: `Lists consist of related content grouped together and organized vertically. Ordered lists are used to present content in a numbered list.`,
  },
};
