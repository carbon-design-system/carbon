/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { deprecateFieldOnObject } from '../../internal/deprecateFieldOnObject';
import ContainedList from './ContainedList';
import ContainedListItem from './ContainedListItem';

ContainedList.ContainedListItem = ContainedListItem;

if (__DEV__) {
  deprecateFieldOnObject(ContainedList, 'ContainedListItem', ContainedListItem);
}
export { ContainedListItem };
export default ContainedList;
export { ContainedList };
