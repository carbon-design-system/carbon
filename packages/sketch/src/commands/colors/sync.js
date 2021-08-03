/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Document } from 'sketch/dom';
import UI from 'sketch/ui';
import { command } from '../command';
import { syncColorStyles, syncColorVariables } from '../../sharedStyles/colors';

export function sync() {
  command('commands/colors/sync', () => {
    UI.message('Syncing shared layer styles...');
    syncColorStyles({ document: Document.getSelectedDocument() });
    UI.message('Done syncing shared layer styles');
  });
}

export function syncColorVars() {
  command('commands/colors/syncvars', () => {
    UI.message('Syncing color variables...');
    syncColorVariables({ document: Document.getSelectedDocument() });
    UI.message('Done syncing color variables');
    // let subset = Document.getSelectedDocument().swatches;
    // console.log(
    //   subset.reduce(function (accumulator, currentValue, currentIndex, array) {
    //     return currentValue.name.includes('hover')
    //       ? accumulator.concat([currentValue])
    //       : accumulator;
    //   }, [])
    // );
  });
}
