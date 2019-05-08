/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import wrapComponent from '../../tools/wrapComponent';
import { settings } from 'carbon-components';

const { prefix } = settings;

const TableToolbarContent = wrapComponent({
  name: 'TableToolbarContent',
  type: 'div',
  className: `${prefix}--toolbar-content`,
});

export default TableToolbarContent;
