/**
 * Copyright IBM Corp. 2021, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  useRef,
  MutableRefObject,
  useEffect,
  useState,
  RefObject,
} from 'react';
import PropTypes from 'prop-types';
import {
  TableToolbar,
  TableBatchActions,
  TableBatchAction,
  MenuButton,
  MenuItem,
  usePrefix,
} from '@carbon/react';
import { useResizeObserver } from '../../../global/js/hooks/useResizeObserver';
import { pkg } from '../../../settings';
import cx from 'classnames';
import { handleSelectAllRowData } from './addons/stateReducer';
import { DataGridState, DatagridRowProps } from '../types';

const blockClass = `${pkg.prefix}--datagrid__table-toolbar`;

interface DatagridToolbarProps {
  ariaToolbarLabel?: string;
}

const DatagridBatchActionsToolbar = (
  datagridState: DataGridState,
  width: number,
  ref: MutableRefObject<any>
) => {
  const [displayAllInMenu, setDisplayAllInMenu] = useState(false);
  const [initialListWidth, setInitialListWidth] = useState(null);
  const [receivedInitialWidth, setReceivedInitialWidth] = useState(false);
  const {
    onSelectAllRows,
    state: { selectedRowIds },
    toggleAllRowsSelected,
    toolbarBatchActions,
    toolbarBatchActionsDisplayMin,
    setGlobalFilter,
    rows,
    dispatch,
    getRowId,
    batchActionMenuButtonLabel,
    translateWithIdBatchActions,
  } = datagridState;
  const carbonPrefix = usePrefix();
  const [availableRowsCount, setAvailableRowsCount] = useState(rows.length);

  const batchActionMenuButtonLabelText = batchActionMenuButtonLabel ?? 'More';
  const selectedKeys = Object.keys(selectedRowIds || {});
  const totalSelected = selectedKeys.length;

  useEffect(() => {
    const countDisabledRows =
      (rows.find((row) => row.getRowProps)?.getRowProps?.() as DatagridRowProps)
        ?.nonselectablerows?.length || 0;
    if (rows) {
      setAvailableRowsCount(rows.length - countDisabledRows);
    }
  }, [rows]);

  // Get initial width of batch actions container,
  // used to measure when all items are put inside
  // the ButtonMenu
  useEffect(() => {
    if (totalSelected === 1 && !receivedInitialWidth) {
      const batchActionListWidth = ref?.current?.querySelector(
        `.${carbonPrefix}--action-list`
      ).offsetWidth;
      setInitialListWidth(batchActionListWidth);
      setReceivedInitialWidth(true);
    }
  }, [totalSelected, receivedInitialWidth, ref, carbonPrefix]);

  useEffect(() => {
    const summaryWidth = ref?.current.querySelector(
      `.${carbonPrefix}--batch-summary`
    ).offsetWidth;
    if (width < summaryWidth + initialListWidth + 32) {
      setDisplayAllInMenu(true);
    } else {
      setDisplayAllInMenu(false);
    }
  }, [width, ref, initialListWidth, carbonPrefix]);

  const getSelectedRowData = () => {
    if (selectedKeys.length === 0) {
      return [];
    }
    return selectedKeys.map((rowIndex) => {
      const filteredRow = rows.filter(
        (row) => row.index === parseInt(rowIndex)
      );
      return filteredRow.length ? filteredRow[0] : [];
    });
  };

  // Render batch actions in ButtonMenu
  const renderBatchActionOverflow = () => {
    const menuClass = `${blockClass}__button-menu`;
    const minWidthBeforeOverflowIcon = 380;
    // Do not render ButtonMenu when there are 3 or less items
    // and if there is enough available space to render all the items
    if (
      toolbarBatchActions &&
      !displayAllInMenu &&
      ((!toolbarBatchActionsDisplayMin && toolbarBatchActions?.length <= 3) ||
        (toolbarBatchActionsDisplayMin !== undefined &&
          toolbarBatchActions?.length <= toolbarBatchActionsDisplayMin))
    ) {
      return;
    }

    const renderItem = (batchAction, index) => (
      <MenuItem
        key={`${batchAction.label}-${index}`}
        label={batchAction.label}
        onClick={(event) => onClickHandler(event, batchAction)}
      />
    );

    return (
      <MenuButton
        label={batchActionMenuButtonLabelText}
        className={cx([
          menuClass,
          {
            [`${menuClass}-icon-only`]: width <= minWidthBeforeOverflowIcon,
          },
        ])}
        tabIndex={totalSelected > 0 ? 0 : -1}
        menuAlignment="bottom"
      >
        {toolbarBatchActions?.map((batchAction, index) => {
          let hidden =
            toolbarBatchActionsDisplayMin === undefined &&
            index < 2 &&
            !displayAllInMenu;
          if (
            toolbarBatchActionsDisplayMin !== undefined &&
            index < toolbarBatchActionsDisplayMin &&
            !displayAllInMenu
          ) {
            hidden = true;
          }
          if (!hidden) {
            return renderItem(batchAction, index);
          }
        })}
      </MenuButton>
    );
  };

  const onClickHandler = (event, batchAction) => {
    batchAction.onClick(getSelectedRowData(), event);
    if (batchAction.type === 'select_all') {
      toggleAllRowsSelected(true);
    }
  };

  const onCancelHandler = () => {
    handleSelectAllRowData({
      dispatch,
      rows: [],
      getRowId,
      isChecked: false,
      indeterminate: undefined,
    });
    toggleAllRowsSelected(false);
    setGlobalFilter?.(null);
  };

  const onSelectAllHandler = () => {
    toggleAllRowsSelected(true);
    onSelectAllRows?.(true);
    handleSelectAllRowData({
      dispatch,
      rows,
      getRowId,
      indeterminate: undefined,
      isChecked: undefined,
    });
  };

  // Only display the first two batch actions, the rest are
  // displayed inside of the ButtonMenu if there are more than
  // 3 batch actions
  return (
    <TableBatchActions
      shouldShowBatchActions={totalSelected > 0}
      totalSelected={totalSelected}
      onCancel={onCancelHandler}
      onSelectAll={onSelectAllHandler}
      totalCount={availableRowsCount}
      translateWithId={translateWithIdBatchActions}
    >
      {!displayAllInMenu &&
        toolbarBatchActions &&
        toolbarBatchActions?.map((batchAction, index) => {
          if (
            (!toolbarBatchActionsDisplayMin &&
              index < 2 &&
              toolbarBatchActions.length > 3) ||
            (index < 3 && toolbarBatchActions.length <= 3) ||
            (toolbarBatchActionsDisplayMin !== undefined &&
              index < toolbarBatchActionsDisplayMin)
          ) {
            return (
              <TableBatchAction
                key={`${batchAction.label}-${index}`}
                renderIcon={batchAction.renderIcon}
                onClick={(event) => onClickHandler(event, batchAction)}
                className={cx({
                  [`${carbonPrefix}--noLabel`]:
                    !batchAction.label || batchAction.label === '',
                })}
                iconDescription={batchAction.label}
                tabIndex={totalSelected > 0 ? 0 : -1}
              >
                {batchAction.label}
              </TableBatchAction>
            );
          }
        })}
      {renderBatchActionOverflow()}
    </TableBatchActions>
  );
};

const DatagridToolbar = ({
  ariaToolbarLabel,
  ...datagridState
}: DatagridToolbarProps & DataGridState) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { width } = useResizeObserver(ref as RefObject<HTMLDivElement>);
  const { DatagridActions, DatagridBatchActions, batchActions, rowSize } =
    datagridState;
  const getRowHeight = rowSize || 'lg';
  return batchActions && DatagridActions ? (
    <div
      ref={ref}
      className={cx([blockClass, `${blockClass}--${getRowHeight}`])}
    >
      <TableToolbar aria-label={ariaToolbarLabel}>
        {DatagridActions && <DatagridActions {...datagridState} />}
        {DatagridBatchActionsToolbar?.(datagridState, width, ref)}
      </TableToolbar>
    </div>
  ) : DatagridActions ? (
    <div className={blockClass}>
      <TableToolbar aria-label={ariaToolbarLabel}>
        {DatagridActions && <DatagridActions {...datagridState} />}
        {DatagridBatchActions?.(datagridState)}
      </TableToolbar>
    </div>
  ) : null;
};

DatagridToolbar.propTypes = {
  ariaToolbarLabel: PropTypes.string,
};

export default DatagridToolbar;
