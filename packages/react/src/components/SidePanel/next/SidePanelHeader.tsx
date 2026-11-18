/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  cloneElement,
  forwardRef,
  isValidElement,
  useContext,
  useEffect,
} from 'react';
import type { ReactElement } from 'react';
import cx from 'classnames';
import { Close } from '@carbon/icons-react';
import { AILabel } from '../../AILabel';
import { IconButton } from '../../IconButton';
import { usePrefix } from '../../../internal/usePrefix';
import { SidePanelContext } from './context';
import type { SidePanelHeaderProps } from './SidePanel.types';

/**
 * ----------------
 * SidePanelHeader
 * ----------------
 *
 * Renders the decorator and close button, and syncs the header collapse
 * options to the root.
 */
const SidePanelHeader = forwardRef<HTMLDivElement, SidePanelHeaderProps>(
  (
    {
      children,
      className,
      closeIconDescription = 'Close',
      hideCloseButton = false,
      disableHeaderCollapse,
      onHeaderCollapse,
    },
    ref
  ) => {
    const prefix = usePrefix();
    const blockClass = `${prefix}--side-panel__next`;
    const parentContext = useContext(SidePanelContext);
    const {
      decorator,
      onRequestClose,
      fullyCollapsed,
      setDisableHeaderCollapse,
    } = parentContext;
    // An `AILabel` decorator is always size `xs`.
    const normalizedDecorator =
      isValidElement(decorator) && decorator.type === AILabel
        ? cloneElement(decorator as ReactElement<{ size?: string }>, {
            size: 'xs',
          })
        : decorator;

    useEffect(() => {
      setDisableHeaderCollapse?.(!!disableHeaderCollapse);
      return () => setDisableHeaderCollapse?.(false);
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
      <SidePanelContext.Provider value={enhancedContext}>
        <div
          ref={ref}
          className={cx(`${blockClass}__header`, className, {
            [`${blockClass}__header--with-close-icon`]: !hideCloseButton,
            [`${blockClass}__header-collapsed`]: fullyCollapsed,
            [`${blockClass}__header--static`]: disableHeaderCollapse,
          })}>
          {children}
          {(normalizedDecorator || !hideCloseButton) && (
            <div className={`${blockClass}__decorator-and-close`}>
              {normalizedDecorator}
              {!hideCloseButton && (
                <IconButton
                  className={`${blockClass}__close-button`}
                  kind="ghost"
                  label={closeIconDescription}
                  align="left"
                  size="md"
                  onClick={onRequestClose}>
                  <Close size={16} aria-hidden="true" />
                </IconButton>
              )}
            </div>
          )}
        </div>
      </SidePanelContext.Provider>
    );
  }
);
SidePanelHeader.displayName = 'SidePanelHeader';

export default SidePanelHeader;
