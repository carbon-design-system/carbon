/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Font family fallbacks for: IBM Plex Mono, IBM Plex Sans, IBM Plex Sans
// Condensed, IBM Plex Sans Hebrew, and IBM Plex Serif
export const fontFamilies = {
  mono:
    "'IBM Plex Mono', 'Menlo', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', Courier, monospace",
  sans: "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif",
  sansCondensed:
    "'IBM Plex Sans Condensed', 'Helvetica Neue', Arial, sans-serif",
  sansHebrew:
    "'IBM Plex Sans Hebrew', 'Helvetica Hebrew', 'Arial Hebrew', sans-serif",
  serif: "'IBM Plex Serif', 'Georgia', Times, serif",
};

export function fontFamily(name) {
  if (!fontFamilies[name]) {
    throw new Error(
      `Unable to find font family: \`${name}\`. Expected one of: ` +
        `[${Object.keys(fontFamilies).join(', ')}]`
    );
  }
  return {
    fontFamily: fontFamilies[name],
  };
}
