/* eslint-disable no-use-before-define */

/**
 * @license
 *
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import TABLE_SORT_DIRECTION from './defs.js';
import { columns, rows } from './data.js';

// event listener for the sorting event
document.addEventListener('bx-table-header-cell-sort', ({ defaultPrevented, detail, target }) => {
  if (!defaultPrevented) {
    const { columnId } = target.dataset;
    const { sortDirection: direction } = detail;
    // Sets the sorting as user desires
    const sortInfo = {
      columnId,
      direction,
    };

    table.state.setSortInfo(sortInfo);
  }
});

const collator = new Intl.Collator('en');

const table = () => {
  // sorting logic, returns the sorted rows to render
  const sortedRows = rows.slice().sort((lhs, rhs) => {
    const lhsValue = lhs[table.state.sortInfo.columnId];
    const rhsValue = rhs[table.state.sortInfo.columnId];
    return (table.state.sortInfo.direction === 'ascending' ? 1 : -1) * collator.compare(lhsValue, rhsValue);
  });

  const { columnId: sortColumnId, direction: sortDirection } = table.state.sortInfo;

  return `
    <bx-table>
      <bx-table-head>
        <bx-table-header-row>
          ${columns
            .map((column) => {
              const { id: columnId, sortCycle, title } = column;
              const sortDirectionForThisCell =
                sortCycle && (columnId === sortColumnId ? sortDirection : TABLE_SORT_DIRECTION.NONE);
              return `<bx-table-header-cell ${sortCycle && `sort-cycle="${sortCycle}"`} ${
                sortDirectionForThisCell && `sort-direction="${sortDirectionForThisCell}"`
              } data-column-id="${columnId}">${title}</bx-table-header-cell>`;
            })
            .join('')}
        </bx-table-header-row>
      </bx-table-head>
      <bx-table-body>
        ${sortedRows
          .map((row) => {
            const { id: rowId } = row;
            return `
          <bx-table-row data-row-id="${rowId}">
            ${columns
              .map((column) => {
                const { id: columnId } = column;
                return `<bx-table-cell>${row[columnId]}</bx-table-cell>`;
              })
              .join('')}
          </bx-table-row>`;
          })
          .join('')}
      </bx-table-body>
    </bx-table>`;
};

table.state = {
  sortInfo: {
    columnId: 'name',
    direction: TABLE_SORT_DIRECTION.ASCENDING,
  },
  setSortInfo: (sortInfo) => {
    setState(() => {
      table.state.sortInfo = sortInfo;
    });
  },
};

function setState(callback) {
  callback();
  updateTree(); // extracted function
}

const updateTree = () => {
  document.getElementById('sortable-table').innerHTML = table();
};

updateTree();
