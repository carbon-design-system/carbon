/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { useMergedRefs } from '../../internal/useMergedRefs';
import { usePrefix } from '../../internal/usePrefix';

const PopoverContext = React.createContext();

const Popover = React.forwardRef(function Popover(props, forwardRef) {
  const {
    align = 'top',
    as: BaseComponent = 'span',
    caret = true,
    className: customClassName,
    children,
    dropShadow = true,
    highContrast = false,
    open,
    ...rest
  } = props;
  const prefix = usePrefix();
  const floating = useRef();
  const popover = useRef();
  const ref = useMergedRefs([forwardRef, popover]);
  const [autoAligned, setAutoAligned] = useState(false);
  const [autoAlignment, setAutoAlignment] = useState(align);
  const className = cx({
    [`${prefix}--popover-container`]: true,
    [`${prefix}--popover--caret`]: caret,
    [`${prefix}--popover--drop-shadow`]: dropShadow,
    [`${prefix}--popover--high-contrast`]: highContrast,
    [`${prefix}--popover--open`]: open,
    [`${prefix}--popover--${autoAlignment}`]: autoAligned,
    [`${prefix}--popover--${align}`]: !autoAligned,
    [customClassName]: !!customClassName,
  });

  useLayoutEffect(() => {
    if (!floating.current) {
      return;
    }

    if (autoAligned === true) {
      return;
    }
    //  const rect = floating.current.getBoundingClientRect();
    // if (rect.x > 0 && rect.y > 0) {
    //   console.log('yo');
    //   console.log(autoAligned);
    //   return;
    // }

    // floating.current.style.visibility = 'hidden';

    const alignments = [
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
    ];

    // Creates the priotritzed list of options depending on ideal alignment coming from `align`
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

    function isVisible(alignment) {
      popover.current.classList.add(`${prefix}--popover--${alignment}`);

      const rect = floating.current.getBoundingClientRect();
      // console.log(rect.x);
      if (rect.x < 0) {
        // console.log(popover.current.classList);
        // console.log(alignment);
        console.log('x', rect.x);
        console.log('y', rect.y);
        popover.current.classList.remove(`${prefix}--popover--${alignment}`);
        return false;
      }

      popover.current.classList.remove(`${prefix}--popover--${alignment}`);
      console.log(alignment);
      return true;
    }

    let alignment = null;

    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      //  console.log(i);
      if (isVisible(option)) {
        alignment = option;
        break;
      }
    }

    // console.log(alignment);
    // console.log(autoAligned);

    if (alignment) {
      setAutoAligned(true);
      setAutoAlignment(alignment);
    }

    // const rect = floating.current.getBoundingClientRect();
    // console.log('1', autoAlignment, rect.x, rect.y);

    // // if (rect.x < 0) {
    // //   setAutoAligned(() => true);
    // //   setAutoAlignment(() => 'top-left');
    // //   console.log('2', autoAlignment, rect.x, rect.y);
    // // }

    // if (rect.x < 0 || rect.y < 0) {
    //   setAutoAligned(true);
    //   setAutoAlignment(alignments[currentAlignment + 1]);
    //   console.log('2', autoAlignment, rect.x, rect.y);
    //   currentAlignment += 1;
    // }

    // // console.log(autoAlignment);

    // console.log('3', autoAlignment, rect.x, rect.y);
  });

  return (
    <PopoverContext.Provider value={{ floating }}>
      <BaseComponent {...rest} className={className} ref={ref}>
        {children}
      </BaseComponent>
    </PopoverContext.Provider>
  );
});

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
   * Specify whether the component is currently open or closed
   */
  open: PropTypes.bool.isRequired,
};

const PopoverContent = React.forwardRef(function PopoverContent(
  { className, children, ...rest },
  ref
) {
  const prefix = usePrefix();
  const { floating } = React.useContext(PopoverContext);

  const mergedRef = useMergedRefs([floating, ref]);
  return (
    <span {...rest} className={`${prefix}--popover`}>
      <span
        className={cx(`${prefix}--popover-content`, className)}
        ref={mergedRef}>
        {children}
      </span>
      <span className={`${prefix}--popover-caret`} />
    </span>
  );
});

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

export { Popover, PopoverContent };
