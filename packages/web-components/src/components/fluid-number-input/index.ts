/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSFluidNumberInput from './fluid-number-input';
import CDSFluidNumberInputSkeleton from './fluid-number-input-skeleton';

export { CDSFluidNumberInput, CDSFluidNumberInputSkeleton };

defineCustomElement(CDSFluidNumberInput);
defineCustomElement(CDSFluidNumberInputSkeleton);
