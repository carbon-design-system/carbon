import React from 'react';
import classNames from 'classnames';
// eslint-disable-next-line max-len, import/no-unresolved
import '../env-defined-then-loader?-EXCLUDE_SASS!@console/bluemix-components/consumables/scss/components/card/card.scss';

const propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  tabIndex: React.PropTypes.number,
  onBlur: React.PropTypes.func,
  onClick: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onKeyDown: React.PropTypes.func,
  onKeyUp: React.PropTypes.func,
  onMouseDown: React.PropTypes.func,
  onMouseEnter: React.PropTypes.func,
  onMouseLeave: React.PropTypes.func,
  onMouseUp: React.PropTypes.func,
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
