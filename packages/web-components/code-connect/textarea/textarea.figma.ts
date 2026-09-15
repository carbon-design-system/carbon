/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=14494-263111&t=4Ath5JqwaYJZxznq-4',
  {
    props: {
      label: figma.string('Label text'),
      hideLabel: figma.boolean('Show label', {
        true: false,
        false: true,
      }),
      value: figma.boolean('Text filled', {
        true: figma.string('Body text'),
      }),
      helperText: figma.boolean('Show helper', {
        true: figma.string('Helper text'),
      }),
      enableCounter: figma.boolean('Show count'),
      placeholder: figma.string('Placeholder text'),
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
      readonly: figma.enum('State', {
        'Read-only': true,
      }),
    },
    example: (props) =>
      html`<cds-textarea
        disabled=${props.disabled}
        enable-counter=${props.enableCounter}
        helper-text=${props.helperText}
        hide-label=${props.hideLabel}
        invalid=${props.invalid}
        invalid-text=${props.invalidText}
        label=${props.label}
        placeholder=${props.placeholder}
        readonly=${props.readonly}
        value=${props.value}
        warn=${props.warn}
        warn-text=${props.warnText}>
        ${props.value}
      </cds-textarea>`,
    imports: [
      "import '@carbon/web-components/es/components/textarea/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=14494-263111&t=4Ath5JqwaYJZxznq-4',
  {
    variant: { State: 'Skeleton' },
    props: {
      hideLabel: figma.boolean('Show label', {
        true: false,
        false: true,
      }),
    },
    example: (props) =>
      html`<cds-textarea-skeleton
        hide-label=${props.hideLabel}></cds-textarea-skeleton>`,
    imports: [
      "import '@carbon/web-components/es/components/textarea/index.js'",
    ],
  }
);
