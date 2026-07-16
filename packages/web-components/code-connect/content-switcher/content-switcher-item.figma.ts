/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=10151-402337&t=Y6lD1uj5Q0yszbgL-4',
  {
    props: {
      text: figma.string('Label text'),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
    },
    example: (props) =>
      html`<cds-content-switcher-item
        disabled=${props.disabled}
        value="switch-value">
        ${props.text}
      </cds-content-switcher-item>`,
    imports: [
      "import '@carbon/web-components/es/components/content-switcher/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=21988-280553&t=Y6lD1uj5Q0yszbgL-4',
  {
    props: {
      children: figma.children('*'),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
    },
    example: (props) =>
      html`<cds-content-switcher-item
        disabled=${props.disabled}
        icon
        value="icon-switch-value">
        ${props.children}
        <span slot="tooltip-content">Content switcher item</span>
      </cds-content-switcher-item>`,
    imports: [
      "import '@carbon/web-components/es/components/content-switcher/index.js'",
    ],
  }
);
