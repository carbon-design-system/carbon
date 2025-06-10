/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const hep = HTMLElement.prototype;
export const mockHTMLElement = (options: HTMLElement) => {
  const originals: Record<string, PropertyDescriptor | undefined> = {};

  for (let option in options) {
    originals[option] = Object.getOwnPropertyDescriptor(hep, option);
    Object.defineProperty(
      hep,
      option,
      // Ensure we'll be able to restore or delete the property later
      Object.assign({}, options[option], { configurable: true })
    );
  }

  return {
    mockRestore: () => {
      for (let option in options) {
        if (originals[option]) {
          Object.defineProperty(hep, option, originals[option]);
        } else {
          delete hep[option];
        }
      }
    },
  };
};
