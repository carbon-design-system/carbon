/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import eventedState from './evented-state';
import getLaunchingDetails from '../misc/get-launching-details';

function eventedShowHideState(ToMix) {
  /**
   * Mix-in class to launch a floating menu.
   * @class EventedShowHideState
   */
  class EventedShowHideState extends ToMix {
    /**
     */
    /**
     * Switch to 'shown' state.
     * @param [evtOrElem] The launching event or element.
     * @param {EventedState~changeStateCallback} [callback] The callback.
     */
    show(evtOrElem, callback) {
      if (!evtOrElem || typeof evtOrElem === 'function') {
        callback = evtOrElem; // eslint-disable-line no-param-reassign
      }
      this.changeState('shown', getLaunchingDetails(evtOrElem), callback);
    }

    /**
     * Switch to 'hidden' state.
     * @param [evtOrElem] The launching event or element.
     * @param {EventedState~changeStateCallback} [callback] The callback.
     */
    hide(evtOrElem, callback) {
      if (!evtOrElem || typeof evtOrElem === 'function') {
        callback = evtOrElem; // eslint-disable-line no-param-reassign
      }
      this.changeState('hidden', getLaunchingDetails(evtOrElem), callback);
    }
  }
  return EventedShowHideState;
}

const exports = [eventedState, eventedShowHideState];
export default exports;
