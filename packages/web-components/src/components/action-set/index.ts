/**
 * Copyright IBM Corp. 2026, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSActionSet from './action-set';

export { CDSActionSet };
export type { ActionButton, ButtonSize, ButtonKind } from './action-set';

defineCustomElement(CDSActionSet);
