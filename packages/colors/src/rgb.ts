/**
 * Copyright IBM Corp. 2018, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Parses a hex code string into an RGBA color string with the given opacity.
 */
export const rgba = (hexCode: string, opacity: number) => {
  const values = [
    hexCode.substring(1, 3),
    hexCode.substring(3, 5),
    hexCode.substring(5, 7),
  ].map((string) => parseInt(string, 16));
  return `rgba(${values[0]}, ${values[1]}, ${values[2]}, ${opacity})`;
};
