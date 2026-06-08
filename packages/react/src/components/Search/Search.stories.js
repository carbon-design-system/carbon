/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { withLayers } from '../../../.storybook/decorators/withLayers';

import ExpandableSearch from '../ExpandableSearch';
import Search from '.';
import SearchSkeleton from './Search.Skeleton';
import mdx from './Search.mdx';
import { useId } from '../../internal/useId';

export default {
  title: 'Components/Search',
  component: Search,
  args: {
    closeButtonLabelText: 'Clear search input',
    disabled: false,
    defaultWidth: 800,
    labelText: 'Site search',
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

export const Default = ({ defaultWidth, ...searchArgs }) => {
  const id = useId('search'); // required for unique id generation when cloning this story in layers stories
  return (
    <div style={{ width: defaultWidth }}>
      <Search id={id} {...searchArgs} />
    </div>
  );
};
Default.parameters = { ...defaultParameters };

export const Expandable = ({ defaultWidth, ...searchArgs }) => {
  const id = useId('search-expandable'); // required for unique id generation when cloning this story in layers stories
  return (
    <div style={{ marginTop: '25px', width: defaultWidth }}>
      <ExpandableSearch id={id} {...searchArgs} />
    </div>
  );
};
Expandable.parameters = { ...expandableParameters };

export const _WithLayer = {
  decorators: [withLayers],
  parameters: { ...defaultParameters, layout: 'fullscreen' },
  render: Default,
};

export const ExpandableWithLayer = {
  decorators: [withLayers],
  parameters: { ...expandableParameters, layout: 'fullscreen' },
  render: Expandable,
};

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
