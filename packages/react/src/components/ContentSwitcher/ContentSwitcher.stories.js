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
import {
  TableOfContents,
  Workspace,
  ViewMode_2,
  Icon,
} from '@carbon/icons-react';

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

const sharedArgTypes = {
  children: {
    control: false,
  },
  className: {
    control: false,
  },
  onChange: {
    action: 'onChange',
  },
  size: {
    options: ['sm', 'md', 'lg'],
  },
};

export const Default = (args) => (
  <ContentSwitcher {...args}>
    <Switch name="one" text="First section" />
    <Switch name="two" text="Second section" />
    <Switch name="three" text="Third section" />
  </ContentSwitcher>
);

Default.argTypes = {
  ...sharedArgTypes,
};

export const _WithLayer = (args) => (
  <WithLayer>
    <ContentSwitcher onChange={() => {}} {...args}>
      <Switch name="one" text="First section" />
      <Switch name="two" text="Second section" />
      <Switch name="three" text="Third section" />
    </ContentSwitcher>
  </WithLayer>
);

_WithLayer.argTypes = {
  ...sharedArgTypes,
};

export const IconOnly = (args) => (
  <ContentSwitcher onChange={() => {}} {...args}>
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

IconOnly.argTypes = {
  ...sharedArgTypes,
};

export const IconOnlyWithLayer = (args) => (
  <WithLayer>
    <ContentSwitcher onChange={() => {}} {...args}>
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

export const lowContrast = (args) => (
  <ContentSwitcher lowContrast {...args}>
    <Switch name="one" text="First section" />
    <Switch name="two" text="Second section" />
    <Switch name="three" text="Third section" />
  </ContentSwitcher>
);
lowContrast.argTypes = {
  ...sharedArgTypes,
};

export const lowContrastIconOnly = (args) => (
  <ContentSwitcher lowContrast onChange={() => {}} {...args}>
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
lowContrastIconOnly.argTypes = {
  ...sharedArgTypes,
};
IconOnlyWithLayer.argTypes = {
  ...sharedArgTypes,
};
