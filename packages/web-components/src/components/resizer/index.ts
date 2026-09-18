/**
 * Copyright IBM Corp. 2026, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSResizerHandle from './resizer-handle';
import CDSResizerHandlePivot from './resizer-handle-pivot';
import CDSResizerGrid from './resizer-grid';
import CDSResizerPanel from './resizer-panel';

export {
  CDSResizerHandle,
  CDSResizerHandlePivot,
  CDSResizerGrid,
  CDSResizerPanel,
};

defineCustomElement(CDSResizerHandle);
defineCustomElement(CDSResizerHandlePivot);
defineCustomElement(CDSResizerGrid);
defineCustomElement(CDSResizerPanel);
