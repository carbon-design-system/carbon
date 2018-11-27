import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { prefix } = settings;

const IconSkeleton = ({ style }) => {
  const props = {
    style,
  };

  return <div className={`${prefix}--icon--skeleton`} {...props} />;
};

IconSkeleton.propTypes = {
  /**
   * The CSS styles.
   */
  style: PropTypes.object,
};

export default IconSkeleton;
