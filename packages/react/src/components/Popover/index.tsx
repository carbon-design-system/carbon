/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes, { WeakValidationMap } from 'prop-types';
import { deprecateValuesWithin } from '../../prop-types/deprecateValuesWithin';
import React, { useEffect, useMemo, useRef, type ElementType } from 'react';
import useIsomorphicEffect from '../../internal/useIsomorphicEffect';
import { useMergedRefs } from '../../internal/useMergedRefs';
import { usePrefix } from '../../internal/usePrefix';
import { useWindowEvent, useEvent } from '../../internal/useEvent';
import { mapPopoverAlign } from '../../tools/mapPopoverAlign';
import {
  useFloating,
  flip,
  hide,
  autoUpdate,
  arrow,
  offset,
  type Boundary,
} from '@floating-ui/react';
import { useFeatureFlag } from '../FeatureFlags';
import { PolymorphicComponentPropWithRef } from '../../internal/PolymorphicProps';

export interface PopoverContext {
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

/**
 * Deprecated popover alignment values.
 * @deprecated Use NewPopoverAlignment instead.
 */
export type DeprecatedPopoverAlignment =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'left-bottom'
  | 'left-top'
  | 'right-bottom'
  | 'right-top';

export type NewPopoverAlignment =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-end'
  | 'left-start'
  | 'right-end'
  | 'right-start';

export type PopoverAlignment = DeprecatedPopoverAlignment | NewPopoverAlignment;

export interface PopoverBaseProps {
  /**
   * Specify how the popover should align with the trigger element.
   */
  align?: PopoverAlignment;

  /**
   * **Experimental:** Provide an offset value for alignment axis. Only takes effect when `autoalign` is enabled.
   */
  alignmentAxisOffset?: number;

  /**
   * Specify the background token to use. Default is 'layer'.
   */
  backgroundToken?: 'layer' | 'background';

  /**
   * Will auto-align the popover on first render if it is not visible. This prop
   * is currently experimental and is subject to future changes. Requires
   * React v17+
   * @see https://github.com/carbon-design-system/carbon/issues/18714
   */
  autoAlign?: boolean;

  /**
   * Specify a bounding element to be used for autoAlign calculations. The viewport is used by default. This prop is currently experimental and is subject to future changes.
   */
  autoAlignBoundary?: Boundary;

  /**
   * Specify whether a caret should be rendered
   */
  caret?: boolean;

  /**
   * Specify whether a border should be rendered on the popover
   */
  border?: boolean;

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

export type PopoverProps<E extends React.ElementType> =
  PolymorphicComponentPropWithRef<E, PopoverBaseProps>;
export type PopoverComponent = <E extends React.ElementType = 'span'>(
  props: PopoverProps<E>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
) => React.ReactElement | any;

export const Popover: PopoverComponent & {
  displayName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  propTypes?: WeakValidationMap<PopoverProps<any>>;
} = React.forwardRef(function PopoverRenderFunction<
  E extends ElementType = 'span',
>(
  {
    isTabTip,
    align: initialAlign = isTabTip ? 'bottom-start' : 'bottom',
    as: BaseComponent = 'span' as E,
    autoAlign = false,
    autoAlignBoundary,
    backgroundToken = 'layer',
    caret = isTabTip ? false : true,
    className: customClassName,
    children,
    border = false,
    dropShadow = true,
    highContrast = false,
    onRequestClose,
    open,
    alignmentAxisOffset,
    ...rest
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  }: any,
  //this is a workaround, have to come back and fix this.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  forwardRef: any
) {
  const prefix = usePrefix();
  const floating = useRef<HTMLSpanElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const popover = useRef<Element>(null);
  const enableFloatingStyles =
    useFeatureFlag('enable-v12-dynamic-floating-styles') || autoAlign;

  let align = mapPopoverAlign(initialAlign);

  // The `Popover` should close whenever it and its children loses focus
  useEvent(popover, 'focusout', (event) => {
    const relatedTarget = (event as FocusEvent).relatedTarget as Node | null;
    if (isTabTip) {
      if (relatedTarget && !popover.current?.contains(relatedTarget)) {
        onRequestClose?.();
      }
      return;
    }

    if (!relatedTarget) {
      onRequestClose?.();
      return;
    }

    const isOutsideMainContainer = !popover.current?.contains(relatedTarget);
    const isOutsideFloating =
      enableFloatingStyles && refs.floating.current
        ? !refs.floating.current.contains(relatedTarget)
        : true;

    // Only close if focus moved outside both containers
    if (isOutsideMainContainer && isOutsideFloating) {
      onRequestClose?.();
    }
  });

  useWindowEvent('click', ({ target }) => {
    if (open && target instanceof Node && !popover.current?.contains(target)) {
      onRequestClose?.();
    }
  });

  // Slug styling places a border around the popover content so the caret
  // needs to be placed 1px further outside the popover content. To do so,
  // we look to see if any of the children has a className containing "slug"
  const initialCaretHeight = React.Children.toArray(children).some((x) => {
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      (x as any)?.props?.className?.includes('slug') ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      (x as any)?.props?.className?.includes('ai-label')
    );
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
        `--${prefix}-popover-offset`
      );
      const caretProperty = getStyle.getPropertyValue(
        `--${prefix}-popover-caret-height`
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
    enableFloatingStyles
      ? {
          placement: align,

          // The floating element is positioned relative to its nearest
          // containing block (usually the viewport). It will in many cases also
          // “break” the floating element out of a clipping ancestor.
          // https://floating-ui.com/docs/misc#clipping
          strategy: 'fixed',

          // Middleware order matters, arrow should be last
          middleware: [
            offset(
              !isTabTip
                ? {
                    alignmentAxis: alignmentAxisOffset,
                    mainAxis: popoverDimensions?.current?.offset,
                  }
                : 0
            ),
            autoAlign &&
              flip({
                fallbackPlacements: isTabTip
                  ? align.includes('bottom')
                    ? ['bottom-start', 'bottom-end', 'top-start', 'top-end']
                    : ['top-start', 'top-end', 'bottom-start', 'bottom-end']
                  : align.includes('bottom')
                    ? [
                        'bottom',
                        'bottom-start',
                        'bottom-end',
                        'right',
                        'right-start',
                        'right-end',
                        'left',
                        'left-start',
                        'left-end',
                        'top',
                        'top-start',
                        'top-end',
                      ]
                    : [
                        'top',
                        'top-start',
                        'top-end',
                        'left',
                        'left-start',
                        'left-end',
                        'right',
                        'right-start',
                        'right-end',
                        'bottom',
                        'bottom-start',
                        'bottom-end',
                      ],

                fallbackStrategy: 'initialPlacement',
                fallbackAxisSideDirection: 'start',
                boundary: autoAlignBoundary,
              }),
            arrow({
              element: caretRef,
              padding: 16,
            }),
            autoAlign && hide(),
          ],
          whileElementsMounted: autoUpdate,
        }
      : {}
    // When autoAlign is turned off & the `enable-v12-dynamic-floating-styles` feature flag is not
    // enabled, floating-ui will not be used
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
    const tabTipAlignments: PopoverAlignment[] = ['bottom-start', 'bottom-end'];

    if (!tabTipAlignments.includes(align)) {
      align = 'bottom-start';
    }
  }

  useEffect(() => {
    if (enableFloatingStyles) {
      const updatedFloatingStyles = {
        ...floatingStyles,
        visibility: middlewareData.hide?.referenceHidden ? 'hidden' : 'visible',
      };
      Object.keys(updatedFloatingStyles).forEach((style) => {
        if (refs.floating.current) {
          refs.floating.current.style[style] = updatedFloatingStyles[style];
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
    enableFloatingStyles,
    middlewareData,
    placement,
    caret,
  ]);

  const ref = useMergedRefs([forwardRef, popover]);
  const currentAlignment = autoAlign && placement !== align ? placement : align;
  const className = cx(
    {
      [`${prefix}--popover-container`]: true,
      [`${prefix}--popover--caret`]: caret,
      [`${prefix}--popover--drop-shadow`]: dropShadow,
      [`${prefix}--popover--border`]: border,
      [`${prefix}--popover--high-contrast`]: highContrast,
      [`${prefix}--popover--open`]: open,
      [`${prefix}--popover--auto-align ${prefix}--autoalign`]:
        enableFloatingStyles,
      [`${prefix}--popover--${currentAlignment}`]: true,
      [`${prefix}--popover--tab-tip`]: isTabTip,
      [`${prefix}--popover--background-token__background`]:
        backgroundToken === 'background' && !highContrast,
    },
    customClassName
  );

  const mappedChildren = React.Children.map(children, (child) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
    const item = child as any;
    const displayName = item?.type?.displayName;

    /**
     * Only trigger elements (button) or trigger components (ToggletipButton) should be
     * cloned because these will be decorated with a trigger-specific className and ref.
     *
     * There are also some specific components that should not be cloned when autoAlign
     * is on, even if they are a trigger element.
     */
    const isTriggerElement = item?.type === 'button';
    const isTriggerComponent =
      enableFloatingStyles &&
      displayName &&
      ['ToggletipButton'].includes(displayName);
    const isAllowedTriggerComponent =
      enableFloatingStyles &&
      !['ToggletipContent', 'PopoverContent'].includes(displayName);

    if (
      React.isValidElement(item) &&
      (isTriggerElement || isTriggerComponent || isAllowedTriggerComponent)
    ) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      const className = (item?.props as any)?.className;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      const ref = (item?.props as any).ref;
      const tabTipClasses = cx(
        `${prefix}--popover--tab-tip__button`,
        className
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      return React.cloneElement(item as any, {
        className:
          isTabTip && item?.type === 'button' ? tabTipClasses : className || '',

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
          // In either of these cases we want to set this as the reference node for floating-ui autoAlign
          // positioning.
          if (
            (enableFloatingStyles && item?.type !== PopoverContent) ||
            (enableFloatingStyles &&
              item?.type['displayName'] === 'ToggletipButton')
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

  const BaseComponentAsAny = BaseComponent as React.ElementType;

  return (
    <PopoverContext.Provider value={value}>
      <BaseComponentAsAny {...rest} className={className} ref={ref}>
        {enableFloatingStyles || isTabTip ? mappedChildren : children}
      </BaseComponentAsAny>
    </PopoverContext.Provider>
  );
}) as PopoverComponent;

// Note: this displayName is temporarily set so that Storybook ArgTable
// correctly displays the name of this component
if (process.env.NODE_ENV !== 'production') {
  Popover.displayName = 'Popover';
}

Popover.propTypes = {
  /**
   * Specify how the popover should align with the trigger element
   */
  align: deprecateValuesWithin(
    PropTypes.oneOf([
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
    [
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'left-start',
      'left-end',
      'right',
      'right-start',
      'right-end',
    ],
    mapPopoverAlign
  ),

  /**
   * **Experimental:** Provide an offset value for alignment axis. Only takes effect when `autoalign` is enabled.
   */
  alignmentAxisOffset: PropTypes.number,

  /**
   * Provide a custom element or component to render the top-level node for the
   * component.
   */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),

  /**
   * Will auto-align the popover on first render if it is not visible. This prop
   * is currently experimental and is subject to future changes. Requires
   * React v17+
   * @see https://github.com/carbon-design-system/carbon/issues/18714
   */
  autoAlign: PropTypes.bool,

  /**
   * Specify the background token to use. Default is 'layer'.
   */
  backgroundToken: PropTypes.oneOf(['layer', 'background']),

  /**
   * Specify a bounding element to be used for autoAlign calculations. The viewport is used by default. This prop is currently experimental and is subject to future changes.
   */
  autoAlignBoundary: PropTypes.oneOfType([
    PropTypes.oneOf(['clippingAncestors']),
    PropTypes.elementType,
    PropTypes.arrayOf(PropTypes.elementType),
    PropTypes.exact({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }),
  ]) as PropTypes.Validator<Boundary | null | undefined>,

  /**
   * Specify whether a caret should be rendered
   */
  caret: PropTypes.bool,

  /**
   * Specify whether a border should be rendered on the popover
   */
  border: PropTypes.bool,

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
  { className, children, ...rest }: PopoverContentProps,
  forwardRef: React.ForwardedRef<HTMLSpanElement>
) {
  const prefix = usePrefix();
  const { setFloating, caretRef, autoAlign } = React.useContext(PopoverContext);
  const ref = useMergedRefs([setFloating, forwardRef]);
  const enableFloatingStyles =
    useFeatureFlag('enable-v12-dynamic-floating-styles') || autoAlign;
  return (
    <span {...rest} className={`${prefix}--popover`}>
      <span className={cx(`${prefix}--popover-content`, className)} ref={ref}>
        {children}
        {enableFloatingStyles && (
          <span
            className={cx({
              [`${prefix}--popover-caret`]: true,
              [`${prefix}--popover--auto-align`]: true,
            })}
            ref={caretRef}
          />
        )}
      </span>
      {!enableFloatingStyles && (
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
