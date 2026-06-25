/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * An object to keep track of things that can be cleaned up.
 */
export default interface Handle {
  /**
   * Releases the thing that this object is keeping track of.
   * For example, if this `Handle` is keeping track of an event listener, this `release()` method removes the event listener.
   */
  release(): null;
}
