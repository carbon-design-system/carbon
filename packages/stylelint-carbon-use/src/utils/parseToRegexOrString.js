/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export default function parseToRegexOrString(str) {
  /* istanbul ignore next */
  const result =
    str && str.startsWith('/') && str.endsWith('/')
      ? new RegExp(str.slice(1, -1))
      : str;

  return result;
}
