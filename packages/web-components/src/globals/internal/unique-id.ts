/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../settings';

/**
 * Returns an id that is unique per call, for ids that ARIA attributes
 * such as `aria-describedby` reference within a component.
 *
 * @param name A name describing what the id is for.
 * @returns The id, prefixed with the Carbon prefix and the given name.
 */
export const uniqueId = (name: string) =>
  `${prefix}--${name}-${Math.random().toString(16).slice(2)}`;
