/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSCard from './card';
import CDSCardHeader from './card-header';
import CDSCardBody from './card-body';
import CDSCardFooter from './card-footer';
import CDSCardMedia from './card-media';
import CDSCardHeaderMedia from './card-header-media';
import CDSCardTitle from './card-title';
import CDSCardTitleMedia from './card-title-media';
import CDSCardActions from './card-actions';
import CDSCardAction from './card-action';

export {
  CDSCard,
  CDSCardHeader,
  CDSCardBody,
  CDSCardFooter,
  CDSCardMedia,
  CDSCardHeaderMedia,
  CDSCardTitle,
  CDSCardTitleMedia,
  CDSCardActions,
  CDSCardAction,
};

defineCustomElement(CDSCard);
defineCustomElement(CDSCardHeader);
defineCustomElement(CDSCardBody);
defineCustomElement(CDSCardFooter);
defineCustomElement(CDSCardMedia);
defineCustomElement(CDSCardHeaderMedia);
defineCustomElement(CDSCardTitle);
defineCustomElement(CDSCardTitleMedia);
defineCustomElement(CDSCardActions);
defineCustomElement(CDSCardAction);
