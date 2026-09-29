/**
 * Copyright IBM Corp. 2021, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import '../button/index';
import '../badge-indicator/index';
import '../tooltip/index';
import CDSTabs from './tabs';
import CDSTab from './tab';
import CDSTabSkeleton from './tab-skeleton';
import CDSTabsSkeleton from './tabs-skeleton';
import CDSTabsVertical from './tabs-vertical';

export { CDSTabs, CDSTab, CDSTabSkeleton, CDSTabsSkeleton, CDSTabsVertical };

defineCustomElement(CDSTabs);
defineCustomElement(CDSTab);
defineCustomElement(CDSTabSkeleton);
defineCustomElement(CDSTabsSkeleton);
defineCustomElement(CDSTabsVertical);
