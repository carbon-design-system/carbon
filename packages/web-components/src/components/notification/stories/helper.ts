/**
 * @license
 *
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NOTIFICATION_KIND } from '../inline-notification';

const kinds = {
  [`Error (${NOTIFICATION_KIND.ERROR})`]: NOTIFICATION_KIND.ERROR,
  [`Info (${NOTIFICATION_KIND.INFO})`]: NOTIFICATION_KIND.INFO,
  [`Info (${NOTIFICATION_KIND.INFO_SQUARE})`]: NOTIFICATION_KIND.INFO_SQUARE,
  [`Success (${NOTIFICATION_KIND.SUCCESS})`]: NOTIFICATION_KIND.SUCCESS,
  [`Warning (${NOTIFICATION_KIND.WARNING})`]: NOTIFICATION_KIND.WARNING,
  [`Warning Alt (${NOTIFICATION_KIND.WARNING_ALT})`]:
    NOTIFICATION_KIND.WARNING_ALT,
};

export default kinds;
