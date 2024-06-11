/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Constructor type. Used for defining mix-ins.
 */
type Constructor<T> = new (...args: any[]) => T;
