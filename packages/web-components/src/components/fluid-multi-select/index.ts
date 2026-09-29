/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSFluidMultiSelect from './fluid-multi-select';
import CDSFluidMultiSelectSkeleton from './fluid-multi-select-skeleton';

export { CDSFluidMultiSelect, CDSFluidMultiSelectSkeleton };

defineCustomElement(CDSFluidMultiSelect);
defineCustomElement(CDSFluidMultiSelectSkeleton);
