/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { ActionableNotification } from '../../Notification';
import { action } from 'storybook/actions';
import { WithFeatureFlags } from '../../../../.storybook/templates/WithFeatureFlags';

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'Components/Notifications/Actionable/Feature Flag',
  component: ActionableNotification,
  tags: ['!autodocs'],
  decorators: [
    (Story) => (
      <WithFeatureFlags>
        <Story />
      </WithFeatureFlags>
    ),
  ],
  args: {
    kind: 'error',
    lowContrast: false,
    hideCloseButton: false,
    ['aria-label']: 'closes notification',
    statusIconDescription: 'notification',
    onClose: action('onClose'),
    onCloseButtonClick: action('onCloseButtonClick'),
  },
};

export const FocusWrapWithoutSentinels = (args) => (
  <ActionableNotification {...args} />
);

FocusWrapWithoutSentinels.argTypes = {
  ['aria-label']: {
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
    action: 'onActionButtonClick',
  },
  onClose: {
    action: 'onClose',
  },
  onCloseButtonClick: {
    action: 'onCloseButtonClick',
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
  hasFocus: {
    table: {
      disable: true,
    },
  },
};
FocusWrapWithoutSentinels.args = {
  actionButtonLabel: 'Action',
  inline: false,
  title: 'Notification title',
  subtitle: 'Subtitle text goes here',
};
