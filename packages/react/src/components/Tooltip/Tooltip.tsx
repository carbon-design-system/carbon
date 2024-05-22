/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Popover, PopoverAlignment, PopoverContent } from '../Popover';
import { keys, match } from '../../internal/keyboard';
import { useDelayedState } from '../../internal/useDelayedState';
import { useId } from '../../internal/useId';
import { useNoInteractiveChildren } from '../../internal/useNoInteractiveChildren';
import { usePrefix } from '../../internal/usePrefix';
import { type PolymorphicProps } from '../../types/common';

/**
 * Event types that trigger a "drag" to stop.
 */
const DRAG_STOP_EVENT_TYPES = new Set(['mouseup', 'touchend', 'touchcancel']);

interface TooltipBaseProps {
  /**
   * Specify how the trigger should align with the tooltip
   */
  align?: PopoverAlignment;

  /**
   * Pass in the child to which the tooltip will be applied
   */
  children?: React.ReactElement;

  /**
   * Specify an optional className to be applied to the container node
   */
  className?: string;

  /**
   * Determines whether the tooltip should close when inner content is activated (click, Enter or Space)
   */
  closeOnActivation?: boolean;

  /**
   * Specify whether the tooltip should be open when it first renders
   */
  defaultOpen?: boolean;

  /**
   * Provide the description to be rendered inside of the Tooltip. The
   * description will use `aria-describedby` and will describe the child node
   * in addition to the text rendered inside of the child. This means that if you
   * have text in the child node, that it will be announced alongside the
   * description to the screen reader.
   *
   * Note: if label and description are both provided, label will be used and
   * description will not be used
   */
  description?: React.ReactNode;

  /**
   * Specify the duration in milliseconds to delay before displaying the tooltip
   */
  enterDelayMs?: number;

  /**
   * Provide the label to be rendered inside of the Tooltip. The label will use
   * `aria-labelledby` and will fully describe the child node that is provided.
   * This means that if you have text in the child node, that it will not be
   * announced to the screen reader.
   *
   * Note: if label and description are both provided, description will not be
   * used
   */
  label?: React.ReactNode;

  /**
   * Specify the duration in milliseconds to delay before hiding the tooltip
   */
  leaveDelayMs?: number;
}

export type TooltipProps<T extends React.ElementType> = PolymorphicProps<
  T,
  TooltipBaseProps
>;

function Tooltip<T extends React.ElementType>({
  align = 'top',
  className: customClassName,
  children,
  label,
  description,
  enterDelayMs = 100,
  leaveDelayMs = 300,
  defaultOpen = false,
  closeOnActivation = false,
  ...rest
}: TooltipProps<T>) {
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useDelayedState(defaultOpen);
  const [isDragging, setIsDragging] = useState(false);
  const [focusByMouse, setFocusByMouse] = useState(false);
  const [isPointerIntersecting, setIsPointerIntersecting] = useState(false);
  const id = useId('tooltip');
  const prefix = usePrefix();
  const child = React.Children.only(children);

  const triggerProps = {
    onFocus: () => !focusByMouse && setOpen(true),
    onBlur: () => {
      setOpen(false);
      setFocusByMouse(false);
    },
    onClick: () => closeOnActivation && setOpen(false),
    // This should be placed on the trigger in case the element is disabled
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseMove: onMouseMove,
    onTouchStart: onDragStart,
  };

  function getChildEventHandlers(childProps: any) {
    const eventHandlerFunctions = Object.keys(triggerProps).filter((prop) =>
      prop.startsWith('on')
    );
    const eventHandlers = {};
    eventHandlerFunctions.forEach((functionName) => {
      eventHandlers[functionName] = (evt: React.SyntheticEvent) => {
        triggerProps[functionName](evt);
        if (childProps?.[functionName]) {
          childProps?.[functionName](evt);
        }
      };
    });
    return eventHandlers;
  }

  if (label) {
    triggerProps['aria-labelledby'] = id;
  } else {
    triggerProps['aria-describedby'] = id;
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (open && match(event, keys.Escape)) {
      event.stopPropagation();
      setOpen(false);
    }
    if (
      open &&
      closeOnActivation &&
      (match(event, keys.Enter) || match(event, keys.Space))
    ) {
      setOpen(false);
    }
  }

  function onMouseEnter() {
    // Interactive Tags should not support onMouseEnter
    if (!rest?.onMouseEnter?.()) {
      setIsPointerIntersecting(true);
      setOpen(true, enterDelayMs);
    }
  }

  function onMouseDown() {
    setFocusByMouse(true);
    onDragStart();
  }

  function onMouseLeave() {
    setIsPointerIntersecting(false);
    if (isDragging) {
      return;
    }
    setOpen(false, leaveDelayMs);
  }

  function onMouseMove(evt) {
    if (evt.buttons === 1) {
      setIsDragging(true);
    } else {
      setIsDragging(false);
    }
  }

  function onDragStart() {
    setIsDragging(true);
  }

  const onDragStop = useCallback(() => {
    setIsDragging(false);
    // Close the tooltip, unless the mouse pointer is within the bounds of the
    // trigger.
    if (!isPointerIntersecting) {
      setOpen(false, leaveDelayMs);
    }
  }, [isPointerIntersecting, leaveDelayMs, setOpen]);

  useNoInteractiveChildren(
    tooltipRef,
    'The Tooltip component must have no interactive content rendered by the' +
      '`label` or `description` prop'
  );

  useEffect(() => {
    if (isDragging) {
      // Register drag stop handlers.
      DRAG_STOP_EVENT_TYPES.forEach((eventType) => {
        document.addEventListener(eventType, onDragStop);
      });
    }
    return () => {
      DRAG_STOP_EVENT_TYPES.forEach((eventType) => {
        document.removeEventListener(eventType, onDragStop);
      });
    };
  }, [isDragging, onDragStop]);

  return (
    <Popover<any>
      {...rest}
      align={align}
      className={cx(`${prefix}--tooltip`, customClassName)}
      dropShadow={false}
      highContrast
      onKeyDown={onKeyDown}
      onMouseLeave={onMouseLeave}
      open={open}>
      <div className={`${prefix}--tooltip-trigger__wrapper`}>
        {child !== undefined
          ? React.cloneElement(child, {
              ...triggerProps,
              ...getChildEventHandlers(child.props),
            })
          : null}
      </div>
      <PopoverContent
        aria-hidden={open ? 'false' : 'true'}
        className={`${prefix}--tooltip-content`}
        id={id}
        role="tooltip">
        {label || description}
      </PopoverContent>
    </Popover>
  );
}

Tooltip.propTypes = {
  /**
   * Specify how the trigger should align with the tooltip
   */
  align: PropTypes.oneOf([
    'top',
    'top-left', // deprecated use top-start instead
    'top-right', // deprecated use top-end instead

    'bottom',
    'bottom-left', // deprecated use bottom-start instead
    'bottom-right', // deprecated use bottom-end instead

    'left',
    'left-bottom', // deprecated use left-end instead
    'left-top', // deprecated use left-start instead

    'right',
    'right-bottom', // deprecated use right-end instead
    'right-top', // deprecated use right-start instead

    // new values to match floating-ui
    'top-start',
    'top-end',
    'bottom-start',
    'bottom-end',
    'left-end',
    'left-start',
    'right-end',
    'right-start',
  ]),

  /**
   * Pass in the child to which the tooltip will be applied
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Determines wether the tooltip should close when inner content is activated (click, Enter or Space)
   */
  closeOnActivation: PropTypes.bool,

  /**
   * Specify whether the tooltip should be open when it first renders
   */
  defaultOpen: PropTypes.bool,

  /**
   * Provide the description to be rendered inside of the Tooltip. The
   * description will use `aria-describedby` and will describe the child node
   * in addition to the text rendered inside of the child. This means that if you
   * have text in the child node, that it will be announced alongside the
   * description to the screen reader.
   *
   * Note: if label and description are both provided, label will be used and
   * description will not be used
   */
  description: PropTypes.node,

  /**
   * Specify the duration in milliseconds to delay before displaying the tooltip
   */
  enterDelayMs: PropTypes.number,

  /**
   * Provide the label to be rendered inside of the Tooltip. The label will use
   * `aria-labelledby` and will fully describe the child node that is provided.
   * This means that if you have text in the child node, that it will not be
   * announced to the screen reader.
   *
   * Note: if label and description are both provided, description will not be
   * used
   */
  label: PropTypes.node,

  /**
   * Specify the duration in milliseconds to delay before hiding the tooltip
   */
  leaveDelayMs: PropTypes.number,
};

export { Tooltip };
