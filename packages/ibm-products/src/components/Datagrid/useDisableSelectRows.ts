/**
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Hooks, Row, RowPropGetter, TableRowProps } from 'react-table';
import { DatagridRow, PropGetterMeta, DatagridRowProps } from './types';

const nonselectablerowsList = (instance) => {
  const nonselectablerows: number[] =
    instance?.rows
      ?.filter(
        (row) =>
          instance.shouldDisableSelectRow &&
          instance.shouldDisableSelectRow(row)
      )
      .map((row) => row.id) || [];
  return nonselectablerows;
};

const useDisableSelectRows = (hooks: Hooks) => {
  updateSelectAll(hooks);
  updatePageSelectAll(hooks);

  let nonselectablerows: number[] = [];
  const useInstance = (instance) => {
    nonselectablerows = nonselectablerowsList(instance);
  };
  hooks.useInstance.push(useInstance);

  const getRowProps: RowPropGetter<any> = (
    props: Partial<TableRowProps>,
    { row, instance }: PropGetterMeta
  ) => {
    return [
      props,
      {
        disabled: instance?.shouldDisableSelectRow?.(row),
        nonselectablerows,
      },
    ] as Partial<DatagridRowProps>[];
  };
  hooks.getRowProps.push(getRowProps);
};

const updateSelectAll = (hooks: Hooks) => {
  const getToggleAllRowsSelectedProps: RowPropGetter<any> = (
    props: Partial<TableRowProps>,
    { instance }: PropGetterMeta
  ) => {
    const selectableRows: Row<any>[] =
      instance?.rows?.filter(
        (row) =>
          !(
            instance.shouldDisableSelectRow &&
            instance.shouldDisableSelectRow(row)
          )
      ) || [];
    const isAllRowsSelected: boolean =
      selectableRows?.length > 0 &&
      selectableRows.every(({ id }) => instance?.state?.selectedRowIds?.[id]);
    return [
      props,
      {
        onChange: (e) => {
          selectableRows.forEach((row) =>
            (row as DatagridRow)?.toggleRowSelected?.(e.target.checked)
          );
        },
        style: { cursor: 'pointer' },
        checked: isAllRowsSelected,
        disabled: instance?.disableSelectAll,
        title:
          instance?.disableSelectRowsProps?.labels?.toggleAllRowsLabel ||
          'Toggle All Rows Selected',
        indeterminate: Boolean(
          !isAllRowsSelected &&
            Object.keys(instance?.state?.selectedRowIds || {}).length
        ),
      },
    ];
  };
  hooks.getToggleAllRowsSelectedProps.push(getToggleAllRowsSelectedProps);
};

const updatePageSelectAll = (hooks: Hooks) => {
  const getToggleAllPageRowsSelectedProps = (
    props: Partial<TableRowProps>,
    { instance }: PropGetterMeta
  ) => {
    const selectableRows =
      instance?.page?.filter(
        (row) =>
          !(
            instance.shouldDisableSelectRow &&
            instance.shouldDisableSelectRow(row)
          )
      ) || [];
    const isAllRowsSelected =
      selectableRows?.length > 0 &&
      selectableRows.every(({ id }) => instance?.state?.selectedRowIds?.[id]);
    return [
      props,
      {
        onChange: (e) => {
          selectableRows.forEach((row) =>
            (row as DatagridRow).toggleRowSelected(e.target.checked)
          );
        },
        style: { cursor: 'pointer' },
        checked: isAllRowsSelected,
        disabled: instance?.disableSelectAll,
        title:
          instance?.disableSelectRowsProps?.labels?.toggleAllRowsLabel ||
          'Toggle All Rows Selected',
        indeterminate: Boolean(
          !isAllRowsSelected &&
            instance?.page?.some(
              ({ id }) => instance?.state?.selectedRowIds?.[id]
            )
        ),
      },
    ];
  };
  hooks.getToggleAllPageRowsSelectedProps.push(
    getToggleAllPageRowsSelectedProps
  );
};

export default useDisableSelectRows;
