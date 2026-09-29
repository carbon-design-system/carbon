/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSListItem from './list-item';
import CDSOrderedList from './ordered-list';
import CDSUnorderedList from './unordered-list';

export { CDSListItem, CDSOrderedList, CDSUnorderedList };

defineCustomElement(CDSListItem);
defineCustomElement(CDSOrderedList);
defineCustomElement(CDSUnorderedList);
