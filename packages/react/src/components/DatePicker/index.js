/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as FeatureFlags from '@carbon/feature-flags';
import { default as DatePickerNext } from './next/DatePicker';
import { default as DatePickerClassic } from './DatePicker';

const DatePicker = FeatureFlags.enabled('enable-v11-release')
  ? DatePickerNext
  : DatePickerClassic;

export default DatePicker;
export { default as DatePickerSkeleton } from './DatePicker.Skeleton';
