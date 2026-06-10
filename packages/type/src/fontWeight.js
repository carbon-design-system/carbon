/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Individual weights are also exported as scalars so other modules in this
// package can reference them as plain identifiers. Member accesses like
// `fontWeights.regular` at module scope read as potential getter side effects
// to bundlers and block tree shaking of otherwise-unused tokens.
export const light = 300;
export const regular = 400;
export const semibold = 600;

export const fontWeights = {
  light,
  regular,
  semibold,
};

export function fontWeight(weight) {
  if (!fontWeights[weight]) {
    throw new Error(
      `Unable to find font weight: \`${weight}\`. Expected one of: ` +
        `[${Object.keys(fontWeights).join(', ')}]`
    );
  }
  return {
    fontWeight: fontWeights[weight],
  };
}
