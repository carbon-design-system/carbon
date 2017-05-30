import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
if (!process.env.EXCLUDE_SASS) {
  import('carbon-components/consumables/scss/components/card/card.scss');
}

const propTypes = {
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

const defaultProps = {
  tabIndex: 0,
};

const Card = ({ children, className, tabIndex, ...other }) => {
  const cardClasses = classNames({
    'bx--card': true,
    [className]: className,
  });

  return (
    <div
      {...other}
      className={cardClasses}
      tabIndex={tabIndex}
    >
      {children}
    </div>
  );
};

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;
