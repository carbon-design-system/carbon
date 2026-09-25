/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { IconButton, type IconButtonProps } from '../IconButton';
import { ModalHeader } from '../ComposedModal';
import React, {
  ReactNode,
  RefObject,
  useContext,
  useEffect,
  useRef,
} from 'react';
import cx from 'classnames';
import { TearsheetContext } from './context';
import { usePrefix } from '../../internal/usePrefix';
import classNames from 'classnames';
import { ChevronUp } from '@carbon/icons-react';

/**
 * ----------------
 * TearsheetHeader
 * ----------------
 */

export interface TearsheetHeaderProps {
  /**
   * Optional content rendered inside the header section, after titles and
   * before any progress indicator.
   */
  children?: React.ReactNode;

  /**
   * The accessibility label for the close icon (required when the close button
   * is visible).
   */
  closeIconDescription?: string;

  /**
   * Override whether the close button is shown. When omitted, a close button
   * is shown for passive tearsheets (no navigation actions) and hidden for
   * transactional ones.
   */
  hideCloseButton?: boolean;

  className?: string;

  /**
   * Set to `true` to disable the default header collapse/expand behavior
   * that is triggered by scrolling the main content.
   */
  disableHeaderCollapse?: boolean;

  /**
   * Callback fired whenever the header's fully-collapsed state changes.
   * Receives `true` when the header is fully collapsed, `false` when expanded.
   */
  onHeaderCollapse?: (collapsed: boolean) => void;
}

const TearsheetHeader = React.forwardRef<HTMLDivElement, TearsheetHeaderProps>(
  (props, ref) => {
    const {
      children,
      closeIconDescription,
      hideCloseButton = false,
      className,
      disableHeaderCollapse,
      onHeaderCollapse,
      ...rest
    } = props;
    const prefix = usePrefix();
    const blockClass = `${prefix}--tearsheet`;
    const parentContext = useContext(TearsheetContext);
    const { fullyCollapsed, setDisableHeaderCollapse } = parentContext;
    const localRef = useRef(undefined);
    const headerRef = (ref || localRef) as RefObject<HTMLDivElement>;

    useEffect(() => {
      setDisableHeaderCollapse?.(!!disableHeaderCollapse);
    }, [disableHeaderCollapse, setDisableHeaderCollapse]);

    useEffect(() => {
      onHeaderCollapse?.(!!fullyCollapsed);
    }, [fullyCollapsed, onHeaderCollapse]);

    // Create enhanced context with close button props and onHeaderCollapse callback
    const enhancedContext = {
      ...parentContext,
      closeIconDescription,
      hideCloseButton,
      onHeaderCollapse,
    };

    return (
      <TearsheetContext.Provider value={enhancedContext}>
        <ModalHeader
          ref={headerRef}
          className={cx(`${blockClass}__header`, {
            [`${className}`]: !!className,
            [`${blockClass}__header--with-close-icon`]: !hideCloseButton,
            [`${blockClass}__header-collapsed`]: fullyCollapsed,
          })}
          closeClassName={`${blockClass}__header--no-close-icon`}
          {...rest}>
          {children}
        </ModalHeader>
      </TearsheetContext.Provider>
    );
  }
);
TearsheetHeader.displayName = 'TearsheetHeader';

export default TearsheetHeader;

/**
 * ----------------
 * TearsheetNavigationBar
 * ----------------
 */

export interface TearsheetNavigationBarProps {
  children: ReactNode;
  scroller?: React.ReactNode;
  className?: string;
}
export const TearsheetNavigationBar = React.forwardRef<
  HTMLDivElement,
  TearsheetNavigationBarProps
>((props, ref) => {
  const prefix = usePrefix();
  const blockClass = `${prefix}--tearsheet`;
  const { children, scroller, className = '', ...rest } = props;
  return (
    <div
      className={`${blockClass}__navigation-bar ${className}`}
      ref={ref}
      {...rest}>
      {children}
      {scroller}
    </div>
  );
});
TearsheetNavigationBar.displayName = 'TearsheetNavigationBar';

/**
 * ----------------
 * TearsheetScrollButton
 * ----------------
 */

export interface TearsheetScrollButtonProps
  extends Omit<IconButtonProps, 'label' | 'children'> {
  collapseText?: string;
  expandText?: string;
  className?: string;
}

export const TearsheetScrollButton = React.forwardRef<
  HTMLDivElement,
  TearsheetScrollButtonProps
>(function PageHeaderExpander(
  {
    className = '',

    onClick,
    collapseText = 'Collapse',
    expandText = 'Expand',
    ...other
  }: TearsheetScrollButtonProps,
  ref
) {
  const prefix = usePrefix();
  const blockClass = `${prefix}--tearsheet`;
  const { fullyCollapsed, setFullyCollapsed } =
    React.useContext(TearsheetContext);

  const handleScroller = (isFullyCollapsed: boolean) => {
    setFullyCollapsed?.(!isFullyCollapsed);
  };

  return (
    <span className={`${blockClass}__scroller-container  ${className}`}>
      <IconButton
        ref={ref}
        size="md"
        kind="ghost"
        autoAlign
        {...other}
        label={fullyCollapsed ? expandText : collapseText}
        onClick={(event) => {
          onClick?.(event);
          handleScroller(!!fullyCollapsed);
        }}
        className={classNames(className, `${blockClass}__scroller-button`)}
        aria-label={
          fullyCollapsed ? `${expandText} header` : `${collapseText} header`
        }
        aria-expanded={!fullyCollapsed}>
        <ChevronUp
          className={classNames(`${blockClass}__scroller-button-icon`, {
            [`${blockClass}__scroller-button-icon-collapsed`]: fullyCollapsed,
          })}
        />
      </IconButton>
    </span>
  );
});
