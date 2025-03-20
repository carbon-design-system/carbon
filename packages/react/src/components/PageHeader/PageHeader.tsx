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
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { Text } from '../Text';
import { DefinitionTooltip } from '../Tooltip';

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
export interface PageHeaderContentProps {
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
   * The PageHeaderContent's subTitle
   */
  subTitle?: string;
  /**
   * The PageHeaderContent's contextualActions
   */
  contextualActions?: React.ReactNode;
  /**
   * The PageHeaderContent's pageActions
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
    subTitle,
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

  const isEllipsisActive = (element: any) => {
    setIsEllipsisApplied(element.offsetHeight < element.scrollHeight);
    return element.offsetHeight < element.scrollHeight;
  };

  useLayoutEffect(() => {
    isEllipsisActive(titleRef.current);
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
      {subTitle && (
        <Text as="h3" className={`${prefix}--page-header__content__sub-title`}>
          {subTitle}
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
  // @ts-expect-error: PropTypes are not expressive enough to cover this case
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /**
   * The PageHeaderContent's title
   */
  title: PropTypes.string.isRequired,
  /**
   * The PageHeaderContent's subTitle
   */
  subTitle: PropTypes.string,
  /**
   * The PageHeaderContent's contextualActions
   */
  contextualActions: PropTypes.node,
  /**
   * The PageHeaderContent's pageActions
   */
  pageActions: PropTypes.node,
};

/**
 * ----------------
 * PageHeaderTabBar
 * ----------------
 */
interface PageHeaderTabBarProps {
  children?: React.ReactNode;
  className?: string;
}
const PageHeaderTabBar = React.forwardRef<
  HTMLDivElement,
  PageHeaderTabBarProps
>(function PageHeaderTabBar(
  { className, children, ...other }: PageHeaderTabBarProps,
  ref
) {
  const prefix = usePrefix();
  const classNames = classnames(
    {
      [`${prefix}--page-header__tab-bar`]: true,
    },
    className
  );
  return (
    <div className={classNames} ref={ref} {...other}>
      <p>page header tab bar</p>
      {children}
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

const TabBar = PageHeaderTabBar;
TabBar.displayName = 'PageHeaderTabBar';

export {
  // direct exports
  PageHeader,
  PageHeaderBreadcrumbBar,
  PageHeaderContent,
  PageHeaderTabBar,
  // namespaced
  Root,
  BreadcrumbBar,
  Content,
  TabBar,
};
export type {
  PageHeaderProps,
  PageHeaderBreadcrumbBarProps,
  PageHeaderContentProps,
  PageHeaderTabBarProps,
};
