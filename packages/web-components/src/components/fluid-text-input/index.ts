/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSFluidTextInput from './fluid-text-input';
import CDSFluidTextInputSkeleton from './fluid-text-input-skeleton';

export { CDSFluidTextInput, CDSFluidTextInputSkeleton };

defineCustomElement(CDSFluidTextInput);
defineCustomElement(CDSFluidTextInputSkeleton);
