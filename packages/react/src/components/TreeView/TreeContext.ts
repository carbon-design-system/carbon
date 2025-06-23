/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext, type SyntheticEvent, type MouseEvent } from 'react';
import type { TreeNodeProps } from './TreeNode';

interface TreeContextProps {
  active?: string | number;
  multiselect?: boolean;
  onActivate?: (nodeId?: string | number) => void;
  onTreeSelect?: (event: MouseEvent, node?: Partial<TreeNodeProps>) => void;
  selected?: Array<string | number>;
  size?: 'xs' | 'sm';
}

export const TreeContext = createContext<TreeContextProps | null>(null);

export const DepthContext = createContext<number>(-1);
