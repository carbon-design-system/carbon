/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';

import MenuOption from './MenuOption';

function MenuItem({ label, children, disabled, kind, shortcut, ...rest }) {
  return (
    <MenuOption
      {...rest}
      label={label}
      disabled={disabled}
      kind={kind}
      shortcut={shortcut}>
      {children}
    </MenuOption>
  );
}

MenuItem.propTypes = {
  /**
   * Specify the children of the MenuItem
   */
  children: PropTypes.node,

  /**
   * Specify whether this MenuItem is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Optional prop to specify the kind of the MenuItem
   */
  kind: PropTypes.oneOf(['default', 'danger']),

  /**
   * Rendered label for the MenuItem
   */
  label: PropTypes.node.isRequired,

  /**
   * Rendered shortcut for the MenuItem
   */
  shortcut: PropTypes.node,
};

export default MenuItem;
