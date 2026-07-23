/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=2930-23442&t=yFGI7EFVWv0vtqIk-4',
  {
    props: {
      labelText: figma.string('Value text'),
      labelPosition: figma.enum('Position', {
        Right: 'right',
      }),
      hideLabel: figma.boolean('Value', {
        true: false,
        false: true,
      }),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      checked: figma.boolean('Selected'),
    },
    example: (props) =>
      html`<cds-radio-button
        checked=${props.checked}
        disabled=${props.disabled}
        hide-label=${props.hideLabel}
        label-position=${props.labelPosition}
        label-text=${props.labelText}
        value="radio-button-value"></cds-radio-button>`,
    imports: [
      "import '@carbon/web-components/es/components/radio-button/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=2930-23442&t=yFGI7EFVWv0vtqIk-4',
  {
    variant: { State: 'Skeleton' },
    example: () =>
      html`<cds-radio-button-skeleton></cds-radio-button-skeleton>`,
    imports: [
      "import '@carbon/web-components/es/components/radio-button/index.js'",
    ],
  }
);
