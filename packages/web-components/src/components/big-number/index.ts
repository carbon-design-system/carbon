/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSBigNumber from './big-number';
import CDSBigNumberSkeleton from './big-number-skeleton';

export { CDSBigNumber, CDSBigNumberSkeleton };

defineCustomElement(CDSBigNumber);
defineCustomElement(CDSBigNumberSkeleton);
