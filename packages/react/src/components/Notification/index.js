/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  NotificationActionButton as NotificationActionButtonNext,
  NotificationButton as NotificationButtonNext,
  ToastNotification as ToastNotificationNext,
  InlineNotification as InlineNotificationNext,
  ActionableNotification as ActionableNotificationNext,
} from './Notification';
import { createComponentToggle } from '../../internal/ComponentToggle';

export const NotificationActionButton = createComponentToggle({
  name: 'NotificationActionButton',
  next: NotificationActionButtonNext,
});

export const NotificationButton = createComponentToggle({
  name: 'NotificationButton',
  next: NotificationButtonNext,
});

export const ToastNotification = createComponentToggle({
  name: 'ToastNotification',
  next: ToastNotificationNext,
});

export const InlineNotification = createComponentToggle({
  name: 'InlineNotification',
  next: InlineNotificationNext,
});

export const ActionableNotification = createComponentToggle({
  name: 'ActionableNotification',
  next: ActionableNotificationNext,
});

// export * from './Notification';
