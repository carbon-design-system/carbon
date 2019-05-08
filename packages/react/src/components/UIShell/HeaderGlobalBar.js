/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings } from 'carbon-components';
import wrapComponent from '../../tools/wrapComponent';

const { prefix } = settings;

/**
 * Generic container for `HeaderGlobalAction` components
 */
export default wrapComponent({
  name: 'HeaderGlobalBar',
  className: `${prefix}--header__global`,
  type: 'div',
});
