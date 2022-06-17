/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { ToastNotification } from '../../Notification';
import { action } from '@storybook/addon-actions';
import mdx from '../Notification.mdx';

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'Components/Notifications/Toast',
  component: ToastNotification,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  args: {
    kind: 'error',
    lowContrast: false,
    hideCloseButton: false,
    ariaLabel: 'closes notification',
    statusIconDescription: 'notification',
    onClose: action('onClose'),
    onCloseButtonClick: action('onCloseButtonClick'),
  },
};

export const Default = () => (
  <ToastNotification
    role="status"
    caption="00:00:00 AM"
    timeout={0}
    title="Notification title"
    subtitle="Subtitle text goes here"
  />
);

export const Playground = (args) => <ToastNotification {...args} />;

Playground.argTypes = {
  actionButtonLabel: {
    table: {
      disable: true,
    },
  },
  ariaLabel: {
    table: {
      disable: true,
    },
  },
  onActionButtonClick: {
    table: {
      disable: true,
    },
  },
  onClose: {
    action: 'clicked',
  },
  onCloseButtonClick: {
    action: 'clicked',
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
};
Playground.args = {
  role: 'status',
  caption: '00:00:00 AM',
  timeout: 0,
  title: 'Notification title',
  subtitle: 'Subtitle text goes here',
};
