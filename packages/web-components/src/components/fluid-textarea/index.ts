/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSFluidTextArea from './fluid-textarea';
import CDSFluidTextareaSkeleton from './fluid-textarea-skeleton';

export { CDSFluidTextArea, CDSFluidTextareaSkeleton };

defineCustomElement(CDSFluidTextArea);
defineCustomElement(CDSFluidTextareaSkeleton);
