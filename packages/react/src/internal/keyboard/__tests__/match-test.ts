/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment jsdom
 */

import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import * as keys from '../keys';
import { matches, match } from '../match';

const keyNames = Object.keys(keys).filter(
  (name): name is keyof typeof keys => name in keys
);

const getKeyboardEventKey = (key: string | string[] | undefined) =>
  Array.isArray(key) ? key[0] : key;

describe('match', () => {
  let inputNode: HTMLInputElement;
  let eventListener: ReturnType<typeof jest.fn<(event: KeyboardEvent) => void>>;

  beforeEach(() => {
    inputNode = document.createElement('input');
    inputNode.setAttribute('type', 'text');

    eventListener = jest.fn<(event: KeyboardEvent) => void>();
    inputNode.addEventListener('keydown', eventListener);

    document.body.appendChild(inputNode);
  });

  afterEach(() => {
    inputNode.removeEventListener('keydown', eventListener);
    inputNode.remove();
  });

  it.each(keyNames)('should match when using %s', (key) => {
    // Clone the export so we don't accidentally mutate it in the if block below
    const keyboardEventInit = Object.assign({}, keys[key]);

    // Some keys like Esc have multiple values depending on the platform, so
    // let's convert to just one value for the event dispatch
    keyboardEventInit.key = getKeyboardEventKey(keyboardEventInit.key);

    // Go through each of the fields, e.g. key, which, and keyCodes, and verify
    // that we can match on each one for the keys provided
    Object.entries(keyboardEventInit).forEach(([field, value], index) => {
      const event = new KeyboardEvent('keydown', {
        [field]: value,
      });
      inputNode.dispatchEvent(event);
      expect(matches(eventListener.mock.calls[index][0], [keys[key]])).toBe(
        true
      );
    });
  });

  it('should not match if no key code provided matches the event', () => {
    const eventToNotMatch = new KeyboardEvent('keydown', {
      key: '=',
      which: 187,
      keyCode: 187,
    });
    inputNode.dispatchEvent(eventToNotMatch);
    expect(
      matches(eventListener.mock.calls[0][0], [keys.Enter, keys.ArrowUp])
    ).toBe(false);
  });

  it('should match the first valid key code given', () => {
    const eventToMatch = new KeyboardEvent('keydown', {
      ...keys.ArrowUp,
      key: getKeyboardEventKey(keys.ArrowUp.key),
    });
    inputNode.dispatchEvent(eventToMatch);
    expect(
      matches(eventListener.mock.calls[0][0], [keys.Enter, keys.ArrowUp])
    ).toBe(true);
  });

  it('should support multiple options for the `key` field', () => {
    const modernEvent = new KeyboardEvent('keydown', {
      key: keys.Escape.key?.[0],
    });
    inputNode.dispatchEvent(modernEvent);
    expect(match(eventListener.mock.calls[0][0], keys.Escape)).toBe(true);

    const ie11Event = new KeyboardEvent('keydown', {
      key: keys.Escape.key?.[1],
    });
    inputNode.dispatchEvent(ie11Event);
    expect(match(eventListener.mock.calls[1][0], keys.Escape)).toBe(true);
  });
});
