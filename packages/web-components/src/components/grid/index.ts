/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSGrid from './grid';
import CDSColumn from './column';
import CDSColumnHang from './column-hang';

export { CDSGrid, CDSColumn, CDSColumnHang };

defineCustomElement(CDSGrid);
defineCustomElement(CDSColumn);
defineCustomElement(CDSColumnHang);
