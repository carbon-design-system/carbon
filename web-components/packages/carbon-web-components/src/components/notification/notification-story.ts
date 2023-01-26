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
import { boolean, select } from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
import { ifDefined } from 'lit/directives/if-defined.js';
import { NOTIFICATION_KIND } from './inline-notification';
import './toast-notification';
import storyDocs from './notification-story.mdx';

const kinds = {
  [`Success (${NOTIFICATION_KIND.SUCCESS})`]: NOTIFICATION_KIND.SUCCESS,
  [`Info (${NOTIFICATION_KIND.INFO})`]: NOTIFICATION_KIND.INFO,
  [`Warning (${NOTIFICATION_KIND.WARNING})`]: NOTIFICATION_KIND.WARNING,
  [`Error (${NOTIFICATION_KIND.ERROR})`]: NOTIFICATION_KIND.ERROR,
};

const noop = () => {};

export const inline = (args) => {
  const {
    kind,
    title,
    subtitle,
    hideCloseButton,
    lowContrast,
    closeButtonLabel,
    iconLabel,
    open,
    timeout,
    disableClose,
    onBeforeClose = noop,
    onClose = noop,
  } = args?.['bx-inline-notification'] ?? {};
  const handleBeforeClose = (event: CustomEvent) => {
    onBeforeClose(event);
    if (disableClose) {
      event.preventDefault();
    }
  };
  return html`
    <bx-inline-notification
      style="min-width: 30rem; margin-bottom: .5rem"
      kind="${ifDefined(kind)}"
      title="${ifDefined(title)}"
      subtitle="${ifDefined(subtitle)}"
      ?hide-close-button="${hideCloseButton}"
      ?low-contrast="${lowContrast}"
      close-button-label="${ifDefined(closeButtonLabel)}"
      icon-label="${ifDefined(iconLabel)}"
      ?open="${open}"
      timeout="${ifDefined(timeout)}"
      @bx-notification-beingclosed="${handleBeforeClose}"
      @bx-notification-closed="${onClose}">
    </bx-inline-notification>
  `;
};

inline.parameters = {
  knobs: {
    'bx-inline-notification': () => ({
      kind: select(
        'The notification kind (kind)',
        kinds,
        NOTIFICATION_KIND.INFO
      ),
      title: textNullable('Title (title)', 'Notification title'),
      subtitle: textNullable('Subtitle (subtitle)', 'Subtitle text goes here.'),
      hideCloseButton: boolean(
        'Hide the close button (hide-close-button)',
        false
      ),
      lowContrast: boolean('Use low contrast variant (low-contrast)', false),
      closeButtonLabel: textNullable(
        'a11y label for the close button (close-button-label)',
        ''
      ),
      iconLabel: textNullable('a11y label for the icon (icon-label)', ''),
      open: boolean('Open (open)', true),
      timeout: textNullable('Timeout (in ms)', ''),
      disableClose: boolean(
        'Disable user-initiated close action (Call event.preventDefault() in bx-notification-beingclosed event)',
        false
      ),
      onBeforeClose: action('bx-notification-beingclosed'),
      onClose: action('bx-notification-closed'),
    }),
  },
};

export const toast = (args) => {
  const {
    kind,
    title,
    subtitle,
    caption,
    hideCloseButton,
    lowContrast,
    closeButtonLabel,
    iconLabel,
    open,
    timeout,
    disableClose,
    onBeforeClose = noop,
    onClose = noop,
  } = args?.['bx-toast-notification'] ?? {};
  const handleBeforeClose = (event: CustomEvent) => {
    onBeforeClose(event);
    if (disableClose) {
      event.preventDefault();
    }
  };
  return html`
    <bx-toast-notification
      style="min-width: 30rem; margin-bottom: .5rem"
      kind="${ifDefined(kind)}"
      title="${ifDefined(title)}"
      subtitle="${ifDefined(subtitle)}"
      caption="${ifDefined(caption)}"
      ?hide-close-button="${hideCloseButton}"
      ?low-contrast="${lowContrast}"
      close-button-label="${ifDefined(closeButtonLabel)}"
      icon-label="${ifDefined(iconLabel)}"
      ?open="${open}"
      timeout="${ifDefined(timeout)}"
      @bx-notification-beingclosed="${handleBeforeClose}"
      @bx-notification-closed="${onClose}">
    </bx-toast-notification>
  `;
};

toast.parameters = {
  knobs: {
    'bx-toast-notification': () => ({
      ...inline.parameters.knobs['bx-inline-notification'](),
      caption: textNullable('Caption (caption)', 'Time stamp [00:00:00]'),
    }),
  },
};

export default {
  title: 'Components/Notifications',
  parameters: {
    ...storyDocs.parameters,
  },
};
