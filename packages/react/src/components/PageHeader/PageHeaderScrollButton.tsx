/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import classnames from 'classnames';
import { IconButton, type IconButtonProps } from '../IconButton';
import { ChevronUp } from '@carbon/icons-react';
import { usePageHeader } from './context';
import { scrollableAncestor } from './utils';
import { usePrefix } from '../../internal/usePrefix';

export interface PageHeaderScrollButtonProps extends IconButtonProps {
  collapseText?: string;
  expandText?: string;
}

export const PageHeaderScrollButton = React.forwardRef<
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
  const prefix = usePrefix();
  const { refs, observerState } = usePageHeader();
  const fullyCollapsed = observerState.fullyCollapsed;

  const handleScroller = (isFullyCollapsed: boolean) => {
    if (!refs?.contentRef?.current) {
      return;
    }
    const scrollableTarget = scrollableAncestor(
      refs?.contentRef.current
    ) as HTMLElement;

    // Page header content is not fully collapsed
    if (!isFullyCollapsed) {
      const pageHeaderContentHeight = refs?.contentRef.current.offsetHeight;
      scrollableTarget?.scrollTo({
        top: pageHeaderContentHeight, // headerTopValue, check if breadcrumb bar is included
        behavior: 'smooth',
      });
    } else {
      // Page header content is fully collapsed
      scrollableTarget?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <IconButton
      ref={ref}
      label={fullyCollapsed ? expandText : collapseText}
      size="md"
      kind="ghost"
      {...other}
      onClick={(event) => {
        onClick?.(event);
        handleScroller(!!fullyCollapsed);
      }}
      className={classnames(
        className,
        `${prefix}--page-header--scroller-button`
      )}>
      <ChevronUp
        className={classnames(`${prefix}--page-header--scroller-button-icon`, {
          [`${prefix}--page-header--scroller-button-icon-collapsed`]:
            fullyCollapsed,
        })}
      />
    </IconButton>
  );
});

PageHeaderScrollButton.displayName = 'PageHeaderScrollButton';
