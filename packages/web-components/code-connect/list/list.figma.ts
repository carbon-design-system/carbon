/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3284-27553&t=Y6lD1uj5Q0yszbgL-4',
  {
    variant: { Type: 'Unordered' },
    props: {
      children: figma.children(['List item']),
    },
    example: ({ children }) =>
      html`<cds-unordered-list>${children}</cds-unordered-list>`,
    imports: ["import '@carbon/web-components/es/components/list/index.js'"],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3284-27553&t=Y6lD1uj5Q0yszbgL-4',
  {
    variant: { Type: 'Ordered' },
    props: {
      children: figma.children(['List item']),
    },
    example: ({ children }) =>
      html`<cds-ordered-list>${children}</cds-ordered-list>`,
    imports: ["import '@carbon/web-components/es/components/list/index.js'"],
  }
);
