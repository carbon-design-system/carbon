/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSClickableTile from './clickable-tile';
import CDSExpandableTile from './expandable-tile';
import CDSRadioTile from './radio-tile';
import CDSSelectableTile from './selectable-tile';
import CDSTile from './tile';
import CDSTileGroup from './tile-group';

export {
  CDSClickableTile,
  CDSExpandableTile,
  CDSRadioTile,
  CDSSelectableTile,
  CDSTile,
  CDSTileGroup,
};

defineCustomElement(CDSClickableTile);
defineCustomElement(CDSExpandableTile);
defineCustomElement(CDSRadioTile);
defineCustomElement(CDSSelectableTile);
defineCustomElement(CDSTile);
defineCustomElement(CDSTileGroup);
