/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSOverflowMenu from './overflow-menu';
import CDSOverflowMenuBody from './overflow-menu-body';
import CDSOverflowMenuItem from './overflow-menu-item';

export { CDSOverflowMenu, CDSOverflowMenuBody, CDSOverflowMenuItem };

defineCustomElement(CDSOverflowMenu);
defineCustomElement(CDSOverflowMenuBody);
defineCustomElement(CDSOverflowMenuItem);
