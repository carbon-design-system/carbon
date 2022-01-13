/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as FeatureFlags from '@carbon/feature-flags';
import { default as ProgressIndicatorSkeleton } from './ProgressIndicator.Skeleton';
import {
  ProgressIndicator as ProgressIndicatorClassic,
  ProgressStep,
} from './ProgressIndicator';
import { ProgressIndicator as ProgressIndicatorNext } from './next/ProgressIndicator';

const ProgressIndicator = FeatureFlags.enabled('enable-v11-release')
  ? ProgressIndicatorNext
  : ProgressIndicatorClassic;

export { ProgressIndicator, ProgressIndicatorSkeleton, ProgressStep };
