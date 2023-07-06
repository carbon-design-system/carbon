import React from 'react';
import OrderedList from '../OrderedList';
import ListItem from '../ListItem';
import mdx from './OrderedList.mdx';

export default {
  title: 'Components/OrderedList',
  component: OrderedList,
  subcomponents: {
    ListItem,
  },
  parameters: {
    docs: {
      page: mdx,
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

export const Nested = () => {
  return (
    <OrderedList>
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

export const NativeListStyles = () => {
  return (
    <OrderedList native>
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

export const Playground = (args) => (
  <OrderedList {...args}>
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

Playground.args = {
  isExpressive: false,
  native: false,
  nested: false,
};

Playground.argTypes = {
  children: {
    table: {
      disable: true,
    },
  },
  className: {
    table: {
      disable: true,
    },
  },
  isExpressive: {
    control: {
      type: 'boolean',
    },
  },
  native: {
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
