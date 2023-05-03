/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { OverflowMenu as OverflowMenuComponent } from './OverflowMenu';
import { createClassWrapper } from '../../internal/createClassWrapper';

const OverflowMenu = createClassWrapper(OverflowMenuComponent);

export default OverflowMenu;
export { OverflowMenu };
