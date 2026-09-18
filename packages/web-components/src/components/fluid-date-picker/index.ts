/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSFluidDatePicker from './fluid-date-picker';
import CDSFluidDatePickerInput from './fluid-date-picker-input';
import CDSFluidDatePickerSkeleton from './fluid-date-picker-skeleton';

export {
  CDSFluidDatePicker,
  CDSFluidDatePickerInput,
  CDSFluidDatePickerSkeleton,
};

defineCustomElement(CDSFluidDatePicker);
defineCustomElement(CDSFluidDatePickerInput);
defineCustomElement(CDSFluidDatePickerSkeleton);
