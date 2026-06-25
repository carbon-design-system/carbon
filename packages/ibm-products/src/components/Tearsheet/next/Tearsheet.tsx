/**
 * Copyright IBM Corp. 2025, 2025
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
import {
  useIsomorphicEffect,
  useCarbonFeatureFlagsObject,
} from '../../../global/js/hooks';
import { createPortal } from 'react-dom';
import cx from 'classnames';
import {
  ComposedModal,
  ComposedModalProps,
  unstable_FeatureFlags as FeatureFlags,
  Layer,
  ModalBody,
  usePrefix,
} from '@carbon/react';
import { blockClass, TearsheetContext } from './context';
import TearsheetHeader, {
  TearsheetHeaderProps,
  TearsheetNavigationBar,
  TearsheetNavigationBarProps,
  TearsheetScrollButton,
  TearsheetScrollButtonProps,
} from './TearsheetHeader';
import TearsheetHeaderContent, {
  TearsheetHeaderContentProps,
} from './TearsheetHeaderContent';
import TearsheetBody, {
  Influencer,
  InfluencerProps,
  MainContent,
  MainContentProps,
  SummaryContent,
  SummaryContentProps,
  TearsheetBodyProps,
} from './TearsheetBody';

import {
  TearsheetHeaderActionItem,
  TearsheetHeaderActionItemProps,
  TearsheetHeaderActions,
  TearsheetHeaderActionsProps,
} from './TearsheetHeaderActions';
import TearsheetFooter, { TearsheetFooterProps } from './TearsheetFooter';
import { breakpoints } from '@carbon/layout';
import { useStackContext } from './StackContext';
import { useMatchMedia } from '../../../global/js/hooks/useMatchMedia';
import { useId } from '../../../global/js/utils/useId';
import { usePresence } from '../usePresence';
import { useMergedRefs } from '../../../global/js/hooks/useMergedRefs';

/**
 * ----------
 * Tearsheet
 * ----------
 */

export interface TearsheetProps extends ComposedModalProps {
  children?: React.ReactNode;

  /**
   * Specifies whether the tearsheet is currently open.
   */
  open?: boolean;

  /**
   * User can pass any class names to add to the modal wrapper
   */
  className?: string;
  /**
   * User can pass any class names that will added to the modal container, rather than the wrapper
   */
  containerClassName?: string;
  /**
   * the defines the gap from top of the view port. Defaulted to 3rem
   */
  verticalGap?: string;
  /**
   * Default influencer takes 256px, this allow to override eg: 300px , 20rem
   */
  influencerWidth?: string;
  /**
   * Default rightContent takes 256px, this allow to override eg: 300px , 20rem
   */
  summaryContentWidth?: string;
  /**
   * Default to wide variant. Pass in narrow for narrow tearsheet
   */
  variant?: 'wide' | 'narrow';
  /**
   * Optional prop that allows you to pass any component.
   */
  decorator?: ReactNode;

  /**
   * Specify the CSS selectors that match the floating menus.
   *
   * See https://react.carbondesignsystem.com/?path=/docs/components-composedmodal--overview#focus-management
   */
  selectorsFloatingMenus?: string[];

  /**
   * The aria label applied to the tearsheet
   */
  ariaLabel?: string;

  /**
   * An optional handler that is called when the user closes the tearsheet (by
   * clicking the close button, if enabled, or clicking outside, if enabled).
   * Returning `false` here prevents the modal from closing.
   */
  onClose?: () => void;
  /**
   * Specify a CSS selector that matches the DOM element that should be
   * focused when the Modal opens.
   */
  selectorPrimaryFocus?: string;
  /**
   * The DOM element that the tearsheet should be rendered within. Defaults to document.body.
   */
  portalTarget?: HTMLElement;
  /**
   * Disable the portal behavior and render the tearsheet in the existing DOM structure.
   * This is useful for testing, when you need to inherit React context from parent components,
   * or when you don't need the z-index isolation that portals provide.
   * @default false
   */
  disablePortal?: boolean;
  /**
   * If true, the tearsheet will remain mounted in the DOM when closed, using CSS to hide it.
   * By default (false), the tearsheet unmounts from the DOM after the exit animation completes.
   * Set to true if you need to preserve component state or avoid remounting overhead.
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
const TearsheetInternal = forwardRef<
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
    const localRef = useRef<HTMLDivElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);
    const mergedRefs = useMergedRefs([ref, localRef, presenceRef]);
    const smMediaQuery = `(max-width: ${breakpoints.md.width})`;
    const isSm = useMatchMedia(smMediaQuery) || variant === 'narrow';
    const parentFlagsObject = useCarbonFeatureFlagsObject();

    const [fullyCollapsed, setFullyCollapsed] = useState(false);
    const [disableHeaderCollapse, setDisableHeaderCollapse] = useState(false);

    const arr = React.Children.toArray(children);
    const header = arr.find((child: any) => child.type === TearsheetHeader);
    const influencer = arr.find((child: any) => child.type === Influencer);
    const body = arr.find((child: any) => child.type === TearsheetBody);
    const footer = arr.find((child: any) => child.type === TearsheetFooter);

    const uniqueId = useRef(useId());
    const titleId = useRef(`${blockClass}__title-${uniqueId.current}`);
    const { notifyStack, stack, getDepth, getScaleFactor, getBlockSizeChange } =
      useStackContext();

    const [depth, setDepth] = useState(0);
    const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

    // Set portal mount node using useIsomorphicEffect to avoid SSR issues and double rendering
    useIsomorphicEffect(() => {
      if (!disablePortal) {
        setMountNode(portalTarget || document.body);
      }
    }, [portalTarget, disablePortal]);

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

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSm, decorator, influencerWidth, summaryContentWidth, verticalGap]);

    useIsomorphicEffect(() => {
      const id = uniqueId.current;
      if (localRef.current && open) {
        notifyStack?.(id, true, localRef.current);
      }

      // Cleanup when component unmounts
      return () => {
        notifyStack?.(id, false, null);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localRef.current, open]);

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
    }, [open, launcherButtonRef]);

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
        }}
      >
        <FeatureFlags
          flags={{
            ...parentFlagsObject,
            'enable-experimental-focus-wrap-without-sentinels': true,
          }}
        >
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
                !!decorator && decorator['type']?.displayName === 'AILabel',
              [`${blockClass}--has-decorator`]:
                !!decorator && decorator['type']?.displayName !== 'AILabel',
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
            size={variant === 'narrow' ? 'sm' : ''}
            data-tearsheet-exiting={isExiting ? true : undefined}
          >
            {header}
            <ModalBody
              className={cx(`${blockClass}__body-layout`, {
                [`${blockClass}__body-layout--has-influencer`]:
                  influencer && !isSm,
              })}
              ref={bodyRef}
            >
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

/**
 * Wrapper component that handles presence logic and conditionally renders TearsheetInternal.
 * This ensures that all component state and effects are only initialized when the tearsheet is present.
 */
export const Tearsheet = forwardRef<HTMLDivElement, TearsheetProps>(
  (props, ref: ForwardedRef<HTMLDivElement>) => {
    const { open = false, keepMounted = false } = props;
    const presenceRef = useRef<HTMLDivElement>(null);

    // Use presence hook for enter/exit animations (unless keepMounted is true)
    const { isPresent, isExiting } = usePresence(
      presenceRef,
      keepMounted ? true : open
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
