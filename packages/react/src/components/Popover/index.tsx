/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, {
  useRef,
  useMemo,
  useEffect,
  type ForwardedRef,
  type WeakValidationMap,
  type ElementType,
} from 'react';
import { useMergedRefs } from '../../internal/useMergedRefs';
import { usePrefix } from '../../internal/usePrefix';
import { type PolymorphicProps } from '../../types/common';
import { useWindowEvent } from '../../internal/useEvent';
import {
  useFloating,
  flip,
  autoUpdate,
  arrow,
  offset,
} from '@floating-ui/react';

interface PopoverContext {
  floating: React.Ref<HTMLSpanElement>;
}

const PopoverContext = React.createContext<PopoverContext>({
  floating: {
    current: null,
  },
  setFloating: {
    current: null,
  },
  caretRef: {
    current: null,
  },
  autoAlign: null,
});

export type PopoverAlignment =
  | 'top'
  | 'top-left' // deprecated
  | 'top-right' // deprecated
  | 'bottom'
  | 'bottom-left' // deprecated
  | 'bottom-right' // deprecated
  | 'left'
  | 'left-bottom' // deprecated
  | 'left-top' // deprecated
  | 'right'
  | 'right-bottom' // deprecated
  | 'right-top' // deprecated
  // new values to match floating-ui
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-end'
  | 'left-start'
  | 'right-end'
  | 'right-start';

interface PopoverBaseProps {
  /**
   * Specify how the popover should align with the trigger element
   */
  align?: PopoverAlignment;

  /**
   * Will auto-align the popover on first render if it is not visible. This prop is currently experimental and is subject to future changes.
   */
  autoAlign?: boolean;

  /**
   * Specify whether a caret should be rendered
   */
  caret?: boolean;

  /**
   * Provide elements to be rendered inside of the component
   */
  children?: React.ReactNode;

  /**
   * Provide a custom class name to be added to the outermost node in the
   * component
   */
  className?: string;

  /**
   * Specify whether a drop shadow should be rendered on the popover
   */
  dropShadow?: boolean;

  /**
   * Render the component using the high-contrast variant
   */
  highContrast?: boolean;

  /**
   * Render the component using the tab tip variant
   */
  isTabTip?: boolean;

  /**
   * Specify a handler for closing popover.
   * The handler should take care of closing the popover, e.g. changing the `open` prop.
   */
  onRequestClose?: () => void;

  /**
   * Specify whether the component is currently open or closed
   */
  open: boolean;
}

export type PopoverProps<E extends ElementType> = PolymorphicProps<
  E,
  PopoverBaseProps
>;

function PopoverRenderFunction<E extends ElementType = 'span'>(
  {
    isTabTip,
    align = isTabTip ? 'bottom-start' : 'bottom',
    as: BaseComponent = 'span' as E,
    autoAlign = false,
    caret = isTabTip ? false : true,
    className: customClassName,
    children,
    dropShadow = true,
    highContrast = false,
    onRequestClose,
    open,
    ...rest
  }: PopoverProps<E>,
  forwardRef: ForwardedRef<Element>
) {
  const prefix = usePrefix();
  const floating = useRef<HTMLSpanElement>(null);
  const setFloating = useRef<HTMLSpanElement>(null); // TODO could we consolidate this with `floating` if we rip out the old autoAlign functionality?
  const caretRef = useRef<HTMLSpanElement>(null); // TODO could we consolidate this with `floating` if we rip out the old autoAlign functionality?
  const popover = useRef<Element>(null);

  let shimmedAlign;
  switch (align) {
    case 'top-left':
      shimmedAlign = 'top-start';
      break;
    case 'top-right':
      shimmedAlign = 'top-end';
      break;
    case 'bottom-left':
      shimmedAlign = 'bottom-start';
      break;
    case 'bottom-right':
      shimmedAlign = 'bottom-end';
      break;
    case 'left-bottom':
      shimmedAlign = 'left-end';
      break;
    case 'left-top':
      shimmedAlign = 'left-start';
      break;
    case 'right-bottom':
      shimmedAlign = 'right-end';
      break;
    case 'right-top':
      shimmedAlign = 'right-start';
      break;
    default:
      shimmedAlign = align;
      break;
  }

  // If the `Popover` is the last focusable item in the tab order, it should also close when the browser window loses focus  (#12922)
  useWindowEvent('blur', () => {
    if (open) {
      onRequestClose?.();
    }
  });

  useWindowEvent('click', (event: Event) => {
    if (open && !popover?.current?.contains(event.target as Node)) {
      onRequestClose?.();
    }
  });

  const floatingUIConfig = autoAlign
    ? {
        placement: shimmedAlign,
        // Middleware order matters, arrow should be last
        middleware: [
          offset(10),
          flip(),
          arrow({
            element: caretRef,
          }),
        ],
        whileElementsMounted: autoUpdate,
      }
    : {};

  const { refs, floatingStyles, isPositioned, placement, middlewareData } =
    useFloating(floatingUIConfig);

  console.log(middlewareData);

  const value = useMemo(() => {
    return {
      floating,
      setFloating: refs.setFloating,
      caretRef,
      autoAlign: autoAlign,
    };
  }, [refs.setFloating, autoAlign]);

  if (isTabTip) {
    const tabTipAlignments: PopoverAlignment[] = ['bottom-start', 'bottom-end'];

    if (!tabTipAlignments.includes(align)) {
      shimmedAlign = 'bottom-start';
    }
  }

  useEffect(() => {
    if (autoAlign) {
      Object.keys(floatingStyles).forEach((style) => {
        refs.floating.current.style[style] = floatingStyles[style];
      });
    }
  }, [floatingStyles, refs.floating, autoAlign]);

  const ref = useMergedRefs([forwardRef, popover, refs.setReference]);
  const currentAlignment = autoAlign && placement !== align ? placement : align;
  const className = cx(
    {
      [`${prefix}--popover-container`]: true,
      [`${prefix}--popover--caret`]: caret,
      [`${prefix}--popover--drop-shadow`]: dropShadow,
      [`${prefix}--popover--high-contrast`]: highContrast,
      [`${prefix}--popover--open`]: open,
      // [`${prefix}--popover--auto-align`]: autoAlign,
      [`${prefix}--popover--${currentAlignment}`]: true,
      [`${prefix}--popover--tab-tip`]: isTabTip,
    },
    customClassName
  );

  const mappedChildren = React.Children.map(children, (child) => {
    const item = child as any;

    if (item?.type === 'button') {
      const { className } = item.props;
      const tabTipClasses = cx(
        `${prefix}--popover--tab-tip__button`,
        className
      );
      return React.cloneElement(item, {
        className: tabTipClasses,
      });
    } else {
      return item;
    }
  });

  const BaseComponentAsAny = BaseComponent as any;

  return (
    <>
      <PopoverContext.Provider value={value}>
        <BaseComponentAsAny {...rest} className={className} ref={ref}>
          {isTabTip ? mappedChildren : children}
        </BaseComponentAsAny>
      </PopoverContext.Provider>
      <div style={{ marginTop: '10rem', position: 'absolute' }}>
        <p>isPositioned: {isPositioned ? 'yes' : 'no'}</p>
        <p>placement: {placement}</p>
      </div>
    </>
  );
}

export const Popover = React.forwardRef(PopoverRenderFunction) as (<
  E extends ElementType = 'span'
>(
  props: PopoverProps<E>
) => JSX.Element) & {
  displayName?: string | undefined;
  propTypes?: WeakValidationMap<PopoverProps<any>> | undefined;
};

// Note: this displayName is temporarily set so that Storybook ArgTable
// correctly displays the name of this component
if (__DEV__) {
  Popover.displayName = 'Popover';
}

Popover.propTypes = {
  /**
   * Specify how the popover should align with the trigger element
  //  */
  // type Placement =
  // | 'top'
  // | 'top-start'
  // | 'top-end'
  // | 'right'
  // | 'right-start'
  // | 'right-end'
  // | 'bottom'
  // | 'bottom-start'
  // | 'bottom-end'
  // | 'left'
  // | 'left-start'
  // | 'left-end';
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
   * Provide a custom element or component to render the top-level node for the
   * component.
   */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),

  /**
   * Will auto-align the popover on first render if it is not visible. This prop is currently experimental and is subject to future changes.
   */
  autoAlign: PropTypes.bool,

  /**
   * Specify whether a caret should be rendered
   */
  caret: PropTypes.bool,

  /**
   * Provide elements to be rendered inside of the component
   */
  children: PropTypes.node,

  /**
   * Provide a custom class name to be added to the outermost node in the
   * component
   */
  className: PropTypes.string,

  /**
   * Specify whether a drop shadow should be rendered on the popover
   */
  dropShadow: PropTypes.bool,

  /**
   * Render the component using the high-contrast variant
   */
  highContrast: PropTypes.bool,

  /**
   * Render the component using the tab tip variant
   */
  isTabTip: PropTypes.bool,

  /**
   * Specify a handler for closing popover.
   * The handler should take care of closing the popover, e.g. changing the `open` prop.
   */
  onRequestClose: PropTypes.func,

  /**
   * Specify whether the component is currently open or closed
   */
  open: PropTypes.bool.isRequired,
};

export type PopoverContentProps = React.HTMLAttributes<HTMLSpanElement>;

function PopoverContentRenderFunction(
  // eslint-disable-next-line react/prop-types
  { className, children, ...rest }: PopoverContentProps,
  forwardRef: React.ForwardedRef<HTMLSpanElement>
) {
  const prefix = usePrefix();
  const { floating, setFloating, caretRef, autoAlign } =
    React.useContext(PopoverContext);
  const ref = useMergedRefs([floating, forwardRef, setFloating]);

  return (
    <span {...rest} className={`${prefix}--popover`}>
      <span className={cx(`${prefix}--popover-content`, className)} ref={ref}>
        {children}
      </span>
      <span
        className={cx({
          [`${prefix}--popover-caret`]: true,
          [`${prefix}--popover--auto-align`]: autoAlign,
        })}
        ref={caretRef}
      />
    </span>
  );
}

export const PopoverContent = React.forwardRef(PopoverContentRenderFunction);

PopoverContent.propTypes = {
  /**
   * Provide elements to be rendered inside of the component
   */
  children: PropTypes.node,

  /**
   * Provide a custom class name to be added to the outermost node in the
   * component
   */
  className: PropTypes.string,
};
