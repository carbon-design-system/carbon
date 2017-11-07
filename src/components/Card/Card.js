import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const Card = ({ children, className, tabIndex, ...other }) => {
  const cardClasses = classNames({
    'bx--card': true,
    [className]: className,
  });

  return (
    <div {...other} className={cardClasses} tabIndex={tabIndex}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tabIndex: PropTypes.number,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseUp: PropTypes.func,
};

Card.defaultProps = {
  tabIndex: 0,
};

export default Card;
