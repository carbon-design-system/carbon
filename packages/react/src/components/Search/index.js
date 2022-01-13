/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as FeatureFlags from '@carbon/feature-flags';
import { default as SearchNext } from './next/Search';
import { default as SearchClassic } from './Search';

const Search = FeatureFlags.enabled('enable-v11-release')
  ? SearchNext
  : SearchClassic;

export * from './Search.Skeleton';

export default Search;
