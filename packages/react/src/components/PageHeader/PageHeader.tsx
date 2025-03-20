/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { ComponentType, useLayoutEffect, useState, useRef } from 'react';
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
interface PageHeaderContentProps {
  children?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  title: string;
  subTitle?: string;
  contextualActions?: React.ReactNode;
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
    icon,
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
            {icon && (
              <div className={`${prefix}--page-header__content__icon`}>
                {icon}
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
