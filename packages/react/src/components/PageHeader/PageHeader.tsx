/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, {
  type ComponentType,
  type FunctionComponent,
  useLayoutEffect,
  useState,
  useRef,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { breakpoints } from '@carbon/layout';
import { useMatchMedia } from '../../internal/useMatchMedia';
import { Text } from '../Text';
import { DefinitionTooltip } from '../Tooltip';
import { AspectRatio } from '../AspectRatio';
import { Tabs as BaseTabs } from '../Tabs/Tabs';
import { OperationalTag, Tag } from '../Tag';
import { TYPES } from '../Tag/Tag';
import useOverflowItems from '../../internal/useOverflowItems';
import { Popover, PopoverContent } from '../Popover';
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
    const prefix = usePrefix();
    const classNames = classnames(
      {
        [`${prefix}--page-header`]: true,
      },
      className
    );
    return (
      <div className={classNames} ref={ref} {...other}>
        <p>page header</p>
        {children}
      </div>
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
  children?: React.ReactNode;
  className?: string;
}
const PageHeaderBreadcrumbBar = React.forwardRef<
  HTMLDivElement,
  PageHeaderBreadcrumbBarProps
>(function PageHeaderBreadcrumbBar(
  { className, children, ...other }: PageHeaderBreadcrumbBarProps,
  ref
) {
  const prefix = usePrefix();
  const classNames = classnames(
    {
      [`${prefix}--page-header__breadcrumb-bar`]: true,
    },
    className
  );
  return (
    <div className={classNames} ref={ref} {...other}>
      <p>page header breadcrumb bar</p>
      {children}
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
   * The PageHeaderContent's subtitle
   */
  subtitle?: string;
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
    subtitle,
    renderIcon: IconElement,
    contextualActions,
    pageActions,
    ...other
  }: PageHeaderContentProps,
  ref
) {
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
    <div className={classNames} ref={ref} {...other}>
      <div className={`${prefix}--page-header__content__title-wrapper`}>
        <div className={`${prefix}--page-header__content__start`}>
          <div className={`${prefix}--page-header__content__title-container`}>
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
        <div className={`${prefix}--page-header__content__end`}>
          {pageActions && (
            <div className={`${prefix}--page-header__content__page-actions`}>
              {pageActions}
            </div>
          )}
        </div>
      </div>
      {subtitle && (
        <Text as="h3" className={`${prefix}--page-header__content__subtitle`}>
          {subtitle}
        </Text>
      )}
      {children && (
        <div className={`${prefix}--page-header__content__body`}>
          {children}
        </div>
      )}
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
const PageHeaderHeroImage = React.forwardRef<
  HTMLDivElement,
  PageHeaderHeroImageProps
>(function PageHeaderHeroImage(
  { className, children, ...other }: PageHeaderHeroImageProps,
  ref
) {
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
});
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
}

const PageHeaderTabBar = React.forwardRef<
  HTMLDivElement,
  PageHeaderTabBarProps
>(function PageHeaderTabBar(
  { className, children, tags = [], ...other }: PageHeaderTabBarProps,
  ref
) {
  const prefix = usePrefix();
  const classNames = classnames(
    {
      [`${prefix}--page-header__tab-bar`]: true,
    },
    className
  );
  const [openPopover, setOpenPopover] = useState(false);
  const tagSize = tags[0]?.size || 'md';

  const tagsWithIds = useMemo(() => {
    return tags.map((tag, index) => ({
      ...tag,
      id: tag.id || `tag-${index}`,
    }));
  }, [tags]);

  const tagsContainerRef = useRef<HTMLDivElement>(null);
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
  } = useOverflowItems<TagItem>(tagsWithIds, tagsContainerRef, offsetRef) || {
    visibleItems: [],
    hiddenItems: [],
    itemRefHandler: () => {},
  };

  const handleOverflowClick = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    setOpenPopover((prev) => !prev);
  }, []);

  // Find TabList and TabPanels from children
  let tabListElement: React.ReactNode = null;
  let tabPanelsElement: React.ReactNode = null;

  // Process children to extract TabList and TabPanels
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      const isPageHeaderTabs =
        child.type === PageHeaderTabs ||
        (typeof child.type === 'function' &&
          (child.type as any).displayName === 'PageHeader.Tabs') ||
        (typeof child.type === 'function' &&
          (child.type as any).displayName === 'PageHeaderTabs');

      if (isPageHeaderTabs) {
        // Extract TabList and TabPanels
        React.Children.forEach(child.props.children, (tabChild) => {
          if (React.isValidElement(tabChild)) {
            const tabChildType = tabChild.type;
            const isTabList =
              (typeof tabChildType === 'function' &&
                (tabChildType as any).displayName === 'TabList') ||
              (tabChildType as any)?.name === 'TabList';
            const isTabPanels =
              (typeof tabChildType === 'function' &&
                (tabChildType as any).displayName === 'TabPanels') ||
              (tabChildType as any)?.name === 'TabPanels';
            if (isTabList) {
              tabListElement = tabChild;
            } else if (isTabPanels) {
              tabPanelsElement = tabChild;
            }
          }
        });
      }
    }
  });

  return (
    <>
      <div className={classNames} ref={ref} {...other}>
        <div className={`${prefix}--page-header__tablist-tags-wrapper`}>
          {tabListElement}
          {tags && tags.length > 0 && (
            <div
              className={`${prefix}--page-header__tags`}
              ref={tagsContainerRef}>
              {/* Only render visible tags */}
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
                    <div
                      className={`${prefix}--page-header__tags-popover-list`}>
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
          )}
        </div>
        {tabPanelsElement}
      </div>
    </>
  );
});

PageHeaderTabBar.displayName = 'PageHeaderTabBar';
interface PageHeaderTabsProps extends React.ComponentProps<typeof BaseTabs> {
  children?: React.ReactNode;
  className?: string;
}

const PageHeaderTabs = React.forwardRef<HTMLDivElement, PageHeaderTabsProps>(
  function PageHeaderTabs(
    { className, children, ...other }: PageHeaderTabsProps,
    ref
  ) {
    return <BaseTabs {...other}>{children}</BaseTabs>;
  }
);
PageHeaderTabs.displayName = 'PageHeaderTabs';

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

const HeroImage = PageHeaderHeroImage;
HeroImage.displayName = 'PageHeaderHeroImage';

const TabBar = PageHeaderTabBar;
TabBar.displayName = 'PageHeaderTabBar';

const Tabs = PageHeaderTabs;
Tabs.displayName = 'PageHeader.Tabs';

export {
  // direct exports
  PageHeader,
  PageHeaderBreadcrumbBar,
  PageHeaderContent,
  PageHeaderHeroImage,
  PageHeaderTabBar,
  PageHeaderTabs,
  // namespaced
  Root,
  BreadcrumbBar,
  Content,
  HeroImage,
  TabBar,
  Tabs,
};
export type {
  PageHeaderProps,
  PageHeaderBreadcrumbBarProps,
  PageHeaderContentProps,
  PageHeaderHeroImageProps,
  PageHeaderTabBarProps,
  PageHeaderTabsProps,
};
