/**
 * Copyright IBM Corp. 2021, 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSCheckbox from './checkbox';
import CDSCheckboxGroup from './checkbox-group';
import CDSCheckboxSkeleton from './checkbox-skeleton';

export { CDSCheckbox, CDSCheckboxGroup, CDSCheckboxSkeleton };

defineCustomElement(CDSCheckbox);
defineCustomElement(CDSCheckboxGroup);
defineCustomElement(CDSCheckboxSkeleton);
