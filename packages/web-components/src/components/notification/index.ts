/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSInlineNotification from './inline-notification';
import CDSToastNotification from './toast-notification';
import CDSActionableNotification from './actionable-notification';
import CDSActionableNotificationButton from './actionable-notification-button';
import CDSCalloutNotification from './callout-notification';

export {
  CDSInlineNotification,
  CDSToastNotification,
  CDSActionableNotification,
  CDSActionableNotificationButton,
  CDSCalloutNotification,
};

defineCustomElement(CDSInlineNotification);
defineCustomElement(CDSToastNotification);
defineCustomElement(CDSActionableNotification);
defineCustomElement(CDSActionableNotificationButton);
defineCustomElement(CDSCalloutNotification);
