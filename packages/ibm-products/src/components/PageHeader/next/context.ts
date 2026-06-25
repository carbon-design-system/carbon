/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext, RefObject, useContext } from 'react';

/**
 * -------------
 * Context setup
 * -------------
 */

export type PageHeaderRefs = {
  contentRef?: RefObject<HTMLDivElement | null>;
  titleRef?: RefObject<HTMLHeadingElement | null>;
  contentActions?: RefObject<HTMLElement | null>;
  breadcrumbActions?: RefObject<HTMLElement | null>;
};

export type PageHeaderObserverState = {
  fullyCollapsed: boolean;
  titleClipped: boolean;
  contentActionsClipped: boolean;
};

type PageHeaderContextType = {
  refs?: PageHeaderRefs;
  setRefs: React.Dispatch<React.SetStateAction<PageHeaderRefs>>;
  pageActionsInstance?:
    | React.ReactNode
    | ((state: PageHeaderObserverState) => React.ReactNode);
  setPageActionsInstance: React.Dispatch<
    React.SetStateAction<
      React.ReactNode | ((state: PageHeaderObserverState) => React.ReactNode)
    >
  >;
  observerState: PageHeaderObserverState;
  isContentActionsInBreadcrumbBar?: boolean;
  isFunctionalContentActions?: boolean;
  disableStickyTabBar?: boolean;
  setDisableStickyTabBar?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PageHeaderContext = createContext<
  PageHeaderContextType | undefined
>({
  setRefs: () => {},
  refs: {},
  pageActionsInstance: null,
  setPageActionsInstance: () => {},
  observerState: {
    fullyCollapsed: false,
    titleClipped: false,
    contentActionsClipped: false,
  },
  disableStickyTabBar: false,
  setDisableStickyTabBar: () => {},
});

export function usePageHeader() {
  const context = useContext(PageHeaderContext);
  if (!context) {
    throw new Error(
      'Page header context was not provided or hook was used outside of the Page header component.'
    );
  }
  return context;
}
