/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export default function on<TEvent extends Event = Event>(
  element: EventTarget,
  type: string,
  listener: EventListenerObject | ((event: TEvent) => void),
  options?: boolean | AddEventListenerOptions
) {
  element.addEventListener(
    type,
    listener as EventListenerOrEventListenerObject,
    options
  );
  return {
    release() {
      element.removeEventListener(
        type,
        listener as EventListenerOrEventListenerObject,
        options
      );
      return null;
    },
  };
}
