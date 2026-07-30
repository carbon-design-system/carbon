/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3897-51336&t=SbIuH3RAJeFPjXmN-4',
  {
    props: {
      children: figma.children('*'),
    },
    example: (props) =>
      html`<cds-form aria-label="sample form"> ${props.children} </cds-form>`,
    imports: ["import '@carbon/web-components/es/components/form/index.js'"],
  }
);
