/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as FeatureFlags from '@carbon/feature-flags';
import { deprecateFieldOnObject } from '../../internal/deprecateFieldOnObject';

import MultiSelect from './MultiSelect';
import { default as FilterableMultiSelectClassic } from './FilterableMultiSelect';
import { default as FilterableMultiSelectNext } from './next/FilterableMultiSelect';

FilterableMultiSelectNext.displayName = 'MultiSelect.Filterable';
MultiSelect.Filterable = FilterableMultiSelectClassic;

export const FilterableMultiSelect = FeatureFlags.enabled('enable-v11-release')
  ? FilterableMultiSelectNext
  : FilterableMultiSelectClassic;

if (__DEV__) {
  deprecateFieldOnObject(MultiSelect, 'Filterable', FilterableMultiSelect);
}

export default MultiSelect;
