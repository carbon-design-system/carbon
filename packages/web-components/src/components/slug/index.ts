/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import '../icon-button/index';
import CDSSlug from './slug';
import CDSSlugActionButton from './slug-action-button';

export { CDSSlug, CDSSlugActionButton };

defineCustomElement(CDSSlug);
defineCustomElement(CDSSlugActionButton);
