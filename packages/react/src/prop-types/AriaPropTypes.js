/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import isRequiredOneOf from './isRequiredOneOf';

export const AriaLabelPropType = isRequiredOneOf({
  'aria-label': PropTypes.string,
  'aria-labelledby': PropTypes.string,
});
