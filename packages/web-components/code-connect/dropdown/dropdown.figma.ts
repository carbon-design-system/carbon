/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=14032-290635&mode=dev',
  {
    props: {
      helperText: figma.boolean('Show helper', {
        true: figma.string('Helper text'),
      }),
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
      }),
      titleText: figma.string('Label'),
      label: figma.string('Prompt text'),
      readOnly: figma.enum('State', {
        'Read-only': true,
      }),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      invalid: figma.enum('State', {
        Error: true,
      }),
      invalidText: figma.string('Error message'),
      warn: figma.enum('State', {
        Warning: true,
      }),
      warnText: figma.string('Warning message'),
      type: figma.enum('Style', {
        Inline: 'inline',
      }),
    },
    example: (props) =>
      html`<cds-dropdown
        disabled=${props.disabled}
        helper-text=${props.helperText}
        invalid=${props.invalid}
        invalid-text=${props.invalidText}
        label=${props.label}
        read-only=${props.readOnly}
        size=${props.size}
        title-text=${props.titleText}
        type=${props.type}
        warn=${props.warn}
        warn-text=${props.warnText}
        value="option-0">
        <cds-dropdown-item value="option-0">Option 0</cds-dropdown-item>
        <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
      </cds-dropdown>`,
    imports: [
      "import '@carbon/web-components/es/components/dropdown/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=14032-290635&mode=dev',
  {
    variant: { State: 'Skeleton' },
    props: {
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
      }),
    },
    example: (props) =>
      html`<cds-dropdown-skeleton size=${props.size}></cds-dropdown-skeleton>`,
    imports: [
      "import '@carbon/web-components/es/components/dropdown/index.js'",
    ],
  }
);
