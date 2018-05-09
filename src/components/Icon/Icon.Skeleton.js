import PropTypes from 'prop-types';
import React from 'react';

const IconSkeleton = ({ style }) => {
  const props = {
    style,
  };

  return <div className="bx--icon--skeleton" {...props} />;
};

IconSkeleton.propTypes = {
  /**
   * The CSS styles.
   */
  style: PropTypes.object,
};

export default IconSkeleton;
