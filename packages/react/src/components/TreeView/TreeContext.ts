// src/components/TreeView/TreeContext.ts

import { createContext, type SyntheticEvent, type MouseEvent } from 'react';
import type { TreeNodeProps } from './TreeNode';

interface TreeContextProps {
  active?: string | number;
  multiselect?: boolean;
  onActivate?: (nodeId?: string | number) => void;
  onTreeSelect?: (
    event: MouseEvent | SyntheticEvent<HTMLUListElement>,
    node?: Partial<TreeNodeProps>
  ) => void;
  selected?: Array<string | number>;
  size?: 'xs' | 'sm';
}

export const TreeContext = createContext<TreeContextProps | null>(null);

export const DepthContext = createContext<number>(-1);
