/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  boolean,
  number,
  select,
  text,
} from '@storybook/addon-knobs';
import {
  ToastNotification,
  InlineNotification,
  NotificationActionButton,
  PersistentNotification,
} from '../Notification';
import mdx from './Notification.mdx';
import { FeatureFlags } from '../FeatureFlags';

const kinds = {
  'Error (error)': 'error',
  'Info (info)': 'info',
  'Info square (info-square)': 'info-square',
  'Success (success)': 'success',
  'Warning (warning)': 'warning',
  'Warning (warning-alt)': 'warning-alt',
};
const notificationProps = () => ({
  kind: select('The notification kind (kind)', kinds, 'info'),
  lowContrast: boolean('Use low contrast variant (lowContrast)', false),
  role: text('ARIA role (role)', 'alertdialog'),
  children: text('Content (children)', 'Notification content'),
  iconDescription: text(
    'Icon description (iconDescription)',
    'describes the close button'
  ),
  statusIconDescription: text(
    'Status icon description (statusIconDescription)',
    'describes the status icon'
  ),
  hideCloseButton: boolean('Hide close button (hideCloseButton)', false),
  onClose: action('onClose'),
  onCloseButtonClick: action('onCloseButtonClick'),
});

const toastNotificationProps = () => ({
  ...notificationProps(),
  role: text('ARIA role (role)', 'alert'),
  timeout: number(
    'Duration in milliseconds to display notification (timeout)',
    0
  ),
});

export default {
  title: 'Components/Notifications',
  decorators: [withKnobs],

  parameters: {
    docs: {
      page: mdx,
    },
    subcomponents: {
      ToastNotification,
      InlineNotification,
    },
  },
};

export const Toast = () => (
  <FeatureFlags flags={{ 'enable-2021-release': true }}>
    <ToastNotification {...toastNotificationProps()} />
  </FeatureFlags>
);

export const Inline = () => (
  <FeatureFlags flags={{ 'enable-2021-release': true }}>
    <InlineNotification
      {...notificationProps()}
      actions={
        <NotificationActionButton
          onClick={action('NotificationActionButton onClick')}
          notificationType="inline">
          {text('Action (NotificationActionButton > children)', 'Action')}
        </NotificationActionButton>
      }
    />
  </FeatureFlags>
);

export const Persistent = () => (
  <FeatureFlags flags={{ 'enable-2021-release': true }}>
    <PersistentNotification
      {...toastNotificationProps()}
      actions={
        <>
          <NotificationActionButton
            onClick={action('NotificationActionButton onClick')}
            notificationType="persistent">
            {text('Action (NotificationActionButton > children)', 'Action 1')}
          </NotificationActionButton>
          <NotificationActionButton
            onClick={action('NotificationActionButton onClick')}
            notificationType="persistent">
            {text('Action (NotificationActionButton > children)', 'Action 2')}
          </NotificationActionButton>
        </>
      }
    />
  </FeatureFlags>
);
