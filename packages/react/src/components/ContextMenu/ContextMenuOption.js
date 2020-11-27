/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

function ContextMenuOption({ label }) {
  const classes = classnames(`${prefix}--context-menu-option`);

  return <li className={classes}>{label}</li>;
}

ContextMenuOption.propTypes = {
  /**
   * Rendered label for the TreeNode
   */
  label: PropTypes.node.isRequired,
};

export default ContextMenuOption;
