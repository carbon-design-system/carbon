/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/-v11--Carbon-Design-System?node-id=104376-11673&m=dev',
  {
    props: {
      children: figma.children(['_Breadcrumb item']),
      size: figma.enum('Size', {
        Medium: 'md',
        Small: 'sm',
      }),
    },
    example: ({ children, size }) =>
      html`<cds-breadcrumb size=${size}>${children}</cds-breadcrumb>`,
    imports: [
      "import '@carbon/web-components/es/components/breadcrumb/index.js'",
    ],
  }
);
