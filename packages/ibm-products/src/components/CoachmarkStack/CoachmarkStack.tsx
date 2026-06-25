/**
 * Copyright IBM Corp. 2023, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React, {
  Children,
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

// Other standard imports.
import PropTypes from 'prop-types';
import cx from 'classnames';

import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg /*, carbon */ } from '../../settings';

// Carbon and package components we use.
/* TODO: @import(s) of carbon components and other package components. */

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--coachmark-stack`;
const componentName = 'CoachmarkStack';
const elementBlockClass = `${pkg.prefix}--coachmark-stack-element`;

import { CoachmarkOverlay } from '../Coachmark/CoachmarkOverlay';
import { CoachmarkStackHome } from './CoachmarkStackHome';
import { CoachmarkTagline } from '../Coachmark/CoachmarkTagline';
import {
  CoachmarkContext,
  CoachmarkContextType,
} from '../Coachmark/utils/context';
import { COACHMARK_OVERLAY_KIND } from '../Coachmark/utils/enums';
import { useIsomorphicEffect } from '../../global/js/hooks';

type TooltipAlignment = 'top' | 'bottom';
interface CoachmarkStackProps {
  /**
   * CoachmarkStack should use a single CoachmarkOverlayElements component as a child.
   */
  children: ReactNode;
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;
  /**
   * The label for the button that will close the Stack
   */
  closeButtonLabel?: string;
  // Pass through to CoachmarkStackHome
  /**
   * The description of the Coachmark.
   */
  description: ReactNode;
  /**
   * Optional prop to render any media like images or any animated media.
   */
  renderMedia?: (params) => ReactNode;
  /**
   * The labels used to link to the stackable Coachmarks.
   */
  navLinkLabels: string[];
  /**
   * Function to call when the CoachmarkStack closes.
   */
  onClose?: () => void;
  /**
   * Where in the DOM to render the stack.
   * The default is `document.body`.
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
   * The title of the Coachmark.
   */
  title: string;
  /**
   * Label's tooltip position
   */
  tooltipAlign?: TooltipAlignment;
  /**
   * Tooltip text and aria label for the Close button icon.
   */
  closeIconDescription?: string;
}

const defaults = {
  onClose: () => {},
  // Pass through to CoachmarkStackHome
  theme: 'light',
  portalTarget: 'body',
};

// NOTE
// The stack is limited to a depth of two Coachmarks:
// - a single parent CoachmarkStackHome
// - a single child Coachmark when stacked
// The parent will include links to all the children.
// No child Coachmark will include links to any other child Coachmarks.

/**
 * Stacked coachmarks are used to call out specific functionality or concepts
 * within the UI that may not be intuitive but are important for the
 * user to gain understanding of the product's main value and discover new use cases.
 * This variant allows the stacking of multiple coachmark overlays to be displayed by interacting with the tagline.
 * @deprecated This component is deprecated.
 */
export const CoachmarkStack = React.forwardRef<
  HTMLDivElement,
  CoachmarkStackProps
>(
  (
    {
      children,
      className,
      onClose = defaults.onClose,
      // Pass through to CoachmarkStackHome
      description,
      renderMedia,
      navLinkLabels,
      portalTarget = defaults.portalTarget,
      closeButtonLabel,
      tagline,
      theme = defaults.theme,
      title,
      tooltipAlign,
      closeIconDescription,
      ...rest
    },
    ref
  ) => {
    const portalNode = useRef<HTMLBodyElement | null>(null);

    useIsomorphicEffect(() => {
      portalNode.current = portalTarget
        ? (document?.querySelector(portalTarget) ??
          document?.querySelector('body'))
        : document?.querySelector('body');
    }, [portalTarget]);

    const stackHomeRef = useRef<HTMLDivElement | null>(null);
    const stackedCoachmarkRefs = useRef<HTMLDivElement[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    // selectedItemNumber -1 = parent close button was clicked, remove entire stack
    // selectedItemNumber 0 = (default) the parent is visible, all children are hidden
    // selectedItemNumber 1+ = a child is visible and stacked atop the parent
    const [selectedItemNumber, setSelectedItemNumber] = useState(0);
    // // The parent height and width values to return to after unstacked
    const [parentHeight, setParentHeight] = useState<number>();
    // parent height = child height when stacked behind a child that is shorter
    const childArray = Children.toArray(children);
    const mountedRef = useRef<boolean | undefined>(undefined);
    // same value as CSS animation speed
    const delayMs = 240;

    // Unmount or unstack a child
    const handleClickNavItem = (itemNumber) => {
      setSelectedItemNumber(itemNumber);
    };
    const handleClose = useCallback(
      (isParentCloseButton) => {
        if (isParentCloseButton) {
          // Trigger slide-out animation
          setSelectedItemNumber(-1);

          // Unmount after animation is complete
          const timer = setTimeout(() => {
            setIsOpen(false);
            onClose();
          }, delayMs);
          return () => clearTimeout(timer);
        } else {
          // Unstack child
          setSelectedItemNumber(0);
        }
      },
      [onClose]
    );
    const escFunction = useCallback(
      (event) => {
        if (event.key === 'Escape') {
          if (selectedItemNumber === 0) {
            handleClose(true);
          } else {
            handleClose(false);
          }
        }
      },
      [handleClose, selectedItemNumber]
    );

    useEffect(() => {
      document.addEventListener('keydown', escFunction, false);

      return () => {
        document.removeEventListener('keydown', escFunction, false);
      };
    }, [escFunction]);

    const contextValue: CoachmarkContextType = {
      buttonProps: {
        tabIndex: 0,
        'aria-expanded': isOpen,
        onClick: () => {
          setIsOpen(true);
        },
        // Compensate for accidental open/close on double-click.
        // Only open on double-click.
        onDoubleClick: () => {
          setIsOpen(true);
        },
      },
      closeButtonProps: {
        onClick: () => handleClose(false),
      },
      isOpen: isOpen,
      closeIconDescription,
    };
    useEffect(() => {
      mountedRef.current = true;
      return () => {
        mountedRef.current = false;
      };
    }, []);

    useEffect(() => {
      const targetSelectedItem = selectedItemNumber - 1;
      if (!parentHeight) {
        if (stackHomeRef.current) {
          const height = stackHomeRef.current.clientHeight;
          if (height > 0) {
            setParentHeight(height);
          }
        }
        return;
      }

      if (stackHomeRef.current) {
        stackHomeRef.current.style.height = `${parentHeight}px`;
      }

      if (!isOpen || targetSelectedItem < 0) {
        if (stackHomeRef.current) {
          stackHomeRef.current.classList.remove(`${blockClass}--scaled-home`);
          stackHomeRef.current.classList.add(`${blockClass}--unscaled-home`);
          stackHomeRef.current.focus();
        }
        return;
      }

      const targetHomeHeight =
        stackedCoachmarkRefs.current[targetSelectedItem].clientHeight;

      if (stackHomeRef.current) {
        stackHomeRef.current.style.height = `calc(${targetHomeHeight}px + 3rem)`;
        stackedCoachmarkRefs.current[targetSelectedItem].focus();
        stackHomeRef.current.classList.remove(`${blockClass}--unscaled-home`);
        stackHomeRef.current.classList.add(`${blockClass}--scaled-home`);
      }
    }, [selectedItemNumber, isOpen, parentHeight]);

    const wrappedChildren = Children.map(childArray, (child, idx) => {
      const mountedClass = mountedRef.current
        ? `${elementBlockClass}--is-mounted`
        : '';
      return (
        <CoachmarkOverlay
          key={idx}
          ref={(ref) => {
            stackedCoachmarkRefs.current[idx] = ref as HTMLDivElement;
          }}
          kind={COACHMARK_OVERLAY_KIND.STACKED}
          onClose={() => handleClose(false)}
          theme={theme}
          fixedIsVisible={false}
          className={cx(
            elementBlockClass,
            mountedClass,
            idx === selectedItemNumber - 1 &&
              `${elementBlockClass}--is-visible`,
            mountedRef.current && `${elementBlockClass}--is-mounted`
          )}
        >
          {child}
        </CoachmarkOverlay>
      );
    });

    return (
      <CoachmarkContext.Provider value={contextValue}>
        <div
          {
            // Pass through any other property values as HTML attributes.
            ...rest
          }
          className={cx(
            blockClass,
            `${pkg.prefix}--coachmark-overlay--stack`,
            className
          )}
          ref={ref}
          {...getDevtoolsProps(componentName)}
        >
          <CoachmarkTagline title={tagline} onClose={onClose} />

          <CoachmarkStackHome
            ref={stackHomeRef}
            className={cx(
              `${pkg.prefix}--coachmark-overlay`,
              `${pkg.prefix}--coachmark-overlay__${theme}`,
              elementBlockClass,
              selectedItemNumber > 0 && `${elementBlockClass}--is-stacked`,
              selectedItemNumber > 0 &&
                `${elementBlockClass}--is-stacked__${theme}`,
              isOpen && `${elementBlockClass}--is-visible`,
              mountedRef.current && `${elementBlockClass}--is-mounted`
            )}
            isOpen={isOpen && selectedItemNumber < 1}
            description={description}
            renderMedia={renderMedia}
            navLinkLabels={navLinkLabels}
            onClickNavItem={handleClickNavItem}
            onClose={() => {
              handleClose(true);
            }}
            portalTarget={portalTarget}
            closeButtonLabel={closeButtonLabel}
            title={title}
            tooltipAlign={tooltipAlign}
          />
          {portalNode?.current
            ? createPortal(wrappedChildren, portalNode?.current)
            : null}
        </div>
      </CoachmarkContext.Provider>
    );
  }
);

/**@ts-ignore*/
CoachmarkStack.deprecated = {
  level: 'warn',
  details: `${componentName} is deprecated.`,
};

// Return a placeholder if not released and not enabled by feature flag

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
CoachmarkStack.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
CoachmarkStack.propTypes = {
  /**
   * CoachmarkStack should use a single CoachmarkOverlayElements component as a child.
   */
  children: PropTypes.node.isRequired,

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,

  /**
   * The label for the button that will close the Stack
   */
  closeButtonLabel: PropTypes.string,

  /**
   * Tooltip text and aria label for the Close button icon.
   */
  closeIconDescription: PropTypes.string,

  // Pass through to CoachmarkStackHome
  /**
   * The description of the Coachmark.
   */
  description: PropTypes.node.isRequired,

  /**
   * The labels used to link to the stackable Coachmarks.
   */
  navLinkLabels: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,

  /**
   * Function to call when the CoachmarkStack closes.
   */
  onClose: PropTypes.func,

  /**
   * Where in the DOM to render the stack.
   * The default is `document.body`.
   */
  portalTarget: PropTypes.string,

  /**
   * Optional prop to render any media like images or animated media.
   */
  renderMedia: PropTypes.func,

  /**
   * The tagline title which will be fixed to the bottom right of the window and will serve as the display trigger.
   */
  tagline: PropTypes.string.isRequired,

  /**
   * Determines the theme of the component.
   */
  theme: PropTypes.oneOf(['light', 'dark']),
  /**
   * The title of the Coachmark.
   */
  title: PropTypes.string.isRequired,
  /**
   * Label's tooltip position
   */
  tooltipAlign: PropTypes.oneOf(['top', 'bottom']),
};
