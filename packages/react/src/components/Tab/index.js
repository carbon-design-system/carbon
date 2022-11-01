/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as FeatureFlags from '@carbon/feature-flags';
import { Tab as TabNext } from '../Tabs/Tabs';
import { default as TabClassic } from './Tab';

const Tab = FeatureFlags.enabled('enable-v11-release') ? TabNext : TabClassic;

export default Tab;
