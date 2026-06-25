/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { type ComponentType, type FunctionComponent } from 'react';
import classnames from 'classnames';
import { Column, Grid } from '@carbon/react';
import { blockClass } from '../PageHeaderUtils';
import {
  PageHeaderContext,
  usePageHeader,
  type PageHeaderObserverState,
} from './context';

/**
 * -----------------------
 * PageHeaderBreadcrumbBar
 * -----------------------
 */
export interface PageHeaderBreadcrumbBarProps {
  /**
   * `true` by default to render BreadcrumbBar bottom border.
   */
  border?: boolean;
  children?: React.ReactNode;
  className?: string;
  /**
   * Provide an optional icon to render in front of the PageHeaderContent's title.
   */
  renderIcon?: ComponentType | FunctionComponent;
  /**
   * The PageHeaderBreadcrumbBar's content actions.
   * Can be a ReactNode or a function that receives observer state.
   */
  contentActions?:
    | React.ReactNode
    | ((state: PageHeaderObserverState) => React.ReactNode);
  /**
   * `true` to set content actions flush against page actions
   */
  contentActionsFlush?: boolean;
  /**
   * The PageHeaderContent's page actions.
   * Can be a ReactNode or a function that receives observer state.
   */
  pageActions?:
    | React.ReactNode
    | ((state: PageHeaderObserverState) => React.ReactNode);
  /**
   * `true` to set page actions flush with page
   */
  pageActionsFlush?: boolean;
  /**
   * Aria label for the page header actions navigation.
   */
  actionsAriaLabel?: string;
}

export const PageHeaderBreadcrumbBar = React.forwardRef<
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
    actionsAriaLabel = 'Page header actions',
    ...other
  }: PageHeaderBreadcrumbBarProps,
  ref
) {
  const context = usePageHeader();
  const { pageActionsInstance: globalActions, observerState } = context;
  const classNames = classnames(
    {
      [`${blockClass}__breadcrumb-bar`]: true,
      [`${blockClass}__breadcrumb-bar-border`]: border,
      [`${blockClass}__breadcrumb__actions-flush`]: pageActionsFlush,
    },
    className
  );

  const isFunctionalContentActions = typeof contentActions === 'function';

  const contentActionsClasses = classnames({
    [`${blockClass}__breadcrumb__content-actions`]: !contentActionsFlush,
    [`${blockClass}__breadcrumb__content-actions-with-global-actions`]:
      !!globalActions,
    [`${blockClass}__breadcrumb__content-actions-with-global-actions--show`]:
      observerState.contentActionsClipped || isFunctionalContentActions,
  });

  return (
    <PageHeaderContext.Provider
      value={{
        ...context,
        isContentActionsInBreadcrumbBar: true,
        isFunctionalContentActions,
      }}
    >
      <div className={classNames} ref={ref} {...other}>
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <div className={`${blockClass}__breadcrumb-container`}>
              <div className={`${blockClass}__breadcrumb-wrapper`}>
                {IconElement && (
                  <div className={`${blockClass}__breadcrumb__icon`}>
                    <IconElement />
                  </div>
                )}
                {children}
              </div>
              <div
                className={`${blockClass}__breadcrumb__actions`}
                role="navigation"
                aria-label={actionsAriaLabel}
              >
                <div className={contentActionsClasses}>
                  {typeof contentActions === 'function'
                    ? contentActions(observerState)
                    : contentActions}
                </div>
                {typeof pageActions === 'function'
                  ? pageActions(observerState)
                  : pageActions}
              </div>
            </div>
          </Column>
        </Grid>
      </div>
    </PageHeaderContext.Provider>
  );
});

PageHeaderBreadcrumbBar.displayName = 'PageHeaderBreadcrumbBar';
