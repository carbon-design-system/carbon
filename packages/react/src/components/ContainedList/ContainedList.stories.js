/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect } from 'react';

import { action } from 'storybook/actions';
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

import mdx from './ContainedList.mdx';

import ContainedList, { ContainedListItem } from '.';
import ExpandableSearch from '../ExpandableSearch';

export default {
  title: 'Components/ContainedList',
  component: ContainedList,
  subcomponents: { ContainedListItem },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const sharedArgs = {
  className: '',
  isInset: false,
  kind: 'on-page',
  label: 'List title',
};

const sharedArgTypes = {
  className: {
    control: 'text',
  },
  isInset: {
    control: 'boolean',
  },
  kind: {
    control: 'select',
    options: ['on-page', 'disclosed'],
  },
  label: {
    control: 'text',
  },
  size: {
    control: 'select',
    options: ['sm', 'md', 'lg', 'xl'],
  },
};

const sharedParameters = {
  controls: {
    include: Object.keys(sharedArgTypes),
  },
};

const customLabelParameters = {
  controls: {
    include: Object.keys(sharedArgTypes).filter((name) => name !== 'label'),
  },
};

const DefaultStory = (args) => (
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

export const Default = DefaultStory.bind({});

Default.args = {
  ...sharedArgs,
  size: 'lg',
};
Default.argTypes = sharedArgTypes;
Default.parameters = sharedParameters;

export const Disclosed = (args) => {
  return (
    <>
      <ContainedList {...args} kind="disclosed">
        <ContainedListItem>List item</ContainedListItem>
        <ContainedListItem>List item</ContainedListItem>
        <ContainedListItem>List item</ContainedListItem>
        <ContainedListItem>List item</ContainedListItem>
      </ContainedList>
      <ContainedList {...args} kind="disclosed">
        <ContainedListItem>List item</ContainedListItem>
        <ContainedListItem>List item</ContainedListItem>
        <ContainedListItem>List item</ContainedListItem>
        <ContainedListItem>List item</ContainedListItem>
      </ContainedList>
    </>
  );
};

Disclosed.args = {
  ...sharedArgs,
  kind: 'disclosed',
};
Disclosed.argTypes = {
  ...sharedArgTypes,
  kind: {
    ...sharedArgTypes.kind,
    table: { readonly: true },
  },
};
Disclosed.parameters = sharedParameters;

export const WithInteractiveItems = (args) => {
  const onClick = action('onClick (ContainedListItem)');

  return (
    <ContainedList {...args}>
      <ContainedListItem onClick={onClick}>List item</ContainedListItem>
      <ContainedListItem onClick={onClick} disabled>
        List item
      </ContainedListItem>
      <ContainedListItem onClick={onClick}>List item</ContainedListItem>
      <ContainedListItem onClick={onClick}>List item</ContainedListItem>
    </ContainedList>
  );
};

WithInteractiveItems.args = { ...sharedArgs };
WithInteractiveItems.argTypes = sharedArgTypes;
WithInteractiveItems.parameters = sharedParameters;

export const WithActions = (args) => {
  const itemAction = (
    <Button
      kind="ghost"
      iconDescription="Dismiss"
      hasIconOnly
      renderIcon={Close}
      aria-label="Dismiss"
    />
  );

  return (
    <ContainedList {...args} action={''}>
      <ContainedListItem action={itemAction}>List item</ContainedListItem>
      <ContainedListItem action={itemAction} disabled>
        List item
      </ContainedListItem>
      <ContainedListItem action={itemAction}>List item</ContainedListItem>
      <ContainedListItem action={itemAction}>List item</ContainedListItem>
    </ContainedList>
  );
};

WithActions.args = { ...sharedArgs };
WithActions.argTypes = sharedArgTypes;
WithActions.parameters = sharedParameters;

export const WithExpandableSearch = (args) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  React.useEffect(() => {
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
      {...args}
      action={
        <ExpandableSearch
          placeholder="Filter"
          labelText="Search"
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

WithExpandableSearch.args = { ...sharedArgs };
WithExpandableSearch.argTypes = sharedArgTypes;
WithExpandableSearch.parameters = sharedParameters;

export const WithPersistentSearch = (args) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  React.useEffect(() => {
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
    <ContainedList {...args} action={''}>
      <Search
        placeholder="Filter"
        value={searchTerm}
        onChange={handleChange}
        closeButtonLabelText="Clear search input"
        size="lg"
        labelText="Filter search"
      />
      {searchResults.map((listItem, key) => (
        <ContainedListItem key={key}>{listItem}</ContainedListItem>
      ))}
    </ContainedList>
  );
};

WithPersistentSearch.args = { ...sharedArgs };
WithPersistentSearch.argTypes = sharedArgTypes;
WithPersistentSearch.parameters = sharedParameters;

export const WithInteractiveItemsAndActions = (args) => {
  const onClick = action('onClick (ContainedListItem)');
  const itemAction = (
    <Button
      kind="ghost"
      iconDescription="Dismiss"
      hasIconOnly
      renderIcon={Close}
      aria-label="Dismiss"
    />
  );

  return (
    <ContainedList {...args} action={''}>
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

WithInteractiveItemsAndActions.args = { ...sharedArgs };
WithInteractiveItemsAndActions.argTypes = sharedArgTypes;
WithInteractiveItemsAndActions.parameters = sharedParameters;

export const WithListTitleDecorators = (args) => {
  return (
    <ContainedList
      {...args}
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
      }>
      <ContainedListItem>List item</ContainedListItem>
      <ContainedListItem>List item</ContainedListItem>
      <ContainedListItem>List item</ContainedListItem>
      <ContainedListItem>List item</ContainedListItem>
    </ContainedList>
  );
};

WithListTitleDecorators.args = { ...sharedArgs };
WithListTitleDecorators.argTypes = sharedArgTypes;
WithListTitleDecorators.parameters = customLabelParameters;

export const WithIcons = (args) => {
  return (
    <ContainedList {...args}>
      <ContainedListItem renderIcon={Apple}>List item</ContainedListItem>
      <ContainedListItem renderIcon={Wheat}>List item</ContainedListItem>
      <ContainedListItem renderIcon={Strawberry}>List item</ContainedListItem>
      <ContainedListItem renderIcon={Fish}>List item</ContainedListItem>
    </ContainedList>
  );
};

WithIcons.args = { ...sharedArgs };
WithIcons.argTypes = sharedArgTypes;
WithIcons.parameters = sharedParameters;

export const _WithLayer = (args) => {
  return (
    <WithLayer>
      <ContainedList {...args}>
        <ContainedListItem>List item</ContainedListItem>
        <ContainedListItem>List item</ContainedListItem>
      </ContainedList>
    </WithLayer>
  );
};

_WithLayer.args = { ...sharedArgs };
_WithLayer.argTypes = sharedArgTypes;
_WithLayer.parameters = sharedParameters;

export const UsageExamples = (args) => {
  const prefix = 'cds';

  return (
    <>
      <ContainedList
        {...args}
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
        {...args}
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
      <ContainedList {...args}>
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

UsageExamples.args = { ...sharedArgs };
UsageExamples.argTypes = sharedArgTypes;
UsageExamples.parameters = sharedParameters;
