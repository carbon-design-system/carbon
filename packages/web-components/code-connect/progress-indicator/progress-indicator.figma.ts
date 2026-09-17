/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/Ude8f8dEgXxxnpbzrvWfwE/-v11--Carbon-Design-System--Community-?node-id=3925-58667&m=dev',
  {
    props: {
      children: figma.children(['_Progress indicator item']),
      vertical: figma.enum('Direction', {
        Vertical: true,
      }),
    },
    example: (props) =>
      html`<cds-progress-indicator vertical=${props.vertical}>
        ${props.children}
      </cds-progress-indicator>`,
    imports: [
      "import '@carbon/web-components/es/components/progress-indicator/index.js'",
    ],
  }
);
