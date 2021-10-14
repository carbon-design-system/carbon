/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Search, ExpandableSearch } from 'carbon-components-react';
import React from 'react';
import { Layer } from '../Layer';

export default { title: 'Components/Search' };

export const Default = () => (
  <Search
    size="lg"
    defaultValue="A default value"
    labelText="Search"
    closeButtonLabelText="Clear search input"
    id="search-1"
    onChange={() => {}}
    onKeyDown={() => {}}
  />
);

export const Expandable = () => (
  <ExpandableSearch
    size="lg"
    labelText="Search"
    closeButtonLabelText="Clear search input"
    id="search-expandable-1"
    onChange={() => {}}
    onKeyDown={() => {}}
  />
);

export const withLayer = () => {
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
          />
        </Layer>
      </Layer>
    </>
  );
};

export const ExpandableWithLayer = () => {
  return (
    <>
      <ExpandableSearch
        size="lg"
        labelText="First Layer"
        closeButtonLabelText="Clear search input"
        id="search-expandable-1"
        onChange={() => {}}
        onKeyDown={() => {}}
      />
      <Layer>
        <ExpandableSearch
          size="lg"
          labelText="Second Layer"
          closeButtonLabelText="Clear search input"
          id="search-expandable-1"
          onChange={() => {}}
          onKeyDown={() => {}}
        />
        <Layer>
          <ExpandableSearch
            size="lg"
            labelText="Third Layer"
            closeButtonLabelText="Clear search input"
            id="search-expandable-1"
            onChange={() => {}}
            onKeyDown={() => {}}
          />
        </Layer>
      </Layer>
    </>
  );
};
