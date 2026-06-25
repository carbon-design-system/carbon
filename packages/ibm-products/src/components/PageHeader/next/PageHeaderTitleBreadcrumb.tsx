/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { forwardRef } from 'react';
import classnames from 'classnames';
import { BreadcrumbItemProps, BreadcrumbItem } from '@carbon/react';
import { usePageHeader } from './context';
import { pkg } from '../../../settings';

export const PageHeaderTitleBreadcrumb = forwardRef<
  HTMLLIElement,
  BreadcrumbItemProps
>(({ className, children, ...other }, ref) => {
  const { observerState, refs } = usePageHeader();
  const titleClipped = observerState.titleClipped;
  // Show title breadcrumb when:
  // 1. No content element exists (compact mode), OR
  // 2. Title is clipped and titleRef exists (with content element)
  const hasContentElement = refs?.contentRef?.current;
  const shouldShow = !hasContentElement || (titleClipped && !!refs?.titleRef);

  return (
    <BreadcrumbItem
      ref={ref}
      isCurrentPage
      {...other}
      aria-hidden={hasContentElement && !titleClipped ? true : undefined}
      className={classnames(
        className,
        `${pkg.prefix}--page-header-title-breadcrumb`,
        {
          [`${pkg.prefix}--page-header-title-breadcrumb-show`]: shouldShow,
          [`${pkg.prefix}--page-header-title-breadcrumb-show__with-content-element`]:
            hasContentElement,
          [`${pkg.prefix}--page-header-title-breadcrumb-show__without-content-element`]:
            !hasContentElement,
        }
      )}
    >
      {children}
    </BreadcrumbItem>
  );
});

PageHeaderTitleBreadcrumb.displayName = 'PageHeaderTitleBreadcrumb';
