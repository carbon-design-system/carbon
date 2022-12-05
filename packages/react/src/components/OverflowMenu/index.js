/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as FeatureFlags from '@carbon/feature-flags';
import { OverflowMenu as OverflowMenuCarbon } from './OverflowMenu';
import { createClassWrapper } from '../../internal/createClassWrapper';

const OverflowMenu = FeatureFlags.enabled('enable-v11-release')
  ? createClassWrapper(OverflowMenuCarbon)
  : OverflowMenuCarbon;
export default OverflowMenu;
export { OverflowMenu };
