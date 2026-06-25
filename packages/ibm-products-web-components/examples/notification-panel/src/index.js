/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/ibm-products-web-components/es/components/notification-panel/index.js';
import '@carbon/web-components/es/components/button/index.js';
import '@carbon/web-components/es/components/ui-shell/index.js';
import '@carbon/web-components/es/components/heading/index.js';
import { notifications } from './assets/notification_data.js';

document.addEventListener('DOMContentLoaded', function () {
  const panel = document.querySelector('c4p-notification-panel');
  const triggerButton = document.querySelector('#notification-button');
  panel.triggerButton = triggerButton;
  renderNotifications();
  triggerButton.addEventListener('click', (event) => {
    event.stopPropagation();
    panel.open = !panel.open;
  });
  document
    .querySelector('cds-button')
    .addEventListener('click', addNotification);
  panel.addEventListener('c4p-notification-dismiss-all', function (event) {
    dismissAllNotification();
  });
  panel.addEventListener('c4p-notification-click-outside', function (event) {
    clickOutside();
  });
});

function addNotification() {
  const newNotification = {
    id: Date.now(),
    type: 'informational',
    unread: true,
    timestamp: new Date(),
    title: 'New system update available',
    description: 'Version 2.5.0 is ready to install.',
  };
  notifications.today.unshift(newNotification);
  const unreadNotification = `
   <svg width="18px" height="19px" viewBox="0 0 18 19" xmlns="http://www.w3.org/2000/svg" class="sb-unread-notification-icon" aria-label="Unread notification bell" role="img" slot="icon">
    <title>Unread notification bell</title>
    <g transform="translate(-1.000000, 0.000000)">
      <path d="M17.9419375,12.058125 L16.25,10.3661875 L16.25,8.125 C16.245845,4.91692673 13.816599,2.23147626 10.625,1.90675 L10.625,0.625 L9.375,0.625 L9.375,1.90675 C6.183401,2.23147626 3.754155,4.91692673 3.75,8.125 L3.75,10.3661875 L2.0580625,12.058125 C1.94086706,12.1753182 1.875,12.3342622 1.875,12.5 L1.875,14.375 C1.875,14.720178 2.15482203,15 2.5,15 L6.875,15 L6.875,15.4855 C6.84694527,17.1272367 8.05869477,18.5271305 9.6875,18.7346875 C10.5660567,18.8218694 11.4405518,18.5337871 12.0952737,17.9415019 C12.7499955,17.3492167 13.1239886,16.5078712 13.125,15.625 L13.125,15 L17.5,15 C17.845178,15 18.125,14.720178 18.125,14.375 L18.125,12.5 C18.125,12.3342622 18.0591329,12.1753182 17.9419375,12.058125 Z M11.875,15.625 C11.875,16.6605339 11.0355339,17.5 10,17.5 C8.96446609,17.5 8.125,16.6605339 8.125,15.625 L8.125,15 L11.875,15 L11.875,15.625 Z M16.875,13.75 L3.125,13.75 L3.125,12.7588125 L4.816875,11.066875 C4.93409336,10.949692 4.9999646,10.7907468 5,10.625 L5,8.125 C5,5.36357625 7.23857625,3.125 10,3.125 C12.7614237,3.125 15,5.36357625 15,8.125 L15,10.625 C15.0000354,10.7907468 15.0659066,10.949692 15.183125,11.066875 L16.875,12.7588125 L16.875,13.75 Z" fill-rule="nonzero"></path>
      <circle stroke="#161616" fill="#DA1E28" cx="15" cy="4.375" r="2.5"></circle>
    </g>
  </svg>
  `;
  document.getElementById('notification-button').innerHTML = unreadNotification;
  renderNotifications();
}
function handleDismissNotification(notificationId, dataType) {
  if (dataType === 'today') {
    const filteredData = notifications.today.filter(
      (obj) => obj.id !== notificationId
    );
    notifications.today = [...filteredData];
  } else {
    const filteredData = notifications.previous.filter(
      (obj) => obj.id !== notificationId
    );
    notifications.previous = [...filteredData];
  }
  renderNotifications();
}
function clickEventHandler() {
  console.log('notification clicked');
}

function renderNotifications() {
  const panel = document.querySelector('c4p-notification-panel');
  // Clear existing notifications
  panel.querySelectorAll('c4p-notification').forEach((n) => n.remove());
  notifications.today.forEach((notification) => {
    console.log(notification, 'notification');

    const element = document.createElement('c4p-notification');
    element.setAttribute('slot', 'today');
    element.setAttribute('type', notification.type);
    element.setAttribute('unread', notification.unread);
    element.timestamp = notification.timestamp;
    // Add custom event listener
    element.addEventListener('c4p-notification-dismiss', (event) => {
      handleDismissNotification(notification.id, 'today');
    });
    // Add click event listener
    element.addEventListener('click', (event) => {
      clickEventHandler();
    });
    const title = document.createElement('h4');
    title.classList.add('c4p--notifications-panel__notification-title');
    if (notification.unread) {
      title.classList.add(
        'c4p--notifications-panel__notification-title-unread'
      );
    } else {
      title.classList.remove(
        'c4p--notifications-panel__notification-title-unread'
      );
    }
    title.setAttribute('slot', 'title');
    title.textContent = notification.title;

    const desc = document.createElement('div');
    desc.setAttribute('slot', 'description');
    desc.textContent = notification.description;

    element.appendChild(title);
    element.appendChild(desc);
    panel.appendChild(element);
  });
  notifications.previous.forEach((notification) => {
    const element = document.createElement('c4p-notification');
    element.setAttribute('slot', 'previous');
    element.setAttribute('type', notification.type);
    element.setAttribute('unread', notification.unread);
    element.timestamp = notification.timestamp;
    // Add custom event listener
    element.addEventListener('c4p-notification-dismiss', () => {
      handleDismissNotification(notification.id, 'previous');
    });
    // Add click event listener
    element.addEventListener('click', () => {
      clickEventHandler();
    });
    const title = document.createElement('h4');
    title.classList.add('c4p--notifications-panel__notification-title');
    if (notification.unread) {
      title.classList.add(
        'c4p--notifications-panel__notification-title-unread'
      );
    } else {
      title.classList.remove(
        'c4p--notifications-panel__notification-title-unread'
      );
    }

    title.setAttribute('slot', 'title');
    title.textContent = notification.title;

    const desc = document.createElement('div');
    desc.setAttribute('slot', 'description');
    desc.textContent = notification.description;

    element.appendChild(title);
    element.appendChild(desc);
    panel.appendChild(element);
  });
  const footer = panel.querySelector('c4p-notification-footer');
  footer.setAttribute(
    'view-all-label',
    `View all (${notifications.today.length + notifications.previous.length})`
  );
}

function dismissAllNotification() {
  notifications.today = [];
  notifications.previous = [];
  renderNotifications();
}

function clickOutside() {
  const notificationIcon = `<svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 32 32" slot="icon"><!--?lit$923491682$--><path d="M28.7071,19.293,26,16.5859V13a10.0136,10.0136,0,0,0-9-9.9492V1H15V3.0508A10.0136,10.0136,0,0,0,6,13v3.5859L3.2929,19.293A1,1,0,0,0,3,20v3a1,1,0,0,0,1,1h7v.7768a5.152,5.152,0,0,0,4.5,5.1987A5.0057,5.0057,0,0,0,21,25V24h7a1,1,0,0,0,1-1V20A1,1,0,0,0,28.7071,19.293ZM19,25a3,3,0,0,1-6,0V24h6Zm8-3H5V20.4141L7.707,17.707A1,1,0,0,0,8,17V13a8,8,0,0,1,16,0v4a1,1,0,0,0,.293.707L27,20.4141Z"></path></svg>`;
  document.getElementById('notification-button').innerHTML = notificationIcon;
  const notificationsResult = markAllAsRead(notifications);
  notifications.today = notificationsResult.today;
  notifications.previous = notificationsResult.previous;
  renderNotifications();
}
function markAllAsRead(notifications) {
  const result = { today: [], previous: [] };

  for (const type of ['today', 'previous']) {
    for (const notification of notifications[type]) {
      result[type].push({
        ...notification,
        unread: false,
      });
    }
  }
  console.log(result, 'result');

  return result;
}
