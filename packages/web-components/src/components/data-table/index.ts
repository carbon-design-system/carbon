/**
 * Copyright IBM Corp. 2021, 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import '../button/index';
import '../search/index';
import CDSTable from './table';
import CDSTableSkeleton from './table-skeleton';
import CDSTableHeader from './table-header-title';
import CDSTableHeaderDescription from './table-header-description';
import CDSTableBatchActions from './table-batch-actions';
import CDSTableBody from './table-body';
import CDSTableCell from './table-cell';
import CDSTableCellContent from './table-cell-content';
import CDSTableExpandedRow from './table-expanded-row';
import CDSTableHead from './table-head';
import CDSTableHeaderCell from './table-header-cell';
import CDSTableHeaderRow from './table-header-row';
import CDSTableRow from './table-row';
import CDSTableToolbar from './table-toolbar';
import CDSTableToolbarContent from './table-toolbar-content';
import CDSTableToolbarSearch from './table-toolbar-search';

export {
  CDSTable,
  CDSTableSkeleton,
  CDSTableHeader,
  CDSTableHeaderDescription,
  CDSTableBatchActions,
  CDSTableBody,
  CDSTableCell,
  CDSTableCellContent,
  CDSTableExpandedRow,
  CDSTableHead,
  CDSTableHeaderCell,
  CDSTableHeaderRow,
  CDSTableRow,
  CDSTableToolbar,
  CDSTableToolbarContent,
  CDSTableToolbarSearch,
};

defineCustomElement(CDSTable);
defineCustomElement(CDSTableSkeleton);
defineCustomElement(CDSTableHeader);
defineCustomElement(CDSTableHeaderDescription);
defineCustomElement(CDSTableBatchActions);
defineCustomElement(CDSTableBody);
defineCustomElement(CDSTableCell);
defineCustomElement(CDSTableCellContent);
defineCustomElement(CDSTableExpandedRow);
defineCustomElement(CDSTableHead);
defineCustomElement(CDSTableHeaderCell);
defineCustomElement(CDSTableHeaderRow);
defineCustomElement(CDSTableRow);
defineCustomElement(CDSTableToolbar);
defineCustomElement(CDSTableToolbarContent);
defineCustomElement(CDSTableToolbarSearch);
