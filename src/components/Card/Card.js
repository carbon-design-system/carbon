import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import warning from 'warning';

let didWarnAboutDeprecation = false;

const Card = ({ children, className, tabIndex, ...other }) => {
  if (__DEV__) {
    warning(
      didWarnAboutDeprecation,
      'Accessing the `Card` component from the `carbon-components-react` ' +
        'package is deprecated. Use the `carbon-addons-cloud-react` package ' +
        'instead.'
    );
    didWarnAboutDeprecation = true;
  }

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
