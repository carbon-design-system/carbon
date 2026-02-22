/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useCallback } from 'react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';

import ExpandableSearch from '../ExpandableSearch';
import Search from '.';
import mdx from './Search.mdx';

export default {
  title: 'Components/Search',
  component: Search,
  argTypes: {
    light: {
      table: {
        disable: true,
      },
    },
  },
  subcomponents: {
    ExpandableSearch,
  },
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: ['id'],
    },
  },
};

export const Disabled = () => {
  return (
    <Search
      disabled
      size="lg"
      placeholder="Find your items"
      labelText="Search"
      closeButtonLabelText="Clear search input"
      id="search-1"
      onChange={() => {}}
      onKeyDown={() => {}}
    />
  );
};

export const Expandable = () => {
  return (
    <div style={{ marginTop: '50px' }}>
      <ExpandableSearch
        size="lg"
        labelText="Search"
        closeButtonLabelText="Clear search input"
        id="search-expandable-1"
        onChange={() => {}}
        onKeyDown={() => {}}
      />
    </div>
  );
};

export const _WithLayer = () => {
  return (
    <WithLayer>
      {(layer) => (
        <Search
          size="lg"
          placeholder="Find your items"
          labelText="Search"
          closeButtonLabelText="Clear search input"
          id={`search-${layer}`}
          onChange={() => {}}
          onKeyDown={() => {}}
        />
      )}
    </WithLayer>
  );
};

export const ExpandableWithLayer = () => {
  return (
    <WithLayer>
      {(layer) => (
        <ExpandableSearch
          size="lg"
          placeholder="Search"
          labelText="First Layer"
          closeButtonLabelText="Clear search input"
          id={`search-expandable-${layer}`}
          onChange={() => {}}
          onKeyDown={() => {}}
        />
      )}
    </WithLayer>
  );
};

export const Default = (args) => {
  return (
    <div style={{ width: args.defaultWidth }}>
      <Search id="search-default-1" {...args} />
    </div>
  );
};

Default.args = {
  closeButtonLabelText: 'Clear search input',
  disabled: false,
  labelText: 'Label text',
  placeholder: 'Placeholder text',
  size: 'md',
  type: 'search',
};

Default.argTypes = {
  defaultWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
  },
  closeButtonLabelText: {
    control: {
      type: 'text',
    },
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  defaultValue: {
    control: {
      type: 'text',
    },
  },
  labelText: {
    control: {
      type: 'text',
    },
  },
  placeholder: {
    control: {
      type: 'text',
    },
  },
  renderIcon: {
    control: false,
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: {
      type: 'select',
    },
  },
};
