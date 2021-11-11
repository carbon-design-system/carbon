/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as FeatureFlag from '@carbon/feature-flags';
import PaginationClassic from './Pagination';
import { Pagination as PaginationNext } from './next';

export * from './Pagination.Skeleton';

export default FeatureFlag.enabled('enable-v11-release')
  ? PaginationNext
  : PaginationClassic;
