/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { OverflowMenu } from './OverflowMenu';
import { default as OverflowMenuItem } from '../OverflowMenuItem';
import { Filter } from '@carbon/icons-react';
import mdx from './OverflowMenu.mdx';

export default {
  title: 'Components/OverflowMenu',
  component: OverflowMenu,
  subcomponents: {
    OverflowMenuItem,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const CarbonBuilderLink = () => {
  return (
    <>
      <a href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22Overflow%20menu%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22flipped%22%3Afalse%2C%22placement%22%3A%22bottom%22%2C%22type%22%3A%22overflow-menu%22%2C%22items%22%3A%5B%7B%22type%22%3A%22overflow-menu-item%22%2C%22itemText%22%3A%22Option%201%22%2C%22disabled%22%3Afalse%2C%22isDelete%22%3Afalse%2C%22hasDivider%22%3Afalse%2C%22id%22%3A%223%22%2C%22codeContext%22%3A%7B%22name%22%3A%22overflow-menu-item-3%22%7D%7D%2C%7B%22type%22%3A%22overflow-menu-item%22%2C%22itemText%22%3A%22Option%202%22%2C%22disabled%22%3Afalse%2C%22isDelete%22%3Afalse%2C%22hasDivider%22%3Afalse%2C%22id%22%3A%224%22%2C%22codeContext%22%3A%7B%22name%22%3A%22overflow-menu-item-4%22%7D%7D%5D%2C%22id%22%3A%222%22%2C%22codeContext%22%3A%7B%22name%22%3A%22overflow-menu-2%22%7D%7D%5D%2C%22id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D" target="_blank" rel="noreferrer">
        Edit on Carbon UI Builder 
      </a>
      <br></br>
      <br></br>
    </>
  );
};

export const Default = () => (
  <>
    <CarbonBuilderLink></CarbonBuilderLink>
    <OverflowMenu aria-label="overflow-menu">
        <OverflowMenuItem itemText="Stop app" />
        <OverflowMenuItem itemText="Restart app" />
        <OverflowMenuItem itemText="Rename app" />
        <OverflowMenuItem itemText="Clone and move app" disabled requireTitle />
        <OverflowMenuItem itemText="Edit routes and access" requireTitle />
        <OverflowMenuItem hasDivider isDelete itemText="Delete app" />
      </OverflowMenu>
  </>
);

export const RenderCustomIcon = () => (
  <>
    <CarbonBuilderLink></CarbonBuilderLink>
    <OverflowMenu renderIcon={Filter}>
      <OverflowMenuItem itemText="Filter A" />
      <OverflowMenuItem itemText="Filter B" />
    </OverflowMenu>
  </>
);

export const Playground = (args) => (
  <>
    <CarbonBuilderLink></CarbonBuilderLink>
    <OverflowMenu aria-label="overflow-menu" {...args}>
      <OverflowMenuItem itemText="Stop app" />
      <OverflowMenuItem itemText="Restart app" />
      <OverflowMenuItem itemText="Rename app" />
      <OverflowMenuItem itemText="Clone and move app" disabled requireTitle />
      <OverflowMenuItem itemText="Edit routes and access" requireTitle />
      <OverflowMenuItem hasDivider isDelete itemText="Delete app" />
    </OverflowMenu>
  </>
);

Playground.argTypes = {
  ariaLabel: {
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
  direction: {
    table: {
      disable: true,
    },
  },
  flipped: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  focusTrap: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  iconClass: {
    table: {
      disable: true,
    },
  },
  iconDescription: {
    control: { type: 'text' },
  },
  id: {
    table: {
      disable: true,
    },
  },
  light: {
    table: {
      disable: true,
    },
  },
  menuOffset: {
    table: {
      disable: true,
    },
  },
  menuOffsetFlip: {
    table: {
      disable: true,
    },
  },
  menuOptionsClass: {
    table: {
      disable: true,
    },
  },
  open: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  renderIcon: {
    table: {
      disable: true,
    },
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: { type: 'select' },
  },
};
