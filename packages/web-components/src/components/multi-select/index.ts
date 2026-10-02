/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSMultiSelect from './multi-select';
import CDSMultiSelectItem from './multi-select-item';

export { CDSMultiSelect, CDSMultiSelectItem };

defineCustomElement(CDSMultiSelect);
defineCustomElement(CDSMultiSelectItem);
