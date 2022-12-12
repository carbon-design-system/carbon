/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as FeatureFlags from '@carbon/feature-flags';

import { default as TimePickerSelectNext } from './TimePickerSelect';

import { default as TimePickerSelectClassic } from './TimePickerSelect';

const TimePickerSelect = FeatureFlags.enabled('enable-v11-release')
  ? TimePickerSelectNext
  : TimePickerSelectClassic;

export default TimePickerSelect;
