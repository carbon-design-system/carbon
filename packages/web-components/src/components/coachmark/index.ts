/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSCoachmark from './coachmark';
import CDSCoachmarkHeader from './coachmark-header';
import CDSCoachmarkBody from './coachmark-body';

export { CDSCoachmark, CDSCoachmarkHeader, CDSCoachmarkBody };

defineCustomElement(CDSCoachmark);
defineCustomElement(CDSCoachmarkHeader);
defineCustomElement(CDSCoachmarkBody);
