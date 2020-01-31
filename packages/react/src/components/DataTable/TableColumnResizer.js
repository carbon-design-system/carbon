/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { settings } from 'carbon-components';
const { prefix } = settings;

export const actionTypes = {
  START_RESIZING: 'START_RESIZING',
  UPDATE_COLWIDTH: 'UPDATE_COLWIDTH',
  END_RESIZING: 'END_RESIZING',
};

const TableColumnResizer = ({ resizeAction, ...rest }) => {
  // is a resizing active for this column
  const [columnResizingActive, setColumnResizingActive] = useState(false);

  const startResizing = () => {
    resizeAction(actionTypes.START_RESIZING);
    setColumnResizingActive(true);
    document.onmouseup = endResizing;
    document.onmousemove = doResizing;
    // keep cursor style everywhere during resizing
    document.body.style.cursor = 'col-resize';
  };

  const endResizing = () => {
    document.onmouseup = null;
    document.onmousemove = null;
    document.body.style.cursor = 'default';
    setColumnResizingActive(false);
    // resets memoized column widths to current values
    resizeAction(actionTypes.END_RESIZING);
  };

  const doResizing = ev => {
    // prevent other mouse actions like text selection
    ev.stopPropagation();
    ev.preventDefault();
    resizeAction(actionTypes.UPDATE_COLWIDTH, ev.movementX);
  };

  // is resizing active on any column
  const isResizingActive = () => {
    return Boolean(document.onmouseup && document.onmousemove);
  };

  // permanently highlight only active resizer while resizing
  const resizerClassName = cx({
    [`${prefix}--table-header-resizer`]: true,
    [`${prefix}--table-header-resizer-active`]: columnResizingActive,
    [`${prefix}--table-header-resizer-passive`]:
      isResizingActive() && !columnResizingActive,
  });

  return (
    <div
      className={resizerClassName}
      onMouseDown={() => startResizing()}
      role="separator"
      {...rest}></div>
  );
};

TableColumnResizer.propTypes = {
  resizeColumn: PropTypes.func,
  finalizeColumnResizing: PropTypes.func,
};

TableColumnResizer.displayName = 'TableColumnResizer';

export default TableColumnResizer;
