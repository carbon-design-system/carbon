/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3038-25739&t=9zqAFF3e617gPBGE-4',
  {
    props: {
      size: figma.enum('Size', {
        Default: 'md',
        Small: 'sm',
      }),
      readOnly: figma.enum('State', {
        'Read-only': true,
      }),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      hideLabel: figma.boolean('Show label', {
        true: false,
        false: true,
      }),
      labelText: figma.string('Label text'),
      labelA: figma.string('State text'),
      labelB: figma.string('State text'),
      toggled: figma.boolean('Toggled'),
    },
    example: (props) =>
      html`<cds-toggle
        disabled=${props.disabled}
        hideLabel=${props.hideLabel}
        label-a=${props.labelA}
        label-b=${props.labelB}
        label-text=${props.labelText}
        read-only=${props.readOnly}
        size=${props.size}
        toggled=${props.toggled}></cds-toggle>`,
    imports: ["import '@carbon/web-components/es/components/toggle/index.js'"],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3038-25739&t=9zqAFF3e617gPBGE-4',
  {
    variant: { 'Toggle only': 'True' },
    props: {
      size: figma.enum('Size', {
        Default: 'md',
        Small: 'sm',
      }),
      readOnly: figma.enum('State', {
        'Read-only': true,
      }),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      toggled: figma.boolean('Toggled'),
    },
    example: (props) =>
      html`<cds-toggle
        disabled=${props.disabled}
        hideLabel
        label-a=""
        label-b=""
        read-only=${props.readOnly}
        size=${props.size}
        toggled=${props.toggled}></cds-toggle>`,
    imports: ["import '@carbon/web-components/es/components/toggle/index.js'"],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3038-25739&t=9zqAFF3e617gPBGE-4',
  {
    variant: { 'Show value': 'False' },
    props: {
      size: figma.enum('Size', {
        Default: 'md',
        Small: 'sm',
      }),
      readOnly: figma.enum('State', {
        'Read-only': true,
      }),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      hideLabel: figma.boolean('Show label', {
        true: false,
        false: true,
      }),
      labelText: figma.string('Label text'),
      toggled: figma.boolean('Toggled'),
    },
    example: (props) =>
      html`<cds-toggle
        disabled=${props.disabled}
        hideLabel=${props.hideLabel}
        label-a=""
        label-b=""
        label-text=${props.labelText}
        read-only=${props.readOnly}
        size=${props.size}
        toggled=${props.toggled}></cds-toggle>`,
    imports: ["import '@carbon/web-components/es/components/toggle/index.js'"],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3038-25739&t=9zqAFF3e617gPBGE-4',
  {
    variant: { State: 'Skeleton' },
    example: () => html`<cds-toggle-skeleton></cds-toggle-skeleton>`,
    imports: ["import '@carbon/web-components/es/components/toggle/index.js'"],
  }
);
