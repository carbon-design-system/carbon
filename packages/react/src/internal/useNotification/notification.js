/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import uid from '../../tools/uniqueId';
import { dispatch, ActionType } from './notification-store';

/**
 * Function to dispatch the creation of notifications.
 * options - same options accepted in Notifications components
 */
const triggerNotification = (options) => {
  // Create notification id and add notification to store state
  const id = uid();
  dispatch({
    type: ActionType.ADD_NOTIFICATION,
    toast: { id, ...options },
  });
  // Asynchronously set the notification open so that its height is calculated
  // before the notification is opened
  setTimeout(
    () =>
      dispatch({
        type: ActionType.OPEN_NOTIFICATION,
        toast: { id, timeout: options.timeout },
      }),
    0
  );
};

export { triggerNotification };
