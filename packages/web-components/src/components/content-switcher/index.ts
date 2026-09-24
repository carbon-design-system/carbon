/**
 * Copyright IBM Corp. 2021, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import '../tooltip/index';
import CDSContentSwitcher from './content-switcher';
import CDSContentSwitcherItem from './content-switcher-item';

export { CDSContentSwitcher, CDSContentSwitcherItem };

defineCustomElement(CDSContentSwitcher);
defineCustomElement(CDSContentSwitcherItem);
