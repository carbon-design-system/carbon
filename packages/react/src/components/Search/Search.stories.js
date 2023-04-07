/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';

import ExpandableSearch from '../ExpandableSearch';
import Search from '.';

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
};

export const Default = () => (
  <Search
    size="lg"
    placeholder="Find your items"
    labelText="Search"
    closeButtonLabelText="Clear search input"
    id="search-1"
    onChange={() => {}}
    onKeyDown={() => {}}
  />
);

export const Disabled = () => (
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

export const _WithLayer = () => (
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

export const ExpandableWithLayer = () => (
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

export const Playground = (args) => (
  <div style={{ width: args.playgroundWidth }}>
    <Search id="search-playground-1" {...args} />
  </div>
);

Playground.argTypes = {
  playgroundWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
    defaultValue: 300,
  },
  className: {
    table: {
      disable: true,
    },
  },
  closeButtonLabelText: {
    control: {
      type: 'text',
    },
    defaultValue: 'Clear search input',
  },
  disabled: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  id: {
    table: {
      disable: true,
    },
  },
  defaultValue: {
    control: {
      type: 'text',
    },
    defaultValue: 'Default value',
  },
  labelText: {
    control: {
      type: 'text',
    },
    defaultValue: 'Label text',
  },
  placeholder: {
    control: {
      type: 'text',
    },
    defaultValue: 'Placeholder text',
  },
  renderIcon: {
    control: false,
  },
  role: {
    control: {
      type: 'text',
    },
    defaultValue: 'searchbox',
  },
  size: {
    defaultValue: 'md',
    options: ['sm', 'md', 'lg'],
    control: {
      type: 'select',
    },
  },
  type: {
    control: {
      type: 'text',
    },
    defaultValue: 'text',
  },
};
