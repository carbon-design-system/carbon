/**
 * Copyright IBM Corp. 2025, 2026
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

import { TearsheetContext } from './context';
import { usePrefix } from '../../internal/usePrefix';
import { SidePanel } from '../SidePanel';
import { Layer } from '../Layer';
import { useCollapsible } from '../../internal/useCollapsible';
/**
 * ----------------
 * TearsheetBody
 * ----------------
 */

export interface TearsheetBodyProps {
  /** Optional static content for the body */
  children?: ReactNode;
  /** Optional class name applied to the body container */
  className?: string;
}

const TearsheetBody = forwardRef<HTMLDivElement, TearsheetBodyProps>(
  ({ children, className }, ref: ForwardedRef<HTMLDivElement>) => {
    const prefix = usePrefix();
    const blockClass = `${prefix}--tearsheet`;
    return (
      <div className={`${blockClass}__body ${className}`} ref={ref}>
        {children}
      </div>
    );
  }
);
TearsheetBody.displayName = 'TearsheetBody';
export interface MainContentProps {
  children: ReactNode;
  className?: string;
  /**
   * When `true`, the content takes full width with no padding.
   */
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
    const prefix = usePrefix();
    const blockClass = `${prefix}--tearsheet`;
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
        {...rest}>
        {children}
      </Layer>
    );
  }
);
MainContent.displayName = 'TearsheetMainContent';

/**
 * ----------------
 * SummaryContent
 * ----------------
 */
export interface SummaryContentProps {
  children: ReactNode;
  className?: string;
  /**
   * On mobile screens the summary panel is hidden by default. Toggle this prop
   * to open/close it.
   */
  summaryPanelOpen?: boolean;
  /**
   * Handler called when the summary panel close button is activated.
   */
  onSummaryPanelClose?(): void;
  /**
   * When `true`, the content takes full width with no padding.
   */
  isFlush?: boolean;
  /**
   * Optional ref to the trigger button that opened the panel. Focus returns
   * here when the panel closes.
   */
  summaryPanelTriggerRef?: React.RefObject<HTMLElement | null>;
  /**
   * Accessible label for the summary panel. Defaults to "Summary panel".
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
    const prefix = usePrefix();
    const blockClass = `${prefix}--tearsheet`;
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
        ref={ref}>
        <aside aria-label={summaryPanelAriaLabel}>{children}</aside>
      </div>
    ) : (
      <SidePanel
        size="sm"
        open={summaryPanelOpen}
        onRequestClose={onSummaryPanelClose}
        className={cx(`${blockClass}__side-panel`, className)}
        aria-label={summaryPanelAriaLabel}
        aria-modal="true">
        {children}
      </SidePanel>
    );
  }
);
SummaryContent.displayName = 'TearsheetSummaryContent';

/**
 * ----------------
 * Influencer
 * ----------------
 */
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
    const prefix = usePrefix();
    const blockClass = `${prefix}--tearsheet`;
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
        aria-label={influencerPanelAriaLabel}
        className={cx(`${blockClass}__influencer`, className, {
          [`${blockClass}__flush`]: isFlush,
        })}
        ref={ref}>
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
        aria-modal="true">
        {children}
      </SidePanel>
    );
  }
);
Influencer.displayName = 'TearsheetInfluencer';

export default TearsheetBody;
