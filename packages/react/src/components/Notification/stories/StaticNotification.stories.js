/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { StaticNotification } from '../../Notification';
import { Button } from '../../Button';
import mdx from '../Notification.mdx';

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'Experimental/unstable__StaticNotification',
  component: StaticNotification,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  args: {
    kind: 'error',
    lowContrast: false,
    statusIconDescription: 'notification',
  },
};

export const Default = () => (
  <StaticNotification
    title="Notification title"
    subtitle="Subtitle text goes here"
  />
);

export const WithInteractiveElementsThatPopTheWarning = () => (
  <StaticNotification
    title="Notification title"
    subtitle="Subtitle text goes here">
    <Button>Test</Button>
  </StaticNotification>
);

export const WithInteractiveElementsThatDONOTPopTheWarning = () => (
  <StaticNotification
    title="Notification title"
    titleId="my fancy id 123"
    subtitle="Subtitle text goes here">
    <Button aria-describedby="my fancy id 123">Test</Button>
  </StaticNotification>
);

export const Playground = (args) => <StaticNotification {...args} />;

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
};
Playground.args = {
  title: 'Notification title',
  subtitle: 'Subtitle text goes here',
};
