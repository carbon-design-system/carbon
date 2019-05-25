/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { prefix } = require('../../globals/js/settings');

/* eslint-disable max-len */
const items = [
  {
    type: 'info',
    title: 'Notification title',
    subtitle: 'Subtitle text goes here.',
    timestamp: 'Time stamp [00:00:00]',
  },
  {
    type: 'error',
    title: 'Notification title',
    subtitle: 'Subtitle text goes here.',
    timestamp: 'Time stamp [00:00:00]',
  },
  {
    type: 'success',
    title: 'Notification title',
    subtitle:
      'Our goal is to become better at our craft and raise our collective knowledge by sharing experiences, best practices, what we have recently learned or what we are working on.',
    timestamp: 'Time stamp [00:00:00]',
  },
  {
    type: 'warning',
    title: 'Notification title',
    subtitle: 'Subtitle text goes here.',
    timestamp: 'Time stamp [00:00:00]',
  },
];
/* eslint-enable max-len */

module.exports = {
  context: {
    prefix,
  },
  variants: [
    {
      name: 'default',
      label: 'Inline Notification',
      context: {
        variant: 'inline',
        items,
      },
    },
    {
      name: 'low-contrast',
      label: 'Inline Notification (Low contrast)',
      context: {
        variant: 'inline',
        lowContrast: true,
        items,
      },
    },
    {
      name: 'toast',
      label: 'Toast Notification',
      notes: `
        Toast notifications are typically passive, meaning they won't affect the user's workflow if not addressed.
        Toast Notifications use 'kind' props to specify the kind of notification that should render
        (error, info, success, warning).
      `,
      context: {
        variant: 'toast',
        items,
      },
    },
    {
      name: 'low-contrast',
      label: 'Toast Notification (Low contrast)',
      notes: `
        Toast notifications are typically passive, meaning they won't affect the user's workflow if not addressed.
        Toast Notifications use 'kind' props to specify the kind of notification that should render
        (error, info, success, warning).
      `,
      context: {
        variant: 'toast',
        lowContrast: true,
        items,
      },
    },
  ],
};
