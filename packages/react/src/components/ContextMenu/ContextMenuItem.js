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
  shortcut,
  shortcutText,
  ...rest
}) {
  return (
    <ContextMenuOption
      {...rest}
      label={label}
      disabled={disabled}
      shortcut={shortcut}
      shortcutText={shortcutText}>
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
   * Rendered label for the ContextMenuItem
   */
  label: PropTypes.node.isRequired,

  /**
   * Rendered shortcut for the ContextMenuItem
   */
  shortcut: PropTypes.node,

  /**
   * The text-only representation of the shortcut read to screen readers
   */
  shortcutText: PropTypes.string,
};

export default ContextMenuItem;
