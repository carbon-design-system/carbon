/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import type { Key } from './keys';

/**
 * Check to see if at least one key code matches the key code of the
 * given event.
 *
 * @param event - The event to test.
 * @param keysToMatch - An array of key definitions to match against.
 * @returns `true` if one of the keys matches.
 */
export const matches = (
  event: ReactKeyboardEvent | KeyboardEvent,
  keysToMatch: Key[]
) => {
  for (let i = 0; i < keysToMatch.length; i++) {
    if (match(event, keysToMatch[i])) {
      return true;
    }
  }

  return false;
};

/**
 * Check to see if the given key matches the corresponding keyboard event. Also
 * supports passing in the value directly if you can't use the given event.
 *
 * @param eventOrCode - A `KeyboardEvent`, a number, or a string value.
 * @param keyObj - An object with key properties to match against.
 * @returns `true` if the event or code matches the key definition.
 */
export const match = (
  eventOrCode: ReactKeyboardEvent | KeyboardEvent | number | string,
  { key, which, keyCode, code }: Key
) => {
  if (typeof eventOrCode === 'string') {
    return eventOrCode === key;
  }

  if (typeof eventOrCode === 'number') {
    return eventOrCode === which || eventOrCode === keyCode;
  }

  if (eventOrCode.key && Array.isArray(key)) {
    return key.includes(eventOrCode.key);
  }

  return (
    eventOrCode.key === key ||
    // TODO: When can these checks for deprecated properties be deleted?
    // Presumably, the `Key` type should also be pruned of these properties.
    eventOrCode.which === which ||
    eventOrCode.keyCode === keyCode ||
    eventOrCode.code === code
  );
};
