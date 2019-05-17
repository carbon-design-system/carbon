/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings } from 'carbon-components';
import wrapComponent from '../../tools/wrapComponent';

const { prefix } = settings;

const TableActionList = wrapComponent({
  name: 'TableActionList',
  type: 'div',
  className: `${prefix}--action-list`,
});

export default TableActionList;
