/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState, useRef, RefObject, useEffect, useMemo } from 'react';
import classnames from 'classnames';
import { blockClass, getHeaderOffset } from './utils';
import {
  PageHeaderContext,
  PageHeaderRefs,
  PageHeaderObserverState,
} from './context';
import { usePrefix } from '../../internal/usePrefix';

// Import separated child components
import {
  PageHeaderBreadcrumbBar,
  type PageHeaderBreadcrumbBarProps,
} from './PageHeaderBreadcrumbBar';
import {
  PageHeaderContent,
  type PageHeaderContentProps,
} from './PageHeaderContent';
import {
  PageHeaderContentPageActions,
  type PageHeaderContentPageActionsProps,
} from './PageHeaderContentPageActions';
import {
  PageHeaderContentText,
  type PageHeaderContentTextProps,
} from './PageHeaderContentText';
import {
  PageHeaderHeroImage,
  type PageHeaderHeroImageProps,
} from './PageHeaderHeroImage';
import {
  PageHeaderTabBar,
  type PageHeaderTabBarProps,
} from './PageHeaderTabBar';
import {
  PageHeaderTagOverflow,
  type PageHeaderTagOverflowProps,
} from './PageHeaderTagOverflow';
import {
  PageHeaderScrollButton,
  type PageHeaderScrollButtonProps,
} from './PageHeaderScrollButton';
import { PageHeaderTitleBreadcrumb } from './PageHeaderTitleBreadcrumb';
import {
  PageHeaderBreadcrumbOverflow,
  type PageHeaderBreadcrumbOverflowProps,
} from './PageHeaderBreadcrumbOverflow';
import {
  PageHeaderBreadcrumbPageActions,
  type PageHeaderBreadcrumbPageActionsProps,
  type PageHeaderBreadcrumbPageActionItem,
} from './PageHeaderBreadcrumbPageActions';

/**
 * ----------
 * PageHeader
 * ----------
 */
export interface PageHeaderProps {
  children?: React.ReactNode;
  className?: string;
  /**
   * Callback fired when the content area becomes fully collapsed
   */
  onContentFullyCollapsed?: (collapsed: boolean) => void;
  /**
   * Callback fired when the title becomes clipped
   */
  onTitleClipped?: (clipped: boolean) => void;
  /**
   * Callback fired when the content actions become clipped
   */
  onContentActionsClipped?: (clipped: boolean) => void;
  /**
   * Applies Carbon's full-width grid mode to all internal sub-component grids.
   * Pass `true` for full width or `'xl'` for full width with the xl padding
   * override (matching the deprecated PageHeader `fullWidthGrid` behavior).
   */
  fullWidthGrid?: boolean | 'xl';
  /**
   * Applies Carbon's narrow grid mode to all internal sub-component grids.
   */
  narrowGrid?: boolean;
}

const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  function PageHeader(
    {
      className,
      children,
      onContentFullyCollapsed,
      onTitleClipped,
      onContentActionsClipped,
      fullWidthGrid,
      narrowGrid,
      ...other
    }: PageHeaderProps,
    ref
  ) {
    const [refs, setRefs] = useState<PageHeaderRefs>({});
    const [pageActionsInstance, setPageActionsInstance] = useState<
      React.ReactNode | ((state: PageHeaderObserverState) => React.ReactNode)
    >(null);
    const [disableStickyTabBar, setDisableStickyTabBar] = useState(false);
    const tempRef = useRef<HTMLDivElement>(null);
    const componentRef = (ref ?? tempRef) as RefObject<HTMLDivElement>;
    const prefix = usePrefix();
    const classNames = classnames(
      {
        [`${blockClass}`]: true,
        [`${blockClass}__next`]: true,
        [`${blockClass}--disable-sticky-tab-bar`]: disableStickyTabBar,
        [`${blockClass}--width--xl`]: fullWidthGrid === 'xl',
      },
      className
    );

    // Used to set CSS custom property with PageHeaderContent height to be used
    // for sticky positioning
    useEffect(() => {
      if (!componentRef?.current) {
        return;
      }
      const updateCssVars = () => {
        if (componentRef?.current) {
          // It's possible we don't have the content element
          // in which case we set it's height to 0
          const pageHeaderContentHeight =
            refs?.contentRef?.current?.offsetHeight ?? 0;
          const totalHeaderOffset = getHeaderOffset(componentRef.current);
          componentRef.current.style.setProperty(
            `--${prefix}-page-header-header-top`,
            `${(Math.round(pageHeaderContentHeight) - totalHeaderOffset) * -1}px`
          );
          componentRef.current.style.setProperty(
            `--${prefix}-page-header-breadcrumb-top`,
            `${totalHeaderOffset}px`
          );
        }
      };
      const observer = new ResizeObserver(updateCssVars);
      observer.observe(componentRef.current);
      return () => {
        observer.disconnect();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [componentRef, prefix]);

    const [fullyCollapsed, setFullyCollapsed] = useState(false);
    const [titleClipped, setTitleClipped] = useState(false);
    const [contentActionsClipped, setContentActionsClipped] = useState(false);

    // Intersection Observer setup, tracks if the PageHeaderContent is visible on page.
    // If it is not visible, we should set fully collapsed to true so that the
    // scroller button will know if it is clicked to expand rather than
    // collapse the header.
    useEffect(() => {
      if (!componentRef?.current) {
        return;
      }

      const totalHeaderOffset = getHeaderOffset(componentRef?.current);
      const predefinedContentPadding = 24;

      // Create content observer only if contentRef exists
      const contentObserver = refs?.contentRef?.current
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.target === refs?.contentRef?.current) {
                  const collapsed = !entry.isIntersecting;
                  setFullyCollapsed(collapsed);
                  onContentFullyCollapsed?.(collapsed);
                }
              });
            },
            {
              root: null,
              rootMargin: `${(predefinedContentPadding + (refs?.contentRef?.current?.offsetHeight || 0) + totalHeaderOffset + 24) * -1}px 0px 0px 0px`,
              threshold: 0.1,
            }
          )
        : null;

      // Create title observer only if titleRef exists
      const titleObserver = refs?.titleRef?.current
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.target === refs?.titleRef?.current) {
                  const clipped = !entry.isIntersecting;
                  setTitleClipped(clipped);
                  onTitleClipped?.(clipped);
                }
              });
            },
            {
              root: null,
              rootMargin: `${(predefinedContentPadding + (refs?.titleRef.current.offsetHeight || 0) + totalHeaderOffset + 24) * -1}px 0px 0px 0px`,
              threshold: 0.1,
            }
          )
        : null;

      // Create contentActions observer only if contentActions ref exists
      const contentActionsObserver = refs?.contentActions?.current
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.target === refs?.contentActions?.current) {
                  const clipped = !entry.isIntersecting;
                  setContentActionsClipped(clipped);
                  onContentActionsClipped?.(clipped);
                }
              });
            },
            {
              root: null,
              rootMargin: `${(predefinedContentPadding + (refs?.contentActions?.current?.offsetHeight || 0) + totalHeaderOffset + 24) * -1}px 0px 0px 0px`,
              threshold: 0.1,
            }
          )
        : null;

      // Observe elements if observers were created
      if (refs?.contentRef?.current && contentObserver) {
        contentObserver.observe(refs.contentRef.current);
      }

      if (refs?.titleRef?.current && titleObserver) {
        titleObserver.observe(refs.titleRef.current);
      }

      if (refs?.contentActions?.current && contentActionsObserver) {
        contentActionsObserver.observe(refs.contentActions.current);
      }

      return () => {
        contentObserver?.disconnect();
        titleObserver?.disconnect();
        contentActionsObserver?.disconnect();
      };
    }, [
      refs?.contentRef,
      refs?.titleRef,
      refs?.contentActions,
      componentRef,
      onContentFullyCollapsed,
      onTitleClipped,
      onContentActionsClipped,
    ]);

    // Memoize observerState to prevent unnecessary re-renders
    const observerState = useMemo(
      () => ({
        fullyCollapsed,
        titleClipped,
        contentActionsClipped,
      }),
      [fullyCollapsed, titleClipped, contentActionsClipped]
    );

    return (
      <PageHeaderContext.Provider
        value={{
          refs,
          setRefs,
          pageActionsInstance,
          setPageActionsInstance,
          observerState,
          disableStickyTabBar,
          setDisableStickyTabBar,
          fullWidthGrid,
          narrowGrid,
        }}>
        <div className={classNames} ref={componentRef} {...other}>
          {children}
        </div>
      </PageHeaderContext.Provider>
    );
  }
);
PageHeader.displayName = 'PageHeader';

/**
 * -------
 * Exports
 * -------
 */
const Root = PageHeader;
Root.displayName = 'PageHeader.Root';

const BreadcrumbBar = PageHeaderBreadcrumbBar;
BreadcrumbBar.displayName = 'PageHeaderBreadcrumbBar';

const Content = PageHeaderContent;
Content.displayName = 'PageHeaderContent';

const ContentPageActions = PageHeaderContentPageActions;
ContentPageActions.displayName = 'PageHeaderContentPageActions';

const ContentText = PageHeaderContentText;
ContentText.displayName = 'PageHeaderContentText';

const HeroImage = PageHeaderHeroImage;
HeroImage.displayName = 'PageHeaderHeroImage';

const TabBar = PageHeaderTabBar;
TabBar.displayName = 'PageHeaderTabBar';

const ScrollButton = PageHeaderScrollButton;
ScrollButton.displayName = 'PageHeaderScrollButton';

const TitleBreadcrumb = PageHeaderTitleBreadcrumb;
TitleBreadcrumb.displayName = 'PageHeaderTitleBreadcrumb';

const BreadcrumbOverflow = PageHeaderBreadcrumbOverflow;
BreadcrumbOverflow.displayName = 'PageHeaderBreadcrumbOverflow';

const TagOverflow = PageHeaderTagOverflow;
TagOverflow.displayName = 'PageHeaderTagOverflow';

const BreadcrumbPageActions = PageHeaderBreadcrumbPageActions;
BreadcrumbPageActions.displayName = 'PageHeaderBreadcrumbPageActions';

export {
  // direct exports
  PageHeader,
  PageHeaderBreadcrumbBar,
  PageHeaderContent,
  PageHeaderContentPageActions,
  PageHeaderContentText,
  PageHeaderHeroImage,
  PageHeaderTabBar,
  PageHeaderScrollButton,
  PageHeaderTitleBreadcrumb,
  PageHeaderBreadcrumbOverflow,
  PageHeaderTagOverflow,
  PageHeaderBreadcrumbPageActions,
  // namespaced
  Root,
  BreadcrumbBar,
  Content,
  ContentPageActions,
  ContentText,
  HeroImage,
  TabBar,
  ScrollButton,
  TitleBreadcrumb,
  BreadcrumbOverflow,
  TagOverflow,
  BreadcrumbPageActions,
};
export type {
  PageHeaderBreadcrumbBarProps,
  PageHeaderContentProps,
  PageHeaderContentPageActionsProps,
  PageHeaderContentTextProps,
  PageHeaderHeroImageProps,
  PageHeaderTabBarProps,
  PageHeaderScrollButtonProps,
  PageHeaderTagOverflowProps,
  PageHeaderBreadcrumbOverflowProps,
  PageHeaderBreadcrumbPageActionsProps,
  PageHeaderBreadcrumbPageActionItem,
};
