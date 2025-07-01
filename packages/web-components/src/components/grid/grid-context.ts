import { createContext } from '@lit/context';

export type GridContext = {
  /**
   * Specifies whether subgrid should be enabled
   */
  subgrid?: boolean;
};

export const gridContext = createContext<GridContext>(Symbol('GridContext'));
