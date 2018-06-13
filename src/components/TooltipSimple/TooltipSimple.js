import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import warning from 'warning';
import Icon from '../Icon';

let didWarnAboutDeprecation = false;

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
  if (__DEV__) {
    warning(
      didWarnAboutDeprecation,
      'The `TooltipSimple` component has been deprecated and will be removed ' +
        'in the next major release of `carbon-components-react`. Please use ' +
        '`TooltipDefinition` or `TooltipIcon` instead.'
    );
    didWarnAboutDeprecation = true;
  }
  const tooltipClasses = classNames(`bx--tooltip--simple__${position}`);

  const tooltipWrapperClasses = classNames(`bx--tooltip--simple`, className);
  return (
    <div className={tooltipWrapperClasses}>
      {showIcon ? (
        <React.Fragment>
          {children}
          <div
            className={tooltipClasses}
            data-tooltip-text={text}
            tabIndex="0"
            role="button"
            {...other}>
            <Icon role="img" name={iconName} description={iconDescription} />
          </div>
        </React.Fragment>
      ) : (
        <div
          className={tooltipClasses}
          data-tooltip-text={text}
          tabIndex="0"
          role="button"
          {...other}>
          {children}
        </div>
      )}
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
