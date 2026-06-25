/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';
import { ScrollStates, useIsOverflow } from './constants';
import { useIsomorphicEffect } from '../../global/js/hooks';
import { usePrefix } from '@carbon/react';

const blockClass = `${pkg.prefix}--scroll-gradient`;
const componentName = 'ScrollGradient';

// Default values for props
const defaults = {
  hideStartGradient: false,
  onScroll: () => {},
  getScrollElementRef: () => {},
};

/**
 * TODO: A description of the component.
 */
export let ScrollGradient = React.forwardRef(
  (
    {
      children,
      className,
      color,
      onScroll = defaults.onScroll,
      scrollElementClassName,
      getScrollElementRef = defaults.getScrollElementRef,
      hideStartGradient = defaults.hideStartGradient,
      ...rest
    },
    ref
  ) => {
    const intersectionStartRef = useRef(undefined);
    const intersectionEndRef = useRef(undefined);
    const intersectionLeftRef = useRef(undefined);
    const intersectionRightRef = useRef(undefined);

    const carbonPrefix = usePrefix();
    const fallbackColor = `var(--${carbonPrefix}-layer-01)`;

    const scrollContainer = useRef(undefined);
    const contentChildrenContainer = useRef(undefined);
    const { xScrollable, yScrollable } = useIsOverflow(scrollContainer);

    const gradientRight =
      yScrollable && scrollContainer.current && contentChildrenContainer.current
        ? scrollContainer.current.offsetWidth -
          contentChildrenContainer.current.offsetWidth
        : 0;
    const gradientBottom =
      xScrollable && scrollContainer.current && contentChildrenContainer.current
        ? scrollContainer.current.offsetHeight -
          contentChildrenContainer.current.offsetHeight
        : 0;

    const [verticalPosition] = useState(ScrollStates.NONE);
    const [horizontalPosition] = useState(ScrollStates.NONE);

    const startVerticalRef = useRef(null);
    const startHorizontalRef = useRef(null);
    const endVerticalRef = useRef(null);
    const endHorizontalRef = useRef(null);

    useIsomorphicEffect(() => {
      // start vertical styles
      startVerticalRef.current.style.right = gradientRight;
      startVerticalRef.current.style.backgroundImage = `linear-gradient(0deg, transparent, ${color ?? fallbackColor} 90%)`;
      // start horizontal styles
      startHorizontalRef.current.backgroundImage = `linear-gradient(-90deg, transparent, ${color ?? fallbackColor} 90%)`;
      startHorizontalRef.current.bottom = gradientBottom;
      // end vertical styles
      endVerticalRef.current.style.right = gradientRight;
      endVerticalRef.current.style.bottom = gradientBottom;
      endVerticalRef.current.style.backgroundImage = `linear-gradient(0deg, ${color ?? fallbackColor} 10%, transparent)`;
      // end horizontal styles
      endHorizontalRef.current.style.right = gradientRight;
      endHorizontalRef.current.style.bottom = gradientBottom;
      endHorizontalRef.current.style.backgroundImage = `linear-gradient(-90deg, ${color ?? fallbackColor} 10%, transparent)`;
    }, [color, gradientRight, gradientBottom]);

    const setGradientOnIntersection = (entry, gradientRef) => {
      if (gradientRef.current) {
        if (entry.isIntersecting) {
          gradientRef.current.style.opacity = 0;
          gradientRef.current.style.display = 'none';
          gradientRef?.current.setAttribute('aria-hidden', false);
        } else {
          gradientRef.current.style.opacity = 1;
          gradientRef.current.style.display = 'block';
          gradientRef?.current.setAttribute('aria-hidden', true);
        }
      }
    };

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.target.hasAttribute('data-start-vertical')) {
              setGradientOnIntersection(entry, startVerticalRef);
            }
            if (entry.target.hasAttribute('data-end-vertical')) {
              setGradientOnIntersection(entry, endVerticalRef);
            }
            if (entry.target.hasAttribute('data-start-horizontal')) {
              setGradientOnIntersection(entry, startHorizontalRef);
            }
            if (entry.target.hasAttribute('data-end-horizontal')) {
              setGradientOnIntersection(entry, endHorizontalRef);
            }
          });
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0.1,
        }
      );

      observer.observe(intersectionStartRef.current);
      observer.observe(intersectionEndRef.current);
      observer.observe(intersectionLeftRef.current);
      observer.observe(intersectionRightRef.current);

      const startVerticalRefValue = intersectionStartRef.current;
      const endVerticalRefValue = intersectionEndRef.current;
      const startHorizontalRefValue = intersectionLeftRef.current;
      const endHorizontalRefValue = intersectionRightRef.current;
      return () => {
        observer.unobserve(startVerticalRefValue);
        observer.unobserve(endVerticalRefValue);
        observer.unobserve(startHorizontalRefValue);
        observer.unobserve(endHorizontalRefValue);
      };
    }, []);

    const setRefs = (element) => {
      scrollContainer.current = element;
      getScrollElementRef(element);
    };

    return (
      <div
        {...rest}
        className={cx(
          blockClass,
          `${blockClass}--x-${horizontalPosition.toLowerCase()}`,
          `${blockClass}--y-${verticalPosition.toLowerCase()}`,
          {
            [`${blockClass}--x-scrollable`]: xScrollable,
            [`${blockClass}--y-scrollable`]: yScrollable,
          },
          className
        )}
        ref={ref}
        role="presentation"
        {...getDevtoolsProps(componentName)}
      >
        <div
          onScroll={onScroll}
          ref={setRefs}
          className={cx(`${blockClass}__content`, scrollElementClassName)}
        >
          <span ref={intersectionStartRef} data-start-vertical />
          <span ref={intersectionLeftRef} data-start-horizontal />
          <div
            ref={contentChildrenContainer}
            className={`${blockClass}__content-children`}
          >
            {children}
          </div>
          <span ref={intersectionEndRef} data-end-vertical />
          <span ref={intersectionRightRef} data-end-horizontal />
        </div>

        {/* Gradient elements */}
        {!hideStartGradient && (
          <>
            <div
              ref={startVerticalRef}
              className={`${blockClass}__start-vertical`}
              role="presentation"
              aria-hidden
            />
            <div
              ref={startHorizontalRef}
              className={`${blockClass}__start-horizontal`}
              role="presentation"
              aria-hidden
            />
          </>
        )}
        <div
          ref={endVerticalRef}
          className={`${blockClass}__end-vertical`}
          role="presentation"
          aria-hidden
        />
        <div
          ref={endHorizontalRef}
          className={`${blockClass}__end-horizontal`}
          role="presentation"
          aria-hidden
        />
      </div>
    );
  }
);

// Return a placeholder if not released and not enabled by feature flag
ScrollGradient = pkg.checkComponentEnabled(ScrollGradient, componentName);

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
ScrollGradient.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
ScrollGradient.propTypes = {
  /**
   * Provide the contents of the ScrollGradient.
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,

  /** @type {string} Fade out color. Any valid CSS color value works */
  color: PropTypes.string,

  /** @type {(element: HTMLElement) => {}} Optional function to get reference to scrollable DOM element */
  getScrollElementRef: PropTypes.func,

  /** @type {boolean} Set to true if you want to hide gradient on the start side (top or left) of scrollable element. */
  hideStartGradient: PropTypes.bool,

  /** @type {Function} Optional scroll handler */
  onScroll: PropTypes.func,

  /** @type {string} Optional classname for scroll element. */
  scrollElementClassName: PropTypes.string,
};
