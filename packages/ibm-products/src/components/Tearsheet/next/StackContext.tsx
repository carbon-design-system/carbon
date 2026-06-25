/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  useContext,
  createContext,
  ReactNode,
  useState,
  useCallback,
  useRef,
} from 'react';

import { useResizeObserver } from '../../../global/js/hooks/useResizeObserver';

export interface StackContextType {
  stack: string[];
  notifyStack: (
    id: string,
    open: boolean,
    container: HTMLDivElement | null
  ) => void;
  getScaleFactor: (id: string) => number | null;
  getBlockSizeChange: (id: string) => string | null;
  getDepth: (id: string) => number | null;
}

const StackContext = createContext<StackContextType | undefined>(undefined);

interface StepProviderProps {
  children: ReactNode;
  stackStepSize?: 'sm' | 'md' | 'lg';
}

export const StackProvider: React.FC<StepProviderProps> = ({
  children,
  stackStepSize = 'lg',
}) => {
  const [stack, setStack] = useState<string[]>([]);
  const _containerRef = useRef<HTMLDivElement>(null);

  const bufferMap = {
    sm: 0.5,
    md: 0.75,
    lg: 1,
  };

  const { width } = useResizeObserver(_containerRef);

  // this method will register/ unregister tearsheet ids in a simple array based on open status
  const notifyStack = useCallback(
    (id: string, open: boolean, container: HTMLDivElement | null) => {
      _containerRef.current = container;
      setStack((prev) => {
        if (open) {
          // move to top if already exists
          if (prev.includes(id)) {
            return [...prev.filter((i) => i !== id), id];
          }
          return [...prev, id];
        } else {
          // remove from stack
          return prev.filter((i) => i !== id);
        }
      });
    },
    []
  );

  // method that calculates spacing factor for the stacked items
  const getScaleFactor = (id: string) => {
    const depth = getDepth(id);
    const buffer = bufferMap[stackStepSize];
    const bufferInPx = remToPx(buffer);

    const scale = depth > -1 ? (width - bufferInPx * 2 * depth) / width : 1;
    return scale;
  };

  const remToPx = (rem: number) => {
    return (
      rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
    );
  };

  const getDepth = useCallback(
    (id: string) => {
      const index = stack.indexOf(id);
      if (index === -1) {
        return -1;
      }
      return stack.length - 1 - index; // topmost → 0
    },
    [stack]
  );

  const getBlockSizeChange = (id: string) => {
    const depth = getDepth(id);

    const buffer = bufferMap[stackStepSize]; //to be changed
    const bufferInPx = remToPx(buffer);
    return `${bufferInPx * depth}px`;
  };

  const context: StackContextType = {
    stack,
    notifyStack,
    getScaleFactor,
    getBlockSizeChange,
    getDepth,
  };

  return (
    <StackContext.Provider value={context}>{children}</StackContext.Provider>
  );
};

export const useStackContext = (): StackContextType => {
  const context = useContext<StackContextType | undefined>(StackContext);

  if (context === undefined) {
    return {
      notifyStack: () => {},
      stack: [],
      getDepth: () => -1,
      getScaleFactor: () => 1,
      getBlockSizeChange: () => null,
    };
  }
  return context;
};
