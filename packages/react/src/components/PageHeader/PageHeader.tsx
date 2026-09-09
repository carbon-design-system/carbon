/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState, useRef, RefObject, useEffect, useMemo } from 'react';
import classnames from 'classnames';
import { blockClass, getHeaderOffset, scrollableAncestor } from './utils';
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

/**
 * Static sub-component properties attached to PageHeader for namespace usage.
 * Declared here so TypeScript knows about `PageHeader.Root`, etc.
 */
type PageHeaderCompositeComponent = React.ForwardRefExoticComponent<
  PageHeaderProps & React.RefAttributes<HTMLDivElement>
> & {
  Root: React.ForwardRefExoticComponent<
    PageHeaderProps & React.RefAttributes<HTMLDivElement>
  >;
  BreadcrumbBar: typeof PageHeaderBreadcrumbBar;
  Content: typeof PageHeaderContent;
  ContentPageActions: typeof PageHeaderContentPageActions;
  ContentText: typeof PageHeaderContentText;
  HeroImage: typeof PageHeaderHeroImage;
  TabBar: typeof PageHeaderTabBar;
  ScrollButton: typeof PageHeaderScrollButton;
  TitleBreadcrumb: typeof PageHeaderTitleBreadcrumb;
  BreadcrumbOverflow: typeof PageHeaderBreadcrumbOverflow;
  TagOverflow: typeof PageHeaderTagOverflow;
  BreadcrumbPageActions: typeof PageHeaderBreadcrumbPageActions;
};

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
      // Also run immediately so the vars are correct before the first resize fires
      updateCssVars();
      return () => {
        observer.disconnect();
      };
    }, [componentRef, prefix, refs]);

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

      // Determine the scroll root: use the scrollable ancestor element if it is
      // a real DOM element (not the document scrolling element).  When a wrapper
      // div is the scroll container (e.g. in Storybook), we must pass it as
      // IntersectionObserver's root so that scroll events inside the wrapper
      // trigger the observer.  When the page itself scrolls, root stays null
      // (viewport).
      const scrollContainer = scrollableAncestor(componentRef.current);
      const ioRoot =
        scrollContainer instanceof Element &&
        scrollContainer !== document.scrollingElement
          ? scrollContainer
          : null;

      // When observing against the viewport (ioRoot=null), use getHeaderOffset
      // to account for a fixed shell header above the component.
      // When observing against a scroll container, offset is 0 (container top = reference).
      const totalHeaderOffset =
        ioRoot === null ? getHeaderOffset(componentRef.current) : 0;

      // After the header collapses, only the breadcrumb bar and tab bar remain
      // visible (sticky).  We detect "clipped" when an element has scrolled
      // above that remaining sticky region.
      // breadcrumbBarHeight (40px) + any tabBar (40px) + shell offset = stickyTopHeight.
      // We add a small buffer (4px) to avoid false positives at exact boundary.
      const breadcrumbBarHeight =
        refs?.contentRef?.current
          ?.closest(`.cds--page-header__next`)
          ?.querySelector(`.cds--page-header__breadcrumb-bar`)?.offsetHeight ??
        40;
      const tabBarHeight =
        refs?.contentRef?.current
          ?.closest(`.cds--page-header__next`)
          ?.querySelector(`.cds--page-header__tab-bar`)?.offsetHeight ?? 0;
      const stickyTopHeight =
        totalHeaderOffset + breadcrumbBarHeight + tabBarHeight + 4;

      // Create content observer only if contentRef exists.
      // Fire when the content element's bottom edge crosses above the sticky top.
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
              root: ioRoot,
              rootMargin: `${stickyTopHeight * -1}px 0px 0px 0px`,
              threshold: 0,
            }
          )
        : null;

      // Create title observer only if titleRef exists.
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
              root: ioRoot,
              rootMargin: `${stickyTopHeight * -1}px 0px 0px 0px`,
              threshold: 0,
            }
          )
        : null;

      // Create contentActions observer only if contentActions ref exists.
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
              root: ioRoot,
              rootMargin: `${stickyTopHeight * -1}px 0px 0px 0px`,
              threshold: 0,
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
) as PageHeaderCompositeComponent;
PageHeader.displayName = 'PageHeader';

/**
 * -------
 * Exports
 * -------
 *
 * Sub-components are attached as static properties on PageHeader so that
 * stories and consumers can use the namespace pattern:
 *   <PageHeader.Root>, <PageHeader.BreadcrumbBar>, etc.
 */

// Attach sub-components as static properties for namespace-style usage
PageHeader.Root = PageHeader;
PageHeader.BreadcrumbBar = PageHeaderBreadcrumbBar;
PageHeader.Content = PageHeaderContent;
PageHeader.ContentPageActions = PageHeaderContentPageActions;
PageHeader.ContentText = PageHeaderContentText;
PageHeader.HeroImage = PageHeaderHeroImage;
PageHeader.TabBar = PageHeaderTabBar;
PageHeader.ScrollButton = PageHeaderScrollButton;
PageHeader.TitleBreadcrumb = PageHeaderTitleBreadcrumb;
PageHeader.BreadcrumbOverflow = PageHeaderBreadcrumbOverflow;
PageHeader.TagOverflow = PageHeaderTagOverflow;
PageHeader.BreadcrumbPageActions = PageHeaderBreadcrumbPageActions;

// Standalone aliases (kept for direct named import support)
const Root = PageHeader;
const BreadcrumbBar = PageHeaderBreadcrumbBar;
const Content = PageHeaderContent;
const ContentPageActions = PageHeaderContentPageActions;
const ContentText = PageHeaderContentText;
const HeroImage = PageHeaderHeroImage;
const TabBar = PageHeaderTabBar;
const ScrollButton = PageHeaderScrollButton;
const TitleBreadcrumb = PageHeaderTitleBreadcrumb;
const BreadcrumbOverflow = PageHeaderBreadcrumbOverflow;
const TagOverflow = PageHeaderTagOverflow;
const BreadcrumbPageActions = PageHeaderBreadcrumbPageActions;

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
