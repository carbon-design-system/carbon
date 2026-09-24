/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSLayout from './layout';
import CDSLayoutConstraint from './layout-constraint';

export { CDSLayout, CDSLayoutConstraint };
export { LAYOUT_SIZES, LAYOUT_DENSITIES } from './layout';
export type { LayoutSize, LayoutDensity } from './layout';

defineCustomElement(CDSLayout);
defineCustomElement(CDSLayoutConstraint);
