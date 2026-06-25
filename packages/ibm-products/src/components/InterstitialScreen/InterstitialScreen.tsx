/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  ComposedModal,
  unstable_FeatureFlags as FeatureFlags,
} from '@carbon/react';
// Import portions of React that are needed.
import React, {
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

// Other standard imports.
import PropTypes from 'prop-types';
// Other standard imports.
import cx from 'classnames';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';
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
  blockClass,
  disableButtonConfigType,
  InterstitialScreenContext,
} from './context';

const componentName = 'InterstitialScreen';

export interface InterstitialScreenProps {
  /**
   * Provide the contents of the InterstitialScreen.
   */
  children: ReactNode;

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;
  /**
   * The aria label applied to the Interstitial Screen component
   */
  ariaLabel?: string;
  /**
   * Specifies whether the component is shown as a full-screen
   * experience, else it is shown as a modal by default.
   */
  isFullScreen?: boolean;
  /**
   * Specifies whether the component is currently open.
   */
  open?: boolean;

  /**
   * Function to call when the close button is clicked.
   */
  onClose?: (value: ActionType) => void;

  /**
   * Provide a ref to return focus to once the interstitial is closed.
   */
  launcherButtonRef?: RefObject<HTMLElement>;
}

// Define the type for InterstitialScreen, extending it to include Header
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
    children,
    className,
    ariaLabel = 'Interstitial screen',
    isFullScreen = false,
    open = false,
    launcherButtonRef,
    onClose,
    ...rest
  } = props;
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
    (actionName) => {
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
        launcherButtonRef.current.focus();
      }, 0);
    }
  }, [launcherButtonRef, isFullScreen, open]);

  // hitting escape key also closes this component
  useEffect(() => {
    const close = (e) => {
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
          {...getDevtoolsProps(componentName)}
        >
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
        {...getDevtoolsProps(componentName)}
      >
        <div className={`${blockClass}--container`}>{children}</div>
      </div>
    );
  };

  const handleGotoStep = (targetStep) => {
    setProgStep(targetStep as number);
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
      }}
    >
      {isFullScreen ? renderFullScreen() : renderModal()}
    </InterstitialScreenContext.Provider>
  );
}) as InterstitialScreenComponent;
InterstitialScreen.Header = InterstitialScreenHeader;
InterstitialScreen.Body = InterstitialScreenBody;
InterstitialScreen.Footer = InterstitialScreenFooter;

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
InterstitialScreen.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
InterstitialScreen.propTypes = {
  /**
   * The aria label applied to the Interstitial Screen component
   */
  ariaLabel: PropTypes.string,

  children: PropTypes.node,

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,
  /**
   * Tooltip text and aria label for the Close button icon.
   */
  closeIconDescription: PropTypes.string,

  /**
   * Specifies whether the component is shown as a full-screen
   * experience, else it is shown as a modal by default.
   */
  isFullScreen: PropTypes.bool,
  /**
   * Provide a ref to return focus to once the interstitial is closed.
   */
  launcherButtonRef: PropTypes.any,

  /**
   * Function to call when the close button is clicked.
   */
  onClose: PropTypes.func,

  /**
   * Specifies whether the component is currently open.
   */
  open: PropTypes.bool,
};
