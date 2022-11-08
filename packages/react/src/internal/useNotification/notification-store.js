/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useState, useEffect } from 'react';
export const ActionType = {
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  OPEN_NOTIFICATION: 'OPEN_NOTIFICATION',
  UPDATE_NOTIFICATION: 'UPDATE_NOTIFICATION',
  CLOSE_NOTIFICATION: 'CLOSE_NOTIFICATION',
  DESTROY_NOTIFICATION: 'DETROY_NOTIFICATION',
};

const setStates = [];

let memoryState = { notifications: [] };

/**
 * Functions that its behavior is just like a reducer map actions type and update the state
 * @param {*} state - initial state
 * @param {*} action - reducer actions
 * @returns - returns state updated
 */
const reducer = (state, action) => {
  switch (action.type) {
    case ActionType.ADD_NOTIFICATION: {
      return {
        ...state,
        notifications: [...state.notifications, action.toast],
      };
    }
    case ActionType.OPEN_NOTIFICATION: {
      const { id, timeout } = action.toast;
      if (timeout) {
        setTimeout(
          () =>
            dispatch({ type: ActionType.CLOSE_NOTIFICATION, payload: { id } }),
          timeout
        );
      }
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, isOpen: true } : n
        ),
      };
    }
    case ActionType.CLOSE_NOTIFICATION: {
      const { id } = action.payload;
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, isOpen: false } : n
        ),
      };
    }

    case ActionType.UPDATE_NOTIFICATION: {
      const { id } = action.payload;

      return {
        ...state,
        notifications: state.notifications.map((t) =>
          t.id === id ? { ...t, ...action.payload } : t
        ),
      };
    }
    // Action responsible for removing the notification from the state or
    // to simply add a 'destroyed' prop to prevent it from being rendered
    // (depending on the preserveNotifications prop value)
    case ActionType.DESTROY_NOTIFICATION: {
      const { id } = action.payload;
      return {
        ...state,
        notifications:
          // preserveNotifications
          //   ? state.notifications.map((n) =>
          //       n.id !== id ? n : { ...n, destroyed: true }
          //     )
          //   :
          state.notifications.filter((n) => n.id !== id),
      };
    }
    default:
      return state;
  }
};

/**
 * Function that dispatch the action to the reducer
 * @param {*} action
 */
export const dispatch = (action) => {
  memoryState = reducer(memoryState, action);
  setStates.forEach((listener) => {
    listener(memoryState);
  });
};

/**
 * Function where we hold the state of notifications
 * @returns the memoryState with the notifications added to array
 */
export const useStore = () => {
  const [state, setState] = useState(memoryState);

  useEffect(() => {
    setStates.push(setState);
    return () => {
      const index = setStates.indexOf(setState);
      if (index > -1) {
        setStates.splice(index, 1);
      }
    };
  }, [state]);

  return state;
};
