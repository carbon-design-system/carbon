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
    tagsContainerRef as React.RefObject<HTMLDivElement>,
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
            {tags.length > 0 && renderTags()}
          </div>
        </Column>
      </Grid>
    </div>
  );
});
PageHeaderTabBar.displayName = 'PageHeaderTabBar';

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

export {
  // direct exports
  PageHeader,
  PageHeaderBreadcrumbBar,
  PageHeaderContent,
  PageHeaderContentPageActions,
  PageHeaderContentText,
  PageHeaderHeroImage,
  PageHeaderTabBar,
  // namespaced
  Root,
  BreadcrumbBar,
  Content,
  ContentPageActions,
  ContentText,
  HeroImage,
  TabBar,
};
export type {
  PageHeaderProps,
  PageHeaderBreadcrumbBarProps,
  PageHeaderContentProps,
  PageHeaderContentPageActionsProps,
  PageHeaderContentTextProps,
  PageHeaderHeroImageProps,
  PageHeaderTabBarProps,
};
