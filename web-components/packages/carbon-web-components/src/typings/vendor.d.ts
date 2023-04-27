/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

declare module 'carbon-components/es/globals/js/settings.js' {
  const settings: {
    /**
     * The brand prefix.
     */
    prefix: string;
  };
  export default settings;
}

declare module 'carbon-components/es/globals/js/misc/on.js' {
  /**
   * Adds an event listener function to the list of event listeners for the given event type on the given event target.
   * @param target The target to add event listener on.
   * @param type A case-sensitive string representing the event type to listen for.
   * @param listener The event listener callback.
   * @param options An options object that specifies characteristics about the event listener.
   * @returns The handle to release the event listener. Its `release()` method removes the event listener.
   */
  function on<K extends keyof HTMLElementEventMap>(
    target: EventTarget,
    type: K,
    listener: (this: EventTarget, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): // @ts-ignore
  Handle;
  function on(
    target: EventTarget,
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): // @ts-ignore
  Handle;
  export default on;
}
