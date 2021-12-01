/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as FeatureFlags from '@carbon/feature-flags';

import { default as OverflowMenuItemNext } from './next/OverflowMenuItem';

import { default as OverflowMenuItemClassic } from './OverflowMenuItem';

const OverflowMenuItem = FeatureFlags.enabled('enable-v11-release')
  ? OverflowMenuItemNext
  : OverflowMenuItemClassic;

export default OverflowMenuItem;
