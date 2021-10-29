/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as FeatureFlags from '@carbon/feature-flags';
import { default as RadioButtonGroupNext } from './next/RadioButtonGroup';
import { default as RadioButtonGroupClassic } from './RadioButtonGroup';

const RadioButtonGroup = FeatureFlags.enabled('enable-v11-release')
  ? RadioButtonGroupNext
  : RadioButtonGroupClassic;

export default RadioButtonGroup;
