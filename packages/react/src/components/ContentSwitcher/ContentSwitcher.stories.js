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
  <>
    <a
      href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22ContentSwitcherFragment%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22type%22%3A%22content-switcher%22%2C%22size%22%3A%22sm%22%2C%22selectedIndex%22%3A0%2C%22items%22%3A%5B%7B%22name%22%3A%22first%22%2C%22text%22%3A%22First%20section%22%2C%22disabled%22%3Afalse%2C%22type%22%3A%22switch-item%22%2C%22id%22%3A%223%22%2C%22codeContext%22%3A%7B%22name%22%3A%22switch-item-3%22%7D%7D%2C%7B%22name%22%3A%22second%22%2C%22text%22%3A%22Second%20section%22%2C%22disabled%22%3Afalse%2C%22type%22%3A%22switch-item%22%2C%22id%22%3A%224%22%2C%22codeContext%22%3A%7B%22name%22%3A%22switch-item-4%22%7D%7D%2C%7B%22name%22%3A%22third%22%2C%22text%22%3A%22Third%20section%22%2C%22disabled%22%3Afalse%2C%22type%22%3A%22switch-item%22%2C%22id%22%3A%225%22%2C%22codeContext%22%3A%7B%22name%22%3A%22switch-item-5%22%7D%7D%5D%2C%22id%22%3A%222%22%2C%22codeContext%22%3A%7B%22name%22%3A%22content-switcher-2%22%7D%7D%5D%2C%22id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D"
      target="_blank"
      rel="noreferrer">
      Edit on Carbon UI Builder
    </a>
    <br></br>
    <br></br>
    <ContentSwitcher onChange={() => {}}>
      <Switch name="one" text="First section" />
      <Switch name="two">Second section</Switch>
      <Switch name="three" text="Third section" />
    </ContentSwitcher>
  </>
);

export const _WithLayer = () => (
  <>
    <a
      href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22ContentSwitcherFragment%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22type%22%3A%22content-switcher%22%2C%22size%22%3A%22sm%22%2C%22selectedIndex%22%3A0%2C%22items%22%3A%5B%7B%22name%22%3A%22first%22%2C%22text%22%3A%22First%20section%22%2C%22disabled%22%3Afalse%2C%22type%22%3A%22switch-item%22%2C%22id%22%3A%223%22%2C%22codeContext%22%3A%7B%22name%22%3A%22switch-item-3%22%7D%7D%2C%7B%22name%22%3A%22second%22%2C%22text%22%3A%22Second%20section%22%2C%22disabled%22%3Afalse%2C%22type%22%3A%22switch-item%22%2C%22id%22%3A%224%22%2C%22codeContext%22%3A%7B%22name%22%3A%22switch-item-4%22%7D%7D%2C%7B%22name%22%3A%22third%22%2C%22text%22%3A%22Third%20section%22%2C%22disabled%22%3Afalse%2C%22type%22%3A%22switch-item%22%2C%22id%22%3A%225%22%2C%22codeContext%22%3A%7B%22name%22%3A%22switch-item-5%22%7D%7D%5D%2C%22id%22%3A%222%22%2C%22codeContext%22%3A%7B%22name%22%3A%22content-switcher-2%22%7D%7D%5D%2C%22id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D"
      target="_blank"
      rel="noreferrer">
      Edit on Carbon UI Builder
    </a>
    <br></br>
    <br></br>
    <WithLayer>
      <ContentSwitcher onChange={() => {}}>
        <Switch name="one" text="First section" />
        <Switch name="two" text="Second section" />
        <Switch name="three" text="Third section" />
      </ContentSwitcher>
    </WithLayer>
  </>
);

export const IconOnly = (args) => (
  <>
    <a
      href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22ContentSwitcherFragment%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22type%22%3A%22content-switcher%22%2C%22size%22%3A%22sm%22%2C%22selectedIndex%22%3A0%2C%22items%22%3A%5B%7B%22name%22%3A%22first%22%2C%22text%22%3A%22First%20section%22%2C%22disabled%22%3Afalse%2C%22type%22%3A%22switch-item%22%2C%22id%22%3A%223%22%2C%22codeContext%22%3A%7B%22name%22%3A%22switch-item-3%22%7D%7D%2C%7B%22name%22%3A%22second%22%2C%22text%22%3A%22Second%20section%22%2C%22disabled%22%3Afalse%2C%22type%22%3A%22switch-item%22%2C%22id%22%3A%224%22%2C%22codeContext%22%3A%7B%22name%22%3A%22switch-item-4%22%7D%7D%2C%7B%22name%22%3A%22third%22%2C%22text%22%3A%22Third%20section%22%2C%22disabled%22%3Afalse%2C%22type%22%3A%22switch-item%22%2C%22id%22%3A%225%22%2C%22codeContext%22%3A%7B%22name%22%3A%22switch-item-5%22%7D%7D%5D%2C%22id%22%3A%222%22%2C%22codeContext%22%3A%7B%22name%22%3A%22content-switcher-2%22%7D%7D%5D%2C%22id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D"
      target="_blank"
      rel="noreferrer">
      Edit on Carbon UI Builder
    </a>
    <br></br>
    <br></br>
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
  </>
);

export const IconOnlyWithLayer = (args) => (
  <>
    <a
      href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22ContentSwitcherFragment%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22type%22%3A%22content-switcher%22%2C%22size%22%3A%22sm%22%2C%22selectedIndex%22%3A0%2C%22items%22%3A%5B%7B%22name%22%3A%22first%22%2C%22text%22%3A%22First%20section%22%2C%22disabled%22%3Afalse%2C%22type%22%3A%22switch-item%22%2C%22id%22%3A%223%22%2C%22codeContext%22%3A%7B%22name%22%3A%22switch-item-3%22%7D%7D%2C%7B%22name%22%3A%22second%22%2C%22text%22%3A%22Second%20section%22%2C%22disabled%22%3Afalse%2C%22type%22%3A%22switch-item%22%2C%22id%22%3A%224%22%2C%22codeContext%22%3A%7B%22name%22%3A%22switch-item-4%22%7D%7D%2C%7B%22name%22%3A%22third%22%2C%22text%22%3A%22Third%20section%22%2C%22disabled%22%3Afalse%2C%22type%22%3A%22switch-item%22%2C%22id%22%3A%225%22%2C%22codeContext%22%3A%7B%22name%22%3A%22switch-item-5%22%7D%7D%5D%2C%22id%22%3A%222%22%2C%22codeContext%22%3A%7B%22name%22%3A%22content-switcher-2%22%7D%7D%5D%2C%22id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D"
      target="_blank"
      rel="noreferrer">
      Edit on Carbon UI Builder
    </a>
    <br></br>
    <br></br>
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
  </>
);

export const Playground = (args) => (
  <>
    <a
      href="https://builder.carbondesignsystem.com/from-json/%7B%22title%22%3A%22ContentSwitcherFragment%22%2C%22data%22%3A%7B%22items%22%3A%5B%7B%22type%22%3A%22content-switcher%22%2C%22size%22%3A%22sm%22%2C%22selectedIndex%22%3A0%2C%22items%22%3A%5B%7B%22name%22%3A%22first%22%2C%22text%22%3A%22First%20section%22%2C%22disabled%22%3Afalse%2C%22type%22%3A%22switch-item%22%2C%22id%22%3A%223%22%2C%22codeContext%22%3A%7B%22name%22%3A%22switch-item-3%22%7D%7D%2C%7B%22name%22%3A%22second%22%2C%22text%22%3A%22Second%20section%22%2C%22disabled%22%3Afalse%2C%22type%22%3A%22switch-item%22%2C%22id%22%3A%224%22%2C%22codeContext%22%3A%7B%22name%22%3A%22switch-item-4%22%7D%7D%2C%7B%22name%22%3A%22third%22%2C%22text%22%3A%22Third%20section%22%2C%22disabled%22%3Afalse%2C%22type%22%3A%22switch-item%22%2C%22id%22%3A%225%22%2C%22codeContext%22%3A%7B%22name%22%3A%22switch-item-5%22%7D%7D%5D%2C%22id%22%3A%222%22%2C%22codeContext%22%3A%7B%22name%22%3A%22content-switcher-2%22%7D%7D%5D%2C%22id%22%3A1%7D%2C%22allCssClasses%22%3A%5B%5D%7D"
      target="_blank"
      rel="noreferrer">
      Edit on Carbon UI Builder
    </a>
    <br></br>
    <br></br>
    <ContentSwitcher {...args}>
      <Switch name="one" text="First section" />
      <Switch name="two" text="Second section" />
      <Switch name="three" text="Third section" />
    </ContentSwitcher>
  </>
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
