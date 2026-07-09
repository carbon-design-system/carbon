/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=19893-290998&m=dev',
  {
    props: {
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      helperText: figma.boolean('Show helper', {
        true: figma.string('Helper text'),
      }),
      hideLabel: figma.boolean('Show label', {
        true: false,
        false: true,
      }),
      invalid: figma.enum('State', {
        Error: true,
      }),
      invalidText: figma.string('Error text'),
      label: figma.string('Label text'),
      readOnly: figma.enum('State', {
        'Read-only': true,
      }),
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
      }),
      warn: figma.enum('State', {
        Warning: true,
      }),
      warnText: figma.string('Warning text'),
      numberInputBase: figma.nestedProps('_Number input base', {
        value: figma.textContent('Text'),
      }),
    },
    example: (props) =>
      html`<cds-number-input
        disabled=${props.disabled}
        helper-text=${props.helperText}
        hide-label=${props.hideLabel}
        invalid=${props.invalid}
        invalid-text=${props.invalidText}
        label=${props.label}
        readonly=${props.readOnly}
        size=${props.size}
        value=${props.numberInputBase.value}
        warn=${props.warn}
        warn-text=${props.warnText}></cds-number-input>`,
    imports: [
      "import '@carbon/web-components/es/components/number-input/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=19893-290998&m=dev',
  {
    variant: { State: 'Skeleton' },
    props: {
      hideLabel: figma.boolean('Show label', {
        true: false,
        false: true,
      }),
    },
    example: (props) =>
      html`<cds-number-input-skeleton
        hide-label=${props.hideLabel}></cds-number-input-skeleton>`,
    imports: [
      "import '@carbon/web-components/es/components/number-input/index.js'",
    ],
  }
);
