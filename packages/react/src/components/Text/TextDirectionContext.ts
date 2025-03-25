/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext, type MutableRefObject } from 'react';

export type TextDir = 'ltr' | 'rtl' | 'auto' | string;

export type GetTextDirection = (text: string | string[] | undefined) => TextDir;

export interface TextDirectionContextType {
  direction: TextDir;
  getTextDirection: MutableRefObject<GetTextDirection | undefined>;
}

export const TextDirectionContext = createContext<TextDirectionContextType>({
  direction: 'auto',
  getTextDirection: { current: undefined },
});
