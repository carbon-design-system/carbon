/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSRadioButton from './radio-button';
import CDSRadioButtonGroup from './radio-button-group';
import CDSRadioButtonSkeleton from './radio-button-skeleton';

export { CDSRadioButton, CDSRadioButtonGroup, CDSRadioButtonSkeleton };

defineCustomElement(CDSRadioButton);
defineCustomElement(CDSRadioButtonGroup);
defineCustomElement(CDSRadioButtonSkeleton);
