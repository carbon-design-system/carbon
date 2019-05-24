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
  const tooltipClassName = cx({
    [className]: !!className,
    [`${prefix}--tooltip-icon`]: true,
  });
  const triggerClassName = cx({
    [`${prefix}--tooltip__trigger`]: true,
    [`${prefix}--tooltip--icon__${direction}`]: direction,
    [`${prefix}--tooltip--icon__align-${align}`]: align,
  });
  return (
    <div {...rest} className={tooltipClassName}>
      <button className={triggerClassName} aria-label={tooltipText}>
        {children}
      </button>
    </div>
  );
};

TooltipIcon.propTypes = {
  /**
   * Specify an icon as children that will be used as the tooltip trigger. This
   * can be an icon from our Icon component, or a custom SVG element.
   */
  children: PropTypes.node.isRequired,

  /**
   * Specify the direction of the tooltip. Can be either bottom or top.
   */
  direction: PropTypes.oneOf(['bottom', 'top']),

  /**
   * Specify the alignment (to the trigger button) of the tooltip. Can be one of: start, center or end.
   */
  align: PropTypes.oneOf(['start', 'center', 'end']),

  /**
   * Provide the text that will be displayed in the tooltip when it is rendered.
   */
  tooltipText: PropTypes.node.isRequired,
};

TooltipIcon.defaultProps = {
  direction: 'bottom',
  align: 'center',
};

export default TooltipIcon;
