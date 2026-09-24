/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import '../fluid-select/index';
import '../fluid-text-input/index';
import CDSFluidTimePicker from './fluid-time-picker';
import CDSFluidTimePickerSelect from './fluid-time-picker-select';
import CDSFluidTimePickerSkeleton from './fluid-time-picker-skeleton';

export {
  CDSFluidTimePicker,
  CDSFluidTimePickerSelect,
  CDSFluidTimePickerSkeleton,
};

defineCustomElement(CDSFluidTimePicker);
defineCustomElement(CDSFluidTimePickerSelect);
defineCustomElement(CDSFluidTimePickerSkeleton);
