import React, { PropTypes } from 'react';
import Icon from './Icon';
import classNames from 'classnames';
if (process.env.importSASS || process.env.importSASS === undefined) {
  require('@console/bluemix-components/consumables/scss/components/tooltips/tooltips.scss');
}

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  position: PropTypes.oneOf(['bottom', 'top']),
  text: PropTypes.string.isRequired,
};

const defaultProps = {
  position: 'top',
};

const Tooltip = ({ children, className, position, text, ...other }) => {
  const tooltipClasses = classNames(`bx--tooltip__${position}`, className);
  return (
    <div className={tooltipClasses} data-tooltip={text} {...other}>
      {children}
      <Icon className="bx--tooltip__icon" name="info" description="Information" />
    </div>
  );
};

Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;

export default Tooltip;

