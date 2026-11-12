/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { PageHeader } from '@carbon/react';

import { NonLinearReading } from '@carbon-labs/react-non-linear-reading';

export const Page = () => (
  <PageHeader.Root>
    <PageHeader.BreadcrumbBar />
    <PageHeader.Content title="Title">
      <PageHeader.ContentText subtitle="Subtitle" />
    </PageHeader.Content>
    <PageHeader.TabBar />
  </PageHeader.Root>
);

export const Reading = () => <NonLinearReading />;
