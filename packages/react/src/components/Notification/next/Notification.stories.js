/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { FeatureFlags } from '../../FeatureFlags';
import {
  ActionableNotification,
  ToastNotification,
  InlineNotification,
} from './Notification';
import React from 'react';
import { action } from '@storybook/addon-actions';

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'Components/Notifications',
  subscomponents: {
    ActionableNotification,
    InlineNotification,
    ToastNotification,
  },
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
    lowContrast: false,
    hideCloseButton: false,
    iconDescription: 'closes notification',
    statusIconDescription: 'notification',
    onClose: action('onClose'),
    onCloseButtonClick: action('onCloseButtonClick'),
  },
};

const ToastStory = (args) => <ToastNotification {...args} />;

export const Toast = ToastStory.bind({});

Toast.argTypes = {
  role: {
    options: ['alert', 'log', 'status'],
    control: {
      type: 'select',
    },
  },
  caption: {
    control: {
      type: 'text',
    },
  },
  title: {
    control: {
      type: 'text',
    },
  },
  subtitle: {
    control: {
      type: 'text',
    },
  },
};
Toast.args = {
  role: 'status',
  caption: '00:00:00 AM',
  timeout: 0,
  title: 'Notification title',
  subtitle: 'Subtitle text goes here',
};

const InlineStory = (args) => {
  return (
    <>
      <InlineNotification {...args} />
      <InlineNotification {...args} />
      <InlineNotification {...args} />
    </>
  );
};

export const Inline = InlineStory.bind({});

Inline.argTypes = {
  role: {
    options: ['alert', 'log', 'status'],
    control: {
      type: 'select',
    },
  },
  title: {
    control: {
      type: 'text',
    },
  },
  subtitle: {
    control: {
      type: 'text',
    },
  },
};

Inline.args = {
  title: 'Notification title',
  subtitle: 'Subtitle text goes here',
};

export const Actionable = (args) => <ActionableNotification {...args} />;

Actionable.args = {
  actionButtonLabel: 'Action',
  inline: false,
  closeOnEscape: true,
};
