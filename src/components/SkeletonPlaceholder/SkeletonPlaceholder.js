import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const SkeletonPlaceholder = ({ className, ...other }) => {
  const skeletonPlaceholderClasses = classNames({
    'bx--skeleton__placeholder': true,
    [className]: className,
  });

  return <div className={skeletonPlaceholderClasses} {...other} />;
};

SkeletonPlaceholder.propTypes = {
  /**
   * the class to be applied to the component
   */
  className: PropTypes.string,
};

export default SkeletonPlaceholder;
