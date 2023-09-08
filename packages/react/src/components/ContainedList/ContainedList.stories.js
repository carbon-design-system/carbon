/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';

import { action } from '@storybook/addon-actions';
import {
  Add,
  Apple,
  Fish,
  Strawberry,
  Close,
  Wheat,
} from '@carbon/icons-react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';

import Button from '../Button';
import Search from '../Search';
import OverflowMenu from '../OverflowMenu';
import OverflowMenuItem from '../OverflowMenuItem';
import Tag from '../Tag';

import { usePrefix } from '../../internal/usePrefix';

import mdx from './ContainedList.mdx';

import ContainedList, { ContainedListItem } from '.';
import ExpandableSearch from '../ExpandableSearch';

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
      renderIcon={Close}
    />
  );

  return (
    <ContainedList label="List title" kind="on-page" action={''}>
      <ContainedListItem action={itemAction}>List item</ContainedListItem>
      <ContainedListItem action={itemAction} disabled>
        List item
      </ContainedListItem>
      <ContainedListItem action={itemAction}>List item</ContainedListItem>
      <ContainedListItem action={itemAction}>List item</ContainedListItem>
    </ContainedList>
  );
};

export const WithExpandableSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const listItems = [
      'List item 1',
      'List item 2',
      'List item 3',
      'List item 4',
    ];

    const results = listItems.filter((listItem) =>
      listItem.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);

  return (
    <ContainedList
      label="List title"
      kind="on-page"
      action={
        <ExpandableSearch
          placeholder="Filter"
          value={searchTerm}
          onChange={handleChange}
          closeButtonLabelText="Clear search input"
          size="lg"
        />
      }>
      {searchResults.map((listItem, key) => (
        <ContainedListItem key={key}>{listItem}</ContainedListItem>
      ))}
    </ContainedList>
  );
};

export const WithPersistentSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const listItems = [
      'List item 1',
      'List item 2',
      'List item 3',
      'List item 4',
    ];

    const results = listItems.filter((listItem) =>
      listItem.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);

  return (
    <ContainedList label="List title" kind="on-page" action={''}>
      <Search
        placeholder="Filter"
        value={searchTerm}
        onChange={handleChange}
        closeButtonLabelText="Clear search input"
        size="lg"
      />
      {searchResults.map((listItem, key) => (
        <ContainedListItem key={key}>{listItem}</ContainedListItem>
      ))}
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
      renderIcon={Close}
    />
  );

  return (
    <ContainedList label="List title" kind="on-page" action={''}>
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

export const WithListTitleDecorators = () => (
  <ContainedList
    label={
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <span>List title</span>
        <Tag size="sm" role="status" aria-label="4 items in list">
          4
        </Tag>
      </div>
    }
    kind="on-page">
    <ContainedListItem>List item</ContainedListItem>
    <ContainedListItem>List item</ContainedListItem>
    <ContainedListItem>List item</ContainedListItem>
    <ContainedListItem>List item</ContainedListItem>
  </ContainedList>
);

export const WithIcons = () => (
  <ContainedList label="List title" kind="on-page">
    <ContainedListItem renderIcon={Apple}>List item</ContainedListItem>
    <ContainedListItem renderIcon={Wheat}>List item</ContainedListItem>
    <ContainedListItem renderIcon={Strawberry}>List item</ContainedListItem>
    <ContainedListItem renderIcon={Fish}>List item</ContainedListItem>
  </ContainedList>
);

export const _WithLayer = () => (
  <WithLayer>
    <ContainedList label="List title" kind="on-page">
      <ContainedListItem>List item</ContainedListItem>
      <ContainedListItem>List item</ContainedListItem>
    </ContainedList>
  </WithLayer>
);

export const UsageExamples = () => {
  const prefix = usePrefix();

  return (
    <>
      <ContainedList
        label="List title"
        action={
          <Button
            hasIconOnly
            iconDescription="Add"
            renderIcon={Add}
            tooltipPosition="left"
          />
        }>
        {[...Array(3)].map((_, i) => (
          <ContainedListItem
            key={i}
            action={
              <OverflowMenu flipped size="lg" ariaLabel="List item options">
                <OverflowMenuItem itemText="View details" />
                <OverflowMenuItem itemText="Edit" />
                <OverflowMenuItem itemText="Remove" isDelete hasDivider />
              </OverflowMenu>
            }>
            List item
          </ContainedListItem>
        ))}
      </ContainedList>
      <ContainedList
        label="List title"
        action={
          <Button
            hasIconOnly
            iconDescription="Add"
            renderIcon={Add}
            tooltipPosition="left"
            kind="ghost"
          />
        }>
        {[...Array(3)].map((_, i) => (
          <ContainedListItem key={i}>
            List item
            <br />
            <span className={`${prefix}--label ${prefix}--label--no-margin`}>
              Description text
            </span>
          </ContainedListItem>
        ))}
      </ContainedList>
      <ContainedList label="List title">
        {[...Array(3)].map((_, i) => (
          <ContainedListItem key={i}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                columnGap: '1rem',
              }}>
              <span>List item</span>
              <span>List item details</span>
              <span>List item details</span>
            </div>
          </ContainedListItem>
        ))}
      </ContainedList>
    </>
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

Playground.args = {
  label: 'List title',
  kind: 'on-page',
  size: 'lg',
};
