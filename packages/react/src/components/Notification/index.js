/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  NotificationActionButton as NotificationActionButtonNext,
  NotificationButton as NotificationButtonNext,
  ToastNotification as ToastNotificationNext,
  InlineNotification as InlineNotificationNext,
} from './next/Notification';
import {
  NotificationActionButton as NotificationActionButtonClassic,
  NotificationTextDetails as NotificationTextDetailsClassic,
  NotificationButton as NotificationButtonClassic,
  ToastNotification as ToastNotificationClassic,
  InlineNotification as InlineNotificationClassic,
} from './Notification';
import { useFeatureFlag } from '../FeatureFlags';

export function NotificationActionButton(props) {
  const enabled = useFeatureFlag('enable-v11-release');
  if (enabled) {
    return <NotificationActionButtonNext {...props} />;
  }
  return <NotificationActionButtonClassic {...props} />;
}

export function NotificationTextDetails(props) {
  const enabled = useFeatureFlag('enable-v11-release');
  if (enabled) {
    return null;
  }
  return <NotificationTextDetailsClassic {...props} />;
}

export function NotificationButton(props) {
  const enabled = useFeatureFlag('enable-v11-release');
  if (enabled) {
    return <NotificationButtonNext {...props} />;
  }
  return <NotificationButtonClassic {...props} />;
}

export function ToastNotification(props) {
  const enabled = useFeatureFlag('enable-v11-release');
  if (enabled) {
    return <ToastNotificationNext {...props} />;
  }
  return <ToastNotificationClassic {...props} />;
}

export function InlineNotification(props) {
  const enabled = useFeatureFlag('enable-v11-release');
  if (enabled) {
    return <InlineNotificationNext {...props} />;
  }
  return <InlineNotificationClassic {...props} />;
}
