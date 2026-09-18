/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSPasswordInput from './password-input';
import CDSPasswordInputSkeleton from './password-input-skeleton';

export { CDSPasswordInput, CDSPasswordInputSkeleton };

defineCustomElement(CDSPasswordInput);
defineCustomElement(CDSPasswordInputSkeleton);
