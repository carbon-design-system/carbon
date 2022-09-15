/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import BXBreadcrumb from 'carbon-web-components/es/components-react/breadcrumb/breadcrumb';
// @ts-ignore
import BXBreadcrumbItem from 'carbon-web-components/es/components-react/breadcrumb/breadcrumb-item';
// @ts-ignore
import BXBreadcrumbLink from 'carbon-web-components/es/components-react/breadcrumb/breadcrumb-link';
// @ts-ignore
import BXBreadcrumbOverflowMenu from 'carbon-web-components/es/components-react/breadcrumb/breadcrumb-overflow-menu';
// @ts-ignore
import BXOverflowMenuBody from 'carbon-web-components/es/components-react/overflow-menu/overflow-menu-body';
// @ts-ignore
import BXOverflowMenuItem from 'carbon-web-components/es/components-react/overflow-menu/overflow-menu-item';
import { Default as baseDefault } from './breadcrumb-story';

export { default } from './breadcrumb-story';

export const Default = () => (
  <BXBreadcrumb>
    <BXBreadcrumbItem>
      <BXBreadcrumbLink href="/#">Breadcrumb 1</BXBreadcrumbLink>
    </BXBreadcrumbItem>
    <BXBreadcrumbItem>
      <BXBreadcrumbLink href="/#">Breadcrumb 2</BXBreadcrumbLink>
    </BXBreadcrumbItem>
    <BXBreadcrumbItem>
      <BXBreadcrumbOverflowMenu>
        <BXOverflowMenuBody>
          <BXOverflowMenuItem>Option 1</BXOverflowMenuItem>
          <BXOverflowMenuItem>Option 2</BXOverflowMenuItem>
        </BXOverflowMenuBody>
      </BXBreadcrumbOverflowMenu>
    </BXBreadcrumbItem>
    <BXBreadcrumbItem>
      <BXBreadcrumbLink href="/#" aria-current="page">
        Breadcrumb 3
      </BXBreadcrumbLink>
    </BXBreadcrumbItem>
  </BXBreadcrumb>
);

Object.assign(Default, baseDefault);
