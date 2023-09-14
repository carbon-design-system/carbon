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
  useState,
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
import { useFloating } from '@floating-ui/react';

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
  const popover = useRef<Element>(null);

  let shimmedAlign = (align) => {
    switch (align) {
      case 'top-left':
        return 'top-start';
      case 'top-right':
        return 'top-end';
      case 'bottom-left':
        return 'bottom-start';
      case 'bottom-right':
        return 'bottom-end';
      case 'left-bottom':
        return 'left-end';
      case 'left-top':
        return 'left-start';
      case 'right-bottom':
        return 'right-end';
      case 'right-top':
        return 'right-start';
    }
  };

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
  const { refs, floatingStyles } = useFloating({
    placement: shimmedAlign,
  });
  const value = useMemo(() => {
    return {
      floating,
      setFloating: refs.setFloating,
    };
  }, [refs.setFloating]);

  if (isTabTip) {
    const tabTipAlignments: PopoverAlignment[] = ['bottom-start', 'bottom-end'];

    if (!tabTipAlignments.includes(align)) {
      shimmedAlign = 'bottom-start';
    }
  }

  useEffect(() => {
    refs.floating.current.style.position = floatingStyles.position;
    refs.floating.current.style.left = floatingStyles.left;
    refs.floating.current.style.top = floatingStyles.top;
    refs.floating.current.style.transform = floatingStyles.transform;
  }, [floatingStyles, refs.floating]);

  const ref = useMergedRefs([forwardRef, popover, refs.setReference]);
  const [autoAligned, setAutoAligned] = useState(false);
  const [autoAlignment, setAutoAlignment] = useState(align);
  const className = cx(
    {
      [`${prefix}--popover-container`]: true,
      [`${prefix}--popover--caret`]: caret,
      [`${prefix}--popover--drop-shadow`]: dropShadow,
      [`${prefix}--popover--high-contrast`]: highContrast,
      [`${prefix}--popover--open`]: open,
      [`${prefix}--popover--${autoAlignment}`]: autoAligned && !isTabTip,
      [`${prefix}--popover--${align}`]: !autoAligned,
      [`${prefix}--popover--tab-tip`]: isTabTip,
    },
    customClassName
  );

  useIsomorphicEffect(() => {
    if (!open) {
      return;
    }

    if (!autoAlign || isTabTip) {
      setAutoAligned(false);
      return;
    }

    if (!floating.current) {
      return;
    }

    if (autoAligned === true) {
      return;
    }

    const rect = floating.current.getBoundingClientRect();

    // The conditions, per side, of when the popover is not visible, excluding the popover's internal padding(16)
    const conditions = {
      left: rect.x < -16,
      top: rect.y < -16,
      right: rect.x + (rect.width - 16) > document.documentElement.clientWidth,
      bottom:
        rect.y + (rect.height - 16) > document.documentElement.clientHeight,
    };

    if (
      !conditions.left &&
      !conditions.top &&
      !conditions.right &&
      !conditions.bottom
    ) {
      setAutoAligned(false);
      return;
    }

    const alignments: PopoverAlignment[] = [
      'top',
      'top-left',
      'right-bottom',
      'right',
      'right-top',
      'bottom-left',
      'bottom',
      'bottom-right',
      'left-top',
      'left',
      'left-bottom',
      'top-right',
    ];

    // Creates the prioritized list of options depending on ideal alignment coming from `align`
    const options = [align];
    let option =
      alignments[(alignments.indexOf(align) + 1) % alignments.length];

    while (option) {
      if (options.includes(option)) {
        break;
      }
      options.push(option);
      option = alignments[(alignments.indexOf(option) + 1) % alignments.length];
    }

    function isVisible(alignment: PopoverAlignment) {
      if (!popover.current || !floating.current) {
        return false;
      }

      popover.current.classList.add(`${prefix}--popover--${alignment}`);

      const rect = floating.current.getBoundingClientRect();

      // Check if popover is not visible to the left of the screen
      if (rect.x < -16) {
        popover.current.classList.remove(`${prefix}--popover--${alignment}`);
        return false;
      }

      // Check if popover is not visible at the top of the screen
      if (rect.y < -16) {
        popover.current.classList.remove(`${prefix}--popover--${alignment}`);
        return false;
      }

      // Check if popover is not visible to right of screen
      if (rect.x + (rect.width - 16) > document.documentElement.clientWidth) {
        popover.current.classList.remove(`${prefix}--popover--${alignment}`);
        return false;
      }

      // Check if popover is not visible to bottom of screen
      if (rect.y + (rect.height - 16) > document.documentElement.clientHeight) {
        popover.current.classList.remove(`${prefix}--popover--${alignment}`);
        return false;
      }

      popover.current.classList.remove(`${prefix}--popover--${alignment}`);
      return true;
    }

    let alignment: PopoverAlignment | null = null;

    for (let i = 0; i < options.length; i++) {
      const option = options[i];

      if (isVisible(option)) {
        alignment = option;
        break;
      }
    }

    if (alignment) {
      setAutoAligned(true);
      setAutoAlignment(alignment);
    }
  }, [autoAligned, align, autoAlign, prefix, open, isTabTip]);

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
    <PopoverContext.Provider value={value}>
      <BaseComponentAsAny {...rest} className={className} ref={ref}>
        {isTabTip ? mappedChildren : children}
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
  const { floating, setFloating } = React.useContext(PopoverContext);

  const ref = useMergedRefs([floating, forwardRef, setFloating]);
  return (
    <span {...rest} className={`${prefix}--popover`}>
      <span className={cx(`${prefix}--popover-content`, className)} ref={ref}>
        {children}
      </span>
      <span className={`${prefix}--popover-caret`} />
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
