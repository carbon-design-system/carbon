/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSMenu from './menu';
import CDSmenuItem from './menu-item';
import CDSmenuItemDivider from './menu-item-divider';
import CDSmenuItemGroup from './menu-item-group';
import CDSmenuItemSelectable from './menu-item-selectable';
import CDSmenuItemRadioGroup from './menu-item-radio-group';

export {
  CDSMenu,
  CDSmenuItem,
  CDSmenuItemDivider,
  CDSmenuItemGroup,
  CDSmenuItemSelectable,
  CDSmenuItemRadioGroup,
};

defineCustomElement(CDSMenu);
defineCustomElement(CDSmenuItem);
defineCustomElement(CDSmenuItemDivider);
defineCustomElement(CDSmenuItemGroup);
defineCustomElement(CDSmenuItemSelectable);
defineCustomElement(CDSmenuItemRadioGroup);
