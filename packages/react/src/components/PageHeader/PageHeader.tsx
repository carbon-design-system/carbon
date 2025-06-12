/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, {
  type ComponentType,
  type FunctionComponent,
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
  createContext,
  RefObject,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { breakpoints } from '@carbon/layout';
import { useMatchMedia } from '../../internal/useMatchMedia';
import { Text } from '../Text';
import { MenuButton } from '../MenuButton';
import { MenuItemProps } from '../Menu/MenuItem';
import { MenuItem } from '../Menu';
import { DefinitionTooltip } from '../Tooltip';
import { AspectRatio } from '../AspectRatio';
import { createOverflowHandler } from '@carbon/utilities';
import { OperationalTag, Tag } from '../Tag';
import { TYPES } from '../Tag/Tag';
import useOverflowItems from '../../internal/useOverflowItems';
import { Popover, PopoverContent } from '../Popover';
import { useId } from '../../internal/useId';
import { Grid, Column } from '../Grid';
import { IconButton, IconButtonProps } from '../IconButton';
import { ChevronUp } from '@carbon/react/icons';

/**
 * ----------
 * Utilities
 * ----------
 */

const getHeaderOffset = (el: HTMLElement): number => {
  const scrollableContainer = scrollableAncestor(el);
  const scrollableContainerTop = scrollableContainer
    ? (scrollableContainer as HTMLElement).getBoundingClientRect().top
    : 0;
  const offsetMeasuringTop = el ? el.getBoundingClientRect().top : 0;
  const totalHeaderOffset =
    offsetMeasuringTop !== 0 ? offsetMeasuringTop - scrollableContainerTop : 0;
  return totalHeaderOffset;
};

const windowExists = typeof window !== `undefined`;

/**
 * Determines if the given target is scrollable
 *
 * @param {HTMLElement} target
 * @returns {boolean}
 */
const scrollable = (target: HTMLElement): boolean => {
  const style = window.getComputedStyle(target);
  return /(auto|scroll|hidden)/.test(style.overflow);
};

/**
 * Recursively looks for the scrollable ancestor
 */
const scrollableAncestorInner = (target: HTMLElement) => {
  if (target.parentNode && target.parentNode !== document) {
    if (scrollable(target.parentNode as HTMLElement)) {
      return target.parentNode;
    } else {
      return scrollableAncestorInner(target.parentNode as HTMLElement);
    }
  } else {
    return document.scrollingElement;
  }
};

/**
 * Walks up the parent nodes to identify the first scrollable ancestor
 *
 * @param {HTMLElement} target
 * @returns {HTMLElement}
 */
const scrollableAncestor = (target: HTMLElement) => {
  if (!windowExists || !target) {
    return null;
  }

  // based on https://stackoverflow.com/questions/35939886/find-first-scrollable-parent
  const style = window.getComputedStyle(target);

  if (!target || !style || style.position === 'fixed') {
    return document.scrollingElement;
  }
  return scrollableAncestorInner(target);
};

type PageHeaderRefs = {
  contentRef?: RefObject<HTMLDivElement>;
  baseRef?: RefObject<HTMLDivElement>;
};

type PageHeaderContextType = {
  refs?: PageHeaderRefs;
  setRefs: React.Dispatch<React.SetStateAction<{}>>;
};

const PageHeaderContext = createContext<PageHeaderContextType | undefined>(
  undefined
);

function usePageHeader() {
  const context = React.useContext(PageHeaderContext);
  if (!context) {
    throw new Error(
      'Page header context was not provided or hook was used outside of the Page header component.'
    );
  }
  return context;
}

/**
 * ----------
 * PageHeader
 * ----------
 */
interface PageHeaderProps {
  children?: React.ReactNode;
  className?: string;
}
const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  function PageHeader({ className, children, ...other }: PageHeaderProps, ref) {
    const [refs, setRefs] = useState<PageHeaderRefs>({});
    const tempRef = useRef<HTMLDivElement>(null);
    const componentRef = (ref ?? tempRef) as RefObject<HTMLDivElement>;
    const prefix = usePrefix();
    const classNames = classnames(
      {
        [`${prefix}--page-header`]: true,
      },
      className
    );

    // Save PageHeader ref to be used in sub-components
    useEffect(() => {
      if (componentRef?.current) {
        setRefs((prev) => ({ ...prev, baseRef: componentRef }));
      }
    }, []);

    // Used to set CSS custom property with PageHeaderContent height to be used
    // for sticky positioning
    useEffect(() => {
      if (componentRef?.current && refs?.contentRef?.current) {
        const pageHeaderContentHeight = refs?.contentRef?.current?.offsetHeight;
        const totalHeaderOffset = getHeaderOffset(componentRef?.current);
        componentRef?.current.style.setProperty(
          `--${prefix}-page-header-header-top`,
          `${(Math.round(pageHeaderContentHeight) - totalHeaderOffset) * -1}px`
        );
        componentRef?.current.style.setProperty(
          `--${prefix}-page-header-breadcrumb-top`,
          `${totalHeaderOffset}px`
        );
      }
    }, [refs]);

    return (
      <PageHeaderContext.Provider value={{ refs, setRefs }}>
        <div className={classNames} ref={componentRef} {...other}>
          {children}
        </div>
      </PageHeaderContext.Provider>
    );
  }
);
PageHeader.displayName = 'PageHeader';

/**
 * -----------------------
 * PageHeaderBreadcrumbBar
 * -----------------------
 */
interface PageHeaderBreadcrumbBarProps {
  /**
   * `true` by default to render BreadcrumbBar bottom border.
   */
  border?: Boolean;
  children?: React.ReactNode;
  className?: string;
  /**
   * Provide an optional icon to render in front of the PageHeaderContent's title.
   */
  renderIcon?: ComponentType | FunctionComponent;
  /**
   * The PageHeaderBreadcrumbBar's content actions
   */
  contentActions?: React.ReactNode;
  /**
   * `true` to set content actions flush against page actions
   */
  contentActionsFlush?: Boolean;
  /**
   * The PageHeaderContent's page actions
   */
  pageActions?: React.ReactNode;
  /**
   * `true` to set page actions flush with page
   */
  pageActionsFlush?: Boolean;
}
const PageHeaderBreadcrumbBar = React.forwardRef<
  HTMLDivElement,
  PageHeaderBreadcrumbBarProps
>(function PageHeaderBreadcrumbBar(
  {
    border = true,
    className,
    children,
    renderIcon: IconElement,
    contentActions,
    contentActionsFlush,
    pageActions,
    pageActionsFlush,
    ...other
  }: PageHeaderBreadcrumbBarProps,
  ref
) {
  const prefix = usePrefix();
  const classNames = classnames(
    {
      [`${prefix}--page-header__breadcrumb-bar`]: true,
      [`${prefix}--page-header__breadcrumb-bar-border`]: border,
      [`${prefix}--page-header__breadcrumb__actions-flush`]: pageActionsFlush,
    },
    className
  );

  const contentActionsClasses = classnames({
    [`${prefix}--page-header__breadcrumb__content-actions`]:
      !contentActionsFlush,
  });

  return (
    <div className={classNames} ref={ref} {...other}>
      <Grid>
        <Column lg={16} md={8} sm={4}>
          <div className={`${prefix}--page-header__breadcrumb-container`}>
            <div className={`${prefix}--page-header__breadcrumb-wrapper`}>
              {IconElement && (
                <div className={`${prefix}--page-header__breadcrumb__icon`}>
                  <IconElement />
                </div>
              )}
              {children}
            </div>
            <div className={`${prefix}--page-header__breadcrumb__actions`}>
              <div className={contentActionsClasses}>{contentActions}</div>
              {pageActions}
            </div>
          </div>
        </Column>
      </Grid>
    </div>
  );
});
PageHeaderBreadcrumbBar.displayName = 'PageHeaderBreadcrumbBar';

/**
 * -----------------
 * PageHeaderContent
 * -----------------
 */
interface PageHeaderContentProps {
  /**
   * Provide child elements to be rendered inside PageHeaderContent.
   */
  children?: React.ReactNode;
  /**
   * Specify an optional className to be added to your PageHeaderContent
   */
  className?: string;
  /**
   * Provide an optional icon to render in front of the PageHeaderContent's title.
   */
  renderIcon?: ComponentType | FunctionComponent;
  /**
   * The PageHeaderContent's title
   */
  title: string;
  /**
   * The PageHeaderContent's contextual actions
   */
  contextualActions?: React.ReactNode;
  /**
   * The PageHeaderContent's page actions
   */
  pageActions?: React.ReactNode;
}

const PageHeaderContent = React.forwardRef<
  HTMLDivElement,
  PageHeaderContentProps
>(function PageHeaderContent(
  {
    className,
    children,
    title,
    renderIcon: IconElement,
    contextualActions,
    pageActions,
    ...other
  }: PageHeaderContentProps,
  ref
) {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const componentRef = (ref ?? contentRef) as RefObject<HTMLDivElement>;
  const { setRefs } = usePageHeader();

  useEffect(() => {
    if (componentRef?.current) {
      setRefs((prev) => ({ ...prev, contentRef: componentRef }));
    }
  }, []);

  const prefix = usePrefix();
  const classNames = classnames(
    {
      [`${prefix}--page-header__content`]: true,
    },
    className
  );
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isEllipsisApplied, setIsEllipsisApplied] = useState(false);

  const isEllipsisActive = (element: HTMLHeadingElement) => {
    setIsEllipsisApplied(element.offsetHeight < element.scrollHeight);
    return element.offsetHeight < element.scrollHeight;
  };

  useLayoutEffect(() => {
    titleRef.current && isEllipsisActive(titleRef.current);
  }, [title]);

  return (
    <div className={classNames} ref={componentRef} {...other}>
      <Grid>
        <Column lg={16} md={8} sm={4}>
          <div className={`${prefix}--page-header__content__title-wrapper`}>
            <div className={`${prefix}--page-header__content__start`}>
              <div
                className={`${prefix}--page-header__content__title-container`}>
                {IconElement && (
                  <div className={`${prefix}--page-header__content__icon`}>
                    <IconElement />
                  </div>
                )}

                {isEllipsisApplied ? (
                  <DefinitionTooltip definition={title}>
                    <Text
                      ref={titleRef}
                      as="h4"
                      className={`${prefix}--page-header__content__title`}>
                      {title}
                    </Text>
                  </DefinitionTooltip>
                ) : (
                  <Text
                    ref={titleRef}
                    as="h4"
                    className={`${prefix}--page-header__content__title`}>
                    {title}
                  </Text>
                )}
              </div>
              {contextualActions && (
                <div
                  className={`${prefix}--page-header__content__contextual-actions`}>
                  {contextualActions}
                </div>
              )}
            </div>
            {pageActions}
          </div>
          {children}
        </Column>
      </Grid>
    </div>
  );
});
PageHeaderContent.displayName = 'PageHeaderContent';

PageHeaderContent.propTypes = {
  /**
   * Provide child elements to be rendered inside PageHeaderContent.
   */
  children: PropTypes.node,
  /**
   * Specify an optional className to be added to your PageHeaderContent
   */
  className: PropTypes.string,
  /**
   * Provide an optional icon to render in front of the PageHeaderContent's title.
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /**
   * The PageHeaderContent's title
   */
  title: PropTypes.string.isRequired,
  /**
   * The PageHeaderContent's subtitle
   */
  subtitle: PropTypes.string,
  /**
   * The PageHeaderContent's contextual actions
   */
  contextualActions: PropTypes.node,
  /**
   * The PageHeaderContent's page actions
   */
  pageActions: PropTypes.node,
};

/**
 * ----------------
 * PageHeaderContentPageActions
 * ----------------
 */
interface PageHeaderContentPageActionsProps {
  /**
   * Provide child elements to be rendered inside PageHeaderContentPageActions.
   */
  children?: React.ReactNode;
  /**
   * Specify an optional className to be added to your PageHeaderContentPageActions
   */
  className?: string;
  /**
   * The PageHeaderContent's page actions collapsible Menu button label
   */
  menuButtonLabel?: string;
  /**
   * The PageHeaderContent's page actions
   */
  actions?: React.ReactNode;
}
const PageHeaderContentPageActions = ({
  className,
  children,
  menuButtonLabel = 'Actions',
  actions,
  ...other
}: PageHeaderContentPageActionsProps) => {
  const prefix = usePrefix();
  const classNames = classnames(
    {
      [`${prefix}--page-header__content__page-actions`]: true,
    },
    className
  );

  type action = {
    id: string;
    onClick?: () => void;
    body: React.ReactNode;
    menuItem: MenuItemProps;
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef<HTMLDivElement>(null);
  const [menuButtonVisibility, setMenuButtonVisibility] = useState(false);
  const [hiddenItems, setHiddenItems] = useState<action[]>([]);

  // need to set the grid columns width based on the menu button's width
  // to avoid overlapping when resizing
  useLayoutEffect(() => {
    if (menuButtonVisibility && offsetRef.current) {
      const width = offsetRef.current.offsetWidth;
      document.documentElement.style.setProperty(
        '--pageheader-title-grid-width',
        `${width}px`
      );
    }
  }, [menuButtonVisibility]);

  useEffect(() => {
    if (!containerRef.current || !Array.isArray(actions)) return;
    createOverflowHandler({
      container: containerRef.current,
      // exclude the hidden menu button from children
      maxVisibleItems: containerRef.current.children.length - 1,
      onChange: (visible, hidden) => {
        setHiddenItems(actions?.slice(visible.length));

        if (hidden.length > 0) {
          setMenuButtonVisibility(true);
        }
      },
    });
  }, []);

  return (
    <div className={classNames} ref={containerRef} {...other}>
      {actions && (
        <>
          {Array.isArray(actions) && (
            <>
              {actions.map((action) => (
                <div key={action.id}>
                  {React.cloneElement(action.body, {
                    ...action.body.props,
                    onClick: action.onClick,
                  })}
                </div>
              ))}
              <span data-offset data-hidden ref={offsetRef}>
                <MenuButton
                  menuAlignment="bottom-end"
                  label={menuButtonLabel}
                  size="md">
                  {[...hiddenItems].reverse().map((item) => (
                    <MenuItem
                      key={item.id}
                      onClick={item.onClick}
                      {...item.menuItem}
                    />
                  ))}
                </MenuButton>
              </span>
            </>
          )}
        </>
      )}
    </div>
  );
};

PageHeaderContentPageActions.displayName = 'PageHeaderContentPageActions';
PageHeaderContentPageActions.propTypes = {
  /**
   * Provide child elements to be rendered inside PageHeaderContentPageActions.
   */
  children: PropTypes.node,
  /**
   * Specify an optional className to be added to your PageHeaderContentPageActions
   */
  className: PropTypes.string,
  /**
   * The PageHeaderContent's collapsible Menu button label
   */
  menuButtonLabel: PropTypes.string,
  /**
   * The PageHeaderContent's page actions
   */
  actions: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

/**
 * ----------------
 * PageHeaderContentText
 * ----------------
 */
interface PageHeaderContentTextProps {
  /**
   * Provide child elements to be rendered inside PageHeaderContentText.
   */
  children?: React.ReactNode;
  /**
   * Specify an optional className to be added to your PageHeaderContentText
   */
  className?: string;
  /**
   * The PageHeaderContent's subtitle
   */
  subtitle?: string;
}
const PageHeaderContentText = ({
  className,
  children,
  subtitle,
  ...other
}: PageHeaderContentTextProps) => {
  const prefix = usePrefix();
  const classNames = classnames(
    {
      [`${prefix}--page-header__content__body`]: true,
    },
    className
  );

  return (
    <div className={classNames} {...other}>
      {subtitle && (
        <Text as="h3" className={`${prefix}--page-header__content__subtitle`}>
          {subtitle}
        </Text>
      )}
      {children}
    </div>
  );
};

PageHeaderContentText.displayName = 'PageHeaderContentText';
PageHeaderContentText.propTypes = {
  /**
   * Provide child elements to be rendered inside PageHeaderContentText.
   */
  children: PropTypes.node,
  /**
   * Specify an optional className to be added to your PageHeaderContentText
   */
  className: PropTypes.string,
  /**
   * The PageHeaderContent's subtitle
   */
  subtitle: PropTypes.string,
};

/**
 * ----------------
 * PageHeaderHeroImage
 * ----------------
 */
interface PageHeaderHeroImageProps {
  /**
   * Provide child elements to be rendered inside PageHeaderHeroImage.
   */
  children?: React.ReactNode;
  /**
   * Specify an optional className to be added to your PageHeaderHeroImage
   */
  className?: string;
}
const PageHeaderHeroImage = ({
  className,
  children,
  ...other
}: PageHeaderHeroImageProps) => {
  const prefix = usePrefix();
  const classNames = classnames(
    {
      [`${prefix}--page-header__hero-image`]: true,
    },
    className
  );

  const lgMediaQuery = `(min-width: ${breakpoints.lg.width})`;
  const isLg = useMatchMedia(lgMediaQuery);

  return (
    <AspectRatio className={classNames} {...other} ratio={isLg ? '2x1' : '3x2'}>
      {children}
    </AspectRatio>
  );
};
PageHeaderHeroImage.displayName = 'PageHeaderHeroImage';
PageHeaderHeroImage.propTypes = {
  /**
   * Provide child elements to be rendered inside PageHeaderHeroImage.
   */
  children: PropTypes.node,
  /**
   * Specify an optional className to be added to your PageHeaderHeroImage
   */
  className: PropTypes.string,
};

/**
 * ----------------
 * PageHeaderTabBar
 * ----------------
 */
interface TagItem {
  type: keyof typeof TYPES;
  text: string;
  size?: 'sm' | 'md' | 'lg';
  id: string;
}

interface PageHeaderTabBarProps {
  children?: React.ReactNode;
  className?: string;
  tags?: TagItem[];
  scroller?: React.ReactNode;
}

const PageHeaderTabBar = React.forwardRef<
  HTMLDivElement,
  PageHeaderTabBarProps
>(function PageHeaderTabBar(
  { className, children, scroller, tags = [], ...other }: PageHeaderTabBarProps,
  ref
) {
  const prefix = usePrefix();
  const classNames = classnames(
    {
      [`${prefix}--page-header__tab-bar`]: true,
    },
    className
  );
  // Early return if no tags are provided
  if (!tags.length) {
    return (
      <div className={classNames} ref={ref} {...other}>
        <Grid>
          <Column lg={16} md={8} sm={4}>
            {children}
          </Column>
        </Grid>
      </div>
    );
  }
  const [openPopover, setOpenPopover] = useState(false);
  const tagSize = tags[0]?.size || 'md';
  const instanceId = useId('PageHeaderTabBar');
  const tagsWithIds = useMemo(() => {
    return tags.map((tag, index) => ({
      ...tag,
      id: tag.id || `tag-${index}-${instanceId}`,
    }));
  }, [tags]);

  const tagsContainerRef = useRef<HTMLDivElement>(null);
  const tagsAndScrollerRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef<HTMLDivElement>(null);
  // To close popover when window resizes
  useEffect(() => {
    const handleResize = () => {
      // Close the popover when window resizes to prevent unwanted opens
      setOpenPopover(false);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // overflow items hook
  const {
    visibleItems = [],
    hiddenItems = [],
    itemRefHandler = () => {},
  } = useOverflowItems<TagItem>(
    tagsWithIds,
    tagsAndScrollerRef as React.RefObject<HTMLDivElement>,
    offsetRef as React.RefObject<HTMLDivElement>
  ) || {
    visibleItems: [],
    hiddenItems: [],
    itemRefHandler: () => {},
  };

  const handleOverflowClick = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    setOpenPopover((prev) => !prev);
  }, []);

  // Function to render tags
  const renderTags = () => (
    <div className={`${prefix}--page-header__tags`} ref={tagsContainerRef}>
      {visibleItems.map((tag) => (
        <Tag
          key={tag.id}
          ref={(node) => itemRefHandler(tag.id, node)}
          type={tag.type}
          size={tag.size}
          className={`${prefix}--page-header__tag-item`}>
          {tag.text}
        </Tag>
      ))}

      {hiddenItems.length > 0 && (
        <Popover
          open={openPopover}
          onRequestClose={() => setOpenPopover(false)}>
          <OperationalTag
            onClick={handleOverflowClick}
            aria-expanded={openPopover}
            text={`+${hiddenItems.length}`}
            size={tagSize}
          />
          <PopoverContent className="tag-popover-content">
            <div className={`${prefix}--page-header__tags-popover-list`}>
              {hiddenItems.map((tag) => (
                <Tag key={tag.id} type={tag.type} size={tag.size}>
                  {tag.text}
                </Tag>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );

  return (
    <div className={classNames} ref={ref} {...other}>
      <Grid>
        <Column lg={16} md={8} sm={4}>
          <div className={`${prefix}--page-header__tab-bar--tablist`}>
            {children}
            <div
              ref={tagsAndScrollerRef}
              className={`${prefix}--page-header__tab-bar--tag-scroller-wrapper`}>
              {tags.length > 0 && renderTags()}
              {scroller}
            </div>
          </div>
        </Column>
      </Grid>
    </div>
  );
});
PageHeaderTabBar.displayName = 'PageHeaderTabBar';

interface PageHeaderScrollButtonProps extends IconButtonProps {
  collapseText?: string;
  expandText?: string;
}

const PageHeaderScrollButton = React.forwardRef<
  HTMLDivElement,
  PageHeaderScrollButtonProps
>(function PageHeaderExpander(
  {
    className,
    children,
    label,
    onClick,
    collapseText = 'Collapse',
    expandText = 'Expand',
    ...other
  }: PageHeaderScrollButtonProps,
  ref
) {
  const { refs } = usePageHeader();
  const [fullyCollapsed, setFullyCollapsed] = useState(false);

  // Intersection Observer to track if PageHeaderContent is visible on page
  // If it is not visible, we should set fully collapsed to true so that the
  // scroller button will know if it is clicked to expand rather than
  // collapse the header
  useEffect(() => {
    if (!refs?.contentRef || !refs?.baseRef) return;
    const totalHeaderOffset = getHeaderOffset(refs?.baseRef?.current);
    const predefinedContentPadding = 24;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setFullyCollapsed(!entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: `${(predefinedContentPadding + totalHeaderOffset) * -1}px 0px 0px 0px`,
        threshold: 0.1,
      }
    );

    if (refs?.contentRef.current) {
      observer.observe(refs?.contentRef.current);
    }

    return () => {
      if (!refs?.contentRef?.current) return;
      if (refs?.contentRef.current) {
        observer.unobserve(refs?.contentRef.current);
      }
    };
  }, [refs]);

  const handleScroller = (event, isFullyCollapsed: boolean) => {
    if (!refs?.contentRef?.current) return;
    const scrollableTarget = scrollableAncestor(
      refs?.contentRef.current
    ) as HTMLElement;

    // Page header content is not fully collapsed
    if (!isFullyCollapsed) {
      const pageHeaderContentHeight = refs?.contentRef.current.offsetHeight;
      scrollableTarget.scrollTo({
        top: pageHeaderContentHeight, // headerTopValue, check if breadcrumb bar is included
        behavior: 'smooth',
      });
    } else {
      // Page header content is fully collapsed
      scrollableTarget.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prefix = usePrefix();

  return (
    <div className={`${prefix}--page-header--scroller-button-container`}>
      <IconButton
        ref={ref}
        label={fullyCollapsed ? expandText : collapseText}
        size="md"
        kind="ghost"
        autoAlign
        {...other}
        onClick={(event) => {
          onClick?.(event);
          handleScroller(event, fullyCollapsed);
        }}
        className={classnames(
          className,
          `${prefix}--page-header--scroller-button`
        )}>
        <ChevronUp
          className={classnames(
            `${prefix}--page-header--scroller-button-icon`,
            {
              [`${prefix}--page-header--scroller-button-icon-collapsed`]:
                fullyCollapsed,
            }
          )}
        />
      </IconButton>
    </div>
  );
});

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
  // namespaced
  Root,
  BreadcrumbBar,
  Content,
  ContentPageActions,
  ContentText,
  HeroImage,
  TabBar,
  ScrollButton,
};
export type {
  PageHeaderProps,
  PageHeaderBreadcrumbBarProps,
  PageHeaderContentProps,
  PageHeaderContentPageActionsProps,
  PageHeaderContentTextProps,
  PageHeaderHeroImageProps,
  PageHeaderTabBarProps,
  PageHeaderScrollButtonProps,
};
