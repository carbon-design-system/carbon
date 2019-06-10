/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { SharedStyle } from 'sketch/dom';

/**
 * Sync a shared style within a document.
 * @param {Document} document
 * @param {string} name
 * @param {object} style
 * @param {StyleType?} styleType
 * @returns {SharedStyle}
 */
export function syncSharedStyle(
  document,
  name,
  style,
  styleType = SharedStyle.StyleType.Layer
) {
  // Figure out the type of shared style and try and find if we have already
  // created a shared style with the given name
  const documentSharedStyles =
    styleType === SharedStyle.StyleType.Layer
      ? document.sharedLayerStyles
      : document.sharedTextStyles;
  const [sharedStyle] = Array.from(documentSharedStyles).filter(sharedStyle => {
    return sharedStyle.name === name;
  });

  // If none exists, we can create one from scratch
  if (!sharedStyle) {
    return SharedStyle.fromStyle({
      name,
      style,
      styleType,
      document,
    });
  }

  // Otherwise, we'll go and update values of the sharedStyle with the given
  // style if the values are different
  Object.keys(style).forEach(key => {
    if (sharedStyle.style[key] !== style[key]) {
      sharedStyle.style[key] = style[key];
    }
  });

  return sharedStyle;
}
