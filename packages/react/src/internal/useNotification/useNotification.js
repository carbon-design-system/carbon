/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useStore, dispatch, ActionType } from './notification-store';

/** Functions to trigger notifications dispatch actions */
const updateHeight = (toastId, height) =>
  dispatch({
    type: ActionType.UPDATE_NOTIFICATION,
    payload: { id: toastId, height },
  });
const destroyNotification = (id) =>
  dispatch({ type: ActionType.DESTROY_NOTIFICATION, payload: { id } });

const closeNotification = (id) =>
  dispatch({ type: ActionType.CLOSE_NOTIFICATION, payload: { id } });

/**
 * Hook to have notification data
 * @returns object with {notifications <data>, handlers <helpers functions>}
 */
export const useNotification = () => {
  const { notifications } = useStore();

  const handlers = {
    updateHeight,
    destroyNotification,
    closeNotification,
  };

  return { notifications, handlers };
};
