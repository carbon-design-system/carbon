/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { NOTIFICATION_KIND } from './inline-notification';
import './toast-notification';
import storyDocs from './notification.mdx';
import { prefix } from '../../globals/settings';
import kinds from './stories/helper';

const noop = () => {};

const args = {
  caption: '00:00:00 AM',
  hideCloseButton: false,
  kind: NOTIFICATION_KIND.INFO,
  lowContrast: false,
  role: 'status',
  statusIconDescription: 'notification',
  subtitle: 'Subtitle text goes here',
  timeout: '0',
  title: 'Notification title',
};

const argTypes = {
  caption: {
    control: 'text',
    description: 'Specify the caption.',
  },
  hideCloseButton: {
    control: 'boolean',
    description: 'Specify the close button should be disabled, or not.',
  },
  kind: {
    control: 'select',
    description: 'Specify what state the notification represents.',
    options: kinds,
  },
  lowContrast: {
    control: 'boolean',
    description:
      'Specify whether you are using the low contrast variant of the Toast Notification.',
  },
  role: {
    control: 'select',
    description:
      'By default, this value is "status". You can also provide an alternate role if it makes sense from the accessibility-side.',
    options: { alert: 'alert', log: 'log', status: 'status' },
  },
  statusIconDescription: {
    control: 'text',
    description:
      'Provide a description for "status" icon that can be read by screen readers.',
  },
  subtitle: {
    control: 'text',
    description: 'Specify the subtitle.',
  },
  timeout: {
    control: 'text',
    description:
      'Specify an optional duration the notification should be closed in.',
  },
  title: {
    control: 'text',
    description: 'Specify the title.',
  },
  onBeforeClose: {
    action: `${prefix}-notification-beingclosed`,
  },
  onClose: {
    action: `${prefix}-notification-closed`,
  },
};

export const Default = {
  render: () => {
    return html`
      <cds-toast-notification
        kind="${NOTIFICATION_KIND.ERROR}"
        title="Notification title"
        subtitle="Subtitle text goes here"
        caption="00:00:00 AM"
        role="status"
        timeout="0">
      </cds-toast-notification>
    `;
  },
};

export const Playground = {
  args,
  argTypes,
  render: (args) => {
    const {
      kind,
      title,
      subtitle,
      caption,
      hideCloseButton,
      statusIconDescription,
      lowContrast,
      timeout,
      role,
      disableClose,
      onBeforeClose = noop,
      onClose = noop,
    } = args ?? {};
    const handleBeforeClose = (event: CustomEvent) => {
      onBeforeClose(event);
      if (disableClose) {
        event.preventDefault();
      }
    };
    return html`
      <cds-toast-notification
        kind="${ifDefined(kind)}"
        title="${ifDefined(title)}"
        subtitle="${ifDefined(subtitle)}"
        caption="${ifDefined(caption)}"
        role="${ifDefined(role)}"
        ?hide-close-button="${hideCloseButton}"
        ?low-contrast="${lowContrast}"
        status-icon-description="${ifDefined(statusIconDescription)}"
        timeout="${ifDefined(timeout)}"
        @cds-notification-beingclosed="${handleBeforeClose}"
        @cds-notification-closed="${onClose}">
      </cds-toast-notification>
    `;
  },
};

const meta = {
  title: 'Components/Notifications/Toast',
  parameters: {
    docs: {
      page: storyDocs,
    },
  },
};

export default meta;
