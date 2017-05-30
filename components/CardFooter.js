import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
if (!process.env.EXCLUDE_SASS) {
  import('carbon-components/consumables/scss/components/card/card.scss');
}

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const CardFooter = ({ children, className, ...other }) => {
  const cardFooterClasses = classNames({
    'bx--card__card-footer': true,
    [className]: className,
  });

  return (
    <div className={cardFooterClasses} {...other}>
      {children}
    </div>
  );
};

CardFooter.propTypes = propTypes;

export default CardFooter;
