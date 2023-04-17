/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { deprecateFieldOnObject } from '../../internal/deprecateFieldOnObject';

import MultiSelect, { type MultiSelectProps } from './MultiSelect';
import {
  default as FilterableMultiSelect,
  type FilterableMultiSelectProps,
} from './FilterableMultiSelect';

FilterableMultiSelect.displayName = 'MultiSelect.Filterable';
// @ts-expect-error: Yep, the attribute indeed does not exist on the object,
// but since it is already deprecated, we won't pull our hair out to fix this.
MultiSelect.Filterable = FilterableMultiSelect;

if (__DEV__) {
  deprecateFieldOnObject(MultiSelect, 'Filterable', FilterableMultiSelect);
}

export {
  MultiSelect,
  type MultiSelectProps,
  FilterableMultiSelect,
  type FilterableMultiSelectProps,
};
export default MultiSelect;
