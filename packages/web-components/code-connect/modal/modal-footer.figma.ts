/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3906-50587&t=SbIuH3RAJeFPjXmN-4',
  {
    props: {
      children: figma.children('*'),
    },
    example: (props) =>
      html`<cds-modal-footer>${props.children}</cds-modal-footer>`,
    imports: ["import '@carbon/web-components/es/components/modal/index.js'"],
  }
);
