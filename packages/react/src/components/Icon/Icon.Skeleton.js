/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

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
