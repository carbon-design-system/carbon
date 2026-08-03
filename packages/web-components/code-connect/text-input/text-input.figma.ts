/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=15784-271032&m=dev',
  {
    props: {
      label: figma.string('Label text'),
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
      }),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      invalid: figma.enum('State', {
        Error: true,
      }),
      invalidText: figma.string('Error text'),
      warn: figma.enum('State', {
        Warning: true,
      }),
      warnText: figma.string('Warning text'),
      helperText: figma.boolean('Show helper', {
        true: figma.string('Helper text'),
      }),
      placeholder: figma.string('Placeholder text'),
      value: figma.boolean('Text filled', {
        true: figma.string('Input text'),
      }),
      enableCounter: figma.boolean('Show count'),
      readonly: figma.enum('State', {
        'Read-only': true,
      }),
    },
    example: (props) =>
      html`<cds-text-input
        disabled=${props.disabled}
        enable-counter=${props.enableCounter}
        helper-text=${props.helperText}
        invalid=${props.invalid}
        invalid-text=${props.invalidText}
        label=${props.label}
        placeholder=${props.placeholder}
        readonly=${props.readonly}
        size=${props.size}
        value=${props.value}
        warn=${props.warn}
        warn-text=${props.warnText}></cds-text-input>`,
    imports: [
      "import '@carbon/web-components/es/components/text-input/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=15784-271032&m=dev',
  {
    variant: { State: 'Skeleton' },
    example: () => html`<cds-text-input-skeleton></cds-text-input-skeleton>`,
    imports: [
      "import '@carbon/web-components/es/components/text-input/index.js'",
    ],
  }
);
