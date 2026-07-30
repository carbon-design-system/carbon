/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=14032-291311&t=aG4cJRjteQHcd71k-4',
  {
    props: {
      type: figma.enum('Style', {
        Inline: 'inline',
      }),
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
      }),
      titleText: figma.string('Label text'),
      label: figma.string('Prompt text'),
      helperText: figma.boolean('Show helper', {
        true: figma.string('Helper text'),
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
      readOnly: figma.enum('State', {
        'Read-only': true,
      }),
    },
    example: (props) =>
      html`<cds-multi-select
        disabled=${props.disabled}
        helper-text=${props.helperText}
        invalid=${props.invalid}
        invalid-text=${props.invalidText}
        label=${props.label}
        read-only=${props.readOnly}
        selection-feedback="top-after-reopen"
        size=${props.size}
        title-text=${props.titleText}
        type=${props.type}
        warn=${props.warn}
        warn-text=${props.warnText}>
        <cds-multi-select-item selected value="option-0"
          >Option 0</cds-multi-select-item
        >
        <cds-multi-select-item value="option-1">Option 1</cds-multi-select-item>
      </cds-multi-select>`,
    imports: [
      "import '@carbon/web-components/es/components/multi-select/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=14032-291311&t=aG4cJRjteQHcd71k-4',
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
      "import '@carbon/web-components/es/components/multi-select/index.js'",
      "import '@carbon/web-components/es/components/dropdown/index.js'",
    ],
  }
);
