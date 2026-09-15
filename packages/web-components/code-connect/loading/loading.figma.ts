/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3238-28455&t=Y6lD1uj5Q0yszbgL-4',
  {
    props: {
      small: figma.enum('Size', {
        Small: true,
      }),
    },
    example: (props) =>
      html`<cds-loading
        active
        description="Loading"
        small=${props.small}></cds-loading>`,
    imports: ["import '@carbon/web-components/es/components/loading/index.js'"],
  }
);
