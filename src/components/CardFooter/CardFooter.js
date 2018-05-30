import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import warning from 'warning';

let didWarnAboutDeprecation = false;

const CardFooter = ({ children, className, ...other }) => {
  if (__DEV__) {
    warning(
      didWarnAboutDeprecation,
      'Accessing the `CardContent` component from the ' +
        '`carbon-components-react` package is deprecated. Use the ' +
        '`carbon-addons-cloud-react` package instead.'
    );
    didWarnAboutDeprecation = true;
  }
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
