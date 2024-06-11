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
import storyDocs from './notification.mdx';
import { NOTIFICATION_KIND } from './inline-notification';
import { prefix } from '../../globals/settings';
import kinds from './stories/helper';

const noop = () => {};

const args = {
  hideCloseButton: false,
  kind: NOTIFICATION_KIND.INFO,
  lowContrast: false,
  role: 'status',
  statusIconDescription: 'notification',
  subtitle: 'Subtitle text goes here',
  title: 'Notification title',
};

const argTypes = {
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
      'Specify whether you are using the low contrast variant of the InlineNotification.',
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
      <cds-inline-notification
        kind="${NOTIFICATION_KIND.ERROR}"
        title="Notification title"
        subtitle="Subtitle text goes here">
      </cds-inline-notification>
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
      hideCloseButton,
      lowContrast,
      role,
      statusIconDescription,
      timeout,
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
      <cds-inline-notification
        kind="${ifDefined(kind)}"
        title="${ifDefined(title)}"
        subtitle="${ifDefined(subtitle)}"
        ?hide-close-button="${hideCloseButton}"
        ?low-contrast="${lowContrast}"
        role="${ifDefined(role)}"
        status-icon-description="${ifDefined(statusIconDescription)}"
        timeout="${ifDefined(timeout)}"
        @cds-notification-beingclosed="${handleBeforeClose}"
        @cds-notification-closed="${onClose}">
      </cds-inline-notification>
    `;
  },
};

const meta = {
  title: 'Components/Notifications/Inline',
  parameters: {
    docs: {
      page: storyDocs,
    },
  },
};

export default meta;
