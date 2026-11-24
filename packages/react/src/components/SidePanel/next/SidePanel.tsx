/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  forwardRef,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ForwardedRef,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';
import cx from 'classnames';
import { durationModerate02 } from '@carbon/motion';
import { tabbable } from 'tabbable';
import { AILabel } from '../../AILabel';
import { Section } from '../../Heading';
import { getSpecificElement, useFocus } from '../../../internal/useFocus';
import { useId } from '../../../internal/useId';
import { useMergedRefs } from '../../../internal/useMergedRefs';
import { usePresence } from '../../../internal/usePresence';
import { usePrefersReducedMotion } from '../../../internal/usePrefersReducedMotion';
import { usePrefix } from '../../../internal/usePrefix';
import { warning } from '../../../internal/warning';
import { SIDE_PANEL_SIZES } from '../constants';
import { SidePanelContext } from './context';
import SidePanelHeader from './SidePanelHeader';
import SidePanelHeaderContent from './SidePanelHeaderContent';
import {
  SidePanelHeaderActionItem,
  SidePanelHeaderActions,
} from './SidePanelHeaderActions';
import SidePanelToolbar from './SidePanelToolbar';
import SidePanelNavBar from './SidePanelNavBar';
import SidePanelBody from './SidePanelBody';
import SidePanelFooter from './SidePanelFooter';
import type { SidePanelProps } from './SidePanel.types';

export type SidePanelComponentType = React.ForwardRefExoticComponent<
  SidePanelProps & React.RefAttributes<HTMLDivElement>
> & {
  Header: typeof SidePanelHeader;
  HeaderContent: typeof SidePanelHeaderContent;
  HeaderActions: typeof SidePanelHeaderActions;
  HeaderActionItem: typeof SidePanelHeaderActionItem;
  Toolbar: typeof SidePanelToolbar;
  NavBar: typeof SidePanelNavBar;
  Body: typeof SidePanelBody;
  Footer: typeof SidePanelFooter;
};

export const SidePanel = forwardRef<HTMLDivElement, SidePanelProps>(
  (
    {
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      children,
      className,
      decorator,
      includeOverlay = false,
      launcherButtonRef,
      onKeyDown,
      onRequestClose,
      onUnmount,
      open = false,
      placement = 'right',
      preventCloseOnClickOutside = false,
      // Not implemented yet; destructured so it is not spread onto the DOM.

      resizable,
      selectorPageContent,
      selectorPrimaryFocus,
      size = 'md',
      variant = 'slideOver',
      ...rest
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const prefix = usePrefix();
    const blockClass = `${prefix}--side-panel__next`;
    const localRef = useRef<HTMLDivElement>(null);
    const mergedRefs = useMergedRefs([ref, localRef]);
    const titleId = `${blockClass}__title-${useId()}`;
    const shouldReduceMotion = usePrefersReducedMotion();
    const { keyDownListener } = useFocus(localRef);
    const slideIn = variant === 'slideIn';
    const [fullyCollapsed, setFullyCollapsed] = useState(false);
    const [disableHeaderCollapse, setDisableHeaderCollapse] = useState(false);
    // Keeps the panel mounted while its exit animation runs. Animations are
    // named `${blockClass}--presence-*`.
    const { isPresent, isExiting } = usePresence(
      localRef,
      open,
      0,
      `${blockClass}--presence`
    );

    const isAILabel = isValidElement(decorator) && decorator.type === AILabel;

    // Move focus into the panel when it opens: `selectorPrimaryFocus`, then
    // the first tabbable element in the panel.
    useEffect(() => {
      const panel = localRef.current;
      if (!open || !isPresent || !panel) {
        return;
      }

      const primaryFocus = selectorPrimaryFocus
        ? getSpecificElement(panel, selectorPrimaryFocus)
        : null;
      if (primaryFocus) {
        primaryFocus.focus();
        return;
      }

      // `slideIn` does not take focus unless a primary focus is requested.
      if (slideIn) {
        return;
      }

      // Read the tabbable elements here, once the panel is in the DOM.
      tabbable(panel, { displayCheck: 'none' })[0]?.focus();
    }, [isPresent, open, selectorPrimaryFocus, slideIn]);

    // Push the page content aside for `slideIn`, and restore it on close.
    useEffect(() => {
      if (!open || !slideIn) {
        return;
      }

      const pageContent = selectorPageContent
        ? document.querySelector<HTMLElement>(selectorPageContent)
        : null;
      warning(
        !!pageContent,
        'SidePanel prop `selectorPageContent` must be a selector that matches an element on your page when `variant="slideIn"`, otherwise the page content is not pushed.'
      );
      if (!pageContent) {
        return;
      }

      const property =
        placement === 'right' ? 'margin-inline-end' : 'margin-inline-start';
      const previousTransition = pageContent.style.transition;
      const previousMargin = pageContent.style.getPropertyValue(property);
      const previousMarginPriority =
        pageContent.style.getPropertyPriority(property);
      pageContent.style.transition = shouldReduceMotion
        ? ''
        : `${property} ${durationModerate02}`;
      pageContent.style.setProperty(property, SIDE_PANEL_SIZES[size]);

      return () => {
        pageContent.style.transition = previousTransition;
        if (previousMargin) {
          pageContent.style.setProperty(
            property,
            previousMargin,
            previousMarginPriority
          );
        } else {
          pageContent.style.removeProperty(property);
        }
      };
    }, [
      open,
      placement,
      selectorPageContent,
      shouldReduceMotion,
      size,
      slideIn,
    ]);

    // The header restarts expanded when the panel reopens.
    useEffect(() => {
      if (!isPresent) {
        setFullyCollapsed(false);
      }
    }, [isPresent]);

    // Once the exit animation has finished and the panel is removed, return
    // focus to the launcher and notify.
    const wasPresent = useRef(isPresent);
    useEffect(() => {
      if (wasPresent.current && !isPresent) {
        launcherButtonRef?.current?.focus();
        onUnmount?.();
      }
      wasPresent.current = isPresent;
    }, [isPresent, launcherButtonRef, onUnmount]);

    if (!isPresent) {
      return null;
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);
      if (slideIn) {
        return;
      }
      if (event.key === 'Escape') {
        onRequestClose?.(event);
      }
      if (includeOverlay) {
        keyDownListener(event);
      }
    };

    const handleOverlayClick = (event: MouseEvent) => {
      if (!preventCloseOnClickOutside) {
        onRequestClose?.(event);
      }
    };

    const panelProps = {
      ...rest,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabel ? undefined : (ariaLabelledBy ?? titleId),
      className: cx(
        blockClass,
        `${blockClass}--${size}`,
        `${blockClass}--${placement}`,
        `${blockClass}--${variant}`,
        {
          [`${blockClass}--has-ai-label`]: isAILabel,
          [`${blockClass}--has-decorator`]: !!decorator && !isAILabel,
        },
        className
      ),
      'data-side-panel-exiting': isExiting ? true : undefined,
      onKeyDown: handleKeyDown,
      ref: mergedRefs,
    };

    return (
      <SidePanelContext.Provider
        value={{
          decorator,
          fullyCollapsed,
          setFullyCollapsed,
          disableHeaderCollapse,
          setDisableHeaderCollapse,
          onRequestClose,
          titleId,
        }}>
        {/* `slideIn` is a complementary landmark; `slideOver` is a dialog. */}
        {slideIn ? (
          <Section as="aside" {...panelProps}>
            {children}
          </Section>
        ) : (
          <Section
            role="dialog"
            aria-modal={includeOverlay ? true : undefined}
            {...panelProps}>
            {children}
          </Section>
        )}
        {!slideIn && includeOverlay && (
          <div
            role="presentation"
            className={cx(`${blockClass}__overlay`, {
              [`${blockClass}__overlay--closing`]: isExiting,
            })}
            onClick={handleOverlayClick}
          />
        )}
      </SidePanelContext.Provider>
    );
  }
) as SidePanelComponentType;

SidePanel.displayName = 'SidePanel';
SidePanel.Header = SidePanelHeader;
SidePanel.HeaderContent = SidePanelHeaderContent;
SidePanel.HeaderActions = SidePanelHeaderActions;
SidePanel.HeaderActionItem = SidePanelHeaderActionItem;
SidePanel.Toolbar = SidePanelToolbar;
SidePanel.NavBar = SidePanelNavBar;
SidePanel.Body = SidePanelBody;
SidePanel.Footer = SidePanelFooter;
