/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { NOTIFICATION_KIND } from './inline-notification';
import './callout-notification';
import './actionable-notification-button';
import storyDocs from './notification.mdx';
import { prefix } from '../../globals/settings';

const args = {
  actionButtonLabel: '',
  kind: NOTIFICATION_KIND.INFO,
  lowContrast: false,
  statusIconDescription: 'notification',
  subtitle: 'Subtitle text goes here',
  title: 'Notification title',
  titleId: '',
};

const argTypes = {
  actionButtonLabel: {
    control: 'text',
    description:
      'Pass in the action button label that will be rendered within the Callout.',
  },
  kind: {
    control: 'select',
    description: 'Specify what state the notification represents.',
    options: {
      [`Info (${NOTIFICATION_KIND.INFO})`]: NOTIFICATION_KIND.INFO,
      [`Warning (${NOTIFICATION_KIND.WARNING})`]: NOTIFICATION_KIND.WARNING,
    },
  },
  lowContrast: {
    control: 'boolean',
    description:
      'Specify whether you are using the low contrast variant of the Callout.',
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
  titleId: {
    control: 'text',
    description: 'Specify the id for the title element.',
  },
  onActionButtonClick: {
    action: 'onActionButtonClick',
  },
};

export const Default = {
  args,
  argTypes,
  render: (args) => {
    const {
      actionButtonLabel,
      kind,
      title,
      subtitle,
      lowContrast,
      statusIconDescription,
      titleId,
    } = args ?? {};

    return html`
      <cds-callout-notification
        kind="${ifDefined(kind)}"
        title="${ifDefined(title)}"
        subtitle="${ifDefined(subtitle)}"
        ?low-contrast="${lowContrast}"
        status-icon-description="${ifDefined(statusIconDescription)}"
        title-id="${ifDefined(titleId)}">
        ${actionButtonLabel &&
        html`<cds-actionable-notification-button slot="action"
          >${actionButtonLabel}</cds-actionable-notification-button
        >`}
      </cds-callout-notification>
    `;
  },
};

export const WithInteractiveElements = {
  render: () => {
    return html`
      <cds-callout-notification
        kind="${NOTIFICATION_KIND.INFO}"
        title="Notification title"
        title-id="callout-title-interactive"
        ?low-contrast="true">
        <div class="${prefix}--actionable-notification__subtitle">
          Additional text can describe the notification, or a link to
          <a href="#" aria-describedby="callout-title-interactive"
            >learn more</a
          >
        </div>
      </cds-callout-notification>
    `;
  },
};

const meta = {
  title: 'Components/Notifications/Callout',
  parameters: {
    docs: {
      page: storyDocs,
    },
  },
};

export default meta;
