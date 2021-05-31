/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';

function MenuGroup({ label, children }) {
  return (
    <li role="none">
      <ul role="group" aria-label={label}>
        {children}
      </ul>
    </li>
  );
}

MenuGroup.propTypes = {
  /**
   * Specify the children of the MenuGroup
   */
  children: PropTypes.node,

  /**
   * Rendered label for the MenuGroup
   */
  label: PropTypes.node.isRequired,
};

export default MenuGroup;
