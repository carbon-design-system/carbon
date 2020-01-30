/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { settings } from 'carbon-components';
import {
  ArrowUp20 as Arrow,
  ArrowsVertical20 as Arrows,
} from '@carbon/icons-react';
import { sortStates } from './state/sorting';

const { prefix } = settings;

const translationKeys = {
  iconDescription: 'carbon.table.header.icon.description',
};

const translateWithId = (key, { sortDirection, isSortHeader, sortStates }) => {
  if (key === translationKeys.iconDescription) {
    if (isSortHeader) {
      // When transitioning, we know that the sequence of states is as follows:
      // NONE -> ASC -> DESC -> NONE
      if (sortDirection === sortStates.NONE) {
        return 'Sort rows by this header in ascending order';
      }
      if (sortDirection === sortStates.ASC) {
        return 'Sort rows by this header in descending order';
      }

      return 'Unsort rows by this header';
    }
    return 'Sort rows by this header in ascending order';
  }

  return '';
};

const sortDirections = {
  [sortStates.NONE]: 'none',
  [sortStates.ASC]: 'ascending',
  [sortStates.DESC]: 'descending',
};

const TableHeader = React.forwardRef(function TableHeader(
  {
    className: headerClassName,
    children,
    colSpan,
    isSortable,
    isSortHeader,
    isResizable,
    onClick,
    scope,
    sortDirection,
    translateWithId: t,
    colWidth,
    colKey,
    modifyColumnWidth,
    ...rest
  },
  ref
) {

  const [resizing, setResizing] = useState(false);
  const [expectedColWidth, setExpectedColWidth] = useState(colWidth);

  if (isResizable) {

    const doResizing = ev => {
      if (resizing) {
        if (expectedColWidth && expectedColWidth !== colWidth) {
          console.log(`! cw: ${colWidth} ecw ${expectedColWidth} `)
          setResizing(false);
        } else {
          // const br = ref.current.getBoundingClientRect();
          const newWidth = colWidth + ev.movementX;// ev.clientX - br.x + 3;
          setExpectedColWidth(newWidth);
          console.log(`cw: ${colWidth} w: ${br.width} m: ${ev.movementX} nw:${newWidth}`);
          modifyColumnWidth(colKey, ev.movementX);
        }
      }
    }

    return (
      <th
        className={headerClassName}
        colSpan={colSpan}
        ref={ref}
        scope={scope}
        style={{ width: colWidth }}>
        <div className={`${prefix}--table-header-resizable`} {...rest}>
          <span className={`${prefix}--table-header-label`}>{children}</span>
          <div
            className={`${prefix}--table-header-resizer`}
            onMouseDown={() => setResizing(true)}
            onMouseUp={() => setResizing(false)}
            onMouseLeave={() => setResizing(false)} /* TODO: required? */
            onMouseMove={e => doResizing(e)}
            role="separator">
          </div>
        </div>
      </th>
    );
  }

  if (!isSortable) {
    return (
      <th {...rest} className={headerClassName} scope={scope} colSpan={colSpan} ref={ref}>
        <span className={`${prefix}--table-header-label`}>{children}</span>
      </th>
    );
  }

  const className = cx(headerClassName, {
    [`${prefix}--table-sort`]: true,
    [`${prefix}--table-sort--active`]:
      isSortHeader && sortDirection !== sortStates.NONE,
    [`${prefix}--table-sort--ascending`]:
      isSortHeader && sortDirection === sortStates.DESC,
  });
  const ariaSort = !isSortHeader ? 'none' : sortDirections[sortDirection];

  return (
    <th
      aria-sort={ariaSort}
      className={headerClassName}
      colSpan={colSpan}
      ref={ref}
      scope={scope}>
      <button className={className} onClick={onClick} {...rest}>
        <span className={`${prefix}--table-header-label`}>{children}</span>
        <Arrow
          className={`${prefix}--table-sort__icon`}
          aria-label={t('carbon.table.header.icon.description', {
            header: children,
            sortDirection,
            isSortHeader,
            sortStates,
          })}
        />
        <Arrows
          className={`${prefix}--table-sort__icon-unsorted`}
          aria-label={t('carbon.table.header.icon.description', {
            header: children,
            sortDirection,
            isSortHeader,
            sortStates,
          })}
        />
      </button>
    </th>
  );
});

TableHeader.propTypes = {
  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Pass in children that will be embedded in the table header label
   */
  children: PropTypes.node,

  /**
   * Specify `colSpan` as a non-negative integer value to indicate how
   * many columns the TableHeader cell extends in a table
   */
  colSpan: PropTypes.number,

  /**
   * Specify whether this header is one through which a user can sort the table
   */
  isSortable: PropTypes.bool,

  /**
   * Specify whether this header is the header by which a table is being sorted
   * by
   */
  isSortHeader: PropTypes.bool,

  /**
   * Hook that is invoked when the header is clicked
   */
  onClick: PropTypes.func,

  /**
   * Specify the scope of this table header. You can find more info about this
   * attribute at the following URL:
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#attr-scope
   */
  scope: PropTypes.string.isRequired,

  /**
   * Specify which direction we are currently sorting by, should be one of DESC,
   * NONE, or ASC.
   */
  sortDirection: PropTypes.oneOf(Object.values(sortStates)),

  /**
   * Supply a method to translate internal strings with your i18n tool of
   * choice. Translation keys are avabile on the `translationKeys` field for
   * this component.
   */
  translateWithId: PropTypes.func,

  isResizable: PropTypes.bool,

  colKey: PropTypes.string.isRequired,

  modifyColumnWidth: PropTypes.func,
};

TableHeader.defaultProps = {
  isSortable: false,
  scope: 'col',
  translateWithId,
};

TableHeader.translationKeys = Object.values(translationKeys);

TableHeader.displayName = 'TableHeader';

export default TableHeader;
