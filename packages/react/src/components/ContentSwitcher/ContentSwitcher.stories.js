/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';
import ContentSwitcher from './ContentSwitcher';
import { Switch, IconSwitch } from '../Switch';
import mdx from './ContentSwitcher.mdx';
import { TableOfContents, Workspace, ViewMode_2 } from '@carbon/icons-react';

export default {
  title: 'Components/ContentSwitcher',
  component: ContentSwitcher,
  subcomponents: {
    IconSwitch,
    Switch,
  },
  argTypes: {
    light: {
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
  <ContentSwitcher onChange={() => {}}>
    <Switch name="one" text="First section" />
    <Switch name="two">Second section</Switch>
    <Switch name="three" text="Third section" />
  </ContentSwitcher>
);

export const _WithLayer = () => (
  <WithLayer>
    <ContentSwitcher onChange={() => {}}>
      <Switch name="one" text="First section" />
      <Switch name="two" text="Second section" />
      <Switch name="three" text="Third section" />
    </ContentSwitcher>
  </WithLayer>
);

export const IconOnly = (args) => (
  <ContentSwitcher {...args}>
    <IconSwitch name="one" text="Table of Contents">
      <TableOfContents />
    </IconSwitch>
    <IconSwitch name="two" text="Workspace Test">
      <Workspace />
    </IconSwitch>
    <IconSwitch name="three" text="View Mode">
      <ViewMode_2 />
    </IconSwitch>
  </ContentSwitcher>
);

export const IconOnlyWithLayer = (args) => (
  <WithLayer>
    <ContentSwitcher {...args}>
      <IconSwitch name="one" text="Table of Contents">
        <TableOfContents />
      </IconSwitch>
      <IconSwitch name="two" text="Workspace Test">
        <Workspace />
      </IconSwitch>
      <IconSwitch name="three" text="View Mode">
        <ViewMode_2 />
      </IconSwitch>
    </ContentSwitcher>
  </WithLayer>
);

export const Playground = (args) => (
  <ContentSwitcher {...args}>
    <Switch name="one" text="First section" />
    <Switch name="two" text="Second section" />
    <Switch name="three" text="Third section" />
  </ContentSwitcher>
);

Playground.argTypes = {
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
  onChange: {
    action: 'onChange',
  },
  size: {
    options: ['sm', 'md', 'lg'],
  },
};
