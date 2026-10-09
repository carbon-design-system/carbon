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

const sharedArgs = {
  closeButtonLabelText: 'Clear search input',
  disabled: false,
  defaultWidth: 800,
  labelText: 'Site search',
  placeholder: 'Placeholder text',
  size: 'md',
  type: 'search',
};

export default {
  title: 'Components/Search',
  component: Search,
  args: sharedArgs,
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

export const Expandable = (args) => (
  <div style={{ marginTop: '25px', width: args.defaultWidth }}>
    <ExpandableSearch id="search-expandable-1" {...args} />
  </div>
);
Expandable.args = {
  ...sharedArgs,
};
Expandable.parameters = { ...expandableParameters };

export const _WithLayer = (args) => (
  <WithLayer>
    {(layer) => (
      <div style={{ width: args.defaultWidth }}>
        <Search id={`search-${layer}`} {...args} />
      </div>
    )}
  </WithLayer>
);
_WithLayer.args = {
  ...sharedArgs,
};
_WithLayer.parameters = { ...defaultParameters };

export const ExpandableWithLayer = (args) => (
  <WithLayer>
    {(layer) => (
      <div style={{ marginTop: '25px', width: args.defaultWidth }}>
        <ExpandableSearch id={`search-expandable-${layer}`} {...args} />
      </div>
    )}
  </WithLayer>
);
ExpandableWithLayer.args = {
  ...sharedArgs,
};
ExpandableWithLayer.parameters = { ...expandableParameters };

export const Default = (args) => (
  <div style={{ width: args.defaultWidth }}>
    <Search id="search-default-1" {...args} />
  </div>
);
Default.args = {
  ...sharedArgs,
};
Default.parameters = { ...defaultParameters };

export const Skeleton = (args) => (
  <div style={{ width: args.defaultWidth }}>
    <SearchSkeleton size={args.size} />
  </div>
);
Skeleton.args = {
  defaultWidth: 800,
  size: 'md',
};
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
