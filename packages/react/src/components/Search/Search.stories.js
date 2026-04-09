/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';

import ExpandableSearch from '../ExpandableSearch';
import Search from '.';
import SearchSkeleton from './Search.Skeleton';
import mdx from './Search.mdx';

export default {
  title: 'Components/Search',
  component: Search,
  args: {
    closeButtonLabelText: 'Clear search input',
    disabled: false,
    defaultWidth: 800,
    labelText: 'Search',
    placeholder: 'Placeholder text',
    size: 'md',
    type: 'search',
  },
  argTypes: {
    light: {
      table: {
        disable: true,
      },
    },
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
      options: ['xs', 'sm', 'md', 'lg'],
      control: {
        type: 'select',
      },
    },
    value: {
      control: {
        type: 'text',
      },
    },
  },
  subcomponents: {
    ExpandableSearch,
    SearchSkeleton,
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

const defaultParameters = {
  controls: {
    exclude: ['isExpanded', 'renderIcon', 'role'],
  },
};

const expandableParameters = {
  controls: {
    exclude: ['renderIcon', 'role'],
  },
};

export const Expandable = ({ defaultWidth, ...searchArgs }) => (
  <div style={{ marginTop: '25px', width: defaultWidth }}>
    <ExpandableSearch id="search-expandable-1" {...searchArgs} />
  </div>
);
Expandable.parameters = { ...expandableParameters };

export const _WithLayer = ({ defaultWidth, ...searchArgs }) => (
  <WithLayer>
    {(layer) => (
      <div style={{ width: defaultWidth }}>
        <Search id={`search-${layer}`} {...searchArgs} />
      </div>
    )}
  </WithLayer>
);
_WithLayer.parameters = { ...defaultParameters };

export const ExpandableWithLayer = ({ defaultWidth, ...searchArgs }) => (
  <WithLayer>
    {(layer) => (
      <div style={{ marginTop: '25px', width: defaultWidth }}>
        <ExpandableSearch id={`search-expandable-${layer}`} {...searchArgs} />
      </div>
    )}
  </WithLayer>
);
ExpandableWithLayer.parameters = { ...expandableParameters };

export const Default = ({ defaultWidth, ...searchArgs }) => (
  <div style={{ width: defaultWidth }}>
    <Search id="search-default-1" {...searchArgs} />
  </div>
);
Default.parameters = { ...defaultParameters };

export const Skeleton = ({ size, defaultWidth }) => (
  <div style={{ width: defaultWidth }}>
    <SearchSkeleton size={size} />
  </div>
);
Skeleton.argTypes = {
  size: {
    description: 'Specify the size of the SearchSkeleton',
  },
};
Skeleton.parameters = {
  controls: {
    include: ['size', 'defaultWidth'],
  },
};
