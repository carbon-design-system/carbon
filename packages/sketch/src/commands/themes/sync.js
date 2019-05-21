/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import sketch from 'sketch';
import { Document } from 'sketch/dom';
import { syncThemeColorStyles } from '../../sharedStyles/themes';

export function sync() {
  sketch.UI.message('Hi 👋 We are still working on this! 🚧');

  const document = Document.getSelectedDocument();
  syncThemeColorStyles(document);

  sketch.UI.message('Done! 🎉');
}
