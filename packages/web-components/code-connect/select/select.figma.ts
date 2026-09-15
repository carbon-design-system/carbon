/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=17650-274860&t=LS77peWFGhwOdxIw-4',
  {
    props: {
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      hideLabel: figma.boolean('Show label', {
        true: false,
        false: true,
      }),
      inline: figma.enum('Style', {
        Inline: true,
      }),
      readOnly: figma.enum('State', {
        'Read-only': true,
      }),
      invalid: figma.enum('State', {
        Error: true,
      }),
      invalidText: figma.string('Error text'),
      warn: figma.enum('State', {
        Warning: true,
      }),
      warnText: figma.string('Warning text'),
      labelText: figma.string('Label text'),
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
      }),
      helperText: figma.boolean('Show helper', {
        true: figma.string('Helper text'),
      }),
    },
    example: (props) =>
      html`<cds-select
        disabled=${props.disabled}
        helper-text=${props.helperText}
        hide-label=${props.hideLabel}
        inline=${props.inline}
        invalid=${props.invalid}
        invalid-text=${props.invalidText}
        label-text=${props.labelText}
        readonly=${props.readOnly}
        size=${props.size}
        warn=${props.warn}
        warn-text=${props.warnText}>
        <cds-select-item value=""></cds-select-item>
        <cds-select-item value="option-1">Option 1</cds-select-item>
        <cds-select-item value="option-2">Option 2</cds-select-item>
        <cds-select-item value="option-3">Option 3</cds-select-item>
        <cds-select-item value="option-4">Option 4</cds-select-item>
      </cds-select>`,
    imports: ["import '@carbon/web-components/es/components/select/index.js'"],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=17650-274860&t=LS77peWFGhwOdxIw-4',
  {
    variant: { State: 'Skeleton' },
    props: {
      hideLabel: figma.boolean('Show label', {
        true: false,
        false: true,
      }),
    },
    example: (props) =>
      html`<cds-select-skeleton
        hide-label=${props.hideLabel}></cds-select-skeleton>`,
    imports: ["import '@carbon/web-components/es/components/select/index.js'"],
  }
);
