/* eslint-disable no-use-before-define */

/**
 * @license
 *
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import TABLE_SORT_DIRECTION from './defs.js';
import { columns, rows } from './data.js';

// event listener for the table sorting event
// triggered when user clicks on the sorting icon of the header cell
document.addEventListener('cds-table-header-cell-sort', ({ defaultPrevented, detail, target }) => {
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

// event listener for pagination event
// triggered when change in the row number the current page starts with
document.addEventListener('cds-pagination-changed-current', ({ detail }) => {
  table.state.setStart(detail.start);
});

// event listener for pagination event
// triggered after the number of rows per page is changed
document.addEventListener('cds-page-sizes-select-changed', ({ detail }) => {
  table.state.setPageSize(detail.value);
});

// returns pagination component
function _renderPagination() {
  const { pageSize, start } = table.state;
  if (typeof pageSize === 'undefined') {
    return undefined;
  }

  return `
    <cds-pagination
      page-size="${pageSize}"
      start="${start}"
      total="${rows.length}"
    >
      <cds-page-sizes-select slot="page-sizes-select">
        <option value="3">3</option>
        <option value="6">6</option>
      </cds-page-sizes-select>
      <cds-pages-select></cds-pages-select>
    </cds-pagination>
  `;
}

const collator = new Intl.Collator('en');

const table = () => {
  const { sortInfo, start, pageSize } = table.state;
  const { columnId: sortColumnId, direction: sortDirection } = sortInfo;
  // sorting logic, returns the sorted rows to render
  const sortedRows = rows.slice().sort((lhs, rhs) => {
    const lhsValue = lhs[sortInfo.columnId];
    const rhsValue = rhs[sortInfo.columnId];
    return (sortInfo.direction === 'ascending' ? 1 : -1) * collator.compare(lhsValue, rhsValue);
  });

  if (typeof pageSize === 'undefined') {
    return undefined;
  }

  return `
    <cds-table>
      <cds-table-head>
        <cds-table-header-row>
          ${columns
            .map((column) => {
              const { id: columnId, sortCycle, title } = column;
              const sortDirectionForThisCell =
                sortCycle && (columnId === sortColumnId ? sortDirection : TABLE_SORT_DIRECTION.NONE);
              return `<cds-table-header-cell ${sortCycle && `sort-cycle="${sortCycle}"`} ${
                sortDirectionForThisCell && `sort-direction="${sortDirectionForThisCell}"`
              } data-column-id="${columnId}">${title}</cds-table-header-cell>`;
            })
            .join('')}
        </cds-table-header-row>
      </cds-table-head>
      <cds-table-body>
        ${sortedRows
          .slice(start, start + pageSize)
          .map((row) => {
            const { id: rowId } = row;
            return `
          <cds-table-row data-row-id="${rowId}">
            ${columns
              .map((column) => {
                const { id: columnId } = column;
                return `<cds-table-cell>${row[columnId]}</cds-table-cell>`;
              })
              .join('')}
          </cds-table-row>`;
          })
          .join('')}
      </cds-table-body>
    </cds-table>
    ${_renderPagination()}
    `;
};

table.state = {
  start: 0,
  setStart: (start) => {
    setState(() => {
      table.state.start = start;
    });
  },
  pageSize: 3,
  setPageSize: (pageSize) => {
    setState(() => {
      table.state.pageSize = pageSize;
    });
  },
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
  document.getElementById('sortable-pagination').innerHTML = table();
};

updateTree();
