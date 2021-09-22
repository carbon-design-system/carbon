/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';

/**
 * Link is a custom component that allows us to supporting rendering elements
 * other than `a` in our markup. The goal is to allow users to support passing
 * in their own components to support use-cases like `react-router` or
 * `@reach/router`
 */
const Link = React.forwardRef(function Link(props, ref) {
  const {
    element,
    isSideNavExpanded, // eslint-disable-line no-unused-vars
    ...rest
  } = props;
  return React.createElement(element, { ...rest, ref });
});

const LinkPropTypes = {
  /**
   * The base element to use to build the link. Defaults to `a`, can also accept
   * alternative tag names or custom components like `Link` from `react-router`.
   */
  element: PropTypes.elementType,

  /**
   * Property to indicate if the side nav container is open (or not). Use to
   * keep local state and styling in step with the SideNav expansion state.
   */
  isSideNavExpanded: PropTypes.bool,
};

Link.displayName = 'Link';
Link.propTypes = LinkPropTypes;
Link.defaultProps = {
  element: 'a',
};

export { LinkPropTypes };
export default Link;
