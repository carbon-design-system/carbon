import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import classNames from 'classnames';

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
      <div className={tooltipClasses} data-tooltip-text={text} {...other}>
        {showIcon && (
          <Icon
            role="button"
            tabIndex="0"
            name={iconName}
            description={iconDescription}
          />
        )}
      </div>
    </div>
  );
};

TooltipSimple.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  position: PropTypes.oneOf(['bottom', 'top']),
  text: PropTypes.string.isRequired,
  showIcon: PropTypes.bool,
  iconName: PropTypes.string,
  iconDescription: PropTypes.string,
};

TooltipSimple.defaultProps = {
  position: 'top',
  showIcon: true,
  iconName: 'info--glyph',
  iconDescription: 'tooltip',
  text: 'Provide text',
};

export default TooltipSimple;
