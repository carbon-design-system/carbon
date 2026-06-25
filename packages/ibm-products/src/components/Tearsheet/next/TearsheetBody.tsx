/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, {
  ForwardedRef,
  forwardRef,
  ReactNode,
  useContext,
  useRef,
  useState,
  useEffect,
} from 'react';
import cx from 'classnames';

import { blockClass, TearsheetContext } from './context';
import { SidePanel } from '../../SidePanel';
import { Layer } from '@carbon/react';
import { useCollapsible } from '../../../global/js/hooks/useCollapsible';
/**
 * ----------------
 * TearsheetBody
 * ----------------
 */

export interface TearsheetBodyProps {
  /**
   * Optional static content for body
   */
  children?: ReactNode;
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;
  /**
   *You can provide content either through a callback (contentRenderer) or as static children—but not both.
   * If both are provided, contentRenderer always takes precedence. This optional callback should return the content
   * to be rendered in the body section, which can be either a single element or an array of elements based on your needs.
   * If internal state access isn’t required, you can simply use static children instead
   */
}

const TearsheetBody = forwardRef<HTMLDivElement, TearsheetBodyProps>(
  ({ children, className }, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div className={`${blockClass}__body ${className}`} ref={ref}>
        {children}
      </div>
    );
  }
);

export interface MainContentProps {
  children: ReactNode;
  className?: string;
  /** this can be set take full width without any padding */
  isFlush?: boolean;
}
/**
 * ----------------
 * MainContent
 * ----------------
 */
export const MainContent = forwardRef<HTMLDivElement, MainContentProps>(
  (
    { children, className, isFlush, ...rest },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const localRef = useRef<HTMLDivElement>(null);
    const mainContentRef = ref || localRef;
    const [container, setContainer] = useState<HTMLDivElement | null>(null);

    const { setFullyCollapsed, disableHeaderCollapse } =
      useContext(TearsheetContext);

    // Update container state when ref is attached
    useEffect(() => {
      const element =
        typeof mainContentRef === 'function'
          ? null
          : (mainContentRef?.current ?? null);
      setContainer(element);
    }, [mainContentRef]);

    const collapseHeader = (collapse: boolean) => {
      if (container) {
        if (collapse) {
          const canScroll = container.scrollHeight > container.clientHeight; // collapse header only when there is scroll

          if (canScroll) {
            setFullyCollapsed?.(true);
          }
        } else if (container.scrollTop === 0) {
          // expand header when scroll reaches top
          setFullyCollapsed?.(false);
        }
      }
    };

    useCollapsible({
      container,
      triggerCollapse: collapseHeader,
      disableHeaderCollapse,
    });

    return (
      <Layer
        withBackground
        className={cx(`${blockClass}__main-content`, className, {
          [`${blockClass}__flush`]: isFlush,
        })}
        ref={mainContentRef}
        {...rest}
      >
        {children}
      </Layer>
    );
  }
);

/**
 * ----------------
 * SummaryContent
 * ----------------
 */
export interface SummaryContentProps {
  children: ReactNode;
  className?: string;
  /**
   * In mobile screens right side details section wont be visible by default. This prop can be toggled to open/close right panel in this case.
   */
  summaryPanelOpen?: boolean;
  /**
   * Specify a handler for closing the side panel.
   * This handler closes the modal, e.g. changing `open` prop.
   */
  onSummaryPanelClose?(): void;
  /** this can be set take full width without any padding */
  isFlush?: boolean;
  /**
   * Optional ref to the trigger button that opened the panel. Focus will return here when panel closes.
   */
  summaryPanelTriggerRef?: React.RefObject<HTMLElement>;
  /**
   * Optional aria-label for the summary panel. Defaults to "Summary panel".
   */
  summaryPanelAriaLabel?: string;
}
export const SummaryContent = forwardRef<HTMLDivElement, SummaryContentProps>(
  (
    {
      children,
      className,
      summaryPanelOpen = false,
      onSummaryPanelClose,
      isFlush,
      summaryPanelTriggerRef,
      summaryPanelAriaLabel = 'Summary panel',
    },
    ref
  ) => {
    const { isSm } = useContext(TearsheetContext);
    const prevOpenRef = useRef(summaryPanelOpen);

    // Return focus to trigger button when panel closes
    useEffect(() => {
      if (
        prevOpenRef.current &&
        !summaryPanelOpen &&
        summaryPanelTriggerRef?.current
      ) {
        setTimeout(() => {
          summaryPanelTriggerRef.current?.focus();
        }, 100);
      }
      prevOpenRef.current = summaryPanelOpen;
    }, [summaryPanelOpen, summaryPanelTriggerRef]);

    return !isSm ? (
      <div
        className={cx(`${blockClass}__summary-content`, className, {
          [`${blockClass}__flush`]: isFlush,
        })}
        ref={ref}
      >
        <aside>{children}</aside>
      </div>
    ) : (
      <SidePanel
        size="sm"
        open={summaryPanelOpen}
        onRequestClose={onSummaryPanelClose}
        className={cx(`${blockClass}__side-panel`, className)}
        aria-label={summaryPanelAriaLabel}
        aria-modal="true"
      >
        {children}
      </SidePanel>
    );
  }
);

export interface InfluencerProps {
  children: ReactNode;
  className?: string;
  /**
   * In mobile screens right side details section wont be visible by default. This prop can be toggled to open/close right panel in this case.
   */
  influencerPanelOpen?: boolean;
  /**
   * Specify a handler for closing the side panel.
   * This handler closes the modal, e.g. changing `open` prop.
   */
  onInfluencerPanelClose?(): void;
  /** this can be set take full width without any padding */
  isFlush?: boolean;
  /**
   * Optional ref to the trigger button that opened the panel. Focus will return here when panel closes.
   */
  influencerPanelTriggerRef?: React.RefObject<HTMLElement>;
  /**
   * Optional aria-label for the influencer panel. Defaults to "Influencer panel".
   */
  influencerPanelAriaLabel?: string;
}
export const Influencer = forwardRef<HTMLDivElement, InfluencerProps>(
  (
    {
      children,
      className,
      influencerPanelOpen = false,
      onInfluencerPanelClose,
      isFlush,
      influencerPanelTriggerRef,
      influencerPanelAriaLabel = 'Influencer panel',
    },
    ref
  ) => {
    const { isSm } = useContext(TearsheetContext);
    const prevOpenRef = useRef(influencerPanelOpen);

    // Return focus to trigger button when panel closes
    useEffect(() => {
      if (
        prevOpenRef.current &&
        !influencerPanelOpen &&
        influencerPanelTriggerRef?.current
      ) {
        setTimeout(() => {
          influencerPanelTriggerRef.current?.focus();
        }, 100);
      }
      prevOpenRef.current = influencerPanelOpen;
    }, [influencerPanelOpen, influencerPanelTriggerRef]);

    return !isSm ? (
      <aside
        className={cx(`${blockClass}__influencer`, className, {
          [`${blockClass}__flush`]: isFlush,
        })}
        ref={ref}
      >
        {children}
      </aside>
    ) : (
      <SidePanel
        size="sm"
        open={influencerPanelOpen}
        onRequestClose={onInfluencerPanelClose}
        placement="left"
        className={cx(`${blockClass}__side-panel`, className)}
        aria-label={influencerPanelAriaLabel}
        aria-modal="true"
      >
        {children}
      </SidePanel>
    );
  }
);

export default TearsheetBody;
