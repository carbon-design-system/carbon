/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

declare namespace jasmine {
  interface Matchers<T> {
    toMatchSnapshot(options?: { mode: string }): boolean;
  }
}
