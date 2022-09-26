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
  Information,
  Strawberry,
  SubtractAlt,
  Wheat,
} from '@carbon/icons-react';
import { VStack } from '../../Stack';
import Button from '../../Button';
import ExpandableSearch from '../../ExpandableSearch';
import Tag from '../../Tag';
import { Tooltip } from '../../Tooltip/next';

import ContainedList, { ContainedListItem } from '../';

export default {
  title: 'Experimental/unstable_ContainedList',
  component: ContainedList,
};

export const OnPage = () => (
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

export const Interactive = () => {
  const onClick = action('onClick (ContainedListItem)');

  return (
    <VStack gap={12}>
      <ContainedList label="List title" kind="on-page">
        <ContainedListItem onClick={onClick}>List item</ContainedListItem>
        <ContainedListItem onClick={onClick} disabled>
          List item
        </ContainedListItem>
        <ContainedListItem onClick={onClick}>List item</ContainedListItem>
        <ContainedListItem onClick={onClick}>List item</ContainedListItem>
      </ContainedList>
      <ContainedList label="List title" kind="disclosed">
        <ContainedListItem onClick={onClick}>List item</ContainedListItem>
        <ContainedListItem onClick={onClick} disabled>
          List item
        </ContainedListItem>
        <ContainedListItem onClick={onClick}>List item</ContainedListItem>
        <ContainedListItem onClick={onClick}>List item</ContainedListItem>
      </ContainedList>
    </VStack>
  );
};

export const Actions = () => {
  const itemAction = (
    <Button
      kind="ghost"
      iconDescription="Dismiss"
      hasIconOnly
      renderIcon={SubtractAlt}
    />
  );

  return (
    <VStack gap={12}>
      <ContainedList
        label="List title"
        kind="on-page"
        action={<ExpandableSearch placeholder="Find item" size="lg" />}>
        <ContainedListItem action={itemAction}>List item</ContainedListItem>
        <ContainedListItem action={itemAction}>List item</ContainedListItem>
        <ContainedListItem action={itemAction}>List item</ContainedListItem>
        <ContainedListItem action={itemAction}>List item</ContainedListItem>
      </ContainedList>
      <ContainedList
        label="List title"
        kind="disclosed"
        action={
          <Button kind="ghost" size="sm">
            Dismiss all
          </Button>
        }>
        <ContainedListItem action={itemAction}>List item</ContainedListItem>
        <ContainedListItem action={itemAction} disabled>
          List item
        </ContainedListItem>
        <ContainedListItem action={itemAction}>List item</ContainedListItem>
        <ContainedListItem action={itemAction}>List item</ContainedListItem>
      </ContainedList>
    </VStack>
  );
};

export const ActionsInteractive = () => {
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
    <VStack gap={12}>
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
      <ContainedList
        label="List title"
        kind="disclosed"
        action={
          <Button kind="ghost" size="sm">
            Dismiss all
          </Button>
        }>
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
    </VStack>
  );
};

export const ListTitleDecorators = () => {
  return (
    <VStack gap={12}>
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
      <ContainedList
        label={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>List title</span>
            <Tooltip align="top" label="Tooltip content">
              <button
                className="sb-tooltip-trigger"
                style={{ color: 'inherit', border: 'none' }}
                type="button">
                <Information style={{ fill: 'currentColor' }} />
              </button>
            </Tooltip>
          </div>
        }
        kind="disclosed">
        <ContainedListItem>List item</ContainedListItem>
        <ContainedListItem>List item</ContainedListItem>
        <ContainedListItem>List item</ContainedListItem>
        <ContainedListItem>List item</ContainedListItem>
      </ContainedList>
    </VStack>
  );
};

export const Icons = () => {
  return (
    <VStack gap={12}>
      <ContainedList label="List title" kind="on-page">
        <ContainedListItem renderIcon={Apple}>List item</ContainedListItem>
        <ContainedListItem renderIcon={Wheat}>List item</ContainedListItem>
        <ContainedListItem renderIcon={Strawberry}>List item</ContainedListItem>
        <ContainedListItem renderIcon={Fish}>List item</ContainedListItem>
      </ContainedList>
      <ContainedList label="List title" kind="disclosed">
        <ContainedListItem renderIcon={Apple}>List item</ContainedListItem>
        <ContainedListItem renderIcon={Wheat}>List item</ContainedListItem>
        <ContainedListItem renderIcon={Strawberry}>List item</ContainedListItem>
        <ContainedListItem renderIcon={Fish}>List item</ContainedListItem>
      </ContainedList>
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
  action: {
    control: false,
  },
  children: {
    control: false,
  },
  className: {
    control: false,
  },
  label: {
    defaultValue: 'List title',
  },
  kind: {
    defaultValue: 'on-page',
  },
};
