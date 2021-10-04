/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  ActionableNotification,
  ToastNotification,
  InlineNotification,
  unstable_FeatureFlags as FeatureFlags,
} from 'carbon-components-react';
import React from 'react';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/Notifications',
  decorators: [
    (Story) => (
      <FeatureFlags flags={{ 'enable-v11-release': true }}>
        <Story />
      </FeatureFlags>
    ),
  ],
  argTypes: {
    kind: {
      options: [
        'error',
        'info',
        'info-square',
        'success',
        'warning',
        'warning-alt',
      ],
      control: {
        type: 'select',
      },
    },
    className: {
      control: {
        type: 'text',
      },
    },
  },
  args: {
    kind: 'error',
    children: 'Notification content',
    lowContrast: false,
    closeOnEscape: false,
    hideCloseButton: false,
    iconDescription: 'closes notification',
    statusIconDescription: 'notification',
    onClose: action('onClose'),
    onCloseButtonClick: action('onCloseButtonClick'),
  },
};

export const Toast = (args) => <ToastNotification {...args} />;
Toast.argTypes = {
  role: {
    options: ['alert', 'log', 'status'],
    control: {
      type: 'select',
    },
  },
};
Toast.args = { role: 'status', timeout: 0 };

export const Inline = (args) => (
  <>
    <InlineNotification {...args} />
    <InlineNotification {...args} />
    <InlineNotification {...args} />
  </>
);
Inline.argTypes = {
  role: {
    options: ['alert', 'log', 'status'],
    control: {
      type: 'select',
    },
  },
};
Inline.args = { role: 'status' };

export const Actionable = (args) => <ActionableNotification {...args} />;

Actionable.args = {
  actionButtonLabel: 'Action',
  inline: false,
};
