/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import CDSPageHeader from './page-header';
import CDSPageHeaderBreadcrumb from './page-header-breadcrumb';
import CDSPageHeaderContent from './page-header-content';
import CDSPageHeaderContentText from './page-header-content-text';
import CDSPageHeaderHeroImage from './page-header-hero-image';
import CDSPageHeaderTabs from './page-header-tabs';
import CDSPageHeaderTitleBreadcrumb from './page-header-title-breadcrumb';
import { PageHeaderScroller as CDSPageHeaderScroller } from './page-header-scroller';
import CDSPageHeaderBreadcrumbsSet from './page-header-breadcrumbs-set/page-header-breadcrumbs-set';
import CDSPageHeaderActionsSet from './page-header-actions-set/page-header-actions-set';
import CDSPageHeaderTagsSet from './page-header-tags-set/page-header-tags-set';

export {
  CDSPageHeader,
  CDSPageHeaderBreadcrumb,
  CDSPageHeaderContent,
  CDSPageHeaderContentText,
  CDSPageHeaderHeroImage,
  CDSPageHeaderTabs,
  CDSPageHeaderTitleBreadcrumb,
  CDSPageHeaderScroller,
  CDSPageHeaderBreadcrumbsSet,
  CDSPageHeaderActionsSet,
  CDSPageHeaderTagsSet,
};

defineCustomElement(CDSPageHeader);
defineCustomElement(CDSPageHeaderBreadcrumb);
defineCustomElement(CDSPageHeaderContent);
defineCustomElement(CDSPageHeaderContentText);
defineCustomElement(CDSPageHeaderHeroImage);
defineCustomElement(CDSPageHeaderTabs);
defineCustomElement(CDSPageHeaderTitleBreadcrumb);
defineCustomElement(CDSPageHeaderScroller);
defineCustomElement(CDSPageHeaderBreadcrumbsSet);
defineCustomElement(CDSPageHeaderActionsSet);
defineCustomElement(CDSPageHeaderTagsSet);
