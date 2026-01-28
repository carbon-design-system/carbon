/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { ActionableNotification } from '../../Notification';
import { action } from 'storybook/actions';
import mdx from '../Notification.mdx';
import { Link } from '../../Link'; // remove before merging

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'Components/Notifications/Actionable',
  component: ActionableNotification,
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: ['aria-label', 'hasFocus'],
    },
  },
  args: {
    kind: 'error',
    lowContrast: false,
    hideCloseButton: false,
    ['aria-label']: 'close notification',
    statusIconDescription: 'notification',
    onClose: action('onClose'),
    onCloseButtonClick: action('onCloseButtonClick'),
    onActionButtonClick: action('onActionButtonClick'),
  },
};

export const Default = (args) => (
  <ActionableNotification {...args}></ActionableNotification>
);

// remove before merging
export const test = (args) => (
  <ActionableNotification {...args}>
    <Link href="#">link1</Link>
    <Link href="#">link2</Link>
  </ActionableNotification>
);

Default.argTypes = {
  onActionButtonClick: {
    action: 'onActionButtonClick',
  },
  onClose: {
    action: 'onClose',
  },
  onCloseButtonClick: {
    action: 'onCloseButtonClick',
  },
};
Default.args = {
  actionButtonLabel: 'Action',
  inline: false,
  closeOnEscape: true,
  title: 'Notification title',
  subtitle: 'Subtitle text goes here',
};

// remove before merging
test.args = {
  actionButtonLabel: 'Action',
  inline: false,
  closeOnEscape: true,
  title: 'Notification title',
  subtitle: 'Subtitle text goes here',
};
