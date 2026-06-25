/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const currentYear = new Date().getFullYear();
const currentDate = new Date(currentYear, 0, 1); // Month is 0-based, 4 = May
let yesterdayDate = new Date(currentDate);
yesterdayDate.setDate(currentDate.getDate() - 1);
let dayBeforeYesterday = new Date(currentDate);
dayBeforeYesterday.setDate(currentDate.getDate() - 2);
const msInOneMinute = 60000;

export const notifications = {
  today: [
    {
      id: 1,
      type: 'error',
      title: 'LogDNA cannot be reached.',
      description: 'Unable to communicate with LogDNA.',
      timestamp: new Date(new Date().getTime() - 30 * 1000), // 30 seconds ago
      unread: true,
    },
  ],
  previous: [
    {
      id: 2,
      type: 'error',
      title: 'LogRhythm connection failure',
      description: 'LogRhythm is failing to connect, check timeout.',
      timestamp: currentDate,
      unread: true,
    },

    {
      id: 3,
      type: 'warning',
      title: 'System alert',
      description: 'Email classification was exported successfully.',
      timestamp: new Date(currentDate.getTime() - 11 * msInOneMinute),
      unread: false,
    },
    {
      id: 4,
      type: 'success',
      title: 'IBM Cloud Pak for Automation Success',
      description: 'Successfully connected cartridge',
      timestamp: new Date(currentDate.getTime() - 120 * msInOneMinute),
      unread: false,
    },
    {
      id: 5,
      type: 'success',
      title: 'Successfully connected LogDNA',
      description: 'App connection succeeded',
      timestamp: yesterdayDate,
      unread: false,
    },
    {
      id: 6,
      type: 'warning',
      title: 'Cloud Foundry app memory',
      description: 'Allocated app memory low',
      timestamp: dayBeforeYesterday,
      unread: false,
    },
    {
      id: 7,
      type: 'informational',
      title: 'Logs are now being monitored',
      link: {
        text: 'View logs',
        url: 'https://www.carbondesignsystem.com',
      },
      timestamp: dayBeforeYesterday,
      unread: false,
    },
    {
      id: 8,
      type: 'error',
      title: 'Cluster unreachable',
      description:
        'Not able to establish connection with provided cluster. Please check your logs and memory allocation to resolve this issue further.',
      timestamp: dayBeforeYesterday,
      unread: false,
    },
    {
      id: 9,
      type: 'error',
      title: 'Cluster unreachable',
      description:
        'Not able to establish connection with provided cluster. Please check your logs and memory allocation to resolve this issue further.',
      timestamp: dayBeforeYesterday,
      unread: false,
    },
    {
      id: 10,
      type: 'error',
      title: 'Cluster unreachable',
      description:
        'Not able to establish connection with provided cluster. Please check your logs and memory allocation to resolve this issue further.',
      timestamp: dayBeforeYesterday,
      unread: false,
    },
    {
      id: 11,
      type: 'error',
      title: 'Cluster unreachable',
      description:
        'Not able to establish connection with provided cluster. Please check your logs and memory allocation to resolve this issue further.',
      timestamp: dayBeforeYesterday,
      unread: false,
    },
    {
      id: 12,
      type: 'error',
      title: 'Cluster unreachable',
      description:
        'Not able to establish connection with provided cluster. Please check your logs and memory allocation to resolve this issue further.',
      timestamp: dayBeforeYesterday,
      unread: false,
    },
    {
      id: 13,
      type: 'error',
      title: 'Cluster unreachable',
      description:
        'Not able to establish connection with provided cluster. Please check your logs and memory allocation to resolve this issue further.',
      timestamp: dayBeforeYesterday,
      unread: false,
    },
    {
      id: 14,
      type: 'error',
      title: 'Cluster unreachable',
      description:
        'Not able to establish connection with provided cluster. Please check your logs and memory allocation to resolve this issue further.',
      timestamp: dayBeforeYesterday,
      unread: false,
    },
    {
      id: 15,
      type: 'error',
      title: 'Cluster unreachable',
      description:
        'Not able to establish connection with provided cluster. Please check your logs and memory allocation to resolve this issue further.',
      timestamp: dayBeforeYesterday,
      unread: false,
    },
    {
      id: 16,
      type: 'error',
      title: 'Cluster unreachable',
      description:
        'Not able to establish connection with provided cluster. Please check your logs and memory allocation to resolve this issue further.',
      timestamp: dayBeforeYesterday,
      unread: false,
    },
  ],
};
