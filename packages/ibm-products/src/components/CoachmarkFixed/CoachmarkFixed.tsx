/**
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { COACHMARK_OVERLAY_KIND } from '../Coachmark/utils/enums';
import {
  CoachmarkContext,
  CoachmarkContextType,
} from '../Coachmark/utils/context';
import { CoachmarkOverlay } from '../Coachmark/CoachmarkOverlay';
import { CoachmarkTagline } from '../Coachmark/CoachmarkTagline';
// Other standard imports.
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import cx from 'classnames';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';
import {
  useIsomorphicEffect,
  usePrefersReducedMotion,
} from '../../global/js/hooks';

// Carbon and package components we use.
/* TODO: @import(s) of carbon components and other package components. */

// The block part of our conventional BEM class names (blockClass__E--M).
const coachmarkClass = `${pkg.prefix}--coachmark`;
const blockClass = `${coachmarkClass}-fixed`;
const overlayBlockClass = `${coachmarkClass}-overlay`;
const componentName = 'CoachmarkFixed';

export interface CoachmarkFixedProps {
  /**
   * CoachmarkFixed should use a single CoachmarkOverlayElements component as a child.
   */
  children: ReactNode;
  /**
   * Optional class name for this component.
   */
  className?: string;
  /**
   * Function to call when the Coachmark closes.
   */
  onClose?: () => void;
  /**
   * By default, the Coachmark will be appended to the end of `document.body`.
   * The Coachmark will remain persistent as the user navigates the app until
   * the user closes the Coachmark.
   *
   * Alternatively, the app developer can tightly couple the Coachmark to a DOM
   * element or other component by specifying a CSS selector. The Coachmark will
   * remain visible as long as that element remains visible or mounted. When the
   * element is hidden or component is unmounted, the Coachmark will disappear.
   */
  portalTarget?: string;
  /**
   * The tagline title which will be fixed to the bottom right of the window and will serve as the display trigger.
   */
  tagline: string;
  /**
   * Determines the theme of the component.
   */
  theme?: 'light' | 'dark';
  /**
   * Tooltip text and aria label for the Close button icon.
   */
  closeIconDescription?: string;
}

const defaults = {
  onClose: () => {},
  theme: 'light',
  tagline: '',
};

/**
 * Fixed coachmarks are used to call out specific functionality or concepts
 * within the UI that may not be intuitive but are important for the
 * user to gain understanding of the product's main value and discover new use cases.
 * This variant allows the a coachmark overlay to be displayed by interacting with the tagline.
 * @deprecated This component is deprecated.
 */
export const CoachmarkFixed = React.forwardRef<
  HTMLDivElement,
  CoachmarkFixedProps
>(
  (
    {
      children,
      className,
      onClose = defaults.onClose,
      portalTarget,
      tagline = defaults.tagline,
      theme = defaults.theme,
      closeIconDescription,
      // Collect any other property values passed in.
      ...rest
    },
    ref
  ) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const portalNode = useRef<Element | DocumentFragment | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [shouldResetPosition, setShouldResetPosition] = useState(false);
    const [targetRect, setTargetRect] = useState();
    const [targetOffset, setTargetOffset] = useState({ x: 0, y: 0 });
    const [fixedIsVisible, setFixedIsVisible] = useState(false);
    const shouldReduceMotion = usePrefersReducedMotion();

    useIsomorphicEffect(() => {
      portalNode.current = portalTarget
        ? (document?.querySelector(portalTarget) ??
          document?.querySelector('body'))
        : document?.querySelector('body');
    }, [portalTarget]);

    const handleClose = useCallback(() => {
      if (shouldReduceMotion) {
        setIsOpen(false);
      } else {
        setFixedIsVisible(false);
      }
    }, [shouldReduceMotion]);

    const handleTransitionEnd = (e: TransitionEvent) => {
      if (e.propertyName === 'transform' && !fixedIsVisible) {
        setIsOpen(false);
        onClose();
      }
    };

    const handleTargetClick = (e) => {
      setTargetRect(e.target.getBoundingClientRect());
      setTargetOffset({ x: e.target.offsetLeft, y: e.target.offsetTop });
      // reset position for all other kinds
      setIsOpen(false);
      setShouldResetPosition(true);
    };

    const escFunction = useCallback(
      (event) => {
        if (event.key === 'Escape') {
          handleClose();
        }
      },
      [handleClose]
    );

    useEffect(() => {
      document.addEventListener('keydown', escFunction, false);

      return () => {
        document.removeEventListener('keydown', escFunction, false);
      };
    }, [escFunction]);

    const contextValue: CoachmarkContextType = {
      buttonProps: {
        'aria-expanded': isOpen,
        tabIndex: 0,
        onClick: handleTargetClick,
        // Compensate for accidental open/close on double-click.
        // Only open on double-click.
        onDoubleClick: handleTargetClick,
      },
      closeButtonProps: {
        onClick: handleClose,
      },
      targetRect: targetRect,
      targetOffset: targetOffset,
      isOpen: isOpen,
      closeIconDescription,
    };

    // instead of toggling on/off,
    // keep open and reset to original position
    useEffect(() => {
      if (shouldResetPosition) {
        setShouldResetPosition(false);
        setIsOpen(true);
      }
    }, [shouldResetPosition]);

    useEffect(() => {
      setFixedIsVisible(isOpen);
    }, [isOpen]);

    // On unmount:
    // - DO NOT "Close()" the coachmark.
    //   - This triggers a "signal" to close it forever.
    //   - "Closing" should only ever be a user-triggered event.
    // - DO "hide" the coachmark.
    //   - The app is doing the action for the user.
    //   - The user will have the opportunity to open it again.
    useEffect(() => {
      return () => setIsOpen(false);
    }, []);

    return (
      <CoachmarkContext.Provider value={contextValue}>
        <div
          {
            // Pass through any other property values as HTML attributes.
            ...rest
          }
          className={cx(
            blockClass, // Apply the block class to the main HTML element
            `${blockClass}__${theme}`,
            className // Apply any supplied class names to the main HTML element.
          )}
          ref={ref}
          {...getDevtoolsProps(componentName)}
        >
          <CoachmarkTagline title={tagline} onClose={onClose} />
          {isOpen &&
            portalNode?.current &&
            createPortal(
              <CoachmarkOverlay
                ref={overlayRef}
                fixedIsVisible={fixedIsVisible}
                kind={COACHMARK_OVERLAY_KIND.FIXED}
                onClose={handleClose}
                onTransitionEnd={handleTransitionEnd}
                theme={theme}
                className={cx(
                  fixedIsVisible && `${overlayBlockClass}--is-visible`,
                  overlayBlockClass
                )}
              >
                {children}
              </CoachmarkOverlay>,
              // Default to `document.body` when `portalNode` is `null`
              portalNode?.current
            )}
        </div>
      </CoachmarkContext.Provider>
    );
  }
);

/**@ts-ignore*/
CoachmarkFixed.deprecated = {
  level: 'warn',
  details: `${componentName} is deprecated.`,
};

// Return a placeholder if not released and not enabled by feature flag

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
CoachmarkFixed.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
CoachmarkFixed.propTypes = {
  // TODO: Add this to MDX as will be done with Coachmark
  /**
   * CoachmarkFixed should use a single CoachmarkOverlayElements component as a child.
   */
  children: PropTypes.node.isRequired,
  /**
   * Optional class name for this component.
   */
  className: PropTypes.string,
  /**
   * Tooltip text and aria label for the Close button icon.
   */
  closeIconDescription: PropTypes.string,
  /**
   * Function to call when the Coachmark closes.
   */
  onClose: PropTypes.func,
  /**
   * By default, the Coachmark will be appended to the end of `document.body`.
   * The Coachmark will remain persistent as the user navigates the app until
   * the user closes the Coachmark.
   *
   * Alternatively, the app developer can tightly couple the Coachmark to a DOM
   * element or other component by specifying a CSS selector. The Coachmark will
   * remain visible as long as that element remains visible or mounted. When the
   * element is hidden or component is unmounted, the Coachmark will disappear.
   */
  portalTarget: PropTypes.string,

  /**
   * The tagline title which will be fixed to the bottom right of the window and will serve as the display trigger.
   */
  tagline: PropTypes.string.isRequired,
  /**
   * Determines the theme of the component.
   */
  theme: PropTypes.oneOf(['light', 'dark']),
};
