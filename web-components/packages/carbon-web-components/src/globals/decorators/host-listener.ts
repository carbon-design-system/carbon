/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Puts an event listener to an internal table for `@HostListener()`.
 * @param type
 *   The event type. Can be prefixed with `document:` or `window:`.
 *   The event listener is attached to host element's owner document or its default view in such case.
 * @param options The event listener options.
 * @param Clazz The target class.
 * @param name The method name in the given target class that works as the event listener.
 */
const setHostListener = (type: string, options: boolean | AddEventListenerOptions, Clazz, name: string) => {
  const hostListeners = Clazz._hostListeners;
  if (!hostListeners) {
    throw new Error('The method `@HostListener()` is defined on has to be of a class that has `HostListerMixin`.');
  }
  if (!hostListeners[name]) {
    hostListeners[name] = {};
  }
  hostListeners[name][type] = { options };
};

/**
 * @param type
 *   The event type. Can be prefixed with `document:` or `window:`.
 *   The event listener is attached to host element's owner document or its default view in such case.
 * @param options The event listener options.
 * @param descriptor The original class element descriptor of the event listener method.
 * @returns The updated class element descriptor with `@HostListener()` decorator.
 */
const HostListenerStandard = (type: string, options: boolean | AddEventListenerOptions, descriptor) => {
  const { kind, key, placement } = descriptor;
  if (!((kind === 'method' && placement === 'prototype') || (kind === 'field' && placement === 'own'))) {
    throw new Error('`@HostListener()` must be defined on instance methods, but you may have defined it on static, field, etc.');
  }
  return {
    ...descriptor,
    finisher(Clazz) {
      setHostListener(type, options, Clazz, key);
    },
  };
};

/**
 * A decorator to add event listener to the host element, or its `document`/`window`, of a custom element.
 * The `target` must extend `HostListenerMixin`.
 * @param type
 *   The event type. Can be prefixed with `document:` or `window:`.
 *   The event listener is attached to host element's owner document or its default view in such case.
 * @param options The event listener options.
 */
const HostListener = (type: string, options?: boolean | AddEventListenerOptions) => (targetOrDescriptor, name: string) =>
  typeof name !== 'undefined'
    ? setHostListener(type, options!, targetOrDescriptor.constructor, name)
    : HostListenerStandard(type, options!, targetOrDescriptor);

export default HostListener;
