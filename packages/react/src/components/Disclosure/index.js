/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
function Disclosure({ className, children }) {
  return <details className={className}>{children}</details>;
}

function DisclosureButton({ className, children }) {
  return <summary className={className}>{children}</summary>;
}
Disclosure.propTypes = {
  /**
   * The child nodes.
   */
  children: PropTypes.node,

  /**
   * Specify className to be applied to Disclosure and DisclosureButton
   */
  className: PropTypes.string,
};

DisclosureButton.propTypes = {
  /**
   * The child nodes.
   */
  children: PropTypes.node,

  /**
   * Specify className to be applied to Disclosure and DisclosureButton
   */
  className: PropTypes.string,
};

export { Disclosure, DisclosureButton };
