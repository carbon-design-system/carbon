/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=5621-280380&t=BNxiN6zuoeazJ8tv-4',
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
    },
    example: (props) =>
      html`<cds-password-input
        disabled=${props.disabled}
        helper-text=${props.helperText}
        invalid=${props.invalid}
        invalid-text=${props.invalidText}
        label=${props.label}
        size=${props.size}
        warn=${props.warn}
        warn-text=${props.warnText}></cds-password-input>`,
    imports: [
      "import '@carbon/web-components/es/components/password-input/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=5621-280380&t=BNxiN6zuoeazJ8tv-4',
  {
    variant: { State: 'Skeleton' },
    example: () =>
      html`<cds-password-input-skeleton></cds-password-input-skeleton>`,
    imports: [
      "import '@carbon/web-components/es/components/password-input/index.js'",
    ],
  }
);
