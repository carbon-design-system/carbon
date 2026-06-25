/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// https://stackoverflow.com/a/2117523

function uuidv4(prefix = '') {
  const randomValues = (c) =>
    typeof crypto !== 'undefined'
      ? crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4))
      : (Math.random() * 16) >> (c / 4);

  return `${prefix}${([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(
    /[018]/g,
    (c) => (c ^ randomValues(c)).toString(16)
  )}`;
}

export default uuidv4;
