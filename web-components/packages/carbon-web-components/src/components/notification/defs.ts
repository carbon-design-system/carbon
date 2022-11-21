/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Notification kinds.
 */
export enum NOTIFICATION_KIND {
  /**
   * Notification to represent success state.
   */
  SUCCESS = 'success',

  /**
   * Informational notification.
   */
  INFO = 'info',

  /**
   * Warning notification.
   */
  WARNING = 'warning',

  /**
   * Error notification.
   */
  ERROR = 'error',
}

/**
 * Notification types.
 */
export enum NOTIFICATION_TYPE {
  /**
   * Inline notification, which show up in task flows, to notify users of the status of an action.
   * They usually appear at the top of the primary content area.
   */
  INLINE = 'inline',

  /**
   * Toast notification, which is a non-modal, time-based window elements used to display short messages.
   * They usually appear at the bottom of the screen and disappear after a few seconds.
   */
  TOAST = 'toast',
}
