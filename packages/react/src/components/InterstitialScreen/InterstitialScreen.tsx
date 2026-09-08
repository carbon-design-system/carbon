/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import cx from 'classnames';
import ComposedModal from '../ComposedModal';
import { FeatureFlags } from '../FeatureFlags';
import { usePrefix } from '../../internal/usePrefix';
import InterstitialScreenHeader, {
  InterstitialScreenHeaderProps,
} from './InterstitialScreenHeader';
import InterstitialScreenBody, {
  InterstitialScreenBodyProps,
} from './InterstitialScreenBody';
import InterstitialScreenFooter, {
  InterstitialScreenFooterProps,
} from './InterstitialScreenFooter';
import {
  ActionType,
  disableButtonConfigType,
  InterstitialScreenContext,
} from './context';

const componentName = 'InterstitialScreen';

export interface InterstitialScreenProps {
  /**
   * The aria label applied to the Interstitial Screen component
   */
  ariaLabel?: string;

  /**
   * Provide the contents of the InterstitialScreen.
   */
  children: ReactNode;

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;

  /**
   * Specifies whether the component is shown as a full-screen
   * experience, else it is shown as a modal by default.
   */
  isFullScreen?: boolean;

  /**
   * Provide a ref to return focus to once the interstitial is closed.
   */
  launcherButtonRef?: RefObject<HTMLElement>;

  /**
   * Function to call when the close button is clicked.
   */
  onClose?: (value: ActionType) => void;

  /**
   * Specifies whether the component is currently open.
   */
  open?: boolean;
}

export type InterstitialScreenComponent = React.ForwardRefExoticComponent<
  InterstitialScreenProps & React.RefAttributes<HTMLDivElement>
> & {
  Header: React.FC<InterstitialScreenHeaderProps>;
  Body: React.FC<InterstitialScreenBodyProps>;
  Footer: React.FC<InterstitialScreenFooterProps>;
};

/**
 * InterstitialScreen can be a full page or an overlay, and are
 * shown on the first time a user accesses a new experience
 * (e.g. upon first login or first time opening a page where a
 * newly purchased capability is presented).
 */
export const InterstitialScreen = React.forwardRef<
  HTMLDivElement,
  InterstitialScreenProps
>((props, ref) => {
  const {
    ariaLabel = 'Interstitial screen',
    children,
    className,
    isFullScreen = false,
    launcherButtonRef,
    onClose,
    open = false,
    ...rest
  } = props;

  const prefix = usePrefix();
  const blockClass = `${prefix}--interstitial-screen`;

  const backupRef = useRef<HTMLDivElement>(null);
  const _forwardedRef = ref || backupRef;
  const startButtonRef = useRef<HTMLElement | undefined>(undefined);
  const nextButtonRef = useRef<HTMLElement | undefined>(undefined);
  const [isVisibleClass, setIsVisibleClass] = useState<string | null>(null);
  const [progStep, setProgStep] = useState<number>(0);
  const bodyScrollRef = useRef<HTMLDivElement>(null);
  const [stepCount, setStepCount] = useState<number>(0);

  const [disableButtonConfig, setDisableButtonConfig] =
    useState<disableButtonConfigType>({
      skip: false,
      back: false,
      next: false,
      start: false,
    });

  const variantClass = isFullScreen
    ? `${blockClass}--full-screen`
    : `${blockClass}--modal`;

  const [bodyChildrenData, setBodyChildrenData] = useState<ReactNode>(null);

  const handleClose = useCallback(
    (actionName?: ActionType) => {
      setProgStep(0);
      onClose?.(actionName ?? 'close');
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) {
      setProgStep(0);
    }
    startButtonRef.current?.focus();
  }, [open, progStep, onClose]);

  useEffect(() => {
    // for modal only, "is-visible" triggers animation
    setIsVisibleClass(!isFullScreen && open ? 'is-visible' : null);
    nextButtonRef?.current?.focus();
    if (!open && launcherButtonRef) {
      setTimeout(() => {
        launcherButtonRef.current?.focus();
      }, 0);
    }
  }, [launcherButtonRef, isFullScreen, open]);

  // hitting escape key also closes this component
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      const { key } = e;
      if (key === 'Escape') {
        handleClose('close');
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [handleClose]);

  if (!open) {
    return null;
  }

  const renderModal = () => {
    return (
      <FeatureFlags enableExperimentalFocusWrapWithoutSentinels>
        <ComposedModal
          {...rest}
          preventCloseOnClickOutside={true}
          className={cx(
            blockClass, // Apply the block class to the main HTML element
            className // Apply any supplied class names to the main HTML element.
          )}
          size="lg"
          onClose={handleClose}
          open={open}
          ref={_forwardedRef}
          aria-label={ariaLabel}
          data-component-name={componentName}>
          {children}
        </ComposedModal>
      </FeatureFlags>
    );
  };

  const renderFullScreen = () => {
    return (
      <div
        {...rest}
        className={cx(
          blockClass, // Apply the block class to the main HTML element
          className, // Apply any supplied class names to the main HTML element.
          variantClass,
          isVisibleClass
        )}
        role="main"
        aria-label={ariaLabel}
        ref={ref}
        data-component-name={componentName}>
        <div className={`${blockClass}--container`}>{children}</div>
      </div>
    );
  };

  const handleGotoStep = (targetStep: number) => {
    setProgStep(targetStep);
    scrollBodyToTop();
  };

  const scrollBodyToTop = () => {
    bodyScrollRef?.current?.scroll?.({
      top: 0,
    });
  };

  return (
    <InterstitialScreenContext.Provider
      value={{
        bodyChildrenData,
        setBodyChildrenData,
        isFullScreen,
        handleClose,
        progStep,
        setProgStep,
        bodyScrollRef,
        handleGotoStep,
        stepCount,
        setStepCount,
        disableButtonConfig,
        setDisableButtonConfig,
      }}>
      {isFullScreen ? renderFullScreen() : renderModal()}
    </InterstitialScreenContext.Provider>
  );
}) as InterstitialScreenComponent;

InterstitialScreen.Header = InterstitialScreenHeader;
InterstitialScreen.Body = InterstitialScreenBody;
InterstitialScreen.Footer = InterstitialScreenFooter;

InterstitialScreen.displayName = componentName;
