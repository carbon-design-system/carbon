/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext } from 'react';

interface SimpleTableContextType {
  autoAlign?: 'table' | 'row' | 'cell' | 'none';
  toggleTableAlignmentClass: (boolean) => void;
}

export const SimpleTableContext = createContext({
    autoAlign: 'none',
    toggleTableAlignmentClass: () => null
} as SimpleTableContextType);
