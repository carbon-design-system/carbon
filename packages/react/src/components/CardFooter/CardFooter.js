import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const CardFooter = ({ children, className, ...other }) => {
  const cardFooterClasses = classNames({
    'bx--card-footer': true,
    [className]: className,
  });

  return (
    <div className={cardFooterClasses} {...other}>
      {children}
    </div>
  );
};

CardFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default CardFooter;
