/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * @deprecated PageHeader has moved to Carbon for IBM Products.
 * See https://github.com/carbon-design-system/carbon/issues/21926
 */

import { defineCustomElement } from '../../globals/register';
import '../tooltip/index';
import CDSPageHeader from './page-header';
import CDSPageHeaderBreadcrumb from './page-header-breadcrumb';
import CDSPageHeaderContent from './page-header-content';
import CDSPageHeaderContentText from './page-header-content-text';
import CDSPageHeaderHeroImage from './page-header-hero-image';
import CDSPageHeaderTabs from './page-header-tabs';

export {
  CDSPageHeader,
  CDSPageHeaderBreadcrumb,
  CDSPageHeaderContent,
  CDSPageHeaderContentText,
  CDSPageHeaderHeroImage,
  CDSPageHeaderTabs,
};

defineCustomElement(CDSPageHeader);
defineCustomElement(CDSPageHeaderBreadcrumb);
defineCustomElement(CDSPageHeaderContent);
defineCustomElement(CDSPageHeaderContentText);
defineCustomElement(CDSPageHeaderHeroImage);
defineCustomElement(CDSPageHeaderTabs);
