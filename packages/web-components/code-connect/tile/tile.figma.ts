/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/-v11--Carbon-Design-System?node-id=20125-279432&m=dev',
  {
    props: {
      swapSlot: figma.instance('Swap slot'),
    },
    example: (props) => html`<cds-tile>${props.swapSlot}</cds-tile>`,
    imports: ["import '@carbon/web-components/es/components/tile/index.js'"],
  }
);
