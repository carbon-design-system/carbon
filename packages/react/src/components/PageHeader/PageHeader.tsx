/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import classnames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

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
}
const PageHeaderContent = React.forwardRef<
  HTMLDivElement,
  PageHeaderContentProps
>(function PageHeaderContent(
  { className, children, ...other }: PageHeaderContentProps,
  ref
) {
  const prefix = usePrefix();
  const classNames = classnames(
    {
      [`${prefix}--page-header__content`]: true,
    },
    className
  );
  return (
    <div className={classNames} ref={ref} {...other}>
      <p>page header content</p>
      {children}
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
      [`${prefix}--page-header__content`]: true,
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
