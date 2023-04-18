/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
import { NOTIFICATION_KIND } from './inline-notification';
import './toast-notification';
import storyDocs from './notification-story.mdx';
import { prefix } from '../../globals/settings';
import kinds from './stories/helper';

const noop = () => {};

export const Default = () => {
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
};

export const Playground = (args) => {
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
  } = args?.[`${prefix}-toast-notification`] ?? {};
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
};

Playground.parameters = {
  knobs: {
    [`${prefix}-toast-notification`]: () => ({
      caption: textNullable('Caption (caption)', '00:00:00 AM'),
      hideCloseButton: boolean(
        'Hide the close button (hide-close-button)',
        false
      ),
      kind: select(
        'The notification kind (kind)',
        kinds,
        NOTIFICATION_KIND.INFO
      ),
      lowContrast: boolean('Use low contrast variant (low-contrast)', false),
      role: select(
        'Role (role)',
        { alert: 'alert', log: 'log', status: 'status' },
        'status'
      ),
      statusIconDescription: textNullable(
        'statusIconDescription (status-icon-description)',
        'notification'
      ),
      subtitle: textNullable('Subtitle (subtitle)', 'Subtitle text goes here'),
      timeout: textNullable('Timeout in ms (timeout)', '0'),
      title: textNullable('Title (title)', 'Notification title'),
      onBeforeClose: action(`${prefix}-notification-beingclosed`),
      onClose: action(`${prefix}-notification-closed`),
    }),
  },
};

export default {
  title: 'Components/Notifications/Toast',
  parameters: {
    ...storyDocs.parameters,
  },
};
