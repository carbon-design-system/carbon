/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';

import ContextMenuOption from './ContextMenuOption';

function ContextMenuItem({
  label,
  children,
  disabled,
  kind = 'default',
  shortcut,
  ...rest
}) {
  return (
    <ContextMenuOption
      {...rest}
      label={label}
      disabled={disabled}
      kind={kind}
      shortcut={shortcut}>
      {children}
    </ContextMenuOption>
  );
}

ContextMenuItem.propTypes = {
  /**
   * Specify the children of the ContextMenuItem
   */
  children: PropTypes.node,

  /**
   * Specify whether this ContextMenuItem is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Optional prop to specify the kind of the ContextMenuItem
   */
  kind: PropTypes.oneOf(['default', 'danger']),

  /**
   * Rendered label for the ContextMenuItem
   */
  label: PropTypes.node.isRequired,

  /**
   * Rendered shortcut for the ContextMenuItem
   */
  shortcut: PropTypes.node,
};

export default ContextMenuItem;
