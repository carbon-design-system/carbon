/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useState, useCallback } from 'react';
import { debounce } from '../../global/js/utils/debounce';
import { Hooks, RowPropGetter, TableInstance } from 'react-table';
import { DataGridState } from './types';

const useRowIsMouseOver = (hooks: Hooks) => {
  const useInstance = (instance: TableInstance) => {
    const [mouseOverRowIndex, setMouseOverRowIndex] = useState<number>();

    const onMouseChange = useDebounce((datagridState: DataGridState) => {
      const { row } = datagridState;
      setMouseOverRowIndex(row?.index);
    }, 100);

    const getRowProps = (props, datagridState: DataGridState) => {
      // @ts-expect-error
      const onMouseOver = () => onMouseChange(datagridState);
      return [props, { onMouseOver }];
    };

    const { rows } = instance;
    const rowsWithMouseOver = rows.map((row) => ({
      ...row,
      isMouseOver: row.index === mouseOverRowIndex,
    }));

    Object.assign(instance, {
      rows: rowsWithMouseOver,
      withMouseHover: true,
      setMouseOverRowIndex,
    });
    hooks.getRowProps.push(getRowProps as RowPropGetter<any>);
  };

  hooks.useInstance.push(useInstance);
};

const useDebounce = (fn: (state: DataGridState) => void, wait: number) =>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useCallback(debounce(fn, wait), []);

export default useRowIsMouseOver;
