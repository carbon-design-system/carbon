/**
 * Copyright IBM Corp. 2023, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React, { ReactNode, useId, useRef, useState } from 'react';

import { blue90, purple70 } from '@carbon/colors';
import { CaretLeft, CaretRight, Close, Idea } from '@carbon/icons-react';
import Button from '../Button';
import { IconButton } from '../IconButton';
import cx from 'classnames';
import { useControllableState } from '../../internal/useControllableState';
import { usePrefix } from '../../internal/usePrefix';
import useGuidebannerScroll from './useGuidebannerScroll';

const componentName = 'Guidebanner';

export interface GuidebannerProps {
  /**
   * Provide the contents of the Guidebanner.
   * One or more GuidebannerElement components are required.
   */
  children: ReactNode;
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;
  /**
   * Tooltip text and aria label for the Close button icon.
   */
  closeIconDescription?: string;
  /**
   * Text label for the Collapse button.
   */
  collapseButtonLabel?: string;
  /**
   * When true, the Guidebanner will initialize in a collapsed state,
   * showing the title and the Expand button.
   *
   * When expanded, it will show the GuidebannerElement child components
   * and the Collapse button.
   */
  collapsible?: boolean;
  /**
   * Text label for the Expand button.
   */
  expandButtonLabel?: string;
  /**
   * Tooltip text and aria label for the Next button icon.
   */
  nextIconDescription?: string;
  /**
   * A handler for managing the controlled state of the open prop. If not
   * passed the open prop will not be honoured and an uncontrolled state
   * will be used.
   */
  onChange?: (value: boolean) => void;
  /**
   * If defined, a Close button will render in the top-right corner and a
   * callback function will be triggered when the button is clicked.
   */
  onClose?: () => void;
  /**
   * For controlled usage of the tile open state. This prop only works when
   * an onChange prop is also passed, otherwise an uncontrolled state is used.
   */
  open?: boolean;
  /**
   * Tooltip text and aria label for the Back button icon.
   */
  previousIconDescription?: string;
  /**
   * Title text.
   */
  title: string;
  /**
   * If true, insert 1 rem of "space" on the left of the component.
   * This will allow the component's content to line up with other content
   * on the page under special circumstances.
   */
  withLeftGutter?: boolean;
}

const defaults = {
  collapsible: false,
  withLeftGutter: false,
  // Labels
  closeIconDescription: 'Close',
  collapseButtonLabel: 'Read less',
  expandButtonLabel: 'Read more',
  nextIconDescription: 'Next',
  previousIconDescription: 'Back',
};

/**
 * The guide banner sits at the top of a page, or page-level tab,
 * to introduce foundational concepts related to the page's content.
 */
export const Guidebanner = React.forwardRef<HTMLDivElement, GuidebannerProps>(
  (props, ref) => {
    const {
      children,
      className,
      closeIconDescription = defaults.closeIconDescription,
      collapseButtonLabel = defaults.collapseButtonLabel,
      collapsible = defaults.collapsible,
      expandButtonLabel = defaults.expandButtonLabel,
      nextIconDescription = defaults.nextIconDescription,
      onChange,
      onClose,
      open: userOpen,
      previousIconDescription = defaults.previousIconDescription,
      title,
      withLeftGutter = defaults.withLeftGutter,
      ...rest
    } = props;

    const prefix = usePrefix();
    const blockClass = `${prefix}--guidebanner`;

    const toggleRef = useRef<HTMLButtonElement | null>(null);
    const [scrollPosition, setScrollPosition] = useState<number>(0);
    const [showNavigation, setShowNavigation] = useState<boolean>(false);
    const [open, setOpen] = useControllableState({
      value: onChange ? userOpen : undefined,
      onChange,
      defaultValue: userOpen ?? true,
    });

    const rawId = useId();
    const carouselContentId = `${rawId}--carousel-content-id`;

    const {
      scrollRef,
      carouselRef,
      leftFadedEdgeRef,
      rightFadedEdgeRef,
      childElementsRef,
      handle,
    } = useGuidebannerScroll({
      onScroll: (scrollPercent) => {
        setScrollPosition(scrollPercent);
      },
      onChangeIsScrollable: (value) => {
        setShowNavigation(value);
      },
      fadedEdgeColor: { left: blue90, right: purple70 },
    });

    const handleClickToggle = () => {
      setOpen(!open);
    };

    return (
      <div
        {...rest}
        aria-owns={open ? carouselContentId : undefined}
        className={cx(
          blockClass,
          className,
          collapsible && `${blockClass}__collapsible`,
          !open && `${blockClass}__collapsible-collapsed`,
          withLeftGutter && `${blockClass}__with-left-gutter`
        )}
        data-component-name={componentName}
        ref={ref}>
        <Idea size={20} className={`${blockClass}__icon-idea`} />
        <div className={`${blockClass}__title`}>{title}</div>

        <div
          ref={carouselRef}
          tabIndex={-1}
          id={carouselContentId}
          className={cx(`${blockClass}__carousel`)}>
          <div className={`${blockClass}__carousel-elements-container`}>
            <div className={`${blockClass}__carousel-elements`} ref={scrollRef}>
              {React.Children.map(children, (child, index) => (
                <div
                  key={index}
                  className={`${blockClass}__item`}
                  ref={(el) => {
                    childElementsRef.current[index] = el;
                  }}>
                  {child}
                </div>
              ))}
            </div>
            <div
              ref={leftFadedEdgeRef}
              className={`${blockClass}__carousel-elements-container--scrolled`}
            />
            <div
              ref={rightFadedEdgeRef}
              className={`${blockClass}__carousel-elements-container--scroll-max`}
            />
          </div>
        </div>

        <div
          className={cx([
            collapsible || showNavigation ? `${blockClass}__navigation` : null,
          ])}>
          {collapsible && (
            <Button
              kind="ghost"
              size="md"
              className={`${blockClass}__toggle-button`}
              onClick={handleClickToggle}
              ref={toggleRef}
              aria-controls={!open ? carouselContentId : undefined}
              aria-expanded={open}>
              {open ? collapseButtonLabel : expandButtonLabel}
            </Button>
          )}

          {showNavigation && (
            <>
              <span
                className={cx(`${blockClass}__back-button`, [
                  scrollPosition === 0
                    ? `${blockClass}__back-button--disabled`
                    : null,
                ])}>
                <IconButton
                  align="top"
                  disabled={scrollPosition === 0}
                  kind="ghost"
                  label={previousIconDescription}
                  onClick={() => {
                    handle.scrollPrev();
                  }}
                  size="md">
                  <CaretLeft size={16} />
                </IconButton>
              </span>
              <span
                className={cx(`${blockClass}__next-button`, [
                  scrollPosition === 1
                    ? `${blockClass}__next-button--disabled`
                    : null,
                ])}>
                <IconButton
                  align="top-right"
                  disabled={scrollPosition === 1}
                  kind="ghost"
                  label={nextIconDescription}
                  onClick={() => {
                    handle.scrollNext();
                  }}
                  size="md">
                  <CaretRight size={16} />
                </IconButton>
              </span>
            </>
          )}
        </div>

        {onClose && (
          <span className={`${blockClass}__close-button`}>
            <IconButton
              align="bottom-end"
              kind="ghost"
              label={closeIconDescription}
              onClick={onClose}
              size="md">
              <Close size={16} />
            </IconButton>
          </span>
        )}
      </div>
    );
  }
);

Guidebanner.displayName = componentName;
