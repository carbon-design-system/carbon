/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSDatePicker from './date-picker';
import CDSDatePickerInput from './date-picker-input';
import CDSDatePickerInputSkeleton from './date-picker-input-skeleton';

export { CDSDatePicker, CDSDatePickerInput, CDSDatePickerInputSkeleton };

defineCustomElement(CDSDatePicker);
defineCustomElement(CDSDatePickerInput);
defineCustomElement(CDSDatePickerInputSkeleton);
