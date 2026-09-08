/**
 * Copyright IBM Corp. 2018, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Individual families are exported as scalars so other modules in this package
// can reference them as plain identifiers. Member accesses like
// `fontFamilies.sans` at module scope read as potential getter side effects to
// bundlers and block tree shaking of otherwise-unused tokens.
export const mono =
  "'IBM Plex Mono', 'Menlo', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', Courier, monospace";
export const sans =
  "'IBM Plex Sans', system-ui, -apple-system, BlinkMacSystemFont, '.SFNSText-Regular', sans-serif";
export const sansCondensed =
  "'IBM Plex Sans Condensed', 'Helvetica Neue', Arial, sans-serif";
export const sansHebrew =
  "'IBM Plex Sans Hebrew', 'Helvetica Hebrew', 'Arial Hebrew', sans-serif";
export const serif = "'IBM Plex Serif', 'Georgia', Times, serif";

// Font family fallbacks for: IBM Plex Mono, IBM Plex Sans, IBM Plex Sans
// Condensed, IBM Plex Sans Hebrew, and IBM Plex Serif
export const fontFamilies = {
  mono,
  sans,
  sansCondensed,
  sansHebrew,
  serif,
};

export const fontFamily = (name: keyof typeof fontFamilies) => {
  if (!(name in fontFamilies)) {
    throw new Error(
      `Unable to find font family: \`${name}\`. Expected one of: ` +
        `[${Object.keys(fontFamilies).join(', ')}]`
    );
  }
  return {
    fontFamily: fontFamilies[name],
  };
};
