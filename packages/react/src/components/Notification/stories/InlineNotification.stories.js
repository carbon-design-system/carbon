/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { InlineNotification } from '../../Notification';
import { action } from 'storybook/actions';
import mdx from '../Notification.mdx';

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'Components/Notifications/Inline',
  component: InlineNotification,
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: ['actionButtonLabel', 'aria-label'],
    },
  },
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

export const Default = (args) => <InlineNotification {...args} />;

Default.argTypes = {
  onClose: {
    action: 'onClose',
  },
  onCloseButtonClick: {
    action: 'onCloseButtonClick',
  },
};
Default.args = {
  title: 'Notification title',
  subtitle: 'Subtitle text goes here',
};
