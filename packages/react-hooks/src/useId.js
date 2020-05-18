/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useRef } from 'react';

let id = 0;

/**
 * Provides a unique identifier with an optional prefix, useful for dynamically
 * creating `id` values for controls, especially alongside `aria-labelledby` or
 * `htmlFor`. This `id` value is guaranteed to be the same for the duration of
 * the component.
 *
 * @example
 * function TextInput() {
 *   const id = useId('text-input');
 *   return (
 *     <div className="form-item">
 *       <label htmlFor={id}>Label</label>
 *       <input id={id} type="text" />
 *     </div>
 *   );
 * }
 *
 * @param {string?} prefix
 * @returns {string}
 */
export function useId(prefix) {
  const ref = useRef(++id);
  if (prefix) {
    return `${prefix}-${ref.current}`;
  }
  return '' + ref.current;
}
