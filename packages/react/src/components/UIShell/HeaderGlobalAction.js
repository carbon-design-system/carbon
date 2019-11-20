/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings } from 'carbon-components';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { AriaLabelPropType } from '../../prop-types/AriaPropTypes';

const { prefix } = settings;

/**
 * HeaderGlobalAction is used as a part of the `HeaderGlobalBar`. It is
 * essentially an Icon Button with an additional state to indicate whether it is
 * "active". The active state comes from when a user clicks on the global action
 * which should trigger a panel to appear.
 *
 * Note: children passed to this component should be an Icon.
 */
const HeaderGlobalAction = React.forwardRef(function HeaderGlobalAction(
  {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    children,
    className: customClassName,
    onClick,
    isActive,
    ...rest
  },
  ref
) {
  const className = cx({
    [customClassName]: !!customClassName,
    [`${prefix}--header__action`]: true,
    [`${prefix}--header__action--active`]: isActive,
  });
  const accessibilityLabel = {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
  };
  return (
    <button
      {...rest}
      {...accessibilityLabel}
      className={className}
      onClick={onClick}
      type="button"
      ref={ref}>
      {children}
    </button>
  );
});

HeaderGlobalAction.propTypes = {
  /**
   * Required props for the accessibility label of the button
   */
  ...AriaLabelPropType,

  /**
   * Provide a custom icon for this global action
   */
  children: PropTypes.node.isRequired,

  /**
   * Optionally provide a custom class name that is applied to the underlying
   * button
   */
  className: PropTypes.string,

  /**
   * Optionally provide an onClick handler that is called when the underlying
   * button fires it's onclick event
   */
  onClick: PropTypes.func,

  /**
   * Specify whether the action is currently active
   */
  isActive: PropTypes.bool,
};

HeaderGlobalAction.displayName = 'HeaderGlobalAction';

export default HeaderGlobalAction;
