/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSGuideBanner from './guide-banner';
import CDSGuideBannerElement from './guide-banner-element';

export { CDSGuideBanner, CDSGuideBannerElement };

defineCustomElement(CDSGuideBanner);
defineCustomElement(CDSGuideBannerElement);
