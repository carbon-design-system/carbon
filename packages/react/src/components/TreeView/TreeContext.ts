import { createContext } from 'react';

export type TreeContextType = {
  active: string | number | undefined;
  selected: (string | number)[];
  onTreeSelect: (event: any, node: any) => void;
  onNodeFocusEvent: (event: React.FocusEvent<HTMLElement>) => void;
};
//default values to avoid `undefined` errors
const defaultContextValue: TreeContextType = {
  active: undefined,
  selected: [],
  onTreeSelect: () => {},
  onNodeFocusEvent: () => {},
};

export const TreeContext = createContext<TreeContextType>(defaultContextValue);
