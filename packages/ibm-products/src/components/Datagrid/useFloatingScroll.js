/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useEffect } from 'react';
import cx from 'classnames';
import { pkg } from '../../settings';

const blockClass = `${pkg.prefix}--datagrid`;

const useFloatingScroll = (hooks) => {
  const useInstance = (instance) => {
    const { tableId, withVirtualScroll, ExpandedRowContentComponent } =
      instance;
    useEffect(() => {
      // Floating scroll doesn't work with expanded rows and virtual scroll
      if (withVirtualScroll || ExpandedRowContentComponent) {
        return;
      }
      const datagrid = document.getElementById(tableId);
      // eslint-disable-next-line no-unused-expressions
      datagrid?.classList.add(`${blockClass}__sticky`);
    }, [ExpandedRowContentComponent, tableId, withVirtualScroll]);
  };
  const useAddStickyClass = (instance) => {
    const { withVirtualScroll, ExpandedRowContentComponent } = instance;
    // Floating scroll doesn't work with expanded rows and virtual scroll
    if (withVirtualScroll || ExpandedRowContentComponent) {
      return;
    }
    const addStickyClass = (props) => [
      props,
      {
        className: cx(props.className, `${blockClass}__sticky`),
      },
    ];
    hooks.getTableProps.push(addStickyClass);
    hooks.getTableBodyProps.push(addStickyClass);
    hooks.getHeaderGroupProps.push(addStickyClass);
  };
  const useAddScrollListener = (instance) => {
    const { withVirtualScroll, ExpandedRowContentComponent, tableId } =
      instance;
    // Floating scroll doesn't work with expanded rows and virtual scroll
    if (withVirtualScroll || ExpandedRowContentComponent) {
      return;
    }
    let memoHead;
    const addOnScroll = (props) => [
      props,
      {
        onScroll: (e) => {
          let simpleThead;
          if (memoHead) {
            simpleThead = memoHead;
          } else {
            const datagrid = document.getElementById(tableId);
            simpleThead = datagrid?.querySelector(
              `.${blockClass}__table-simple thead > div`
            );
            memoHead = simpleThead;
          }
          if (simpleThead) {
            simpleThead.scrollLeft = e.target.scrollLeft;
          }
        },
      },
    ];
    hooks.getTableBodyProps.push(addOnScroll);
  };
  hooks.useInstance.push(useAddStickyClass);
  hooks.useInstance.push(useAddScrollListener);
  hooks.useInstance.push(useInstance);
};

export default useFloatingScroll;
