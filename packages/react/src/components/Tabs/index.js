/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as FeatureFlags from '@carbon/feature-flags';
import { default as TabsNext } from './next/Tabs';
import { default as TabsClassic } from './Tabs';
import ContainedTabs from './next/ContainedTabs';
import { default as TabsSkeletonClassic } from './Tabs.Skeleton';
import { default as TabsSkeletonNext } from './next/Tabs.Skeleton';

const Tabs = FeatureFlags.enabled('enable-v11-release')
  ? TabsNext
  : TabsClassic;

const TabsSkeleton = FeatureFlags.enabled('enable-v11-release')
  ? TabsSkeletonNext
  : TabsSkeletonClassic;

export { ContainedTabs, TabsSkeleton };

export default Tabs;
