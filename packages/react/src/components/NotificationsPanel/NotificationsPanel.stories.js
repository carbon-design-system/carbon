/**
 * Copyright IBM Corp. 2020, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './story.scss';
import React, { useEffect, useRef, useState } from 'react';
import { action } from 'storybook/actions';
import mdx from './docs/overview.mdx';
import { NotificationsPanel } from '.';
import {
  Button,
  Header,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderName,
  HeaderPanel,
} from '../..';
import { Close, Notification, Switcher, User } from '@carbon/icons-react';
import { UnreadNotificationBell } from './UnreadNotificationBell';

const storyBlockClass = 'cds--notifications-panel__story';

export default {
  title: 'Components/NotificationsPanel',
  component: NotificationsPanel,
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    // Hide all inherited HTML attributes
    style: { table: { disable: true } },
    id: { table: { disable: true } },
    tabIndex: { table: { disable: true } },
    ref: { table: { disable: true } },
    // Hide node/function props with no useful Storybook control
    children: { table: { disable: true } },
    className: { table: { disable: true } },
    triggerButtonRef: { table: { disable: true } },
    onClickOutside: { table: { disable: true } },
    onDismissAllNotifications: { table: { disable: true } },
    onDismissSingleNotification: { table: { disable: true } },
    onDoNotDisturbChange: { table: { disable: true } },
    onSettingsClick: { table: { disable: true } },
    onViewAllClick: { table: { disable: true } },
    // Component-specific props
    open: { control: 'boolean' },
    doNotDisturbDefaultToggled: { control: 'boolean' },
    dateTimeStyle: {
      control: { type: 'select' },
      options: ['long', 'short', 'narrow'],
    },
    illustrationTheme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
    },
    dismissAllLabel: { control: 'text' },
    dismissSingleNotificationIconDescription: { control: 'text' },
    doNotDisturbLabel: { control: 'text' },
    emptyStateLabel: { control: 'text' },
    previousLabel: { control: 'text' },
    readLessLabel: { control: 'text' },
    readMoreLabel: { control: 'text' },
    settingsIconDescription: { control: 'text' },
    title: { control: 'text' },
    todayLabel: { control: 'text' },
    yesterdayLabel: { control: 'text' },
    // Hide deprecated text-function props
    daysAgoText: { table: { disable: true } },
    hourAgoText: { table: { disable: true } },
    hoursAgoText: { table: { disable: true } },
    minuteAgoText: { table: { disable: true } },
    minutesAgoText: { table: { disable: true } },
    monthAgoText: { table: { disable: true } },
    monthsAgoText: { table: { disable: true } },
    nowText: { table: { disable: true } },
    secondsAgoText: { table: { disable: true } },
    yearAgoText: { table: { disable: true } },
    yearsAgoText: { table: { disable: true } },
    yesterdayAtText: { table: { disable: true } },
    viewAllLabel: { table: { disable: true } },
    data: { table: { disable: true } },
  },
};

// ---------------------------------------------------------------------------
// Sample data
// ---------------------------------------------------------------------------

const currentYear = new Date().getFullYear();
const currentDate = new Date(currentYear, 0, 1);

let yesterdayDate = new Date(currentDate);
yesterdayDate.setDate(currentDate.getDate() - 1);

let dayBeforeYesterday = new Date(currentDate);
dayBeforeYesterday.setDate(currentDate.getDate() - 2);

const msInOneMinute = 60000;

const sampleData = [
  {
    id: '1',
    type: 'error',
    title: 'LogRhythm connection failure',
    description: 'LogRhythm is failing to connect, check timeout.',
    timestamp: currentDate,
    unread: true,
    onNotificationClick: action('Clicked on notification'),
  },
  {
    id: '2',
    type: 'error',
    title: 'LogDNA cannot be reached',
    description: 'Unable to communicate with LogDNA.',
    timestamp: new Date(new Date().getTime() - 30 * 1000),
    unread: true,
    onNotificationClick: action('Clicked on notification'),
  },
  {
    id: '3',
    type: 'warning',
    title: 'System alert',
    description: 'Email classification was exported successfully.',
    timestamp: new Date(currentDate.getTime() - 11 * msInOneMinute),
    unread: false,
    onNotificationClick: action('Clicked on notification'),
  },
  {
    id: '4',
    type: 'success',
    title: 'IBM Cloud Pak for Automation Success',
    description: 'Successfully connected cartridge',
    timestamp: new Date(currentDate.getTime() - 120 * msInOneMinute),
    unread: false,
    onNotificationClick: action('Clicked on notification'),
  },
  {
    id: '5',
    type: 'success',
    title: 'Successfully connected LogDNA',
    description: 'App connection succeeded',
    timestamp: yesterdayDate,
    unread: false,
    onNotificationClick: action('Clicked on notification'),
  },
  {
    id: '6',
    type: 'warning',
    title: 'Cloud Foundry app memory',
    description: 'Allocated app memory low',
    timestamp: dayBeforeYesterday,
    unread: false,
    onNotificationClick: action('Clicked on notification'),
  },
  {
    id: '7',
    type: 'informational',
    title: 'Logs are now being monitored',
    link: { text: 'View logs', url: 'https://www.carbondesignsystem.com' },
    timestamp: dayBeforeYesterday,
    unread: false,
    onNotificationClick: action('Clicked on notification'),
  },
  {
    id: '8',
    type: 'error',
    title: 'Cluster unreachable',
    description:
      'Not able to establish connection with provided cluster. Please check your logs and memory allocation to resolve this issue further.',
    timestamp: dayBeforeYesterday,
    unread: false,
    onNotificationClick: action('Clicked on notification'),
  },
];

// ---------------------------------------------------------------------------
// Default story
// ---------------------------------------------------------------------------

export const Default = (args) => {
  const { open, ...rest } = args;
  const [notificationsData, setNotificationsData] = useState(sampleData);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(open);
  const [userOpen, setUserOpen] = useState(false);
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const userActionRef = useRef(null);
  const notificationActionRef = useRef(null);
  const switcherActionRef = useRef(null);

  // Track whether any notification is unread
  useEffect(() => {
    setHasUnreadNotifications(notificationsData.some((n) => n.unread === true));
  }, [notificationsData]);

  // Mark all as read when panel opens
  useEffect(() => {
    if (notificationsOpen) {
      setNotificationsData((prev) =>
        prev.map((n) => ({ ...n, unread: false }))
      );
    }
  }, [notificationsOpen]);

  // Sync Storybook control → local state
  useEffect(() => {
    setNotificationsOpen(open);
  }, [open]);

  return (
    <div className={`${storyBlockClass}--full-height`}>
      <Header aria-label="IBM Cloud Pak">
        <HeaderName href="/" prefix="IBM" onClick={(e) => e.preventDefault()}>
          Cloud Pak
        </HeaderName>
        <HeaderGlobalBar>
          <HeaderGlobalAction
            ref={userActionRef}
            aria-label={userOpen ? 'Close user account' : 'Open user account'}
            isActive={userOpen}
            onClick={() => {
              setUserOpen((p) => !p);
              setNotificationsOpen(false);
              setSwitcherOpen(false);
            }}>
            {userOpen ? <Close size={20} /> : <User size={20} />}
          </HeaderGlobalAction>
          <HeaderPanel expanded={userOpen}>
            <div className={`${storyBlockClass}__header-panel`}>
              User account panel
            </div>
          </HeaderPanel>

          <HeaderGlobalAction
            ref={notificationActionRef}
            aria-label={
              notificationsOpen ? 'Close notifications' : 'Open notifications'
            }
            aria-expanded={notificationsOpen}
            isActive={notificationsOpen}
            onClick={() => {
              setNotificationsOpen((p) => !p);
              setUserOpen(false);
              setSwitcherOpen(false);
            }}>
            {notificationsOpen ? (
              <Close size={20} />
            ) : hasUnreadNotifications ? (
              <UnreadNotificationBell />
            ) : (
              <Notification size={20} />
            )}
          </HeaderGlobalAction>
          <NotificationsPanel
            {...rest}
            triggerButtonRef={notificationActionRef}
            data={notificationsData}
            open={notificationsOpen}
            onClickOutside={() => {
              action('Clicked outside')();
              setNotificationsOpen(false);
            }}
            onDismissAllNotifications={() => {
              action('Clicked "Dismiss all"')();
              setNotificationsData([]);
            }}
            onDismissSingleNotification={({ id }) => {
              action('Clicked "Dismiss notification"')();
              setNotificationsData((prev) =>
                prev.filter((item) => item.id !== id)
              );
            }}
            onViewAllClick={action('Clicked "View all"')}
            onSettingsClick={action('Clicked gear icon')}
            onDoNotDisturbChange={action('Toggled "Do not disturb"')}
          />

          <HeaderGlobalAction
            ref={switcherActionRef}
            aria-label={switcherOpen ? 'Close switcher' : 'Open switcher'}
            isActive={switcherOpen}
            onClick={() => {
              setSwitcherOpen((p) => !p);
              setUserOpen(false);
              setNotificationsOpen(false);
            }}>
            {switcherOpen ? <Close size={20} /> : <Switcher size={20} />}
          </HeaderGlobalAction>
          <HeaderPanel expanded={switcherOpen}>
            <div className={`${storyBlockClass}__header-panel`}>
              App switcher panel
            </div>
          </HeaderPanel>
        </HeaderGlobalBar>
      </Header>
      <main className={`${storyBlockClass}__add`}>
        <Button
          onClick={() => {
            const newItem = {
              id: String(Date.now()),
              type: 'informational',
              title: 'New notification',
              description: 'This is a newly added notification.',
              timestamp: new Date(),
              unread: true,
              onNotificationClick: action('Clicked on notification'),
            };
            setNotificationsData((prev) => [...prev, newItem]);
          }}>
          Add new notification
        </Button>
      </main>
    </div>
  );
};

Default.args = {
  open: true,
  illustrationTheme: 'light',
  dateTimeStyle: 'long',
};
