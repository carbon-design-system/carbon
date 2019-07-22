/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Document, Rectangle, ShapePath } from 'sketch/dom';
import { command } from '../command';
import { syncColorStyles } from '../../sharedStyles/colors';

import { syncSymbol } from '../../tools/symbols';

export function sync() {
  command('commands/colors/sync', () => {
    const document = Document.getSelectedDocument();
    const symbols = document.getSymbols();
    const symbol = Array.from(symbols).find(
      symbol => symbol.name === 'test-symbol'
    );

    // Keep sharedStyleId in sync
    // console.log(symbol.layers[1]);
    syncSymbol(document, 'test-symbol', {
      layers: [
        new ShapePath({
          name: 'Inner',
          shapeType: ShapePath.ShapeType.Oval,
          frame: new Rectangle(0, 0, 37, 37),
        }),
      ],
    });

    // syncColorStyles(document);
  });
}
