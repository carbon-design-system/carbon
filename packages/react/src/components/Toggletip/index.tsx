/**
 * Copyright IBM Corp. 2016, 2023
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
  type ReactNode,
  type ComponentProps,
  type KeyboardEventHandler,
  type FocusEventHandler,
} from 'react';
import { Popover, type PopoverAlignment, PopoverContent } from '../Popover';
import { match, keys } from '../../internal/keyboard';
import { useWindowEvent } from '../../internal/useEvent';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';

type ToggletipLabelProps<E extends ElementType> = {
  as?: E | undefined;
  children?: ReactNode;
  className?: string | undefined;
};

/**
 * Used to render the label for a Toggletip
 */
export function ToggletipLabel<E extends ElementType>({
  as: BaseComponent = 'span' as E,
  children,
  className: customClassName,
}: ToggletipLabelProps<E>) {
  const prefix = usePrefix();
  const className = cx(`${prefix}--toggletip-label`, customClassName);
  const BaseComponentAsAny = BaseComponent as any;
  return (
    <BaseComponentAsAny className={className}>{children}</BaseComponentAsAny>
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
    };

// Used to coordinate accessibility props between button and content along with
// the actions to open and close the toggletip
const ToggletipContext = React.createContext<ToggleTipContextType>(undefined);

function useToggletip() {
  return useContext(ToggletipContext);
}

interface ToggletipProps<E extends ElementType> {
  align?: PopoverAlignment | undefined;
  as?: E | undefined;
  className?: string | undefined;
  children?: ReactNode;
  defaultOpen?: boolean | undefined;
}

/**
 * Used as a container for the button and content of a toggletip. This component
 * is responsible for coordinating between interactions with the button and the
 * visibility of the content
 */
export function Toggletip<E extends ElementType = 'span'>({
  align,
  as,
  className: customClassName,
  children,
  defaultOpen = false,
}: ToggletipProps<E>) {
  const ref = useRef<Element>(null);
  const [open, setOpen] = useState(defaultOpen);
  const prefix = usePrefix();
  const id = useId();
  const className = cx(`${prefix}--toggletip`, customClassName, {
    [`${prefix}--toggletip--open`]: open,
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
      onClick: actions.toggle,
    },
    contentProps: {
      id,
    },
  };

  const onKeyDown: KeyboardEventHandler = (event) => {
    if (open && match(event, keys.Escape)) {
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

  // If the `Toggletip` is the last focusable item in the tab order, it shoudl also close when the browser window loses focus  (#12922)
  useWindowEvent('blur', () => {
    if (open) {
      actions.close();
    }
  });

  useWindowEvent('click', (event) => {
    if (open && ref.current && !ref.current.contains(event.target as Node)) {
      actions.close();
    }
  });

  return (
    <ToggletipContext.Provider value={value}>
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
        ref={ref}>
        {children}
      </Popover>
    </ToggletipContext.Provider>
  );
}

Toggletip.propTypes = {
  /**
   * Specify how the toggletip should align with the button
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

  /**
   * Specify if the toggletip should be open by default
   */
  defaultOpen: PropTypes.bool,
};

interface ToggletipButtonProps {
  children?: ReactNode;
  className?: string | undefined;
  label?: string | undefined;
}

/**
 * `ToggletipButton` controls the visibility of the Toggletip through mouse
 * clicks and keyboard interactions.
 */
export function ToggletipButton({
  children,
  className: customClassName,
  label = 'Show information',
}: ToggletipButtonProps) {
  const toggletip = useToggletip();
  const prefix = usePrefix();
  const className = cx(`${prefix}--toggletip-button`, customClassName);
  return (
    <button
      {...toggletip?.buttonProps}
      aria-label={label}
      type="button"
      className={className}>
      {children}
    </button>
  );
}

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

interface ToggletipContentProps {
  children?: ReactNode;
  className?: string | undefined;
}

/**
 * `ToggletipContent` is a wrapper around `PopoverContent`. It places the
 * `children` passed in as a prop inside of `PopoverContent` so that they will
 * be rendered inside of the popover for this component.
 */
export function ToggletipContent({
  children,
  className: customClassName,
}: ToggletipContentProps) {
  const toggletip = useToggletip();
  const prefix = usePrefix();
  return (
    <PopoverContent className={customClassName} {...toggletip?.contentProps}>
      <div className={`${prefix}--toggletip-content`}>{children}</div>
    </PopoverContent>
  );
}

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

interface ToggleTipActionsProps {
  children?: ReactNode;
  className?: string | undefined;
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
