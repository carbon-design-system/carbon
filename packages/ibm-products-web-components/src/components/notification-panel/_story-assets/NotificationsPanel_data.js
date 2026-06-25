/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { action } from 'storybook/actions';
import uuidv4 from '../../../globals/js/utils/uuidv4';
import { html } from 'lit';

/**
 Currently setting this to Jan 1st of the current year so notifications aren't too far back. I set it to current year for this case.
 The reason we changed this to hardcode is because percy was showing the change in timestamp as a design change. So technically it will
  only trigger a percy check once a year.
*/
const currentYear = new Date().getFullYear();
const currentDate = new Date(currentYear, 0, 1); // Month is 0-based, 4 = May

// Static yesterday date (May 3, 2024)
let yesterdayDate = new Date(currentDate);
yesterdayDate.setDate(currentDate.getDate() - 1);

// Static day before yesterday date (May 2, 2024)
let dayBeforeYesterday = new Date(currentDate);
dayBeforeYesterday.setDate(currentDate.getDate() - 2);

// Constant for milliseconds in one minute
const msInOneMinute = 60000;

export const dataToday = [
  {
    id: uuidv4(),
    type: 'error',
    title: 'LogDNA cannot be reached.',
    description: 'Unable to communicate with LogDNA.',
    timestamp: new Date(new Date().getTime() - 30 * 1000), // 30 seconds ago
    unread: true,
    onNotificationClick: action(`Clicked on notification`),
  },
];
export const dataPrevious = [
  {
    id: uuidv4(),
    type: 'error',
    title: 'LogRhythm connection failure',
    description: 'LogRhythm is failing to connect, check timeout.',
    timestamp: currentDate,
    unread: true,
    onNotificationClick: action(`Clicked on notification`),
  },

  {
    id: uuidv4(),
    type: 'warning',
    title: 'System alert',
    description: 'Email classification was exported successfully.',
    timestamp: new Date(currentDate.getTime() - 11 * msInOneMinute),
    unread: false,
    onNotificationClick: action(`Clicked on notification`),
  },
  {
    id: uuidv4(),
    type: 'success',
    title: 'IBM Cloud Pak for Automation Success',
    description: 'Successfully connected cartridge',
    timestamp: new Date(currentDate.getTime() - 120 * msInOneMinute),
    unread: false,
    onNotificationClick: action(`Clicked on notification`),
  },
  {
    id: uuidv4(),
    type: 'success',
    title: 'Successfully connected LogDNA',
    description: 'App connection succeeded',
    timestamp: yesterdayDate,
    unread: false,
    onNotificationClick: action(`Clicked on notification`),
  },
  {
    id: uuidv4(),
    type: 'warning',
    title: 'Cloud Foundry app memory',
    description: 'Allocated app memory low',
    timestamp: dayBeforeYesterday,
    unread: false,
    onNotificationClick: action(`Clicked on notification`),
  },
  {
    id: uuidv4(),
    type: 'informational',
    title: 'Logs are now being monitored',
    link: {
      text: 'View logs',
      url: 'https://www.carbondesignsystem.com',
    },
    timestamp: dayBeforeYesterday,
    unread: false,
    onNotificationClick: action(`Clicked on notification`),
  },
  {
    id: uuidv4(),
    type: 'error',
    title: 'Cluster unreachable',
    description: html`
      <p
        class="c4p--notifications-panel__notification-description c4p--notifications-panel__notification-short-description"
      >
        Not able to establish connection with provided cluster. Please check
        your logs and memory allocation to resolve this issue further.
      </p>
      <button
        class="c4p--notifications-panel__notification-read-more-button cds--btn cds--btn--sm cds--layout--size-sm cds--btn--ghost"
        type="button"
      >
        Read more
        <svg
          focusable="false"
          preserveAspectRatio="xMidYMid meet"
          fill="currentColor"
          aria-label="Read more"
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          role="img"
          class="cds--btn__icon"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"></path>
        </svg>
      </button>
    `,
    timestamp: dayBeforeYesterday,
    unread: false,
    onNotificationClick: action(`Clicked on notification`),
  },
  {
    id: uuidv4(),
    type: 'error',
    title: 'Cluster unreachable',
    description:
      'Not able to establish connection with provided cluster. Please check your logs and memory allocation to resolve this issue further.',
    timestamp: dayBeforeYesterday,
    unread: false,
    onNotificationClick: action(`Clicked on notification`),
  },
  {
    id: uuidv4(),
    type: 'error',
    title: 'Cluster unreachable',
    description:
      'Not able to establish connection with provided cluster. Please check your logs and memory allocation to resolve this issue further.',
    timestamp: dayBeforeYesterday,
    unread: false,
    onNotificationClick: action(`Clicked on notification`),
  },
  {
    id: uuidv4(),
    type: 'error',
    title: 'Cluster unreachable',
    description:
      'Not able to establish connection with provided cluster. Please check your logs and memory allocation to resolve this issue further.',
    timestamp: dayBeforeYesterday,
    unread: false,
    onNotificationClick: action(`Clicked on notification`),
  },
  {
    id: uuidv4(),
    type: 'error',
    title: 'Cluster unreachable',
    description:
      'Not able to establish connection with provided cluster. Please check your logs and memory allocation to resolve this issue further.',
    timestamp: dayBeforeYesterday,
    unread: false,
    onNotificationClick: action(`Clicked on notification`),
  },
  {
    id: uuidv4(),
    type: 'error',
    title: 'Cluster unreachable',
    description:
      'Not able to establish connection with provided cluster. Please check your logs and memory allocation to resolve this issue further.',
    timestamp: dayBeforeYesterday,
    unread: false,
    onNotificationClick: action(`Clicked on notification`),
  },
  {
    id: uuidv4(),
    type: 'error',
    title: 'Cluster unreachable',
    description:
      'Not able to establish connection with provided cluster. Please check your logs and memory allocation to resolve this issue further.',
    timestamp: dayBeforeYesterday,
    unread: false,
    onNotificationClick: action(`Clicked on notification`),
  },
  {
    id: uuidv4(),
    type: 'error',
    title: 'Cluster unreachable',
    description:
      'Not able to establish connection with provided cluster. Please check your logs and memory allocation to resolve this issue further.',
    timestamp: dayBeforeYesterday,
    unread: false,
    onNotificationClick: action(`Clicked on notification`),
  },
  {
    id: uuidv4(),
    type: 'error',
    title: 'Cluster unreachable',
    description:
      'Not able to establish connection with provided cluster. Please check your logs and memory allocation to resolve this issue further.',
    timestamp: dayBeforeYesterday,
    unread: false,
    onNotificationClick: action(`Clicked on notification`),
  },
];

export const extraData = {
  id: uuidv4(),
  type: 'error',
  title: 'Cluster unreachable',
  description:
    'Not able to establish connection with provided cluster. Please check your logs and memory allocation to resolve this issue further.',
  timestamp: new Date(new Date().getTime() - 30 * 1000),
  unread: true,
  onNotificationClick: action(`Clicked on notification`),
};
