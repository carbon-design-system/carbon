/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment jsdom
 */

import * as keys from '../keys';
import { matches, match } from '../match';

describe('match', () => {
  let inputNode;
  let eventListener;

  beforeEach(() => {
    inputNode = document.createElement('input');
    inputNode.setAttribute('type', 'text');

    eventListener = jest.fn();
    inputNode.addEventListener('keydown', eventListener);

    document.body.appendChild(inputNode);
  });

  afterEach(() => {
    inputNode.removeEventListener('keydown', eventListener);
    inputNode.parentNode.removeChild(inputNode);
  });

  it.each(Object.keys(keys))('should match when using %s', (key) => {
    // Clone the export so we don't accidentally mutate it in the if block below
    const keyboardEventInit = Object.assign({}, keys[key]);

    // Some keys like Esc have multiple values depending on the platform, so
    // let's convert to just one value for the event dispatch
    if (Array.isArray(keyboardEventInit.key)) {
      keyboardEventInit.key = keyboardEventInit.key[0];
    }

    // Go through each of the fields, e.g. key, which, and keyCodes, and verify
    // that we can match on each one for the keys provided
    Object.keys(keyboardEventInit).forEach((field, index) => {
      const event = new KeyboardEvent('keydown', {
        [field]: keyboardEventInit[field],
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
    const eventToMatch = new KeyboardEvent('keydown', keys.ArrowUp);
    inputNode.dispatchEvent(eventToMatch);
    expect(
      matches(eventListener.mock.calls[0][0], [keys.Enter, keys.ArrowUp])
    ).toBe(true);
  });

  it('should support multiple options for the `key` field', () => {
    const modernEvent = new KeyboardEvent('keydown', {
      key: keys.Escape.key[0],
    });
    inputNode.dispatchEvent(modernEvent);
    expect(match(eventListener.mock.calls[0][0], keys.Escape)).toBe(true);

    const ie11Event = new KeyboardEvent('keydown', {
      key: keys.Escape.key[1],
    });
    inputNode.dispatchEvent(ie11Event);
    expect(match(eventListener.mock.calls[1][0], keys.Escape)).toBe(true);
  });
});
