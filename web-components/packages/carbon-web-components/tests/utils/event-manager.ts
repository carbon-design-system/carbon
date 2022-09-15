/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import on from 'carbon-components/es/globals/js/misc/on';
import Handle from '../../src/globals/internal/handle';

interface CustomEventListener {
  (evt: CustomEvent): void;
}

class EventManager {
  /**
   * The handles of registered event listeners.
   */
  private _handles: Handle[] = [];

  /**
   * Attaches and registers an event listener.
   * @param target The DOM element.
   * @param type The event name.
   * @param listener The event handler.
   * @param options An options object that specifies characteristics about the event listener.
   * @returns The handle to release the event listener. Its `release()` method removes the event listener.
   */
  on(target: EventTarget, type: string, listener: CustomEventListener, options?: boolean | AddEventListenerOptions);

  // eslint-disable-next-line no-dupe-class-members
  on<K extends keyof HTMLElementEventMap>(
    target: EventTarget,
    type: K,
    listener: (this: EventTarget, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ) {
    const handle = on(target, type, listener, options);
    this._handles.push(handle);
    return handle;
  }

  /**
   * Releases all registered event listeners.
   */
  reset() {
    for (let handle = this._handles.shift(); handle; handle = this._handles.shift()) {
      handle.release();
    }
    return null;
  }
}

export default EventManager;
