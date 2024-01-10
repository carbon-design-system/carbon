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
import './actionable-notification';
import './actionable-notification-button';
import storyDocs from './notification.mdx';
import { prefix } from '../../globals/settings';
import kinds from './stories/helper';
import '../button/button';

const noop = () => {};

const args = {
  actionButtonLabel: 'Action',
  closeOnEscape: true,
  hasFocus: false,
  hideCloseButton: false,
  inline: false,
  kind: NOTIFICATION_KIND.ERROR,
  lowContrast: false,
  role: 'alertdialog',
  subtitle: 'Subtitle text goes here',
  statusIconDescription: 'notification',
  title: 'Notification title',
};

const argTypes = {
  actionButtonLabel: {
    control: 'text',
    description:
      'Pass in the action button label that will be rendered within the ActionableNotification.',
  },
  closeOnEscape: {
    control: 'boolean',
    description:
      'Specify if pressing the escape key should close notifications.',
  },
  hasFocus: {
    control: 'boolean',
    description:
      'Specify if focus should be moved to the component when the notification contains actions.',
  },
  hideCloseButton: {
    control: 'boolean',
    description: 'Specify the close button should be disabled, or not.',
  },
  inline: {
    control: 'boolean',
  },
  kind: {
    control: 'select',
    description: 'Specify what state the notification represents.',
    options: kinds,
  },
  lowContrast: {
    control: 'boolean',
    description:
      'Specify whether you are using the low contrast variant of the ActionableNotification.',
  },
  role: {
    control: 'text',
    description:
      'By default, this value is "alertdialog". You can also provide an alternate role if it makes sense from from an accessibility perspective.',
  },
  subtitle: {
    control: 'text',
    description: 'Specify the subtitle.',
  },
  statusIconDescription: {
    control: 'text',
    description:
      'Provide a description for "status" icon that can be read by screen readers.',
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
      <cds-actionable-notification
        kind="${NOTIFICATION_KIND.ERROR}"
        title="Notification title"
        subtitle="Subtitle text goes here">
        <cds-actionable-notification-button slot="action"
          >Action</cds-actionable-notification-button
        >
      </cds-actionable-notification>
    `;
  },
};

export const Playground = {
  args,
  argTypes,
  render: (args) => {
    const {
      actionButtonLabel,
      closeOnEscape,
      hasFocus,
      kind,
      title,
      subtitle,
      hideCloseButton,
      lowContrast,
      role,
      inline,
      statusIconDescription,
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
      <cds-actionable-notification
        ?close-on-escape="${closeOnEscape}"
        ?has-focus="${hasFocus}"
        kind="${ifDefined(kind)}"
        title="${ifDefined(title)}"
        subtitle="${ifDefined(subtitle)}"
        role="${ifDefined(role)}"
        ?inline="${inline}"
        ?hide-close-button="${hideCloseButton}"
        ?low-contrast="${lowContrast}"
        status-icon-description="${ifDefined(statusIconDescription)}"
        @cds-notification-beingclosed="${handleBeforeClose}"
        @cds-notification-closed="${onClose}">
        <cds-actionable-notification-button slot="action"
          >${actionButtonLabel}</cds-actionable-notification-button
        >
      </cds-actionable-notification>
    `;
  },
};

const meta = {
  title: 'Components/Notifications/Actionable',
  parameters: {
    docs: {
      page: storyDocs,
    },
  },
};

export default meta;
