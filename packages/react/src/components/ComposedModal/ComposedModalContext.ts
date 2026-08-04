/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext } from 'react';

export const ComposedModalContext = createContext<{
  labelId?: string;
  titleId?: string;
  setLabelId?: (id: string | undefined) => void;
  setTitleId?: (id: string | undefined) => void;
}>({});
