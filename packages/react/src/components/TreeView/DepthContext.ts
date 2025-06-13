// DepthContext.ts
import { createContext } from 'react';

// The depth will always be a number, starting at 0
export const DepthContext = createContext<number>(0);
