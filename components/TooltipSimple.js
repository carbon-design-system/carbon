import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  position: PropTypes.oneOf(['bottom', 'top']),
  text: PropTypes.string.isRequired,
  showIcon: PropTypes.bool,
  iconName: PropTypes.string,
  iconDescription: PropTypes.string,
};

const defaultProps = {
  position: 'top',
  showIcon: true,
  iconName: 'info--glyph',
  iconDescription: 'tooltip',
  text: 'Provide text',
};

const TooltipSimple = ({
  children,
  className,
  position,
  text,
  showIcon,
  iconName,
  iconDescription,
  ...other
}) => {
  const tooltipClasses = classNames(`bx--tooltip--simple__${position}`);

  const tooltipWrapperClasses = classNames(`bx--tooltip--simple`, className);
  return (
    <div className={tooltipWrapperClasses}>
      {children}
      <div
        tabIndex="0"
        className={tooltipClasses}
        data-tooltip-text={text}
        {...other}>
        {showIcon && <Icon name={iconName} description={iconDescription} />}
      </div>
    </div>
  );
};

TooltipSimple.propTypes = propTypes;
TooltipSimple.defaultProps = defaultProps;

export default TooltipSimple;
