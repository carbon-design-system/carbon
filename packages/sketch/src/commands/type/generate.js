/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Document, Rectangle, Text } from 'sketch/dom';
import { command } from '../command';
import { findOrCreatePage, selectPage } from '../../tools/page';
import { syncTextStyles } from '../../sharedStyles/type';

const TEXT_LAYER_WIDTH = 500;
const TEXT_LAYER_HEIGHT = 75;
const TEXT_MARGIN = 16;

export function generate() {
  command('commands/type/generate', () => {
    const document = Document.getSelectedDocument();
    const page = selectPage(findOrCreatePage(document, 'Type'));
    const sharedStyles = syncTextStyles(document);

    let Y_OFFSET = 0;

    for (const sharedStyle of sharedStyles) {
      new Text({
        name: sharedStyle.name,
        frame: new Rectangle(0, Y_OFFSET, TEXT_LAYER_WIDTH, TEXT_LAYER_HEIGHT),
        style: sharedStyle.style,
        sharedStyleId: sharedStyle.id,
        parent: page,
        text: sharedStyle.name,
      });

      Y_OFFSET = Y_OFFSET + TEXT_LAYER_HEIGHT + TEXT_MARGIN;
    }
  });
}
