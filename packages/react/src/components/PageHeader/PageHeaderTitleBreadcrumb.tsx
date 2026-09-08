/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { forwardRef } from 'react';
import classnames from 'classnames';
import { type BreadcrumbItemProps } from '../Breadcrumb/BreadcrumbItem';
import BreadcrumbItem from '../BreadcrumbItem';
import { usePageHeader } from './context';
import { usePrefix } from '../../internal/usePrefix';

export const PageHeaderTitleBreadcrumb = forwardRef<
  HTMLLIElement,
  BreadcrumbItemProps
>(({ className, children, ...other }, ref) => {
  const prefix = usePrefix();
  const { observerState, refs } = usePageHeader();
  const titleClipped = observerState.titleClipped;
  // Show title breadcrumb when:
  // 1. No content element exists (compact mode), OR
  // 2. Title is clipped and titleRef exists (with content element)
  const hasContentElement = refs?.contentRef?.current;
  const shouldShow = !hasContentElement || (titleClipped && !!refs?.titleRef);

  const isAriaHidden = hasContentElement && !titleClipped;

  return (
    <BreadcrumbItem
      ref={ref}
      isCurrentPage
      {...other}
      aria-hidden={isAriaHidden ? true : undefined}
      tabIndex={isAriaHidden ? -1 : undefined}
      className={classnames(
        className,
        `${prefix}--page-header-title-breadcrumb`,
        {
          [`${prefix}--page-header-title-breadcrumb-show`]: shouldShow,
          [`${prefix}--page-header-title-breadcrumb-show__with-content-element`]:
            hasContentElement,
          [`${prefix}--page-header-title-breadcrumb-show__without-content-element`]:
            !hasContentElement,
        }
      )}>
      {children}
    </BreadcrumbItem>
  );
});

PageHeaderTitleBreadcrumb.displayName = 'PageHeaderTitleBreadcrumb';
