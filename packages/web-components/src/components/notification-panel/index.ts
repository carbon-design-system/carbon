/**
 * Copyright IBM Corp. 2023, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSNotificationPanel from './notification-panel';
import CDSNotification from './notification';
import CDSNotificationFooter from './notification-footer';

export { CDSNotificationPanel, CDSNotification, CDSNotificationFooter };

defineCustomElement(CDSNotificationPanel);
defineCustomElement(CDSNotification);
defineCustomElement(CDSNotificationFooter);
