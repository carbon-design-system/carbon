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
   * Informational square icon notification.
   */
  INFO_SQUARE = 'info-square',

  /**
   * Warning notification.
   */
  WARNING = 'warning',

  /**
   * Warning Alt notification.
   */
  WARNING_ALT = 'warning-alt',

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

  /**
   * Actionable notifications allow for interactive elements within a notification styled like an inline
   * or toast notification. Actionable notifications, since they require user interaction, take focus when
   * triggered and can be highly disruptive to screen readers and keyboard users. With actionable notifications,
   * only one action is allowed per notification. This action frequently takes users to a flow or page related
   * to the message, where they can resolve the notification.
   */
  ACTIONABLE = 'actionable',
}
