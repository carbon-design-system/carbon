import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const TooltipIcon = ({
  className,
  children,
  direction,
  tooltipText,
  ...rest
}) => {
  const tooltipClassName = cx({
    [className]: !!className,
    'bx--tooltip-icon': true,
  });
  const triggerClassName = cx({
    'bx--tooltip__trigger': true,
    'bx--tooltip--icon__bottom': direction === 'bottom',
    'bx--tooltip--icon__top': direction === 'top',
  });
  return (
    <div {...rest} className={tooltipClassName}>
      <button className={triggerClassName} title={tooltipText}>
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
  direction: PropTypes.oneOf(['bottom', 'top']).isRequired,

  /**
   * Provide the text that will be displayed in the tooltip when it is rendered.
   */
  tooltipText: PropTypes.node.isRequired,
};

TooltipIcon.defaultProps = {
  direction: 'bottom',
};

export default TooltipIcon;
