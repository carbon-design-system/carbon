/**
 * Copyright IBM Corp. 2021, 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSAccordion from './accordion';
import CDSAccordionItem from './accordion-item';
import CDSAccordionItemSkeleton from './accordion-item-skeleton';
import CDSAccordionSkeleton from './accordion-skeleton';

export {
  CDSAccordion,
  CDSAccordionItem,
  CDSAccordionItemSkeleton,
  CDSAccordionSkeleton,
};

defineCustomElement(CDSAccordion);
defineCustomElement(CDSAccordionItem);
defineCustomElement(CDSAccordionItemSkeleton);
defineCustomElement(CDSAccordionSkeleton);
