/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/Ude8f8dEgXxxnpbzrvWfwE/-v11--Carbon-Design-System--Community-?node-id=57561-3559&t=SB9qULZbn3FRopvU-4',
  {
    props: {
      button: figma.nestedProps('Button', {
        text: figma.string('Button text'),
      }),
    },
    example: (props) =>
      html`<cds-ai-label-action-button>
        ${props.button.text}
      </cds-ai-label-action-button>`,
    imports: [
      "import '@carbon/web-components/es/components/ai-label/index.js'",
    ],
  }
);
