/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * @jest-environment jsdom
 */
import { keys, matches } from '../key';

// Used for the case of not matching
const EQUAL_SIGN_KEY_CODE = 187;

describe('keys', () => {
  describe('matches', () => {
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

    it.each(Object.keys(keys))('should match when using %s', key => {
      const eventToMatch = new KeyboardEvent('keydown', {
        which: keys[key],
      });
      inputNode.dispatchEvent(eventToMatch);
      expect(matches(eventListener.mock.calls[0][0], [keys[key]])).toBe(true);
    });

    it('should not match if no key code provided matches the event', () => {
      const eventToNotMatch = new KeyboardEvent('keydown', {
        which: EQUAL_SIGN_KEY_CODE,
      });
      inputNode.dispatchEvent(eventToNotMatch);
      expect(
        matches(eventListener.mock.calls[0][0], [keys.ENTER, keys.UP])
      ).toBe(false);
    });

    it('should match the first valid key code given', () => {
      const eventToMatch = new KeyboardEvent('keydown', {
        which: keys.UP,
      });
      inputNode.dispatchEvent(eventToMatch);
      expect(
        matches(eventListener.mock.calls[0][0], [keys.ENTER, keys.UP])
      ).toBe(true);
    });
  });
});
