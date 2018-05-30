import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import warning from 'warning';

let didWarnAboutDeprecation = false;

const CardActions = ({ children, className, ...other }) => {
  if (__DEV__) {
    warning(
      didWarnAboutDeprecation,
      'Accessing the `CardActions` component from the ' +
        '`carbon-components-react` package is deprecated. Use the ' +
        '`carbon-addons-cloud-react` package instead.'
    );
    didWarnAboutDeprecation = true;
  }
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
