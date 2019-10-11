/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Document } from 'sketch/dom';
import { command } from '../command';
import { syncIconSymbols } from './shared';
import { findOrCreateSymbolPage } from '../../tools/page';

export function sync() {
  command('commands/icons/sync', () => {
    const document = Document.getSelectedDocument();
    const symbolsPage = findOrCreateSymbolPage(document);
    const symbols = document.getSymbols();
    syncIconSymbols(
      document,
      Array.from(symbols),
      symbolsPage,
      document.sharedLayerStyles
    );
  });
}
