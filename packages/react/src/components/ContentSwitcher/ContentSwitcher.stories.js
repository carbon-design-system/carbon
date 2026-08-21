/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';
import { ContentSwitcher } from './ContentSwitcher';
import { Switch, IconSwitch } from '../Switch';
import mdx from './ContentSwitcher.mdx';
import { TableOfContents, Workspace, ViewMode_2 } from '@carbon/icons-react';

const sharedArgs = {
  disabled: false,
  lowContrast: false,
  selectedIndex: 0,
  selectionMode: 'automatic',
  size: 'md',
};

const sharedArgTypes = {
  children: {
    control: false,
  },
  className: {
    control: false,
  },
  disabled: {
    control: 'boolean',
    description: 'Specify disabled attribute to true to disable a button.',
    table: {
      type: { summary: 'bool' },
      defaultValue: { summary: false },
    },
  },
  lowContrast: {
    control: 'boolean',
    table: {
      defaultValue: { summary: false },
    },
  },
  onChange: {
    action: 'onChange',
  },
  selectedIndex: {
    control: {
      type: 'number',
      min: 0,
      max: 2,
      step: 1,
    },
    table: {
      defaultValue: { summary: 0 },
    },
  },
  selectionMode: {
    control: 'radio',
    options: ['automatic', 'manual'],
    table: {
      defaultValue: { summary: '"automatic"' },
    },
  },
  size: {
    control: 'radio',
    options: ['sm', 'md', 'lg'],
    table: {
      defaultValue: { summary: '"md"' },
    },
  },
};

const sharedParameters = {
  controls: {
    include: Object.keys(sharedArgs),
  },
};

export default {
  title: 'Components/ContentSwitcher',
  component: ContentSwitcher,
  subcomponents: {
    IconSwitch,
    Switch,
  },
  parameters: {
    docs: {
      page: mdx,
    },
    ...sharedParameters,
  },
};

export const Default = ({ disabled, ...args }) => (
  <ContentSwitcher {...args}>
    <Switch name="one" text="First section" disabled={disabled} />
    <Switch name="two" text="Second section" disabled={disabled} />
    <Switch name="three" text="Third section" disabled={disabled} />
  </ContentSwitcher>
);

Default.args = { ...sharedArgs };
Default.argTypes = { ...sharedArgTypes };

export const _WithLayer = ({ disabled, ...args }) => (
  <WithLayer>
    <ContentSwitcher {...args}>
      <Switch name="one" text="First section" disabled={disabled} />
      <Switch name="two" text="Second section" disabled={disabled} />
      <Switch name="three" text="Third section" disabled={disabled} />
    </ContentSwitcher>
  </WithLayer>
);

_WithLayer.args = { ...sharedArgs };
_WithLayer.argTypes = { ...sharedArgTypes };

export const IconOnly = ({ disabled, ...args }) => (
  <ContentSwitcher {...args}>
    <IconSwitch name="one" text="Table of Contents" disabled={disabled}>
      <TableOfContents />
    </IconSwitch>
    <IconSwitch name="two" text="Workspace Test" disabled={disabled}>
      <Workspace />
    </IconSwitch>
    <IconSwitch name="three" text="View Mode" disabled={disabled}>
      <ViewMode_2 />
    </IconSwitch>
  </ContentSwitcher>
);

IconOnly.args = { ...sharedArgs };
IconOnly.argTypes = { ...sharedArgTypes };

export const IconOnlyWithLayer = ({ disabled, ...args }) => (
  <WithLayer>
    <ContentSwitcher {...args}>
      <IconSwitch name="one" text="Table of Contents" disabled={disabled}>
        <TableOfContents />
      </IconSwitch>
      <IconSwitch name="two" text="Workspace Test" disabled={disabled}>
        <Workspace />
      </IconSwitch>
      <IconSwitch name="three" text="View Mode" disabled={disabled}>
        <ViewMode_2 />
      </IconSwitch>
    </ContentSwitcher>
  </WithLayer>
);

IconOnlyWithLayer.args = { ...sharedArgs };
IconOnlyWithLayer.argTypes = { ...sharedArgTypes };

export const lowContrast = ({ disabled, ...args }) => (
  <ContentSwitcher {...args}>
    <Switch name="one" text="First section" disabled={disabled} />
    <Switch name="two" text="Second section" disabled={disabled} />
    <Switch name="three" text="Third section" disabled={disabled} />
  </ContentSwitcher>
);

lowContrast.args = {
  ...sharedArgs,
  lowContrast: true,
};
lowContrast.argTypes = {
  ...sharedArgTypes,
  lowContrast: {
    ...sharedArgTypes.lowContrast,
    table: {
      ...sharedArgTypes.lowContrast.table,
      readonly: true,
    },
  },
};

export const lowContrastIconOnly = ({ disabled, ...args }) => (
  <ContentSwitcher {...args}>
    <IconSwitch name="one" text="Table of Contents" disabled={disabled}>
      <TableOfContents />
    </IconSwitch>
    <IconSwitch name="two" text="Workspace Test" disabled={disabled}>
      <Workspace />
    </IconSwitch>
    <IconSwitch name="three" text="View Mode" disabled={disabled}>
      <ViewMode_2 />
    </IconSwitch>
  </ContentSwitcher>
);

lowContrastIconOnly.args = {
  ...sharedArgs,
  lowContrast: true,
};
lowContrastIconOnly.argTypes = {
  ...sharedArgTypes,
  lowContrast: {
    ...sharedArgTypes.lowContrast,
    table: {
      ...sharedArgTypes.lowContrast.table,
      readonly: true,
    },
  },
};
