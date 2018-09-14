import React from 'react';
import PropTypes from 'prop-types';
import { iconInfoGlyph } from 'carbon-icons';
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
  icon,
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
        <>
          {children}
          <div
            className={tooltipClasses}
            data-tooltip-text={text}
            tabIndex="0"
            role="button"
            {...other}>
            <Icon
              role="img"
              icon={!icon && !iconName ? iconInfoGlyph : icon}
              name={iconName}
              description={iconDescription}
            />
          </div>
        </>
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
  icon: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
    viewBox: PropTypes.string.isRequired,
    svgData: PropTypes.object.isRequired,
  }),
  iconName: PropTypes.string,
  iconDescription: PropTypes.string,
};

TooltipSimple.defaultProps = {
  position: 'top',
  showIcon: true,
  iconDescription: 'tooltip',
  text: 'Provide text',
};

export default TooltipSimple;
