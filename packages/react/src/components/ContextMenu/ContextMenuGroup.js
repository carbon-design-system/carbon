/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';

function ContextMenuGroup({ label, children }) {
  return (
    <li role="none">
      <ul role="group" aria-label={label}>
        {children}
      </ul>
    </li>
  );
}

ContextMenuGroup.propTypes = {
  /**
   * Specify the children of the ContextMenuGroup
   */
  children: PropTypes.node,

  /**
   * Rendered label for the ContextMenuGroup
   */
  label: PropTypes.node.isRequired,
};

export default ContextMenuGroup;
