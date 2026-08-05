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
  title: 'Components/Notifications/Callout',
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
  argTypes: {
    kind: {
      options: ['info', 'warning'],
      control: { type: 'select' },
    },
  },
};

export const Default = (args) => (
  <Callout
    title="Notification title"
    subtitle="Subtitle text goes here"
    {...args}
  />
);

Default.args = {
  subtitle: 'Subtitle text goes here',
  title: 'Notification title',
};

export const WithInteractiveElements = ({ titleId, ...args }) => (
  <Callout titleId={titleId} {...args}>
    <div className="cds--inline-notification__subtitle">
      Additional text can describe the notification, or a link to{' '}
      <Link inline href="#" aria-describedby={titleId}>
        learn more
      </Link>
    </div>
  </Callout>
);

WithInteractiveElements.args = {
  kind: 'info',
  lowContrast: true,
  statusIconDescription: 'notification',
  title: 'Notification title',
  titleId: 'callout-title-interactive'',
};

WithInteractiveElements.parameters = {
  controls: {
    include: [
      'kind',
      'lowContrast',
      'statusIconDescription',
      'title',
      'titleId',
    ],
  },
};
