/**
 * Copyright IBM Corp. 2020, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Story-only helper component — not exported from the package.
 * Renders a notification bell icon with a red unread-indicator dot.
 * Used in NotificationsPanel.stories.js to show the unread state
 * of the trigger button in the header.
 */

import React from 'react';

export const UnreadNotificationBell = () => (
  <svg
    width="18px"
    height="19px"
    viewBox="0 0 18 19"
    xmlns="http://www.w3.org/2000/svg"
    className="sb-unread-notification-icon"
    aria-hidden="true"
    focusable="false">
    <title>Unread notification bell</title>
    <g transform="translate(-1 0)">
      <path
        d="M17.942 12.058L16.25 10.366V8.125C16.246 4.917 13.817 2.231 10.625 1.907V.625h-1.25v1.282C6.183 2.231 3.754 4.917 3.75 8.125v2.241L2.058 12.058A.625.625 0 001.875 12.5v1.875c0 .345.28.625.625.625H6.875v.485a3.125 3.125 0 006.25 0V15H17.5c.345 0 .625-.28.625-.625V12.5a.625.625 0 00-.183-.442zM11.875 15.625a1.875 1.875 0 01-3.75 0V15h3.75v.625zM16.875 13.75H3.125v-.991l1.692-1.692A.625.625 0 005 10.625V8.125a5 5 0 0110 0v2.5c0 .166.066.325.183.442l1.692 1.692v.991z"
        fillRule="nonzero"
      />
      <circle stroke="#161616" fill="#DA1E28" cx="15" cy="4.375" r="2.5" />
    </g>
  </svg>
);
