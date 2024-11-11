import { createContext } from '@lit/context';

export type GridContext = {
  condensed: boolean;
  narrow: boolean;
};

export const gridContext = createContext<GridContext>(Symbol('GridContext'));
