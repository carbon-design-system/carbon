/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import wrapComponent from '../../tools/wrapComponent';

/**
 * Generic container for `HeaderGlobalAction` components
 */

const HeaderGlobalBar = wrapComponent({
  name: 'HeaderGlobalBar',
  className: (prefix) => `${prefix}--header__global`,
  type: 'div',
});

export default HeaderGlobalBar;
