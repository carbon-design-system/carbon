/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=17544-268301&t=qp8bdiovIuVIO7xb-4',
  {
    props: {
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
      }),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      readOnly: figma.enum('State', {
        'Read-only': true,
      }),
    },
    example: (props) =>
      html`<cds-time-picker
        disabled=${props.disabled}
        label-text="Choose a time"
        placeholder="hh:mm"
        readonly=${props.readOnly}
        size=${props.size}>
        <cds-time-picker-select
          default-value="AM"
          disabled=${props.disabled}
          id="time-picker-select-1">
          <cds-select-item value="AM">AM</cds-select-item>
          <cds-select-item value="PM">PM</cds-select-item>
        </cds-time-picker-select>
        <cds-time-picker-select
          default-value="Time zone 1"
          disabled=${props.disabled}
          id="time-picker-select-2">
          <cds-select-item value="Time zone 1">Time zone 1</cds-select-item>
          <cds-select-item value="Time zone 2">Time zone 2</cds-select-item>
        </cds-time-picker-select>
      </cds-time-picker>`,
    imports: [
      "import '@carbon/web-components/es/components/time-picker/index.js'",
      "import '@carbon/web-components/es/components/select/index.js'",
    ],
  }
);
