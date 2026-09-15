/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=14032-290976&t=5acDGCinwyrs5Bbc-4',
  {
    props: {
      label: figma.string('Filter text'),
      helperText: figma.boolean('Show helper', {
        true: figma.string('Helper text'),
      }),
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
      }),
      titleText: figma.string('Label text'),
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
    },
    example: (props) =>
      html`<cds-combo-box
        disabled=${props.disabled}
        helper-text=${props.helperText}
        invalid=${props.invalid}
        invalid-text=${props.invalidText}
        label=${props.label}
        read-only=${props.readOnly}
        size=${props.size}
        title-text=${props.titleText}
        warn=${props.warn}
        warn-text=${props.warnText}>
        <cds-combo-box-item value="option-0">Option 0</cds-combo-box-item>
        <cds-combo-box-item value="option-1">Option 1</cds-combo-box-item>
      </cds-combo-box>`,
    imports: [
      "import '@carbon/web-components/es/components/combo-box/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=14032-290976&t=5acDGCinwyrs5Bbc-4',
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
      "import '@carbon/web-components/es/components/combo-box/index.js'",
      "import '@carbon/web-components/es/components/dropdown/index.js'",
    ],
  }
);
