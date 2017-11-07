import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const CardActions = ({ children, className, ...other }) => {
  const cardActionClasses = classNames({
    'bx--card-footer__app-actions': true,
    [className]: className,
  });

  return (
    <div className={cardActionClasses} {...other}>
      {children}
    </div>
  );
};

CardActions.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default CardActions;
