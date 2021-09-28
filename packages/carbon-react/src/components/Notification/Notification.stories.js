/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  ToastNotification,
  InlineNotification,
  NotificationActionButton,
} from 'carbon-components-react';
import React from 'react';

const notificationProps = () => ({
  kind: 'info',
  role: 'alert',
  title: 'Notification title',
  subtitle: 'Subtitle text goes here.',
});

const toastNotificationProps = () => ({
  ...notificationProps(),
});

export default {
  title: 'Components/Notifications',
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
  },
};

export const Toast = () => (
  <ToastNotification
    {...toastNotificationProps()}
    caption={('Caption (caption)', '00:00:00 AM')}
    style={{ marginBottom: '.5rem' }}
  />
);

export const ToastPlayground = ({
  kind = 'info',
  title = 'Notification title',
  subtitle = 'Notification subtitle',
  caption = '00:00:00 AM',
  lowContrast = false,
}) => {
  return (
    <ToastNotification
      kind={kind}
      title={title}
      subtitle={subtitle}
      lowContrast={lowContrast}
      caption={caption}
    />
  );
};
ToastPlayground.argTypes = {
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
  lowContrast: {
    value: false,
    control: {
      type: 'boolean',
    },
  },
};

export const Inline = () => (
  <InlineNotification
    {...notificationProps()}
    actions={<NotificationActionButton>{'Action'}</NotificationActionButton>}
  />
);

Inline.storyName = 'Inline';
