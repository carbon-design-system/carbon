/*
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
*/
export function rgba(hexcode, opacity) {
  const values = [
    hexcode.substring(1, 3),
    hexcode.substring(3, 5),
    hexcode.substring(5, 7),
  ].map((string) => parseInt(string, 16));
  return `rgba(${values[0]}, ${values[1]}, ${values[2]}, ${opacity})`;
}
