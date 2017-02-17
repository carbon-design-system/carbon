import React from 'react';
import classNames from 'classnames';
// eslint-disable-next-line max-len, import/no-unresolved
import '../env-defined-then-loader?-EXCLUDE_SASS!@console/bluemix-components/consumables/scss/components/card/card.scss';

const propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
};

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

CardActions.propTypes = propTypes;

export default CardActions;
