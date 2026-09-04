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
    // ── Hidden: inherited HTML attrs not relevant to this component ──────────
    style: { table: { disable: true } },
    id: { table: { disable: true } },
    tabIndex: { table: { disable: true } },
    ref: { table: { disable: true } },
    children: { table: { disable: true } },
    className: { table: { disable: true } },

    // ── Required / data props ────────────────────────────────────────────────
    data: {
      control: false,
      description:
        'Array of notification objects to render. Each object supports: `id`, `type` (`"error"` | `"warning"` | `"success"` | `"informational"`), `timestamp` (Date), `title`, `description`, `link` (`{ text, url }`), `unread` (boolean), `onNotificationClick` (function).',
      table: { category: 'Data', type: { summary: 'NotificationData[]' } },
    },

    // ── Boolean props ────────────────────────────────────────────────────────
    open: {
      control: 'boolean',
      description: 'Whether the notifications panel is visible.',
      table: { category: 'State' },
    },
    doNotDisturbDefaultToggled: {
      control: 'boolean',
      description:
        'Initial toggled state of the "Do not disturb" toggle. Only rendered when `onDoNotDisturbChange` is provided.',
      table: { category: 'State' },
    },

    // ── Localization ─────────────────────────────────────────────────────────
    dateTimeLocale: {
      control: 'text',
      description:
        'BCP 47 locale string (e.g. `"de"`, `"fr-CA"`) used to format relative timestamps via `@carbon/utilities`. When provided, the deprecated `*AgoText` props are ignored.',
      table: { category: 'Localization' },
    },
    dateTimeStyle: {
      control: { type: 'select' },
      options: ['long', 'short', 'narrow'],
      description:
        'Verbosity of the relative timestamp when `dateTimeLocale` is set. `"long"` → "6 minutes ago", `"short"` → "6m ago".',
      table: { category: 'Localization' },
    },

    // ── Label props ──────────────────────────────────────────────────────────
    dismissAllLabel: {
      control: 'text',
      description: 'Label for the "Dismiss all" button.',
      table: { category: 'Labels' },
    },
    dismissSingleNotificationIconDescription: {
      control: 'text',
      description:
        "Accessible label for each notification's dismiss icon button.",
      table: { category: 'Labels' },
    },
    doNotDisturbLabel: {
      control: 'text',
      description: 'Label text for the "Do not disturb" toggle.',
      table: { category: 'Labels' },
    },
    emptyStateLabel: {
      control: 'text',
      description:
        'Text shown in the empty state when there are no notifications.',
      table: { category: 'Labels' },
    },
    previousLabel: {
      control: 'text',
      description: 'Section heading for notifications older than yesterday.',
      table: { category: 'Labels' },
    },
    readLessLabel: {
      control: 'text',
      description:
        'Label for the collapse button on long notification descriptions.',
      table: { category: 'Labels' },
    },
    readMoreLabel: {
      control: 'text',
      description:
        'Label for the expand button on long notification descriptions.',
      table: { category: 'Labels' },
    },
    settingsIconDescription: {
      control: 'text',
      description: 'Accessible label for the settings gear icon button.',
      table: { category: 'Labels' },
    },
    title: {
      control: 'text',
      description: 'Panel heading text.',
      table: { category: 'Labels' },
    },
    todayLabel: {
      control: 'text',
      description: "Section heading for today's notifications.",
      table: { category: 'Labels' },
    },
    yesterdayLabel: {
      control: 'text',
      description: "Section heading for yesterday's notifications.",
      table: { category: 'Labels' },
    },
    viewAllLabel: {
      control: false,
      description:
        'Function returning the "View all" button label. Receives the total notification count. Example: `(n) => `View all (${n})``.',
      table: {
        category: 'Labels',
        type: { summary: '(count: number) => string' },
      },
    },
    illustrationTheme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description:
        'Theme of the empty-state illustration. Pass `"dark"` when your app uses a dark Carbon theme.',
      table: { category: 'Appearance' },
    },

    // ── Callbacks ────────────────────────────────────────────────────────────
    onClickOutside: {
      control: false,
      description: 'Called when a click is detected outside the panel.',
      table: { category: 'Callbacks', type: { summary: '() => void' } },
    },
    onDismissAllNotifications: {
      control: false,
      description: 'Called when the "Dismiss all" button is clicked.',
      table: { category: 'Callbacks', type: { summary: '() => void' } },
    },
    onDismissSingleNotification: {
      control: false,
      description:
        "Called when a single notification's dismiss button is clicked. Receives the notification data object.",
      table: {
        category: 'Callbacks',
        type: { summary: '(notification: NotificationData) => void' },
      },
    },
    onDoNotDisturbChange: {
      control: false,
      description:
        'Called when the "Do not disturb" toggle changes. Receives the new boolean value. Panel renders the toggle only when this prop is provided.',
      table: {
        category: 'Callbacks',
        type: { summary: '(checked: boolean) => void' },
      },
    },
    onSettingsClick: {
      control: false,
      description:
        'Called when the settings gear icon is clicked. The settings button is only rendered when both `onSettingsClick` and `onViewAllClick` are provided.',
      table: { category: 'Callbacks', type: { summary: '() => void' } },
    },
    onViewAllClick: {
      control: false,
      description:
        'Called when the "View all" button is clicked. The button is only rendered when both `onViewAllClick` and `onSettingsClick` are provided.',
      table: { category: 'Callbacks', type: { summary: '() => void' } },
    },
    triggerButtonRef: {
      control: false,
      description:
        'Ref to the trigger button element. Used to return focus to the trigger when the panel is closed.',
      table: {
        category: 'Callbacks',
        type: { summary: 'RefObject<HTMLElement>' },
      },
    },

    // ── Deprecated: legacy timestamp text functions ──────────────────────────
    daysAgoText: {
      control: false,
      description:
        '**Deprecated** — use `dateTimeLocale` instead. Function returning the "N days ago" string.',
      table: {
        category: 'Deprecated',
        type: { summary: '(value: number) => string' },
      },
    },
    hourAgoText: {
      control: false,
      description:
        '**Deprecated** — use `dateTimeLocale` instead. Function returning the "1 hour ago" string.',
      table: {
        category: 'Deprecated',
        type: { summary: '(value: number) => string' },
      },
    },
    hoursAgoText: {
      control: false,
      description:
        '**Deprecated** — use `dateTimeLocale` instead. Function returning the "N hours ago" string.',
      table: {
        category: 'Deprecated',
        type: { summary: '(value: number) => string' },
      },
    },
    minuteAgoText: {
      control: false,
      description:
        '**Deprecated** — use `dateTimeLocale` instead. Function returning the "1 minute ago" string.',
      table: {
        category: 'Deprecated',
        type: { summary: '(value: number) => string' },
      },
    },
    minutesAgoText: {
      control: false,
      description:
        '**Deprecated** — use `dateTimeLocale` instead. Function returning the "N minutes ago" string.',
      table: {
        category: 'Deprecated',
        type: { summary: '(value: number) => string' },
      },
    },
    monthAgoText: {
      control: false,
      description:
        '**Deprecated** — use `dateTimeLocale` instead. Function returning the "1 month ago" string.',
      table: {
        category: 'Deprecated',
        type: { summary: '(value: number) => string' },
      },
    },
    monthsAgoText: {
      control: false,
      description:
        '**Deprecated** — use `dateTimeLocale` instead. Function returning the "N months ago" string.',
      table: {
        category: 'Deprecated',
        type: { summary: '(value: number) => string' },
      },
    },
    nowText: {
      control: false,
      description:
        '**Deprecated** — use `dateTimeLocale` instead. String displayed for timestamps within the last 10 seconds.',
      table: { category: 'Deprecated', type: { summary: 'string' } },
    },
    secondsAgoText: {
      control: false,
      description:
        '**Deprecated** — use `dateTimeLocale` instead. Function returning the "N seconds ago" string.',
      table: {
        category: 'Deprecated',
        type: { summary: '(value: number) => string' },
      },
    },
    yearAgoText: {
      control: false,
      description:
        '**Deprecated** — use `dateTimeLocale` instead. Function returning the "1 year ago" string.',
      table: {
        category: 'Deprecated',
        type: { summary: '(value: number) => string' },
      },
    },
    yearsAgoText: {
      control: false,
      description:
        '**Deprecated** — use `dateTimeLocale` instead. Function returning the "N years ago" string.',
      table: {
        category: 'Deprecated',
        type: { summary: '(value: number) => string' },
      },
    },
    yesterdayAtText: {
      control: false,
      description:
        '**Deprecated** — use `dateTimeLocale` instead. Function returning the "Yesterday at HH:MM" string.',
      table: {
        category: 'Deprecated',
        type: { summary: '(value: number) => string' },
      },
    },
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
