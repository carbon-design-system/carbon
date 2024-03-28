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
import useIsomorphicEffect from '../../internal/useIsomorphicEffect';
import { useMergedRefs } from '../../internal/useMergedRefs';
import { usePrefix } from '../../internal/usePrefix';
import { type PolymorphicProps } from '../../types/common';
import { useWindowEvent } from '../../internal/useEvent';
import { mapPopoverAlignProp } from '../../tools/createPropAdapter';
import {
  useFloating,
  flip,
  autoUpdate,
  arrow,
  offset,
} from '@floating-ui/react';

interface PopoverContext {
  setFloating: React.Ref<HTMLSpanElement>;
  caretRef: React.Ref<HTMLSpanElement>;
  autoAlign: boolean | null;
}

const PopoverContext = React.createContext<PopoverContext>({
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

export interface PopoverComponent {
  <E extends ElementType = 'span'>(
    props: PopoverProps<E> & { forwardRef?: ForwardedRef<ElementType> }
  ): JSX.Element | null;
  displayName?: string;
  propTypes?: WeakValidationMap<PopoverProps<any>>;
}

export const Popover: PopoverComponent = React.forwardRef(
  function PopoverRenderFunction<E extends ElementType = 'span'>(
    {
      isTabTip,
      align: initialAlign = isTabTip ? 'bottom-start' : 'bottom',
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
    let align = mapPopoverAlignProp(initialAlign);

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

    // Slug styling places a border around the popover content so the caret
    // needs to be placed 1px further outside the popover content. To do so,
    // we look to see if any of the children has a className containing "slug"
    const initialCaretHeight = React.Children.toArray(children).some((x) => {
      return (x as any)?.props?.className?.includes('slug');
    })
      ? 7
      : 6;
    // These defaults match the defaults defined in packages/styles/scss/components/popover/_popover.scss
    const popoverDimensions = useRef({
      offset: 10,
      caretHeight: initialCaretHeight,
    });

    useIsomorphicEffect(() => {
      // The popover is only offset when a caret is present. Technically, the custom properties
      // accessed below can be set by a user even if caret=false, but doing so does not follow
      // the design specification for Popover.
      if (caret && popover.current) {
        // Gather the dimensions of the caret and prefer the values set via custom properties.
        // If a value is not set via a custom property, provide a default value that matches the
        // default values defined in the sass style file
        const getStyle = window.getComputedStyle(popover.current, null);
        const offsetProperty = getStyle.getPropertyValue(
          '--cds-popover-offset'
        );
        const caretProperty = getStyle.getPropertyValue(
          '--cds-popover-caret-height'
        );

        // Handle if the property values are in px or rem.
        // We want to store just the base number value without a unit suffix
        if (offsetProperty) {
          popoverDimensions.current.offset = offsetProperty.includes('px')
            ? Number(offsetProperty.split('px', 1)[0]) * 1
            : Number(offsetProperty.split('rem', 1)[0]) * 16;
        }

        if (caretProperty) {
          popoverDimensions.current.caretHeight = caretProperty.includes('px')
            ? Number(caretProperty.split('px', 1)[0]) * 1
            : Number(caretProperty.split('rem', 1)[0]) * 16;
        }
      }
    });

    const { refs, floatingStyles, placement, middlewareData } = useFloating(
      autoAlign
        ? {
            placement: align,

            // The floating element is positioned relative to its nearest
            // containing block (usually the viewport). It will in many cases also
            // “break” the floating element out of a clipping ancestor.
            // https://floating-ui.com/docs/misc#clipping
            strategy: 'fixed',

            // Middleware order matters, arrow should be last
            middleware: [
              offset(!isTabTip ? popoverDimensions?.current?.offset : 0),
              flip({ fallbackAxisSideDirection: 'start' }),
              arrow({
                element: caretRef,
              }),
            ],
            whileElementsMounted: autoUpdate,
          }
        : {} // When autoAlign is turned off, floating-ui will not be used
    );

    const value = useMemo(() => {
      return {
        floating,
        setFloating: refs.setFloating,
        caretRef,
        autoAlign: autoAlign,
      };
    }, [refs.setFloating, autoAlign]);

    if (isTabTip) {
      const tabTipAlignments: PopoverAlignment[] = [
        'bottom-start',
        'bottom-end',
      ];

      if (!tabTipAlignments.includes(align)) {
        align = 'bottom-start';
      }
    }

    useEffect(() => {
      if (autoAlign) {
        Object.keys(floatingStyles).forEach((style) => {
          if (refs.floating.current) {
            refs.floating.current.style[style] = floatingStyles[style];
          }
        });

        if (
          caret &&
          middlewareData &&
          middlewareData.arrow &&
          caretRef?.current
        ) {
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

          if (staticSide) {
            caretRef.current.style[staticSide] = `${-popoverDimensions?.current
              ?.caretHeight}px`;
          }
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

    const ref = useMergedRefs([forwardRef, popover]);
    const currentAlignment =
      autoAlign && placement !== align ? placement : align;
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

      if (
        (item?.type === 'button' ||
          (autoAlign && item?.type?.displayName !== 'PopoverContent') ||
          (autoAlign && item?.type?.displayName === 'ToggletipButton')) &&
        React.isValidElement(item)
      ) {
        const className = (item?.props as any)?.className;
        const ref = (item?.props as any).ref;
        const tabTipClasses = cx(
          `${prefix}--popover--tab-tip__button`,
          className
        );

        return React.cloneElement(item as any, {
          className:
            isTabTip && item?.type === 'button'
              ? tabTipClasses
              : className || '',

          // With cloneElement, if you pass a `ref`, it overrides the original ref.
          // https://react.dev/reference/react/cloneElement#parameters
          // The block below works around this and ensures that the original ref is still
          // called while allowing the floating-ui reference element to be set as well.
          // `useMergedRefs` can't be used here because hooks can't be called from within a callback.
          // More here: https://github.com/facebook/react/issues/8873#issuecomment-489579878
          ref: (node) => {
            // For a popover, there isn't an explicit trigger component, it's just the first child that's
            // passed in which should *not* be PopoverContent.
            // For a toggletip there is a specific trigger component, ToggletipButton.
            // In either of these caes we want to set this as the reference node for floating-ui autoAlign
            // positioning.
            if (
              (autoAlign &&
                (item?.type as any)?.displayName !== 'PopoverContent') ||
              (autoAlign &&
                (item?.type as any)?.displayName === 'ToggletipButton')
            ) {
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
      } else {
        return item;
      }
    });

    const BaseComponentAsAny = BaseComponent as any;

    return (
      <PopoverContext.Provider value={value}>
        <BaseComponentAsAny {...rest} className={className} ref={ref}>
          {autoAlign || isTabTip ? mappedChildren : children}
        </BaseComponentAsAny>
      </PopoverContext.Provider>
    );
  }
);

// Note: this displayName is temporarily set so that Storybook ArgTable
// correctly displays the name of this component
if (__DEV__) {
  Popover.displayName = 'Popover';
}

Popover.propTypes = {
  /**
   * Specify how the popover should align with the trigger element
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
