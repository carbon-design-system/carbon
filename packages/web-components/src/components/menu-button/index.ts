/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import '../button/index';
import '../menu/index';
import CDSMenuButton from './menu-button';

export { CDSMenuButton };

defineCustomElement(CDSMenuButton);
