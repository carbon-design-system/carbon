/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';

const NavItemLink = React.forwardRef(function NavItemLink(props, ref) {
  const { element = 'a', ...rest } = props;
  return React.createElement(element, { ...rest, ref });
});

NavItemLink.displayName = 'NavItemLink';

NavItemLink.propTypes = {
  /** @type {elementType} The base element to use to build the link. Defaults to `a`, can also accept alternative tag names or custom components like `Link` from `react-router`. */
  element: PropTypes.elementType,
};

export default NavItemLink;
