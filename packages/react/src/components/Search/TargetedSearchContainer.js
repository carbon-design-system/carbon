import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';

const { prefix } = settings;

const TargetedSearchContainer = ({ className, size, children, ...rest }) => {
  const classes = cx(
    `${prefix}--search--targeted__container`,
    {
      [`${prefix}--search--targeted--${size}__container`]: size,
    },
    className
  );
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

TargetedSearchContainer.propTypes = {
  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify the search size
   */
  size: PropTypes.oneOf(['sm', 'lg', 'xl']),
};

export default TargetedSearchContainer;
