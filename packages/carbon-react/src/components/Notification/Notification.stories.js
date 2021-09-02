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

const notificationProps = () => ({
  // content: 'Notification content',
});

const toastNotificationProps = () => ({
  ...notificationProps(),
});

export default {
  title: 'Components/Notifications',
  decorators: [
    (Story) => (
      <FeatureFlags flags={{ 'enable-v11-release': true }}>
        <Story />
      </FeatureFlags>
    ),
  ],
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
  },
};

export const Toast = () => (
  <>
    <ToastNotification {...toastNotificationProps()}>
      Notification content
    </ToastNotification>
    <ToastNotification lowContrast {...toastNotificationProps()}>
      Notification content
    </ToastNotification>
  </>
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
  <>
    <InlineNotification {...notificationProps()}>
      Notification content
    </InlineNotification>
    <InlineNotification lowContrast {...notificationProps()}>
      Notification content
    </InlineNotification>
  </>
);

export const Actionable = () => (
  <>
    <ActionableNotification actionButtonLabel="Action">
      Notification content
    </ActionableNotification>

    <ActionableNotification inline actionButtonLabel="Action">
      Notification content (inline)
    </ActionableNotification>

    <ActionableNotification lowContrast actionButtonLabel="Action">
      Notification content
    </ActionableNotification>

    <ActionableNotification lowContrast inline actionButtonLabel="Action">
      Notification content (inline)
    </ActionableNotification>
  </>
);
