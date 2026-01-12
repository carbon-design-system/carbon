/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, {
  type ElementType,
  useContext,
  useRef,
  useState,
  useEffect,
  type ReactNode,
  type ComponentProps,
  type KeyboardEventHandler,
  type FocusEventHandler,
} from 'react';
import {
  Popover,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
  type PopoverAlignment,
  PopoverBaseProps,
  PopoverContent,
} from '../Popover';
import { match, keys } from '../../internal/keyboard';
import { useWindowEvent } from '../../internal/useEvent';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import { PolymorphicProps } from '../../types/common';
import { PolymorphicComponentPropWithRef } from '../../internal/PolymorphicProps';

type ToggletipLabelProps<E extends ElementType> = {
  as?: E;
  children?: ReactNode;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<E>, 'as' | 'children' | 'className'>;

/**
 * Used to render the label for a Toggletip
 */
export function ToggletipLabel<E extends ElementType>({
  as: BaseComponent = 'span' as E,
  children,
  className: customClassName,
  ...rest
}: ToggletipLabelProps<E>) {
  const prefix = usePrefix();
  const className = cx(`${prefix}--toggletip-label`, customClassName);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  const BaseComponentAsAny = BaseComponent as any;
  return (
    <BaseComponentAsAny className={className} {...rest}>
      {children}
    </BaseComponentAsAny>
  );
}

ToggletipLabel.propTypes = {
  /**
   * Provide a custom element or component to render the top-level node for the
   * component.
   */
  as: PropTypes.elementType,

  /**
   * Custom children to be rendered as the content of the label
   */
  children: PropTypes.node,

  /**
   * Provide a custom class name to be added to the outermost node in the
   * component
   */
  className: PropTypes.string,
};

type ToggleTipContextType =
  | undefined
  | {
      buttonProps: ComponentProps<'button'>;
      contentProps: ComponentProps<typeof PopoverContent>;
      onClick: ComponentProps<'button'>;
    };

// Used to coordinate accessibility props between button and content along with
// the actions to open and close the toggletip
const ToggletipContext = React.createContext<ToggleTipContextType>(undefined);

function useToggletip() {
  return useContext(ToggletipContext);
}

export interface ToggletipBaseProps extends Omit<PopoverBaseProps, 'open'> {
  defaultOpen?: boolean;
}

export type ToggletipProps<T extends ElementType> =
  PolymorphicComponentPropWithRef<T, ToggletipBaseProps>;

/**
 * Used as a container for the button and content of a toggletip. This component
 * is responsible for coordinating between interactions with the button and the
 * visibility of the content
 */
export function Toggletip<E extends ElementType = 'span'>({
  align,
  as,
  autoAlign,
  className: customClassName,
  children,
  defaultOpen = false,
  ...rest
}: ToggletipProps<E>) {
  const ref = useRef<Element>(null);
  const [open, setOpen] = useState(defaultOpen);
  const prefix = usePrefix();
  const id = useId();
  const className = cx(`${prefix}--toggletip`, customClassName, {
    [`${prefix}--toggletip--open`]: open,
    [`${prefix}--autoalign`]: autoAlign,
  });
  const actions = {
    toggle: () => {
      setOpen(!open);
    },
    close: () => {
      setOpen(false);
    },
  };
  const value = {
    buttonProps: {
      'aria-expanded': open,
      'aria-controls': id,
      'aria-describedby': open ? id : undefined,
      onClick: actions.toggle,
    },
    contentProps: {
      id,
    },
    onClick: {
      onClick: actions.toggle,
    },
  };

  const onKeyDown: KeyboardEventHandler = (event) => {
    if (open && match(event, keys.Escape)) {
      event.stopPropagation();
      actions.close();

      // If the menu is closed while focus is still inside the menu, it should return to the trigger button  (#12922)
      const button = ref.current?.children[0];
      if (button instanceof HTMLButtonElement) {
        button.focus();
      }
    }
  };

  const handleBlur: FocusEventHandler = (event) => {
    // Do not close if the menu itself is clicked, should only close on focus out
    if (open && event.relatedTarget === null) {
      return;
    }
    if (!event.currentTarget.contains(event.relatedTarget)) {
      // The menu should be closed when focus leaves the `Toggletip`  (#12922)
      actions.close();
    }
  };

  // If the `Toggletip` is the last focusable item in the tab order, it should also close when the browser window loses focus  (#12922)
  useWindowEvent('blur', () => {
    if (open) {
      actions.close();
    }
  });

  useEffect(() => {
    if (!ref.current) return;

    const targetDocument = ref.current.ownerDocument || document;
    const eventType: 'pointerdown' | 'mousedown' =
      'PointerEvent' in window ? 'pointerdown' : 'mousedown';

    const handleOutsideClick = (event: MouseEvent | PointerEvent) => {
      const node = event.target as Node | null;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
      if (open && node && !ref.current!.contains(node)) {
        setOpen(false);
      }
    };

    const options = { capture: true } as const;

    targetDocument.addEventListener(eventType, handleOutsideClick, options);
    return () => {
      targetDocument.removeEventListener(
        eventType,
        handleOutsideClick,
        options
      );
    };
  }, [open]);

  return (
    <ToggletipContext.Provider value={value}>
      {/*eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452 */}
      <Popover<any>
        align={align}
        as={as}
        caret
        className={className}
        dropShadow={false}
        highContrast
        open={open}
        onKeyDown={onKeyDown}
        onBlur={handleBlur}
        ref={ref}
        autoAlign={autoAlign}
        {...rest}>
        {children}
      </Popover>
    </ToggletipContext.Provider>
  );
}

// Get all the properties from Popover except for "open".
// The Typescript types for PropTypes are really messed up so we need lots of
// casting.  It will be great when we can finally get rid of PropTypes altogether.
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
const { open, ...popoverNonOpenPropTypes } = (Popover.propTypes ??
  {}) as unknown as PopoverBaseProps;

Toggletip.propTypes = {
  // Has all of Popover's PropTypes except for "open".
  ...popoverNonOpenPropTypes,

  /**
   * Specify if the toggletip should be open by default
   */
  defaultOpen: PropTypes.bool,
};

export interface ToggletipButtonBaseProps {
  children?: ReactNode;
  className?: string;
  label?: string;
}

export type ToggleTipButtonProps<T extends React.ElementType> =
  PolymorphicProps<T, ToggletipButtonBaseProps>;

/**
 * `ToggletipButton` controls the visibility of the Toggletip through mouse
 * clicks and keyboard interactions.
 */

export const ToggletipButton = React.forwardRef(function ToggletipButton<
  T extends React.ElementType,
>(
  {
    children,
    className: customClassName,
    label = 'Show information',
    as: BaseComponent,
    ...rest
  }: ToggleTipButtonProps<T>,
  ref
) {
  const toggletip = useToggletip();
  const prefix = usePrefix();
  const className = cx(`${prefix}--toggletip-button`, customClassName);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  const ComponentToggle: any = BaseComponent ?? 'button';

  if (ComponentToggle !== 'button') {
    return (
      <ComponentToggle {...toggletip?.onClick} className={className} {...rest}>
        {children}
      </ComponentToggle>
    );
  }
  return (
    <button
      {...toggletip?.buttonProps}
      aria-label={label}
      type="button"
      className={className}
      ref={ref}
      {...rest}>
      {children}
    </button>
  );
});

ToggletipButton.propTypes = {
  /**
   * Custom children to be rendered as the content of the label
   */
  children: PropTypes.node,

  /**
   * Provide a custom class name to be added to the outermost node in the
   * component
   */
  className: PropTypes.string,

  /**
   * Provide an accessible label for this button
   */
  label: PropTypes.string,
};

ToggletipButton.displayName = 'ToggletipButton';

export interface ToggletipContentProps {
  children?: ReactNode;
  className?: string;
}

/**
 * `ToggletipContent` is a wrapper around `PopoverContent`. It places the
 * `children` passed in as a prop inside of `PopoverContent` so that they will
 * be rendered inside of the popover for this component.
 */
const ToggletipContent = React.forwardRef<
  HTMLDivElement,
  ToggletipContentProps
>(function ToggletipContent({ children, className: customClassName }, ref) {
  const toggletip = useToggletip();
  const prefix = usePrefix();
  return (
    <PopoverContent
      className={customClassName}
      {...toggletip?.contentProps}
      ref={ref}>
      <div className={`${prefix}--toggletip-content`}>{children}</div>
    </PopoverContent>
  );
});
ToggletipContent.propTypes = {
  /**
   * Custom children to be rendered as the content of the label
   */
  children: PropTypes.node,

  /**
   * Provide a custom class name to be added to the outermost node in the
   * component
   */
  className: PropTypes.string,
};

ToggletipContent.displayName = 'ToggletipContent';

export { ToggletipContent };

export interface ToggleTipActionsProps {
  children?: ReactNode;
  className?: string;
}

/**
 * `ToggletipActions` is a container for one or two actions present at the base
 * of a toggletip. It is used for layout of these items.
 */
export function ToggletipActions({
  children,
  className: customClassName,
}: ToggleTipActionsProps) {
  const prefix = usePrefix();
  const className = cx(`${prefix}--toggletip-actions`, customClassName);
  return <div className={className}>{children}</div>;
}

ToggletipActions.propTypes = {
  /**
   * Custom children to be rendered as the content of the label
   */
  children: PropTypes.node,

  /**
   * Provide a custom class name to be added to the outermost node in the
   * component
   */
  className: PropTypes.string,
};

export default Toggletip;
