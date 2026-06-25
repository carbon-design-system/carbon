/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';
import { useIsomorphicEffect } from '../../../global/js/hooks';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Checkbox, OverflowMenu, OverflowMenuItem } from '@carbon/react';
import { CaretDown } from '@carbon/react/icons';
import { pkg } from '../../../settings';
import { DataGridState, DataGridToggleAllRowsProps } from '../types';

const blockClass = `${pkg.prefix}--datagrid`;

const SELECT_ALL_PAGE_ROWS = 'pageRows';
const SELECT_ALL_ROWS = 'allRows';

const SelectAllWithToggle = ({
  tableId,
  isFetching,
  isAllRowsSelected,
  selectAllToggle,
  getToggleAllPageRowsSelectedProps,
  getToggleAllRowsSelectedProps,
  allPageRowsLabel = 'Select all on page',
  allRowsLabel = 'Select all',
  columns,
  withStickyColumn,
}: DataGridState) => {
  const { onSelectAllRows, labels } = selectAllToggle || {};
  const [selectAllMode, setSelectAllMode] = useState(SELECT_ALL_PAGE_ROWS);
  useEffect(() => {
    if (onSelectAllRows) {
      onSelectAllRows(isAllRowsSelected && selectAllMode === SELECT_ALL_ROWS);
    }
  }, [isAllRowsSelected, selectAllMode, onSelectAllRows]);

  const [windowSize, setWindowSize] = useState<number>();
  useIsomorphicEffect(() => {
    setWindowSize(window.innerWidth);
    function updateSize() {
      setWindowSize(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  if (labels) {
    allPageRowsLabel = labels?.allPageRows || allPageRowsLabel;
    allRowsLabel = labels.allRows || allRowsLabel;
  }
  const getProps =
    selectAllMode === SELECT_ALL_PAGE_ROWS
      ? getToggleAllPageRowsSelectedProps
      : getToggleAllRowsSelectedProps;
  const { onChange, ...selectProps } = getProps() as DataGridToggleAllRowsProps;
  const disabled = isFetching || selectProps.disabled;
  const isFirstColumnStickyLeft =
    columns?.[0]?.sticky === 'left' && withStickyColumn;
  return (
    <th
      scope="col"
      className={cx(`${blockClass}__select-all-toggle-on`, {
        [`${blockClass}__select-all-sticky-left`]:
          isFirstColumnStickyLeft && (windowSize ?? 0) > 671,
      })}
    >
      <span>
        <Checkbox
          {...selectProps}
          name={`${tableId}-select-all-checkbox-name`}
          onClick={(e: any) => {
            onChange?.(e);
          }}
          disabled={disabled}
          id={`${tableId}-select-all-checkbox-id`}
          labelText={allRowsLabel as string}
          hideLabel
        />
      </span>
      <OverflowMenu
        renderIcon={(props) => <CaretDown size={16} {...props} />}
        size="sm"
        aria-label={allRowsLabel}
        menuOptionsClass={`${blockClass}__select-all-toggle-overflow`}
      >
        <OverflowMenuItem
          itemText={allPageRowsLabel as string}
          requireTitle
          disabled={disabled}
          onClick={() => {
            setSelectAllMode(SELECT_ALL_PAGE_ROWS);
            // deselect all rows first
            (getToggleAllRowsSelectedProps as any)?.()?.onChange({
              target: { checked: false },
            });
            // select all row on current page
            (getToggleAllPageRowsSelectedProps as any)().onChange({
              target: { checked: true },
            });
          }}
        />
        <OverflowMenuItem
          itemText={allRowsLabel as string}
          requireTitle
          disabled={disabled}
          onClick={() => {
            setSelectAllMode(SELECT_ALL_ROWS);
            (getToggleAllRowsSelectedProps as any)().onChange({
              target: { checked: true },
            });
          }}
        />
      </OverflowMenu>
    </th>
  );
};

SelectAllWithToggle.propTypes = {
  allPageRowsLabel: PropTypes.string,
  allRowsLabel: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.object),
  getToggleAllPageRowsSelectedProps: PropTypes.func.isRequired,
  getToggleAllRowsSelectedProps: PropTypes.func.isRequired,
  isAllRowsSelected: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool,
  selectAllToggle: PropTypes.object,
  tableId: PropTypes.string.isRequired,
  withStickyColumn: PropTypes.bool,
};

export default SelectAllWithToggle;
