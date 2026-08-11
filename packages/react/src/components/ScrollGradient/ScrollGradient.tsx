/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef, useState, useRef, useEffect } from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import useIsomorphicEffect from '../../internal/useIsomorphicEffect';
import { ScrollStates, useIsOverflow } from './constants';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
export interface ScrollGradientProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Provide the contents of the ScrollGradient. */
  children?: React.ReactNode;
  /** Provide an optional class to be applied to the containing node. */
  className?: string;
  /** Fade-out color. Any valid CSS color value. */
  color?: string;
  /** Optional function to get a reference to the scrollable DOM element. */
  getScrollElementRef?: (element: HTMLDivElement | null) => void;
  /** Set to true to hide the gradient on the start side (top or left). */
  hideStartGradient?: boolean;
  /** Optional scroll handler. */
  onScroll?: React.UIEventHandler<HTMLDivElement>;
  /** Optional className for the scroll element. */
  scrollElementClassName?: string;
}

const componentName = 'ScrollGradient';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const ScrollGradient = forwardRef<HTMLDivElement, ScrollGradientProps>(
  (
    {
      children,
      className,
      color,
      getScrollElementRef = () => {},
      hideStartGradient = false,
      onScroll = () => {},
      scrollElementClassName,
      ...rest
    },
    ref
  ) => {
    const prefix = usePrefix();
    const blockClass = `${prefix}--scroll-gradient`;
    const fallbackColor = `var(--${prefix}-layer-01)`;
    const resolvedColor = color ?? fallbackColor;

    const scrollContainer = useRef<HTMLDivElement>(null);
    const contentChildrenContainer = useRef<HTMLDivElement>(null);
    const { xScrollable, yScrollable } = useIsOverflow(scrollContainer);

    const intersectionStartRef = useRef<HTMLSpanElement>(null);
    const intersectionEndRef = useRef<HTMLSpanElement>(null);
    const intersectionLeftRef = useRef<HTMLSpanElement>(null);
    const intersectionRightRef = useRef<HTMLSpanElement>(null);

    const startVerticalRef = useRef<HTMLDivElement>(null);
    const startHorizontalRef = useRef<HTMLDivElement>(null);
    const endVerticalRef = useRef<HTMLDivElement>(null);
    const endHorizontalRef = useRef<HTMLDivElement>(null);

    const [verticalPosition] = useState(ScrollStates.NONE);
    const [horizontalPosition] = useState(ScrollStates.NONE);

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

    useIsomorphicEffect(() => {
      if (startVerticalRef.current) {
        startVerticalRef.current.style.right = String(gradientRight);
        startVerticalRef.current.style.backgroundImage = `linear-gradient(0deg, transparent, ${resolvedColor} 90%)`;
      }
      if (startHorizontalRef.current) {
        startHorizontalRef.current.style.backgroundImage = `linear-gradient(-90deg, transparent, ${resolvedColor} 90%)`;
        startHorizontalRef.current.style.bottom = String(gradientBottom);
      }
      if (endVerticalRef.current) {
        endVerticalRef.current.style.right = String(gradientRight);
        endVerticalRef.current.style.bottom = String(gradientBottom);
        endVerticalRef.current.style.backgroundImage = `linear-gradient(0deg, ${resolvedColor} 10%, transparent)`;
      }
      if (endHorizontalRef.current) {
        endHorizontalRef.current.style.right = String(gradientRight);
        endHorizontalRef.current.style.bottom = String(gradientBottom);
        endHorizontalRef.current.style.backgroundImage = `linear-gradient(-90deg, ${resolvedColor} 10%, transparent)`;
      }
    }, [resolvedColor, gradientRight, gradientBottom]);

    const setGradientOnIntersection = (
      entry: IntersectionObserverEntry,
      gradientRef: React.RefObject<HTMLDivElement | null>
    ) => {
      if (gradientRef.current) {
        if (entry.isIntersecting) {
          gradientRef.current.style.opacity = '0';
          gradientRef.current.style.display = 'none';
          gradientRef.current.setAttribute('aria-hidden', 'false');
        } else {
          gradientRef.current.style.opacity = '1';
          gradientRef.current.style.display = 'block';
          gradientRef.current.setAttribute('aria-hidden', 'true');
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
        { root: null, rootMargin: '0px', threshold: 0.1 }
      );

      const startV = intersectionStartRef.current;
      const endV = intersectionEndRef.current;
      const startH = intersectionLeftRef.current;
      const endH = intersectionRightRef.current;
      if (startV) observer.observe(startV);
      if (endV) observer.observe(endV);
      if (startH) observer.observe(startH);
      if (endH) observer.observe(endH);

      return () => {
        if (startV) observer.unobserve(startV);
        if (endV) observer.unobserve(endV);
        if (startH) observer.unobserve(startH);
        if (endH) observer.unobserve(endH);
      };
    }, []);

    const setRefs = (element: HTMLDivElement | null) => {
      (
        scrollContainer as React.MutableRefObject<HTMLDivElement | null>
      ).current = element;
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
        data-component-name={componentName}
        ref={ref}
        role="presentation">
        <div
          className={cx(`${blockClass}__content`, scrollElementClassName)}
          onScroll={onScroll}
          ref={setRefs}>
          <span ref={intersectionStartRef} data-start-vertical />
          <span ref={intersectionLeftRef} data-start-horizontal />
          <div
            ref={contentChildrenContainer}
            className={`${blockClass}__content-children`}>
            {children}
          </div>
          <span ref={intersectionEndRef} data-end-vertical />
          <span ref={intersectionRightRef} data-end-horizontal />
        </div>

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

ScrollGradient.displayName = componentName;
