/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import { settings } from 'carbon-components';
import { useColumnResizing } from './tools/columnResize';
const { prefix } = settings;

// resizer component within table header

const TableColumnResizer = ({ headerRef, colKey, ...rest }) => {
  const {
    columnKeyResizeActive,
    initColumnResizing,
    cleanupColumnResizing,
    startResizeAction,
    endResizeAction,
    resizeColumn,
    syncOnWindowResize,
  } = useColumnResizing(colKey);

  useEffect(() => {
    // initially set width of our column
    initColumnResizing(headerRef);
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
      cleanupColumnResizing();
    };

    // disable lint rule since a ref may not be included in the dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleWindowResize = () => {
    syncOnWindowResize(headerRef);
  };

  const startResizing = ev => {
    startResizeAction(ev.clientX, headerRef);
    document.onmouseup = endResizing;
    document.onmousemove = doResizing;
    // keep cursor style everywhere during resizing
    document.body.style.cursor = 'col-resize';
  };

  const endResizing = () => {
    document.onmouseup = null;
    document.onmousemove = null;
    document.body.style.cursor = 'default';
    endResizeAction();
  };

  const doResizing = ev => {
    // prevent other mouse actions like text selection
    ev.stopPropagation();
    ev.preventDefault();
    resizeColumn(ev.clientX);
  };

  // permanently highlight only active resizer while resizing
  const resizerClassName = cx({
    [`${prefix}--table-header-resizer`]: true,
    [`${prefix}--table-header-resizer-active`]:
      columnKeyResizeActive === colKey,
    [`${prefix}--table-header-resizer-passive`]:
      columnKeyResizeActive && columnKeyResizeActive !== colKey,
  });

  return (
    <div
      className={resizerClassName}
      onMouseDown={ev => startResizing(ev)}
      role="separator"
      {...rest}
    />
  );
};

TableColumnResizer.propTypes = {
  /**
   * key for the column as defined in the header data
   */
  colKey: PropTypes.string.isRequired,

  /**
   * ref of the table header that includes this component
   */
  headerRef: PropTypes.object.isRequired,
};

TableColumnResizer.displayName = 'TableColumnResizer';

export default TableColumnResizer;
