/**
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSTearsheet from './tearsheet';
import CDSTearsheetBody from './tearsheet-body';
import CDSTearsheetFooter from './tearsheet-footer';
import CDSTearsheetHeader from './tearsheet-header';
import CDSTearsheetInfluencer from './tearsheet-influencer';
import CDSTearsheetHeaderContent from './tearsheet-header-content';
import CDSTearsheetNavigationBar from './tearsheet-navigation-bar';
import CDSTearsheetScroller from './tearsheet-scroller';
import CDSTearsheetStack from './tearsheet-stack';
import CDSTearsheetSummaryContent from './tearsheet-summary-content';

export {
  CDSTearsheet,
  CDSTearsheetBody,
  CDSTearsheetFooter,
  CDSTearsheetHeader,
  CDSTearsheetInfluencer,
  CDSTearsheetHeaderContent,
  CDSTearsheetNavigationBar,
  CDSTearsheetScroller,
  CDSTearsheetStack,
  CDSTearsheetSummaryContent,
};

defineCustomElement(CDSTearsheet);
defineCustomElement(CDSTearsheetBody);
defineCustomElement(CDSTearsheetFooter);
defineCustomElement(CDSTearsheetHeader);
defineCustomElement(CDSTearsheetInfluencer);
defineCustomElement(CDSTearsheetHeaderContent);
defineCustomElement(CDSTearsheetNavigationBar);
defineCustomElement(CDSTearsheetScroller);
defineCustomElement(CDSTearsheetStack);
defineCustomElement(CDSTearsheetSummaryContent);
