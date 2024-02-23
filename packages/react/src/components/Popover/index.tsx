/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @ts-nocheck

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
import useIsomorphicEffect from '../../internal/useIsomorphicEffect';
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
  // the refs below are new from floating-ui work
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
  const caretRef = useRef<HTMLSpanElement>(null);
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

  const popoverDimensions = useRef();
  useIsomorphicEffect(() => {
    // The popover is only offset when a caret is present. Technically, the custom properties
    // accessed below can be set by a user even if caret=false, but doing so does not follow
    // the design specification for Popover.
    if (caret) {
      // Gather the dimensions of the caret and prefer the values set via custom properties.
      // If a value is not set via a custom property, provide a default value that matches the
      // default values defined in the sass style file
      const getStyle = window.getComputedStyle(popover.current, null);
      const offsetProperty = getStyle.getPropertyValue('--cds-popover-offset');
      const caretProperty = getStyle.getPropertyValue(
        '--cds-popover-caret-height'
      );

      // Handle if the property value is in px or rem.
      // We want to store just the base number value without a unit suffix
      const offsetPropertyValue = offsetProperty.includes('px')
        ? offsetProperty.split('px', 1)[0] * 1
        : offsetProperty.split('rem', 1)[0] * 16;

      const caretPropertyValue = caretProperty.includes('px')
        ? caretProperty.split('px', 1)[0] * 1
        : caretProperty.split('rem', 1)[0] * 16;

      popoverDimensions.current = {
        // 10 and 6 are the defaults defined in packages/styles/scss/components/popover/_popover.scss
        offset: offsetProperty ? offsetPropertyValue : 10,
        caretHeight: caretProperty ? caretPropertyValue : 6,
      };

      console.log(`popoverDimensions`);
      console.dir(popoverDimensions);
    }
  });

  const floatingUIConfig = autoAlign
    ? {
        placement: shimmedAlign,

        // The floating element is positioned relative to its nearest
        // containing block (usually the viewport). It will in many cases also
        // “break” the floating element out of a clipping ancestor.
        // https://floating-ui.com/docs/misc#clipping
        strategy: 'fixed',

        // Middleware order matters, arrow should be last
        middleware: [
          offset(popoverDimensions?.current?.offset),
          flip({ fallbackAxisSideDirection: 'start' }),
          arrow({
            element: caretRef,
          }),
        ],
        whileElementsMounted: autoUpdate,
      }
    : {};

  const { refs, floatingStyles, placement, middlewareData } =
    useFloating(floatingUIConfig);

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

      if (caret && middlewareData && middlewareData.arrow) {
        const { x, y } = middlewareData.arrow;

        const staticSide = {
          top: 'bottom',
          right: 'left',
          bottom: 'top',
          left: 'right',
        }[placement.split('-')[0]];

        caretRef.current.style.left = x != null ? `${x}px` : '';
        caretRef.current.style.top = y != null ? `${y}px` : '';

        // Ensure the static side gets unset when flipping to other placements' axes.
        caretRef.current.style.right = '';
        caretRef.current.style.bottom = '';

        caretRef.current.style[staticSide] = `${-popoverDimensions?.current
          ?.caretHeight}px`;
      }
    }
  }, [
    floatingStyles,
    refs.floating,
    autoAlign,
    middlewareData,
    placement,
    caret,
  ]);

  console.log(`-----------`);
  console.log(floatingStyles);
  console.dir(refs);
  console.log(`floating ref:`);
  console.dir(refs.floating.current);
  console.log(`reference ref:`);
  console.dir(refs.reference.current); // TODO this is undefined for toggletip and needs fixed
  console.log(autoAlign);
  console.log(placement);
  console.log(middlewareData);
  console.log(popoverDimensions?.current?.offset);
  console.log(`-----------`);

  const ref = useMergedRefs([forwardRef, popover]);
  const currentAlignment = autoAlign && placement !== align ? placement : align;
  const className = cx(
    {
      [`${prefix}--popover-container`]: true,
      [`${prefix}--popover--caret`]: caret,
      [`${prefix}--popover--drop-shadow`]: dropShadow,
      [`${prefix}--popover--high-contrast`]: highContrast,
      [`${prefix}--popover--open`]: open,
      [`${prefix}--popover--auto-align`]: autoAlign,
      [`${prefix}--popover--${currentAlignment}`]: true,
      [`${prefix}--popover--tab-tip`]: isTabTip,
    },
    customClassName
  );

  const mappedChildren = React.Children.map(children, (child) => {
    const item = child as any;
    const { className, ref } = item.props;
    const tabTipClasses = cx(`${prefix}--popover--tab-tip__button`, className);

    return React.cloneElement(item, {
      className: item?.type === 'button' ? tabTipClasses : className,

      // With cloneElement, if you pass a `ref`, it overrides the original ref.
      // https://react.dev/reference/react/cloneElement#parameters
      // The block below works around this and ensures that the original ref is still
      // called while allowing the floating-ui reference element to be set as well.
      // `useMergedRefs` can't be used here because hooks can't be called from within a callback.
      // More here: https://github.com/facebook/react/issues/8873#issuecomment-489579878
      ref: (node) => {
        if (autoAlign && item?.type?.displayName !== 'PopoverContent') {
          // Set the reference element for floating-ui
          refs.setReference(node);
        }

        // Call the original ref, if any
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref !== null && ref !== undefined) {
          ref.current = node;
        }
      },
    });
  });

  const BaseComponentAsAny = BaseComponent as any;

  return (
    <PopoverContext.Provider value={value}>
      <BaseComponentAsAny {...rest} className={className} ref={ref}>
        {mappedChildren}
      </BaseComponentAsAny>
    </PopoverContext.Provider>
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
  const { setFloating, caretRef, autoAlign } = React.useContext(PopoverContext);
  const ref = useMergedRefs([setFloating, forwardRef]);

  return (
    <span {...rest} className={`${prefix}--popover`}>
      <span className={cx(`${prefix}--popover-content`, className)} ref={ref}>
        {children}
        {autoAlign && (
          <span
            className={cx({
              [`${prefix}--popover-caret`]: true,
              [`${prefix}--popover--auto-align`]: true,
            })}
            ref={caretRef}
          />
        )}
      </span>
      {!autoAlign && (
        <span
          className={cx({
            [`${prefix}--popover-caret`]: true,
          })}
          ref={caretRef}
        />
      )}
    </span>
  );
}

export const PopoverContent = React.forwardRef(PopoverContentRenderFunction);
PopoverContent.displayName = 'PopoverContent';

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
