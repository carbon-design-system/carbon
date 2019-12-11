/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import {
  ToastNotification,
  InlineNotification,
  NotificationActionButton,
} from '../Notification';

const kinds = {
  'Error (error)': 'error',
  'Info (info)': 'info',
  'Success (success)': 'success',
  'Warning (warning)': 'warning',
};
const notificationProps = () => ({
  kind: select('The notification kind (kind)', kinds, 'info'),
  lowContrast: boolean('Use low contrast variant (lowContrast)', false),
  role: text('ARIA role (role)', 'alert'),
  title: text('Title (title)', 'Notification title'),
  subtitle: (
    <span>
      Subtitle text goes here. <a href="#example">Example link</a>
    </span>
  ),
  iconDescription: text(
    'Icon description (iconDescription)',
    'describes the close button'
  ),
  hideCloseButton: boolean('Hide close button (hideCloseButton)', false),
  onCloseButtonClick: action('onCloseButtonClick'),
});

storiesOf('Notifications', module)
  .addDecorator(withKnobs)
  .add('Toast', () => (
    <ToastNotification
      {...notificationProps()}
      caption={text('Caption (caption)', 'Time stamp [00:00:00]')}
      style={{ minWidth: '30rem', marginBottom: '.5rem' }}
    />
  ))
  .add('inline', () => (
    <InlineNotification
      {...notificationProps()}
      actions={
        <NotificationActionButton
          onClick={action('NotificationActionButton onClick')}>
          {text('Action (NotificationActionButton > children)', 'Action')}
        </NotificationActionButton>
      }
    />
  ));
