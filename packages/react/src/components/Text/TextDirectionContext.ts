/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext, MutableRefObject, useContext } from 'react';
import { GetTextDirection, TextDir } from './TextDirection';

export interface TextDirectionContextData {
  direction?: TextDir;
  getTextDirection?: MutableRefObject<GetTextDirection | undefined>;
}

export const TextDirectionContext = createContext<TextDirectionContextData>({});
export const useTextDirectionContext = () =>
  useContext<TextDirectionContextData>(TextDirectionContext);
