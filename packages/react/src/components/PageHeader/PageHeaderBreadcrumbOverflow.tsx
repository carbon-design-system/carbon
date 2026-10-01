/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useRef, forwardRef, RefObject } from 'react';
import classnames from 'classnames';
import { type BreadcrumbItemProps } from '../Breadcrumb/BreadcrumbItem';
import { type BreadcrumbProps } from '../Breadcrumb/Breadcrumb';
import Breadcrumb from '../Breadcrumb';
import { usePrefix } from '../../internal/usePrefix';
import { createOverflowHandler as localOverflowHandler } from './overflowHandler';
export interface PageHeaderBreadcrumbOverflowProps extends BreadcrumbProps {
  renderOverflowBreadcrumb?: (
    hiddenBreadcrumbs: HTMLElement[]
  ) => React.ReactElement<BreadcrumbItemProps>;
}

// This component is a wrapper for the Breadcrumb, and renders breadcrumb items as children
// including the overflow breadcrumb item. The overflowHandler determines what elements
// are visible and hidden and passes the hidden elements back to the render prop used
// to display the overflow breadcrumb
export const PageHeaderBreadcrumbOverflow = forwardRef<
  HTMLElement,
  PageHeaderBreadcrumbOverflowProps
>(({ renderOverflowBreadcrumb, className, children, ...other }, ref) => {
  const [hiddenBreadcrumbs, setHiddenBreadcrumbs] = React.useState<
    HTMLElement[]
  >([]);
  const fallbackRef = useRef<HTMLElement | null>(null);
  const componentRef = (ref ?? fallbackRef) as RefObject<HTMLElement>;

  // Initialize overflow resize handler
  const carbonPrefix = usePrefix();
  useEffect(() => {
    if (!componentRef?.current) {
      return;
    }
    const breadcrumbList = componentRef.current.querySelector(
      `.${carbonPrefix}--breadcrumb`
    ) as HTMLOListElement;
    localOverflowHandler({
      container: breadcrumbList,
      onChange: (_, hidden) => {
        setHiddenBreadcrumbs(hidden);
      },
    });
    // Don't want ref or carbon prefix in dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderChildren = () => {
    // Only BreadcrumbItems and TitleBreadcrumbs are valid children
    // Use displayName for type check to avoid module-identity mismatches
    // between @carbon/react lib exports and src imports.
    const filteredBreadcrumbs = React.Children.toArray(children).filter(
      (child) => {
        if (React.isValidElement(child)) {
          const displayName =
            (child.type as { displayName?: string })?.displayName ?? '';
          return (
            displayName === 'BreadcrumbItem' ||
            displayName === 'PageHeaderTitleBreadcrumb'
          );
        }
      }
    );
    // We need to clone the renderProp for the overflow breadcrumb item
    // to place it before the title breadcrumb according to the design
    if (filteredBreadcrumbs) {
      const overflowBreadcrumb = renderOverflowBreadcrumb?.(hiddenBreadcrumbs);
      interface overflowBreadcrumbItemProps extends BreadcrumbItemProps {
        'data-fixed'?: boolean;
      }
      // If no overflow breadcrumb provided, return here with the rest of the children
      if (!overflowBreadcrumb) {
        return children;
      }
      const clonedTitleBreadcrumb = React.cloneElement(
        overflowBreadcrumb as React.ReactElement<overflowBreadcrumbItemProps>,
        {
          key: 'cloned overflow breadcrumb item',
          'data-fixed': true,
          className: classnames(
            `${carbonPrefix}--page-header-breadcrumb-overflow-item`,
            {
              [`${carbonPrefix}--page-header-overflow-breadcrumb-item-with-items`]:
                hiddenBreadcrumbs.length,
            }
          ),
        }
      );
      const clonedChildren = [...filteredBreadcrumbs];
      clonedChildren.splice(
        filteredBreadcrumbs.length - 1,
        0,
        clonedTitleBreadcrumb
      ); // second to last position
      return clonedChildren;
    }
    return children;
  };

  return (
    <Breadcrumb
      className={classnames(
        className,
        `${carbonPrefix}--page-header-breadcrumb-overflow`
      )}
      ref={componentRef}
      {...other}>
      {renderChildren()}
    </Breadcrumb>
  );
});

PageHeaderBreadcrumbOverflow.displayName = 'PageHeaderBreadcrumbOverflow';
