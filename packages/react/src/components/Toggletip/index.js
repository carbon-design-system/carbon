/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useContext, useRef, useState } from 'react';
import { Popover, PopoverContent } from '../Popover';
import { usePrefix } from '../../internal/usePrefix';
import { match, keys } from '../../internal/keyboard';

export function useToggletip({ defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  const buttonRef = useRef(null);
  const contentRef = useRef(null);
  const state = {
    open,
  };
  const actions = {
    toggle: () => {
      setOpen(!open);
    },
    open: () => {
      setOpen(true);
    },
    close: () => {
      setOpen(false);
    },
  };
  const buttonProps = {
    ref: buttonRef,
    onBlur: (event) => {
      if (!contentRef.current.contains(event.relatedTarget)) {
        actions.close();
      }
    },
    onClick: actions.toggle,
    onKeyDown: (event) => {
      if (open && match(event, keys.Escape)) {
        event.preventDefault();
        event.stopPropagation();
        actions.close();
      }
    },
  };
  const contentProps = {
    ref: contentRef,
    onBlur: (event) => {
      if (!buttonRef.current.contains(event.relatedTarget)) {
        actions.close();
      }
    },
    onKeyDown: (event) => {
      if (open && match(event, keys.Escape)) {
        event.preventDefault();
        event.stopPropagation();
        actions.close();
        // TODO
        buttonRef.current.focus();
      }
    },
  };

  return {
    actions,
    state,
    buttonProps,
    contentProps,
  };
}

const ToggletipContext = React.createContext();

function Toggletip({
  align,
  as,
  caret,
  className: customClassName,
  children,
  defaultOpen = false,
  dropShadow,
  highContrast = true,
  light,
}) {
  const [open, setOpen] = useState(defaultOpen);
  const prefix = usePrefix();
  const className = cx(`${prefix}--toggletip-container`, customClassName);
  const value = {
    state: {
      open,
    },
    actions: {
      toggle,
    },
  };

  function toggle() {
    setOpen((open) => !open);
  }

  return (
    <ToggletipContext.Provider value={value}>
      <Popover
        align={align}
        as={as}
        caret={caret}
        className={className}
        dropShadow={dropShadow}
        highContrast={highContrast}
        light={light}
        open={open}>
        {children}
      </Popover>
    </ToggletipContext.Provider>
  );
}

Toggletip.propTypes = {
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
   * Specify whether a caret should be rendered
   */
  caret: PropTypes.bool,

  /**
   * TODO
   */
  children: PropTypes.node,

  /**
   * TODO
   */
  defaultOpen: PropTypes.bool,

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
   * Render the component using the light variant
   */
  light: PropTypes.bool,

  /**
   * Specify whether the component is currently open or closed
   */
  open: PropTypes.bool.isRequired,
};

function ToggletipButton({ children }) {
  const toggletip = useContext(ToggletipContext);
  const child = React.Children.only(children);

  return React.cloneElement(child, {
    onClick: (...args) => {
      toggletip.actions.toggle();
      if (child.props.onClick) {
        child.props.onClick(...args);
      }
    },
  });
}

ToggletipButton.propTypes = {
  /**
   * TODO
   */
  children: PropTypes.node,
};

function ToggletipContent({ children }) {
  const prefix = usePrefix();
  return (
    <PopoverContent>
      <div className={`${prefix}--toggletip`}>{children}</div>
    </PopoverContent>
  );
}

ToggletipContent.propTypes = {
  /**
   * Provide elements to be rendered inside of the component
   */
  children: PropTypes.node,
};

export { Toggletip, ToggletipButton, ToggletipContent };
