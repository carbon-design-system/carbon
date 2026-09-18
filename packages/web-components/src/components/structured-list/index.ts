/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSStructuredList from './structured-list';
import CDSStructuredListBody from './structured-list-body';
import CDSStructuredListCell from './structured-list-cell';
import CDSStructuredListHeader from './structured-list-head';
import CDSStructuredListHeaderCell from './structured-list-header-cell';
import CDSStructuredListHeaderCellSkeleton from './structured-list-header-cell-skeleton';
import CDSStructuredListHeaderRow from './structured-list-header-row';
import CDSStructuredListRow from './structured-list-row';

export {
  CDSStructuredList,
  CDSStructuredListBody,
  CDSStructuredListCell,
  CDSStructuredListHeader,
  CDSStructuredListHeaderCell,
  CDSStructuredListHeaderCellSkeleton,
  CDSStructuredListHeaderRow,
  CDSStructuredListRow,
};

defineCustomElement(CDSStructuredList);
defineCustomElement(CDSStructuredListBody);
defineCustomElement(CDSStructuredListCell);
defineCustomElement(CDSStructuredListHeader);
defineCustomElement(CDSStructuredListHeaderCell);
defineCustomElement(CDSStructuredListHeaderCellSkeleton);
defineCustomElement(CDSStructuredListHeaderRow);
defineCustomElement(CDSStructuredListRow);
