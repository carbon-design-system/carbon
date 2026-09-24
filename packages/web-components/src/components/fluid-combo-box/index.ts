/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSFluidComboBox from './fluid-combo-box';
import CDSFluidComboBoxSkeleton from './fluid-combo-box-skeleton';

export { CDSFluidComboBox, CDSFluidComboBoxSkeleton };

defineCustomElement(CDSFluidComboBox);
defineCustomElement(CDSFluidComboBoxSkeleton);
