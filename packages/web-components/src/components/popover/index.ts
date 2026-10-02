/**
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSPopover from './popover';
import CDSPopoverContent from './popover-content';

export { CDSPopover, CDSPopoverContent };

defineCustomElement(CDSPopover);
defineCustomElement(CDSPopoverContent);
