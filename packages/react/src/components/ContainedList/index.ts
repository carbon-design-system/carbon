/**
 * Copyright IBM Corp. 2022, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { deprecateFieldOnObject } from '../../internal/deprecateFieldOnObject';
import ContainedList from './ContainedList';
import ContainedListItem from './ContainedListItem';

if (process.env.NODE_ENV !== 'production') {
  // @ts-expect-error - This component did not have a `displayName` before it
  // was properly typed. After adding proper typing, a type error appears here.
  // The warning logged to the console includes `undefined` because no
  // `displayName` is set.
  deprecateFieldOnObject(ContainedList, 'ContainedListItem', ContainedListItem);
}
export { ContainedListItem };
export default ContainedList;
export { ContainedList };
