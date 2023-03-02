/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import { IdPrefixContext } from '../../internal/useIdPrefix';

function IdPrefix({ children, prefix }) {
  return (
    <IdPrefixContext.Provider value={prefix}>
      {children}
    </IdPrefixContext.Provider>
  );
}

IdPrefix.propTypes = {
  children: PropTypes.node,

  /**
   * The value used to prefix the auto-generated id placed on some DOM elements
   */
  prefix: PropTypes.string,
};

export { IdPrefix };
