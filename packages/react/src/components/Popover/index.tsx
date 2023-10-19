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
  type ForwardedRef,
  type WeakValidationMap,
  type ElementType,
} from 'react';
import useIsomorphicEffect from '../../internal/useIsomorphicEffect';
import { useMergedRefs } from '../../internal/useMergedRefs';
import { usePrefix } from '../../internal/usePrefix';
import { type PolymorphicProps } from '../../types/common';
import { useWindowEvent } from '../../internal/useEvent';

interface PopoverContext {
  floating: React.Ref<HTMLSpanElement>;
}

const PopoverContext = React.createContext<PopoverContext>({
  floating: {
    current: null,
  },
});

export type PopoverAlignment =
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'left'
  | 'left-bottom'
  | 'left-top'
  | 'right'
  | 'right-bottom'
  | 'right-top';

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
      align = isTabTip ? 'bottom-left' : 'bottom',
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
    const popover = useRef<Element>(null);

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

    const value = useMemo(() => {
      return {
        floating,
      };
    }, []);

    if (isTabTip) {
      const tabTipAlignments: PopoverAlignment[] = [
        'bottom-left',
        'bottom-right',
      ];

      if (!tabTipAlignments.includes(align)) {
        align = 'bottom-left';
      }
    }

    const ref = useMergedRefs([forwardRef, popover]);
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
        right:
          rect.x + (rect.width - 16) > document.documentElement.clientWidth,
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
        option =
          alignments[(alignments.indexOf(option) + 1) % alignments.length];
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
        if (
          rect.y + (rect.height - 16) >
          document.documentElement.clientHeight
        ) {
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
    'top-left',
    'top-right',

    'bottom',
    'bottom-left',
    'bottom-right',

    'left',
    'left-bottom',
    'left-top',

    'right',
    'right-bottom',
    'right-top',
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
  const { floating } = React.useContext(PopoverContext);
  const ref = useMergedRefs([floating, forwardRef]);
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
