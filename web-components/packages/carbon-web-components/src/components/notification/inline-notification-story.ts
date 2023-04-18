/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import { ifDefined } from 'lit/directives/if-defined.js';
import { boolean, select } from '@storybook/addon-knobs';
import storyDocs from './notification-story.mdx';
import { NOTIFICATION_KIND } from './inline-notification';
import { prefix } from '../../globals/settings';
import textNullable from '../../../.storybook/knob-text-nullable';
import kinds from './stories/helper';

const noop = () => {};

export const Default = () => {
  return html`
    <cds-inline-notification
      kind="${NOTIFICATION_KIND.ERROR}"
      title="Notification title"
      subtitle="Subtitle text goes here">
    </cds-inline-notification>
  `;
};

export const Playground = (args) => {
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
  } = args?.[`${prefix}-inline-notification`] ?? {};
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
};

Playground.parameters = {
  knobs: {
    [`${prefix}-inline-notification`]: () => ({
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
      title: textNullable('Title (title)', 'Notification title'),
      onBeforeClose: action(`${prefix}-notification-beingclosed`),
      onClose: action(`${prefix}-notification-closed`),
    }),
  },
};

export default {
  title: 'Components/Notifications/Inline',
  parameters: {
    ...storyDocs.parameters,
  },
};
