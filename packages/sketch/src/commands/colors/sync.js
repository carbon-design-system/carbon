/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Document } from 'sketch/dom';
import { command } from '../command';
import { syncColorStyles } from '../../sharedStyles/colors';

// tmp
import { Style } from 'sketch/dom';

function findLayerStyle(document, name) {
  const sharedStyle = document.sharedLayerStyles.find(
    sharedLayerStyle => sharedLayerStyle.name === name
  );
  return sharedStyle;
}

function updateLayerStyle(document, name, style) {
  const sharedStyle = findLayerStyle(document, name);
  if (!sharedStyle) {
    return;
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

function syncLayerStyle(sharedStyle) {
  for (const layer of Array.from(sharedStyle.getAllInstancesLayers())) {
    layer.style.syncWithSharedStyle(sharedStyle);
  }

  return sharedStyle;
}

export function sync() {
  command('commands/colors/sync', () => {
    const document = Document.getSelectedDocument();
    const [sharedStyle] = document.sharedLayerStyles;
    console.log(sharedStyle.style);

    sharedStyle.style.fills = [
      {
        color: '#000000',
        fillType: Style.FillType.Color,
      },
    ];

    for (const layer of Array.from(sharedStyle.getAllInstancesLayers())) {
      layer.style.syncWithSharedStyle(sharedStyle);
    }

    // const document = Document.getSelectedDocument();
    // syncColorStyles(document);
  });
}
