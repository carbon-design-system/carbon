/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Popover, PopoverContent } from '../Popover';

const ToggletipContext = React.createContext();

function Toggletip({ children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
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
      {children}
    </ToggletipContext.Provider>
  );
}

Toggletip.propTypes = {
  /**
   * TODO
   */
  children: PropTypes.node,

  /**
   * TODO
   */
  defaultOpen: PropTypes.bool,
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

function ToggletipContent({
  align,
  as,
  caret,
  className,
  children,
  dropShadow,
  highContrast,
  light,
}) {
  const toggletip = useContext(ToggletipContext);
  return (
    <Popover
      align={align}
      as={as}
      caret={caret}
      className={className}
      dropShadow={dropShadow}
      highContrast={highContrast}
      light={light}
      open={toggletip.state.open}>
      <PopoverContent>{children}</PopoverContent>
    </Popover>
  );
}

ToggletipContent.propTypes = {
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
   * Render the component using the light variant
   */
  light: PropTypes.bool,

  /**
   * Specify whether the component is currently open or closed
   */
  open: PropTypes.bool.isRequired,
};

export { Toggletip, ToggletipButton, ToggletipContent };
