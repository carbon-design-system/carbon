/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import {
  ToastNotification,
  InlineNotification,
  NotificationActionButton,
} from '../Notification';

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
  role: text('ARIA role (role)', 'alert'),
  title: text('Title (title)', 'Notification title'),
  subtitle: text('Subtitle (subtitle)', 'Subtitle text goes here.'),
  iconDescription: text(
    'Icon description (iconDescription)',
    'describes the close button'
  ),
  statusIconDescription: text(
    'Status icon description (statusIconDescription)',
    'describes the status icon'
  ),
  hideCloseButton: boolean('Hide close button (hideCloseButton)', false),
  onCloseButtonClick: action('onCloseButtonClick'),
});

export default {
  title: 'Notifications',
  decorators: [withKnobs],

  parameters: {
    subcomponents: {
      ToastNotification,
      InlineNotification,
    },
  },
};

export const Toast = () => (
  <ToastNotification
    {...notificationProps()}
    caption={text('Caption (caption)', '00:00:00 AM')}
    style={{ minWidth: '30rem', marginBottom: '.5rem' }}
  />
);

export const Inline = () => (
  <InlineNotification
    {...notificationProps()}
    actions={
      <NotificationActionButton
        onClick={action('NotificationActionButton onClick')}>
        {text('Action (NotificationActionButton > children)', 'Action')}
      </NotificationActionButton>
    }
  />
);

Inline.storyName = 'inline';
