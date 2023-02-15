/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  TextDirection,
  TextDirectionProps,
  GetTextDirection,
  TextDir,
} from './TextDirection';
import { Text, TextBaseProps, TextProps } from './Text';
import { createTextComponent } from './createTextComponent';

export { TextDirection, Text };
export type {
  TextBaseProps,
  TextProps,
  TextDirectionProps,
  GetTextDirection,
  TextDir,
};

export const Label = createTextComponent('label', 'Label');
export const Legend = createTextComponent('legend', 'Legend');
