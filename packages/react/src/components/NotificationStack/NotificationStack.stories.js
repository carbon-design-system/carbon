/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
import NotificationStack from './NotificationStack';
import { triggerNotification } from '../../internal/useNotification/notification';
import Button from '../Button/Button';

export default {
  title: 'Components/NotificationStack',
  component: Button,
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

export const StandardToast = () => (
  <div style={{ width: 300 }}>
    <NotificationStack />

    <Button
      onClick={() =>
        triggerNotification({
          role: 'alert',
          kind: 'info',
          caption: '00:00',
          onCloseButtonClick: () => {},
          lowContrast: false,
          hideCloseButton: false,
          iconDescription: 'Close',
          title: 'Toast triggered',
          subtitle: 'subtitle testing',
          timeout: 5000,
        })
      }
    >
      Trigger toast
    </Button>
  </div>
);

export const Playground = (args) => (
  <div style={{ width: 300 }}>
    <NotificationStack />

    <Button onClick={() => triggerNotification({ ...args })}>
      Trigger toast
    </Button>
  </div>
);

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
