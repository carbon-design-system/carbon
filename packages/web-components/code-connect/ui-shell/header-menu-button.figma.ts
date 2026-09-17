/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/Ude8f8dEgXxxnpbzrvWfwE/-v11--Carbon-Design-System--Community-?node-id=2213-15047&t=A3oys5odsvKkcDFA-4',
  {
    props: {
      isActive: figma.boolean('Open'),
    },
    example: (props) =>
      html`<cds-header-menu-button
        button-label-active="Close menu"
        button-label-inactive="Open menu"
        active=${props.isActive}></cds-header-menu-button>`,
    imports: [
      "import '@carbon/web-components/es/components/ui-shell/index.js'",
    ],
  }
);
