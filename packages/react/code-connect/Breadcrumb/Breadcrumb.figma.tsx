/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Breadcrumb } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  Breadcrumb,
  'https://www.figma.com/design/Bm1EL99jVq8Uv0gW11EpBC/-v11--Carbon-Design-System--Community-?node-id=3155-31030&t=udaFhcGQNUqmjDtx-4',
  {
    props: {
      //noTrailingSlash: needs to come from child item component in figma
      children: figma.children(['_Breadcrumb item']),
    },
    example: ({ children }) => <Breadcrumb>{children}</Breadcrumb>,
  }
);

// BreadcrumbSkeleton missing from Figma, can only be set on individual items
