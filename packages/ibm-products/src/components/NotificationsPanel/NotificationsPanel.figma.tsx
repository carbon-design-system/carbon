/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { NotificationsPanel } from './NotificationsPanel';
import figma from '@figma/code-connect';

const connectionURL =
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf?node-id=10574%3A240266';

const sharedProps = {
  title: figma.nestedProps('Header', {
    text: figma.textContent('"Notifications"'),
  }),
  doNotDisturbLabel: figma.nestedProps('Toggle', {
    text: figma.textContent('Value'),
  }),
};

figma.connect(NotificationsPanel, connectionURL, {
  variant: { 'Empty state': false },
  props: {
    ...sharedProps,
  },
  example: (props) => (
    <NotificationsPanel
      open={true}
      data={[
        {
          id: '1',
          type: 'success',
          title: 'Title.',
          description: 'Message',
          timestamp: new Date(new Date().getTime() - 30 * 1000),
          unread: true,
          onNotificationClick: () => console.log('Clicked on notification'),
        },
        {
          id: '2',
          type: 'error',
          title: 'Title',
          description: 'Message',
          timestamp: new Date(new Date().getTime() - 11 * 1000),
          unread: false,
          onNotificationClick: () => console.log('Clicked on notification'),
        },
        {
          id: '3',
          type: 'warning',
          title: 'Title',
          description: 'Message',
          timestamp: new Date(new Date().getTime() - 120 * 1000),
          unread: false,
          onNotificationClick: () => console.log('Clicked on notification'),
        },
      ]}
      illustrationTheme="light"
      dateTimeLocale="en-US"
      dateTimeStyle="short"
      title={props.title.text}
      doNotDisturbLabel={props.doNotDisturbLabel.text}
    />
  ),
});

figma.connect(NotificationsPanel, connectionURL, {
  variant: { 'Empty state': true },
  props: {
    ...sharedProps,
    emptyStateLabel: figma.nestedProps(
      'Empty state | (v11) Carbon for IBM Products',
      {
        text: figma.string('Title text'),
      }
    ),
  },
  example: (props) => (
    <NotificationsPanel
      open={true}
      data={[]}
      illustrationTheme="light"
      title={props.title.text}
      doNotDisturbLabel={props.doNotDisturbLabel.text}
      emptyStateLabel={props.emptyStateLabel.text}
    />
  ),
});
