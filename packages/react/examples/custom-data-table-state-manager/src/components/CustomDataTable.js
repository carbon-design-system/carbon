import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { Delete16 as Delete } from '@carbon/icons-react';
import {
  TableContainer,
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableSelectRow,
  TableSelectAll,
  TableToolbar,
  TableToolbarAction,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarMenu,
  TableBatchActions,
  TableBatchAction,
} from 'carbon-components-react';
import {
  useFilteredRows,
  usePageInfo,
  useRowSelection,
  useSortedRows,
  useSortInfo,
  useUniqueId,
} from '../hooks';
import Pagination from './Pagination';
import {
  TABLE_SIZE,
  TABLE_SORT_DIRECTION,
  doesRowMatchSearchString,
} from '../misc';

/**
 * An example state manager that an application can start with to achieve
 * a fully-customized data table.
 *
 * There are many different use cases for managing data table state,
 * i.e. lazy-loading table row data that are not on the current page.
 *
 * Carbon has `<DataTable>` component manage table state,
 * but one `<DataTable>` supporting every possible use case will make it very complex.
 *
 * In case Carbon `<DataTable>` doesn't meet the needs of BU/application,
 * PALs/applications create a state manager by their own, i.e. starting with
 * this example.
 *
 * Carbon design for table is implemented by `<Table>`, `<TableRow>`,
 * `<TableCell>`, etc.,
 * whereas `<DataTable>` is merely a state manager.
 *
 * Therefore, using a custom component in place of `<DataTable>` does _not_ mean
 * going away from Carbon design.
 *
 * THIS COMPONENT IS FOR DEMONSTRATION PURPOSES ONLY.
 */
const CustomDataTable = ({
  id,
  collator,
  columns,
  hasSelection,
  pageSize: propPageSize,
  rows: propRows,
  size,
  sortInfo: propSortInfo,
  start: propStart,
  zebra,
}) => {
  const [rows, setRows] = useState(propRows);
  const [sortInfo, setSortInfo] = useSortInfo(propSortInfo);
  const [filteredRows, searchString, setSearchString] = useFilteredRows(rows);
  const [setRowSelection] = useRowSelection(
    filteredRows,
    searchString,
    setRows
  );
  const [sortedRows] = useSortedRows(filteredRows, sortInfo, collator);
  const [start, pageSize, setStart, setPageSize] = usePageInfo(
    propStart,
    propPageSize,
    filteredRows.length
  );

  const elementId = useUniqueId(id);
  const selectedRowsCountInFiltered = filteredRows.filter(
    ({ selected }) => selected
  ).length;
  const selectedAllInFiltered =
    selectedRowsCountInFiltered > 0 &&
    filteredRows.length === selectedRowsCountInFiltered;
  const hasBatchActions = hasSelection && selectedRowsCountInFiltered > 0;
  const { columnId: sortColumnId, direction: sortDirection } = sortInfo;
  const selectionAllName = !hasSelection
    ? undefined
    : `__custom-data-table_select-all_${elementId}`;

  const handleCancelSelection = useCallback(() => {
    setRowSelection(undefined, false);
  }, [setRowSelection]);

  const handleChangeSearchString = useCallback(
    ({ target }) => {
      setSearchString(target.value);
    },
    [setSearchString]
  );

  const handleChangeSelection = useCallback(
    (event) => {
      const { currentTarget } = event;
      const row = currentTarget.closest('tr');
      if (row) {
        setRowSelection(Number(row.dataset.rowId), currentTarget.checked);
      }
    },
    [setRowSelection]
  );

  const handleChangeSelectionAll = useCallback(
    (event) => {
      setRowSelection(undefined, event.currentTarget.checked);
    },
    [setRowSelection]
  );

  const handleChangeSort = useCallback(
    (event) => {
      const { currentTarget } = event;
      const {
        columnId,
        sortCycle,
        sortDirection: oldDirection,
      } = currentTarget.dataset;
      setSortInfo({ columnId, sortCycle, oldDirection });
    },
    [setSortInfo]
  );

  const handleChangePageSize = useCallback(
    ({ pageSize }) => {
      setPageSize(pageSize);
    },
    [setPageSize]
  );

  const handleChangeStart = useCallback(
    ({ start }) => {
      setStart(start);
    },
    [setStart]
  );

  const handleDeleteRows = useCallback(() => {
    setRows(
      rows.filter(
        (row) => !row.selected || !doesRowMatchSearchString(row, searchString)
      )
    );
  }, [rows, searchString]);

  /* eslint-disable no-script-url */
  return (
    <TableContainer title="DataTable" description="Fully customized">
      <TableToolbar>
        <TableBatchActions
          shouldShowBatchActions={hasBatchActions}
          totalSelected={selectedRowsCountInFiltered}
          onCancel={handleCancelSelection}>
          <TableBatchAction
            tabIndex={hasBatchActions ? 0 : -1}
            renderIcon={Delete}
            onClick={handleDeleteRows}>
            Delete
          </TableBatchAction>
        </TableBatchActions>
        <TableToolbarContent>
          <TableToolbarSearch
            tabIndex={hasBatchActions ? -1 : 0}
            onChange={handleChangeSearchString}
          />
          <TableToolbarMenu tabIndex={hasBatchActions ? -1 : 0}>
            <TableToolbarAction onClick={() => alert('Alert 1')}>
              Action 1
            </TableToolbarAction>
            <TableToolbarAction onClick={() => alert('Alert 2')}>
              Action 2
            </TableToolbarAction>
            <TableToolbarAction onClick={() => alert('Alert 3')}>
              Action 3
            </TableToolbarAction>
          </TableToolbarMenu>
        </TableToolbarContent>
      </TableToolbar>
      <Table size={size} isSortable>
        <TableHead>
          <TableRow>
            {hasSelection && (
              <TableSelectAll
                id={`${elementId}--select-all`}
                checked={selectedAllInFiltered}
                indeterminate={
                  selectedRowsCountInFiltered > 0 && !selectedAllInFiltered
                }
                ariaLabel="Select all rows"
                name={selectionAllName}
                onSelect={handleChangeSelectionAll}
              />
            )}
            {columns.map(({ id: columnId, sortCycle, title }) => {
              const sortDirectionForThisCell =
                sortCycle &&
                (columnId === sortColumnId
                  ? sortDirection
                  : TABLE_SORT_DIRECTION.NONE);
              return (
                <TableHeader
                  key={columnId}
                  isSortable={Boolean(sortCycle)}
                  isSortHeader={sortCycle && columnId === sortColumnId}
                  sortDirection={sortDirectionForThisCell}
                  data-column-id={columnId}
                  data-sort-cycle={sortCycle}
                  data-sort-direction={sortDirectionForThisCell}
                  onClick={handleChangeSort}>
                  {title}
                </TableHeader>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody zebra={zebra}>
          {sortedRows.slice(start, start + pageSize).map((row) => {
            const { id: rowId, selected } = row;
            const selectionName = !hasSelection
              ? undefined
              : `__custom-data-table_${elementId}_${rowId}`;
            return (
              <TableRow
                key={rowId}
                isSelected={hasSelection && selected}
                data-row-id={rowId}>
                {hasSelection && (
                  <TableSelectRow
                    id={`${elementId}--select-${rowId}`}
                    checked={Boolean(selected)}
                    name={selectionName}
                    ariaLabel="Select row"
                    onSelect={handleChangeSelection}
                  />
                )}
                {columns.map(({ id: columnId }) => (
                  <TableCell key={columnId}>{row[columnId]}</TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {typeof pageSize !== 'undefined' && (
        <Pagination
          start={start}
          count={filteredRows.length}
          pageSize={pageSize}
          pageSizes={[5, 10, 15]}
          totalItems={filteredRows.length}
          onChangePageSize={handleChangePageSize}
          onChangeStart={handleChangeStart}
        />
      )}
    </TableContainer>
  );
  /* eslint-enable no-script-url */
};

CustomDataTable.propTypes = {
  /**
   * The g11n collator to use.
   */
  collator: PropTypes.shape({}),

  /**
   * Data table columns.
   */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      sortCycle: PropTypes.string,
    })
  ),

  /**
   * `true` if the the table should support selection UI. Corresponds to the attribute with the same name.
   */
  hasSelection: PropTypes.bool,

  /**
   * Provide an `id` to uniquely identify the Checkbox input
   */
  id: PropTypes.string,

  /**
   * Number of items per page.
   */
  pageSize: PropTypes.number,

  /**
   * Data table rows.
   */
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      selected: PropTypes.bool,
    })
  ),

  /**
   * `true` if the the table should use the compact version of the UI. Corresponds to the attribute with the same name.
   */
  size: PropTypes.string,

  /**
   * Table sorting info.
   */
  sortInfo: PropTypes.shape({
    columnId: PropTypes.string,
    direction: PropTypes.string,
  }),

  /**
   * The row number where current page start with, index that starts with zero. Corresponds to the attribute with the same name.
   */
  start: PropTypes.number,

  /**
   * `true` if the zebra stripe should be shown.
   */
  zebra: PropTypes.bool,
};

CustomDataTable.defaultProps = {
  collator: new Intl.Collator(),
  hasSelection: false,
  pageSize: 5,
  size: TABLE_SIZE.REGULAR,
  start: 0,
};

export default CustomDataTable;
