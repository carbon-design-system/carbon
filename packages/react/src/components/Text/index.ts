/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createTextComponent } from './createTextComponent';

export * from './Text';
export * from './TextDirection';
export * from './TextDirectionContext';

export const Label = createTextComponent('label', 'Label');
export const Legend = createTextComponent('legend', 'Legend');
