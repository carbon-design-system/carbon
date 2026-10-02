/**
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSSelect from './select';
import CDSSelectItem from './select-item';
import CDSSelectItemGroup from './select-item-group';
import CDSSelectSkeleton from './select-skeleton';

export { CDSSelect, CDSSelectItem, CDSSelectItemGroup, CDSSelectSkeleton };

defineCustomElement(CDSSelect);
defineCustomElement(CDSSelectItem);
defineCustomElement(CDSSelectItemGroup);
defineCustomElement(CDSSelectSkeleton);
