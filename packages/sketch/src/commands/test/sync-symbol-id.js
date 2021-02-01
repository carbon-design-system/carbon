/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Document, Rectangle, ShapePath } from 'sketch/dom';
import { command } from '../command';
import { syncSymbol } from '../../tools/symbols';

/**
 * Test strategy
 *
 * Open up the fixture at `fixtures/symbol-id-sync.sketch`. You should see two
 * circles on Page 1. The one on the left is the Symbol Master, the one on the
 * right is the Symbol Instance. There is an override on the "Inner" layer for
 * color that we want to maintain between updates.
 *
 * You can run the fixture/this command by using the Test menu from the plugin.
 * Running this plugin should update the Symbol Master and corresponding Inner
 * layer, changing size and position. The goal is that the Symbol Instance also
 * takes on these updates while maintaining its color override.
 */
export function testSyncSymbolId() {
  command('commands/test/sync-symbol-id', () => {
    const document = Document.getSelectedDocument();

    syncSymbol({
      symbols: document.getSymbols(),
      name: 'test-symbol',
      config: {
        layers: [
          new ShapePath({
            name: 'Inner',
            shapeType: ShapePath.ShapeType.Oval,
            frame: new Rectangle(0, 0, 16, 16),
          }),
        ],
      },
    });
  });
}
