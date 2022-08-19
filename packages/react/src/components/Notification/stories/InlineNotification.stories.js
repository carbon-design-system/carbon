/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { InlineNotification } from '../../Notification';
import { Theme } from '../../Theme';
import { action } from '@storybook/addon-actions';
import mdx from '../Notification.mdx';

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'Components/Notifications/Inline',
  component: InlineNotification,
  parameters: {
    docs: {
      page: mdx,
    },
  },
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

export const Default = () => (
  <InlineNotification
    title="Notification title"
    subtitle="Subtitle text goes here"
  />
);

export const LowContrastDarkTest = () => (
  // <div className="cds--g100" style={{ padding: '2rem' }}>
  <>
    <Theme theme="g90" style={{ padding: '2rem' }}>
      <InlineNotification
        kind="warning"
        lowContrast
        title="Notification title"
        subtitle="Subtitle text goes here"
      />
    </Theme>

    <Theme theme="g100" style={{ padding: '2rem' }}>
      <InlineNotification
        kind="warning"
        lowContrast
        title="Notification title"
        subtitle="Subtitle text goes here"
      />
    </Theme>
  </>
  // </div>
);

export const Playground = (args) => <InlineNotification {...args} />;

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
  actionButtonLabel: 'Action',
  inline: false,
  title: 'Notification title',
  subtitle: 'Subtitle text goes here',
};
