/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as FeatureFlags from '@carbon/feature-flags';

import { TimePickerSelect as TimePickerSelectNext } from './next/TimePickerSelect';

import { TimePickerSelect as TimePickerSelectClassic } from './TimePickerSelect';

export const TimePickerSelect = FeatureFlags.enabled('enable-v11-release')
  ? TimePickerSelectNext
  : TimePickerSelectClassic;
