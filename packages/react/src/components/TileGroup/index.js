/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createClassWrapper } from '../../internal/createClassWrapper';
import TileGroupCarbon from './TileGroup';

const TileGroup = createClassWrapper(TileGroupCarbon);
export default TileGroup;
export { TileGroup };
