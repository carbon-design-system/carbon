'use strict';

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
      'WARNING: The default font path (https://unpkg.com/carbon-components@latest/src/globals/fonts) should be used only for demonstration/evaluation purposes.',
    timestamp: 'Time stamp [00:00:00]',
  },
  {
    type: 'warning',
    title: 'Notification title',
    subtitle: 'Subtitle text goes here.',
    timestamp: 'Time stamp [00:00:00]',
  },
];

module.exports = {
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
      name: 'toast',
      label: 'Toast Notification',
      notes: `
        Toast notifications are typically passive, meaning they won't affect the user's workflow if not addressed.
        Toast Notifications use 'kind' props to specify the kind of notification that should render (error, info, success, warning).
      `,
      context: {
        variant: 'toast',
        items,
      },
    },
  ],
};
