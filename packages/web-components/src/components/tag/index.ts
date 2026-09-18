/**
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSTag from './tag';
import CDSDismissibleTag from './dismissible-tag';
import CDSTagSkeleton from './tag-skeleton';
import CDSSelectableTag from './selectable-tag';
import CDSOperationalTag from './operational-tag';

export {
  CDSTag,
  CDSDismissibleTag,
  CDSTagSkeleton,
  CDSSelectableTag,
  CDSOperationalTag,
};

defineCustomElement(CDSTag);
defineCustomElement(CDSDismissibleTag);
defineCustomElement(CDSTagSkeleton);
defineCustomElement(CDSSelectableTag);
defineCustomElement(CDSOperationalTag);
