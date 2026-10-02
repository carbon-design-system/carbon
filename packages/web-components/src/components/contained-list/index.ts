/**
 * Copyright IBM Corp. 2022, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSContainedList from './contained-list';
import CDSContainedListItem from './contained-list-item';
import CDSContainedListDescription from './contained-list-description';

export { CDSContainedList, CDSContainedListItem, CDSContainedListDescription };

defineCustomElement(CDSContainedList);
defineCustomElement(CDSContainedListItem);
defineCustomElement(CDSContainedListDescription);
