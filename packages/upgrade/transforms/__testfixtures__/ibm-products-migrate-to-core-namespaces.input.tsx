/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  preview__PageHeader as PageHeader,
  NonLinearReading,
} from '@carbon/ibm-products';

export const Page = () => (
  <PageHeader.Root>
    <PageHeader.BreadcrumbBar />
    <PageHeader.Content title="Title">
      <PageHeader.ContentText subtitle="Subtitle" />
    </PageHeader.Content>
    <PageHeader.PageHeaderTabBar />
  </PageHeader.Root>
);

export const Reading = () => <NonLinearReading.NonLinearReading />;
