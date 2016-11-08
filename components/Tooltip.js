import React, { PropTypes } from 'react';
import classNames from 'classnames';
import '@console/bluemix-components/consumables/scss/components/tooltips/tooltips.scss';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  position: PropTypes.oneOf(['bottom', 'top']),
  text: PropTypes.string.isRequired,
};

const defaultProps = {
  position: 'top',
};

const Tooltip = ({ children, className, position, text }) => {
  const tooltipClasses = classNames(`bx--tooltip__${position}`, className);
  return <div className={tooltipClasses} data-tooltip={text}>{children}</div>;
};

Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;

export default Tooltip;

