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
import { CaretRight16 } from '@carbon/icons-react';
import ContextMenu from './ContextMenu';

const { prefix } = settings;

function ContextMenuOptionContent({ label, info }) {
  return (
    <button className={`${prefix}--context-menu-option__content`} type="button">
      <span className={`${prefix}--context-menu-option__label`} title={label}>
        {label}
      </span>
      <div className={`${prefix}--context-menu-option__info`}>{info}</div>
    </button>
  );
}

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
          <ContextMenuOptionContent label={label} info={<CaretRight16 />} />
          <ContextMenu>{subOptions}</ContextMenu>
        </>
      ) : (
        <ContextMenuOptionContent label={label} />
      )}
    </li>
  );
}

ContextMenuOptionContent.propTypes = {
  /**
   * Additional information such as shortcut or caret
   */
  info: PropTypes.node,

  /**
   * Rendered label for the ContextMenuOptionContent
   */
  label: PropTypes.node.isRequired,
};

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
