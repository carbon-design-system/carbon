/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import * as FeatureFlags from '@carbon/feature-flags';

export const ListBoxType = PropTypes.oneOf(['default', 'inline']);
export const ListBoxSize = FeatureFlags.enabled('enable-v11-release')
  ? PropTypes.oneOf(['sm', 'md', 'lg'])
  : PropTypes.oneOf(['sm', 'md', 'lg', 'xl']);
