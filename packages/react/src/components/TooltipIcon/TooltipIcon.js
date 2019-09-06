/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';

const { prefix } = settings;
const TooltipIcon = ({
  className,
  children,
  direction,
  align,
  tooltipText,
  ...rest
}) => {
  const tooltipTriggerClasses = cx(
    `${prefix}--tooltip__trigger`,
    `${prefix}--tooltip--a11y`,
    {
      [`${prefix}--tooltip--${direction}`]: direction,
      [`${prefix}--tooltip--align-${align}`]: align,
      className,
    }
  );
  return (
    <button {...rest} className={tooltipTriggerClasses}>
      <span className={`${prefix}--assistive-text`}>{tooltipText}</span>
      {children}
    </button>
  );
};

TooltipIcon.propTypes = {
  /**
   * Specify an icon as children that will be used as the tooltip trigger. This
   * can be an icon from our Icon component, or a custom SVG element.
   */
  children: PropTypes.node.isRequired,

  /**
   * Specify the direction of the tooltip. Can be either top or bottom.
   */
  direction: PropTypes.oneOf(['top', 'bottom']),

  /**
   * Specify the alignment (to the trigger button) of the tooltip.
   * Can be one of: start, center, or end.
   */
  align: PropTypes.oneOf(['start', 'center', 'end']),

  /**
   * Optionally specify a custom id for the tooltip. If one is not provided, we
   * generate a unique id for you.
   */
  id: PropTypes.string,

  /**
   * Provide the ARIA label for the tooltip.
   * TODO: rename this prop (will be a breaking change)
   */
  tooltipText: PropTypes.string.isRequired,
};

TooltipIcon.defaultProps = {
  direction: 'bottom',
  align: 'center',
};

export default TooltipIcon;
