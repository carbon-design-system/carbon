/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { SharedStyle } from 'sketch/dom';

export function syncSharedStyles(document, stylesToSync) {
  const sharedStyles = [];
  for (const {
    name,
    style,
    styleType = SharedStyle.StyleType.Layer,
  } of stylesToSync) {
    const sharedStyle = syncSharedStyle(document, name, style, styleType);
    sharedStyles.push(sharedStyle);
  }
  return sharedStyles;
}

export function syncSharedStyle(
  document,
  name,
  style,
  styleType = SharedStyle.StyleType.Layer
) {
  const documentSharedStyles =
    styleType === SharedStyle.StyleType.Layer
      ? document.sharedLayerStyles
      : document.sharedTextStyles;
  const [sharedStyle] = Array.from(documentSharedStyles).filter(sharedStyle => {
    return sharedStyle.name === name;
  });

  if (!sharedStyle) {
    return SharedStyle.fromStyle({
      name,
      style,
      styleType,
      document,
    });
  }

  Object.keys(style).forEach(key => {
    sharedStyle.style[key] = style[key];
  });

  return sharedStyle;
}
