/**
 * Copyright IBM Corp. 2021, 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defineCustomElement } from '../../globals/register';
import '../overflow-menu/index';
import CDSBreadcrumb from './breadcrumb';
import CDSBreadcrumbItem from './breadcrumb-item';
import CDSBreadcrumbLink from './breadcrumb-link';
import CDSBreadcrumbSkeleton from './breadcrumb-skeleton';
import CDSBreadcrumbOverflowMenu from './breadcrumb-overflow-menu';

export {
  CDSBreadcrumb,
  CDSBreadcrumbItem,
  CDSBreadcrumbLink,
  CDSBreadcrumbSkeleton,
  CDSBreadcrumbOverflowMenu,
};

defineCustomElement(CDSBreadcrumb);
defineCustomElement(CDSBreadcrumbItem);
defineCustomElement(CDSBreadcrumbLink);
defineCustomElement(CDSBreadcrumbSkeleton);
defineCustomElement(CDSBreadcrumbOverflowMenu);
