/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as FeatureFlags from '@carbon/feature-flags';
import { default as RadioButtonNext } from './next/RadioButton';
import { default as RadioButtonClassic } from './RadioButton';

const RadioButton = FeatureFlags.enabled('enable-v11-release')
  ? RadioButtonNext
  : RadioButtonClassic;

export default RadioButton;
export { default as RadioButtonSkeleton } from './RadioButton.Skeleton';
