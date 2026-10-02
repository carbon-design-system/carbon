/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSFluidDropdown from './fluid-dropdown';
import CDSFluidDropdownSkeleton from './fluid-dropdown-skeleton';

export { CDSFluidDropdown, CDSFluidDropdownSkeleton };

defineCustomElement(CDSFluidDropdown);
defineCustomElement(CDSFluidDropdownSkeleton);
