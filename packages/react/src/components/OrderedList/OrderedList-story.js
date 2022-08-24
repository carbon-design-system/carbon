import React from 'react';
import OrderedList from '../OrderedList';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import ListItem from '../ListItem';

const props = {
  regular: () => {
    return {
      isExpressive: boolean('Expressive', false),
    };
  },
};

export default {
  title: 'Components/OrderedList',
  component: OrderedList,
  decorators: [withKnobs],
  subcomponents: {
    ListItem,
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
