/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';

function <%= name %>({ children, ...rest }) {
  return <div {...rest}>{children}</div>;
}

<%= name %>.propTypes = {
  children: PropTypes.node,
};

export default <%= name %>;
