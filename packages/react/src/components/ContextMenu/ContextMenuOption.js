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
import ContextMenu from './ContextMenu';

const { prefix } = settings;

function ContextMenuOption({ label, children }) {
  const subOptions = React.Children.map(children, (node) => {
    if (React.isValidElement(node)) {
      return React.cloneElement(node);
    }
  });

  const classes = classnames(`${prefix}--context-menu-option`);

  return (
    <li className={classes}>
      {subOptions ? (
        <>
          <div className={`${prefix}--context-menu-option__content`}>
            {label}
          </div>
          <ContextMenu>{subOptions}</ContextMenu>
        </>
      ) : (
        <div className={`${prefix}--context-menu-option__content`}>{label}</div>
      )}
    </li>
  );
}

ContextMenuOption.propTypes = {
  /**
   * Specify the children of the ContextMenuOption
   */
  children: PropTypes.node,

  /**
   * Rendered label for the ContextMenuOption
   */
  label: PropTypes.node.isRequired,
};

export default ContextMenuOption;
