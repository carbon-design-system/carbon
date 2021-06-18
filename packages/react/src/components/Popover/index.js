/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings } from 'carbon-components';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './story.scss';

const { prefix } = settings;

const Popover = React.forwardRef(function Popover({
  as: BaseComponent = 'div',
  caret = true,
  className: customClassName,
  children,
  align = 'bottom',
  highContrast = false,
  light = false,
  open,
  relative,
  ...rest
}, ref) {
  const className = cx({
    [`${prefix}--popover`]: true,
    [`${prefix}--popover--caret`]: caret,
    [`${prefix}--popover--light`]: light,
    [`${prefix}--popover--high-contrast`]: highContrast,
    [`${prefix}--popover--${align}`]: true,
    [`${prefix}--popover--open`]: open,
    [`${prefix}--popover--relative`]: relative,
    [customClassName]: !!customClassName,
  });

  return (
    <BaseComponent {...rest} className={className} ref={ref}>
      {children}
    </BaseComponent>
  );
});

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

  /**
   * Specify whether the component should be positioned using position:
   * relative. By default, it will use position: absolute
   */
  relative: PropTypes.bool,
};

const PopoverContent = React.forwardRef(function PopoverContent(
  { as: BaseComponent = 'div', className, children, ...rest },
  ref
) {
  return (
    <BaseComponent
      {...rest}
      className={cx(`${prefix}--popover--content`, className)}
      ref={ref}>
      {children}
    </BaseComponent>
  );
});
PopoverContent.propTypes = {
  /**
   * Provide a custom element or component to render the top-level node for the
   * component.
   */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),

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

const PopoverBody = React.forwardRef(function PopoverBody(
  { as: BaseComponent = 'div', className, children, ...rest },
  ref
) {
  return (
    <BaseComponent
      {...rest}
      className={cx(`${prefix}--popover--body`, className)}
      ref={ref}>
      {children}
    </BaseComponent>
  );
});

PopoverBody.propTypes = {
  /**
   * Provide a custom element or component to render the top-level node for the
   * component.
   */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),

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

const PopoverHeader = React.forwardRef(function PopoverHeader(
  { as: BaseComponent = 'div', className, children, hasDivider, ...rest },
  ref
) {
  return (
    <>
      <BaseComponent
        {...rest}
        className={cx(`${prefix}--popover--header`, className)}
        ref={ref}>
        {children}
      </BaseComponent>
      {hasDivider ? <PopoverDivider /> : null}
    </>
  );
});

PopoverHeader.propTypes = {
  /**
   * Provide a custom element or component to render the top-level node for the
   * component.
   */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),

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
   * Specify whether the Popover header has a divider or not.
   */
  hasDivider: PropTypes.boolean,
};

const PopoverDivider = React.forwardRef(function PopoverDivider(
  { as: BaseComponent = 'div', className, children, ...rest },
  ref
) {
  return (
    <BaseComponent
      {...rest}
      className={cx(`${prefix}--popover--divider`, className)}
      ref={ref}>
      {children}
    </BaseComponent>
  );
});

PopoverDivider.propTypes = {
  /**
   * Provide a custom element or component to render the top-level node for the
   * component.
   */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),

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

const PopoverFooter = React.forwardRef(function PopoverFooter(
  { as: BaseComponent = 'footer', className, children, hasDivider, ...rest },
  ref
) {
  const classNames = cx(className, {
    [`${prefix}--popover--footer-divider`]: !hasDivider,
  });

  return (
    <>
      {hasDivider ? <PopoverDivider /> : null}
      <BaseComponent
        {...rest}
        className={cx(`${prefix}--popover--footer`, classNames)}
        ref={ref}>
        {children}
      </BaseComponent>
    </>
  );
});

PopoverFooter.propTypes = {
  /**
   * Provide a custom element or component to render the top-level node for the
   * component.
   */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),

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
   * Specify whether the Popover footer has a divider or not.
   */
  hasDivider: PropTypes.boolean,
};

export {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverFooter,
  PopoverBody,
  PopoverDivider,
};
