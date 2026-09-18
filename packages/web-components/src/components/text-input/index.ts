/**
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSTextInput from './text-input';
import CDSTextInputSkeleton from './text-input-skeleton';

export { CDSTextInput, CDSTextInputSkeleton };

defineCustomElement(CDSTextInput);
defineCustomElement(CDSTextInputSkeleton);
