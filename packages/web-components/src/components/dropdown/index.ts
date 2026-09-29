/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSDropdown from './dropdown';
import CDSDropdownItem from './dropdown-item';
import CDSDropdownSkeleton from './dropdown-skeleton';

export { CDSDropdown, CDSDropdownItem, CDSDropdownSkeleton };

defineCustomElement(CDSDropdown);
defineCustomElement(CDSDropdownItem);
defineCustomElement(CDSDropdownSkeleton);
