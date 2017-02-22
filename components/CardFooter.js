import React from 'react';
import classNames from 'classnames';
if (!process.env.EXCLUDE_SASS) {
  import('@console/bluemix-components/consumables/scss/components/card/card.scss');
}

const propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
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
