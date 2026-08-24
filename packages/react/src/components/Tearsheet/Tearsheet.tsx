/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, {
  useState,
  useRef,
  RefObject,
  forwardRef,
  ReactNode,
  ForwardedRef,
  FC,
  useEffect,
} from 'react';
import useIsomorphicEffect from '../../internal/useIsomorphicEffect';
import { createPortal } from 'react-dom';
import cx from 'classnames';
import ComposedModal, {
  type ComposedModalProps,
  ModalBody,
} from '../ComposedModal';
import { FeatureFlags } from '../FeatureFlags';
import { usePrefix } from '../../internal/usePrefix';
import { TearsheetContext } from './context';
import TearsheetHeader, {
  type TearsheetHeaderProps,
  TearsheetNavigationBar,
  type TearsheetNavigationBarProps,
  TearsheetScrollButton,
  type TearsheetScrollButtonProps,
} from './TearsheetHeader';
import TearsheetHeaderContent, {
  type TearsheetHeaderContentProps,
} from './TearsheetHeaderContent';
import TearsheetBody, {
  Influencer,
  type InfluencerProps,
  MainContent,
  type MainContentProps,
  SummaryContent,
  type SummaryContentProps,
  type TearsheetBodyProps,
} from './TearsheetBody';

import {
  TearsheetHeaderActionItem,
  type TearsheetHeaderActionItemProps,
  TearsheetHeaderActions,
  type TearsheetHeaderActionsProps,
} from './TearsheetHeaderActions';
import TearsheetFooter, { type TearsheetFooterProps } from './TearsheetFooter';
import { breakpoints } from '@carbon/layout';
import { useStackContext } from './StackContext';
import { useMatchMedia } from '../../internal/useMatchMedia';
import { useId } from '../../internal/useId';
import { usePresence } from '../../internal/usePresence';
import { useMergedRefs } from '../../internal/useMergedRefs';

/**
 * ----------
 * Tearsheet
 * ----------
 */

export interface TearsheetProps extends ComposedModalProps {
  children?: React.ReactNode;

  /**
   * Whether the tearsheet is currently open.
   */
  open?: boolean;

  /**
   * Optional class names added to the modal wrapper.
   */
  className?: string;

  /**
   * Optional class names added to the modal container (not the wrapper).
   */
  containerClassName?: string;

  /**
   * Gap from the top of the viewport. Defaults to `88px`.
   */
  verticalGap?: string;

  /**
   * Override the default influencer width (`256px`). Accepts any valid CSS
   * length, e.g. `"300px"` or `"20rem"`.
   */
  influencerWidth?: string;

  /**
   * Override the default summary content width (`256px`).
   */
  summaryContentWidth?: string;

  /**
   * Tearsheet variant. Defaults to `"wide"`.
   */
  variant?: 'wide' | 'narrow';

  /**
   * Optional decorator component (e.g. `AILabel`).
   */
  decorator?: ReactNode;

  /**
   * CSS selectors that match floating menus inside the tearsheet.
   *
   * See https://react.carbondesignsystem.com/?path=/docs/components-composedmodal--overview#focus-management
   */
  selectorsFloatingMenus?: string[];

  /**
   * Accessible label for the tearsheet dialog.
   */
  ariaLabel?: string;

  /**
   * Called when the user dismisses the tearsheet. Return `false` to prevent
   * the tearsheet from closing.
   */
  onClose?: () => void;

  /**
   * CSS selector for the element that should receive focus when the tearsheet
   * opens.
   */
  selectorPrimaryFocus?: string;

  /**
   * DOM element to portal the tearsheet into. Defaults to `document.body`.
   */
  portalTarget?: HTMLElement;

  /**
   * Disable the portal and render the tearsheet inline. Useful for tests and
   * contexts where you need to inherit React context from parent components.
   *
   * @default false
   */
  disablePortal?: boolean;

  /**
   * When `true`, the tearsheet stays mounted in the DOM when closed and is
   * hidden via CSS only. Use this to preserve component state or avoid
   * remounting overhead.
   *
   * @default false
   */
  keepMounted?: boolean;
}

export type TearsheetComponentType = React.ForwardRefExoticComponent<
  TearsheetProps & React.RefAttributes<HTMLDivElement>
> & {
  Header: FC<TearsheetHeaderProps>;
  HeaderContent: FC<TearsheetHeaderContentProps>;
  Influencer: FC<InfluencerProps>;
  NavigationBar: FC<TearsheetNavigationBarProps>;
  ScrollButton: FC<TearsheetScrollButtonProps>;
  HeaderActions: FC<TearsheetHeaderActionsProps>;
  HeaderActionItem: FC<TearsheetHeaderActionItemProps>;
  MainContent: FC<MainContentProps>;
  SummaryContent: FC<SummaryContentProps>;
  Body: FC<TearsheetBodyProps>;
  Footer: FC<TearsheetFooterProps>;
};

/**
 * Internal component that handles the actual tearsheet rendering.
 * This component is always "present" when mounted - the wrapper handles presence logic.
 */
const TearsheetInternal: React.ForwardRefExoticComponent<
  TearsheetProps & {
    isExiting?: boolean;
    presenceRef?: RefObject<HTMLDivElement | null>;
  } & React.RefAttributes<HTMLDivElement>
> = forwardRef<
  HTMLDivElement,
  TearsheetProps & {
    isExiting?: boolean;
    presenceRef?: RefObject<HTMLDivElement | null>;
  }
>(
  (
    {
      children,
      variant = 'wide',
      selectorsFloatingMenus = [],
      className,
      influencerWidth,
      summaryContentWidth,
      ariaLabel,
      onClose,
      selectorPrimaryFocus,
      open = false,
      portalTarget,
      disablePortal = false,
      verticalGap,
      containerClassName,
      keepMounted = false,
      isExiting = false,
      presenceRef,
      decorator,
      launcherButtonRef,
      ...rest
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const carbonPrefix = usePrefix();
    const blockClass = `${carbonPrefix}--tearsheet`;
    const localRef = useRef<HTMLDivElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);
    const mergedRefs = useMergedRefs([ref, localRef, presenceRef]);
    const smMediaQuery = `(max-width: ${breakpoints.md.width})`;
    const isSm = useMatchMedia(smMediaQuery) || variant === 'narrow';
    const [fullyCollapsed, setFullyCollapsed] = useState(false);
    const [disableHeaderCollapse, setDisableHeaderCollapse] = useState(false);

    const arr = React.Children.toArray(children);
    const header = arr.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (child: any) => child.type === TearsheetHeader
    );
    const influencer = arr.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (child: any) => child.type === Influencer
    );
    const body = arr.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (child: any) => child.type === TearsheetBody
    );
    const footer = arr.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (child: any) => child.type === TearsheetFooter
    );

    const uniqueId = useRef(useId());
    const titleId = useRef(`${blockClass}__title-${uniqueId.current}`);
    const { notifyStack, stack, getDepth, getScaleFactor, getBlockSizeChange } =
      useStackContext();

    const [depth, setDepth] = useState(0);

    // Initialize mountNode eagerly so the tearsheet renders directly into the
    // portal on its first paint.  Deferring this to an effect caused the
    // component to first render inline (mountNode === null), then immediately
    // remount inside the portal once the effect ran — two mounts = two
    // entrance animations.  The lazy initializer is SSR-safe: useState
    // initializers only run in the browser, and typeof document is guarded.
    const [mountNode, setMountNode] = useState<HTMLElement | null>(() => {
      if (disablePortal || typeof document === 'undefined') {
        return null;
      }
      return portalTarget ?? document.body;
    });

    // Keep mountNode in sync when portalTarget or disablePortal changes at runtime.
    useIsomorphicEffect(() => {
      setMountNode(disablePortal ? null : (portalTarget ?? document.body));
    }, [portalTarget, disablePortal]);

    // Set CSS custom properties driven by props
    useIsomorphicEffect(() => {
      const AILabelWidth =
        localRef.current?.querySelector(`.${carbonPrefix}--ai-label`)
          ?.clientWidth ?? 0;
      const headerActionMarginRight = AILabelWidth + 24 + (isSm ? 8 : 0); // 24 is to compensate for close button
      document.documentElement.style.setProperty(
        '--tearsheet-header-action-offset',
        `${headerActionMarginRight}px`
      );

      if (influencerWidth) {
        document.documentElement.style.setProperty(
          '--tearsheet-influencer-width',
          `${influencerWidth}`
        );
      }
      if (summaryContentWidth) {
        document.documentElement.style.setProperty(
          '--tearsheet-summary-content-width',
          `${summaryContentWidth}`
        );
      }
      if (verticalGap) {
        document.documentElement.style.setProperty(
          '--tearsheet-vertical-gap',
          `${verticalGap}`
        );
      }

       
    }, [
      isSm,
      decorator,
      influencerWidth,
      summaryContentWidth,
      verticalGap,
      fullyCollapsed,
    ]);

    // Notify the stack context when this tearsheet opens / unmounts
    useIsomorphicEffect(() => {
      const id = uniqueId.current;
      if (localRef.current && open) {
        notifyStack?.(id, true, localRef.current);
      }

      // Cleanup when component unmounts
      return () => {
        notifyStack?.(id, false, null);
      };
       
    }, [localRef.current, open]);

    // Apply stacking CSS variables whenever the stack changes
    useEffect(() => {
      if (stack?.length > 0 && localRef.current) {
        const stackDepth = getDepth?.(uniqueId.current),
          blockSizeChange = getBlockSizeChange?.(uniqueId.current),
          scaleFactor = getScaleFactor?.(uniqueId.current);

        setDepth(stackDepth as number);

        localRef.current.style.setProperty('--stack-depth', stackDepth + '');
        localRef.current.style.setProperty(
          '--block-size-change',
          blockSizeChange
        );
        localRef.current.style.setProperty('--scale-factor', scaleFactor + '');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stack]);

    // Return focus to launcher button when tearsheet closes
    useEffect(() => {
      if (!open && launcherButtonRef?.current) {
        // Use a small delay to ensure the tearsheet has fully closed
        const timeoutId = setTimeout(() => {
          const refCurrent = launcherButtonRef.current;

          if (refCurrent instanceof HTMLElement) {
            // Check if the button is inside a TearsheetHeaderActions component
            const headerActionItem = refCurrent.closest(
              `.${blockClass}__header-action-item`
            );

            if (headerActionItem) {
              // This is a button inside TearsheetHeaderActions
              // Check if it's currently visible or if items are collapsed to menu
              const headerActionsContainer = headerActionItem.closest(
                `.${blockClass}__content__header-actions`
              );
              const menuButton = headerActionsContainer?.querySelector(
                `.${blockClass}__header-actions-menuButton:not(.${blockClass}__header-actions-menuButton--hidden) button`
              );

              if (menuButton instanceof HTMLElement) {
                // On small screens, action buttons collapse to menu - focus the menu button
                menuButton.focus();
              } else {
                // On large screens, focus the action button directly
                refCurrent.focus();
              }
            } else {
              // Regular button ref (not inside TearsheetHeaderActions): focus directly
              refCurrent.focus();
            }
          }
        }, 100);

        return () => clearTimeout(timeoutId);
      }
    }, [blockClass, open, launcherButtonRef]);

    const content = (
      <TearsheetContext.Provider
        value={{
          fullyCollapsed,
          setFullyCollapsed,
          onClose,
          disableHeaderCollapse,
          setDisableHeaderCollapse,
          variant,
          isSm,
          decorator,
          titleId: titleId.current,
        }}>
        <FeatureFlags enable-focus-wrap-without-sentinels>
          <ComposedModal
            {...rest}
            aria-label={ariaLabel}
            aria-labelledby={!ariaLabel ? titleId.current : undefined}
            className={cx(blockClass, className, {
              [`${blockClass}--wide`]: variant === 'wide',
              [`${blockClass}--narrow`]: variant === 'narrow',
              [`${blockClass}--stacked`]: depth > 0,
              [`${blockClass}--stack-activated`]: stack.length > 1,
              [`${blockClass}--has-ai-label`]:
                !!decorator &&
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (decorator as any)['type']?.displayName === 'AILabel',
              [`${blockClass}--has-decorator`]:
                !!decorator &&
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (decorator as any)['type']?.displayName !== 'AILabel',
              ['is-visible']: keepMounted ? open : true, // When keepMounted, use open prop; otherwise always visible
              [`${blockClass}--keep-mounted`]: keepMounted,
            })}
            containerClassName={cx(
              `${blockClass}__container`,
              containerClassName
            )}
            {...{
              onClose,
              open: keepMounted ? open : true, // When keepMounted, use actual open; otherwise always open
              selectorPrimaryFocus,
            }}
            ref={mergedRefs}
            selectorsFloatingMenus={[
              `.${carbonPrefix}--overflow-menu-options`,
              `.${carbonPrefix}--tooltip`,
              '.flatpickr-calendar',
              `.${blockClass}__container`,
              `.${carbonPrefix}--menu`,
              ...selectorsFloatingMenus,
            ]}
            isFullWidth={true}
            size={variant === 'narrow' ? 'sm' : undefined}
            data-tearsheet-exiting={isExiting ? true : undefined}>
            {header}
            <ModalBody
              className={cx(`${blockClass}__body-layout`, {
                [`${blockClass}__body-layout--has-influencer`]:
                  influencer && !isSm,
              })}
              ref={bodyRef}>
              {influencer}

              {body}

              {footer}
            </ModalBody>
          </ComposedModal>
        </FeatureFlags>
      </TearsheetContext.Provider>
    );

    // If portal is disabled, return content directly
    if (disablePortal) {
      return content;
    }

    // Return portal if mountNode is set, otherwise return content directly (SSR-safe)
    return mountNode ? createPortal(content, mountNode) : content;
  }
);
TearsheetInternal.displayName = 'TearsheetInternal';

/**
 * Wrapper component that handles presence logic and conditionally renders TearsheetInternal.
 * This ensures that all component state and effects are only initialized when the tearsheet is present.
 */
export const Tearsheet = forwardRef<HTMLDivElement, TearsheetProps>(
  (props, ref: ForwardedRef<HTMLDivElement>) => {
    const { open = false, keepMounted = false } = props;
    const presenceRef = useRef<HTMLDivElement>(null);
    const prefix = usePrefix();
    const blockClass = `${prefix}--tearsheet`;

    // Use presence hook for enter/exit animations (unless keepMounted is true).
    // The tearsheet names its animations "${blockClass}--presence-*" rather than
    // the generic "${prefix}--presence-*" convention, so we pass the custom prefix.
    const { isPresent, isExiting } = usePresence(
      presenceRef,
      keepMounted ? true : open,
      0,
      `${blockClass}--presence`
    );

    // Don't render if not present (after exit animation completes) - unless keepMounted is true
    if (!keepMounted && !isPresent) {
      return null;
    }

    // When present, render the internal component with all props
    return (
      <TearsheetInternal
        {...props}
        ref={ref}
        presenceRef={presenceRef}
        isExiting={isExiting}
      />
    );
  }
) as TearsheetComponentType;

Tearsheet.displayName = 'Tearsheet';
Tearsheet.Header = TearsheetHeader;
Tearsheet.HeaderContent = TearsheetHeaderContent;
Tearsheet.Body = TearsheetBody;
Tearsheet.Influencer = Influencer;
Tearsheet.MainContent = MainContent;
Tearsheet.SummaryContent = SummaryContent;
Tearsheet.Footer = TearsheetFooter;
Tearsheet.NavigationBar = TearsheetNavigationBar;
Tearsheet.ScrollButton = TearsheetScrollButton;
Tearsheet.HeaderActions = TearsheetHeaderActions;
Tearsheet.HeaderActionItem = TearsheetHeaderActionItem;
