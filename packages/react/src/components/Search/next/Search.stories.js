/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ExpandableSearch } from 'carbon-components-react';
import Search from '../';
import React from 'react';
import { Layer } from '../../Layer';

export default {
  title: 'Components/Search',
  component: Search,
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
  },
  subcomponents: {
    ExpandableSearch,
  },
};

export const Default = (args) => (
  <Search
    size="lg"
    defaultValue="A default value"
    labelText="Search"
    closeButtonLabelText="Clear search input"
    id="search-1"
    onChange={() => {}}
    onKeyDown={() => {}}
    {...args}
  />
);

export const Disabled = (args) => (
  <Search
    disabled
    size="lg"
    defaultValue="A default value"
    labelText="Search"
    closeButtonLabelText="Clear search input"
    id="search-1"
    onChange={() => {}}
    onKeyDown={() => {}}
    {...args}
  />
);

export const Expandable = (args) => (
  <ExpandableSearch
    size="lg"
    labelText="Search"
    closeButtonLabelText="Clear search input"
    id="search-expandable-1"
    onChange={() => {}}
    onKeyDown={() => {}}
    {...args}
  />
);

export const WithLayer = (args) => {
  return (
    <>
      <Search
        size="lg"
        defaultValue="First Layer"
        labelText="Search"
        closeButtonLabelText="Clear search input"
        id="search-1"
        onChange={() => {}}
        onKeyDown={() => {}}
        {...args}
      />
      <Layer>
        <Search
          size="lg"
          defaultValue="Second Layer"
          labelText="Search"
          closeButtonLabelText="Clear search input"
          id="search-1"
          onChange={() => {}}
          onKeyDown={() => {}}
          {...args}
        />
        <Layer>
          <Search
            size="lg"
            defaultValue="Third Layer"
            labelText="Search"
            closeButtonLabelText="Clear search input"
            id="search-1"
            onChange={() => {}}
            onKeyDown={() => {}}
            {...args}
          />
        </Layer>
      </Layer>
    </>
  );
};

export const ExpandableWithLayer = (args) => {
  return (
    <>
      <ExpandableSearch
        size="lg"
        labelText="First Layer"
        closeButtonLabelText="Clear search input"
        id="search-expandable-1"
        onChange={() => {}}
        onKeyDown={() => {}}
        {...args}
      />
      <Layer>
        <ExpandableSearch
          size="lg"
          labelText="Second Layer"
          closeButtonLabelText="Clear search input"
          id="search-expandable-1"
          onChange={() => {}}
          onKeyDown={() => {}}
          {...args}
        />
        <Layer>
          <ExpandableSearch
            size="lg"
            labelText="Third Layer"
            closeButtonLabelText="Clear search input"
            id="search-expandable-1"
            onChange={() => {}}
            onKeyDown={() => {}}
            {...args}
          />
        </Layer>
      </Layer>
    </>
  );
};
