/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { action } from '@storybook/addon-actions';
import {
  Apple,
  Fish,
  Strawberry,
  SubtractAlt,
  Wheat,
} from '@carbon/icons-react';
import { VStack } from '../Stack';
import Button from '../Button';
import ExpandableSearch from '../ExpandableSearch';
import { Layer } from '../Layer';
import Tag from '../Tag';
import mdx from './ContainedList.mdx';

import ContainedList, { ContainedListItem } from '.';

export default {
  title: 'Components/ContainedList',
  component: ContainedList,
  subcomponents: { ContainedListItem },
  argTypes: {
    action: {
      table: {
        disable: true,
      },
    },
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
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <>
    <ContainedList label="List title" kind="on-page">
      <ContainedListItem>List item</ContainedListItem>
      <ContainedListItem>List item</ContainedListItem>
      <ContainedListItem>List item</ContainedListItem>
      <ContainedListItem>List item</ContainedListItem>
    </ContainedList>
    <ContainedList label="List title" kind="on-page">
      <ContainedListItem>List item</ContainedListItem>
      <ContainedListItem>List item</ContainedListItem>
      <ContainedListItem>List item</ContainedListItem>
      <ContainedListItem>List item</ContainedListItem>
    </ContainedList>
  </>
);

export const Disclosed = () => (
  <>
    <ContainedList label="List title" kind="disclosed">
      <ContainedListItem>List item</ContainedListItem>
      <ContainedListItem>List item</ContainedListItem>
      <ContainedListItem>List item</ContainedListItem>
      <ContainedListItem>List item</ContainedListItem>
    </ContainedList>
    <ContainedList label="List title" kind="disclosed">
      <ContainedListItem>List item</ContainedListItem>
      <ContainedListItem>List item</ContainedListItem>
      <ContainedListItem>List item</ContainedListItem>
      <ContainedListItem>List item</ContainedListItem>
    </ContainedList>
  </>
);

export const WithInteractiveItems = () => {
  const onClick = action('onClick (ContainedListItem)');

  return (
    <ContainedList label="List title" kind="on-page">
      <ContainedListItem onClick={onClick}>List item</ContainedListItem>
      <ContainedListItem onClick={onClick} disabled>
        List item
      </ContainedListItem>
      <ContainedListItem onClick={onClick}>List item</ContainedListItem>
      <ContainedListItem onClick={onClick}>List item</ContainedListItem>
    </ContainedList>
  );
};

export const WithActions = () => {
  const itemAction = (
    <Button
      kind="ghost"
      iconDescription="Dismiss"
      hasIconOnly
      renderIcon={SubtractAlt}
    />
  );

  return (
    <ContainedList
      label="List title"
      kind="on-page"
      action={<ExpandableSearch placeholder="Find item" size="lg" />}>
      <ContainedListItem action={itemAction}>List item</ContainedListItem>
      <ContainedListItem action={itemAction} disabled>
        List item
      </ContainedListItem>
      <ContainedListItem action={itemAction}>List item</ContainedListItem>
      <ContainedListItem action={itemAction}>List item</ContainedListItem>
    </ContainedList>
  );
};

export const WithInteractiveItemsAndActions = () => {
  const onClick = action('onClick (ContainedListItem)');
  const itemAction = (
    <Button
      kind="ghost"
      iconDescription="Dismiss"
      hasIconOnly
      renderIcon={SubtractAlt}
    />
  );

  return (
    <ContainedList
      label="List title"
      kind="on-page"
      action={<ExpandableSearch placeholder="Find item" size="lg" />}>
      <ContainedListItem action={itemAction} onClick={onClick}>
        List item
      </ContainedListItem>
      <ContainedListItem action={itemAction} onClick={onClick}>
        List item
      </ContainedListItem>
      <ContainedListItem action={itemAction} onClick={onClick}>
        List item
      </ContainedListItem>
      <ContainedListItem action={itemAction} onClick={onClick}>
        List item
      </ContainedListItem>
    </ContainedList>
  );
};

export const WithListTitleDecorators = () => {
  return (
    <ContainedList
      label={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <span>List title</span>
          <Tag size="sm">4</Tag>
        </div>
      }
      kind="on-page">
      <ContainedListItem>List item</ContainedListItem>
      <ContainedListItem>List item</ContainedListItem>
      <ContainedListItem>List item</ContainedListItem>
      <ContainedListItem>List item</ContainedListItem>
    </ContainedList>
  );
};

export const WithIcons = () => {
  return (
    <ContainedList label="List title" kind="on-page">
      <ContainedListItem renderIcon={Apple}>List item</ContainedListItem>
      <ContainedListItem renderIcon={Wheat}>List item</ContainedListItem>
      <ContainedListItem renderIcon={Strawberry}>List item</ContainedListItem>
      <ContainedListItem renderIcon={Fish}>List item</ContainedListItem>
    </ContainedList>
  );
};

export const WithLayer = () => {
  return (
    <VStack gap={5}>
      <ContainedList label="List title" kind="on-page">
        <ContainedListItem>List item</ContainedListItem>
        <ContainedListItem>List item</ContainedListItem>
      </ContainedList>
      <Layer>
        <VStack gap={5}>
          <ContainedList label="List title" kind="on-page">
            <ContainedListItem>List item</ContainedListItem>
            <ContainedListItem>List item</ContainedListItem>
          </ContainedList>
          <Layer>
            <ContainedList label="List title" kind="on-page">
              <ContainedListItem>List item</ContainedListItem>
              <ContainedListItem>List item</ContainedListItem>
            </ContainedList>
          </Layer>
        </VStack>
      </Layer>
    </VStack>
  );
};

const PlaygroundStory = (args) => (
  <>
    {[...Array(4)].map((_, i) => (
      <ContainedList key={i} {...args}>
        {[...Array(8)].map((_, j) => (
          <ContainedListItem key={`${i}-${j}`}>List item</ContainedListItem>
        ))}
      </ContainedList>
    ))}
  </>
);

export const Playground = PlaygroundStory.bind({});

Playground.argTypes = {
  label: {
    defaultValue: 'List title',
  },
  kind: {
    defaultValue: 'on-page',
  },
  size: {
    defaultValue: 'lg',
  },
};
