/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Callout } from '../../Notification';
import { Link } from '../../Link';
import mdx from '../Notification.mdx';

export default {
  title: 'Experimental/unstable__Callout',
  component: Callout,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  args: {
    kind: 'info',
    lowContrast: false,
    statusIconDescription: 'notification',
  },
};

// export const Default = () => (
//   <Callout title="Notification title" subtitle="Subtitle text goes here" />
// );

export const WithInteractiveElements = () => (
  <Callout
    title="Notification title"
    titleId="my fancy id 123"
    kind="info"
    lowContrast>
    <div className="cds--inline-notification__subtitle">
      Additional text can describe the notification, or a link to{' '}
      <Link inline href="#" aria-describedby="my fancy id 123">
        learn more
      </Link>
    </div>
  </Callout>
);

export const Default = (args) => (
  <Callout
    title="Notification title"
    subtitle="Subtitle text goes here"
    {...args}
  />
);

Default.argTypes = {
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
  kind: {
    options: ['info', 'warning'],
    control: { type: 'select' },
  },
};
