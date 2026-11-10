/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSAddSelect from './add-select';
import CDSAddSelectBody from './add-select-body';
import CDSAddSelectColumn from './add-select-column';
import CDSAddSelectRow from './add-select-row';
import CDSAddSelectSelectionSummary from './add-select-selection-summary';
import CDSAddSelectSelectionSummaryItem from './add-select-selection-summary-item';
import CDSAddSelectItemPanel from './add-select-item-panel';

export {
  CDSAddSelect,
  CDSAddSelectBody,
  CDSAddSelectColumn,
  CDSAddSelectRow,
  CDSAddSelectSelectionSummary,
  CDSAddSelectSelectionSummaryItem,
  CDSAddSelectItemPanel,
};

defineCustomElement(CDSAddSelect);
defineCustomElement(CDSAddSelectBody);
defineCustomElement(CDSAddSelectColumn);
defineCustomElement(CDSAddSelectRow);
defineCustomElement(CDSAddSelectSelectionSummary);
defineCustomElement(CDSAddSelectSelectionSummaryItem);
defineCustomElement(CDSAddSelectItemPanel);
