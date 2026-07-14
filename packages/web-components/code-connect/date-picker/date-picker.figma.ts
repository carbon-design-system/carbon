/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

const sharedDateInputProps = {
  placeholder: figma.string('Date unselected'),
  labelText: figma.string('Label text'),
  disabled: figma.enum('State', {
    Disabled: true,
  }),
  invalid: figma.enum('State', {
    Error: true,
  }),
  warn: figma.enum('State', {
    Warning: true,
  }),
  warnText: figma.string('Warning text'),
  // Intentionally omit helperText: WC date picker uses a slot, and the HTML parser
  // cannot conditionally omit that slot here without changing snippet behavior.
  invalidText: figma.string('Error text'),
  size: figma.enum('Size', {
    Large: 'lg',
    Medium: 'md',
    Small: 'sm',
  }),
  readOnly: figma.enum('State', {
    'Read-only': true,
  }),
};

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=17544-266985&t=hgJuU7m9Y6EM076g-4',
  {
    props: {
      ...sharedDateInputProps,
      hideLabel: figma.boolean('Show label', {
        true: false,
        false: true,
      }),
    },
    example: (props) =>
      html`<cds-date-picker readonly=${props.readOnly}>
        <cds-date-picker-input
          disabled=${props.disabled}
          hide-label=${props.hideLabel}
          invalid=${props.invalid}
          invalid-text=${props.invalidText}
          kind="simple"
          label-text=${props.labelText}
          placeholder=${props.placeholder}
          size=${props.size}
          warn=${props.warn}
          warn-text=${props.warnText}></cds-date-picker-input>
      </cds-date-picker>`,
    imports: [
      "import '@carbon/web-components/es/components/date-picker/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=17544-266985&t=hgJuU7m9Y6EM076g-4',
  {
    variant: { State: 'Skeleton' },
    example: () =>
      html`<cds-date-picker-input-skeleton></cds-date-picker-input-skeleton>`,
    imports: [
      "import '@carbon/web-components/es/components/date-picker/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=17544-267504&t=hgJuU7m9Y6EM076g-4',
  {
    props: sharedDateInputProps,
    example: (props) =>
      html`<cds-date-picker readonly=${props.readOnly}>
        <cds-date-picker-input
          disabled=${props.disabled}
          invalid=${props.invalid}
          invalid-text=${props.invalidText}
          kind="single"
          label-text=${props.labelText}
          placeholder=${props.placeholder}
          size=${props.size}
          warn=${props.warn}
          warn-text=${props.warnText}></cds-date-picker-input>
      </cds-date-picker>`,
    imports: [
      "import '@carbon/web-components/es/components/date-picker/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=17544-267504&t=hgJuU7m9Y6EM076g-4',
  {
    variant: { State: 'Skeleton' },
    example: () =>
      html`<cds-date-picker-input-skeleton></cds-date-picker-input-skeleton>`,
    imports: [
      "import '@carbon/web-components/es/components/date-picker/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=17544-268170&t=hgJuU7m9Y6EM076g-4',
  {
    props: {
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
      }),
      readOnly: figma.enum('State', {
        'Read-only': true,
      }),
      datePickerInput: figma.nestedProps(
        'Date picker - Single calendar - Default',
        {
          placeholder: figma.string('Date unselected'),
          disabled: figma.enum('State', {
            Disabled: true,
          }),
          invalid: figma.enum('State', {
            Error: true,
          }),
          warn: figma.enum('State', {
            Warning: true,
          }),
          warnText: figma.string('Warning text'),
          invalidText: figma.string('Error text'),
        }
      ),
    },
    example: (props) =>
      html`<cds-date-picker readonly=${props.readOnly}>
        <cds-date-picker-input
          disabled=${props.datePickerInput.disabled}
          invalid=${props.datePickerInput.invalid}
          invalid-text=${props.datePickerInput.invalidText}
          kind="from"
          label-text="Start date"
          placeholder=${props.datePickerInput.placeholder}
          size=${props.size}
          warn=${props.datePickerInput.warn}
          warn-text=${props.datePickerInput.warnText}></cds-date-picker-input>
        <cds-date-picker-input
          disabled=${props.datePickerInput.disabled}
          invalid=${props.datePickerInput.invalid}
          invalid-text=${props.datePickerInput.invalidText}
          kind="to"
          label-text="End date"
          placeholder=${props.datePickerInput.placeholder}
          size=${props.size}
          warn=${props.datePickerInput.warn}
          warn-text=${props.datePickerInput.warnText}></cds-date-picker-input>
      </cds-date-picker>`,
    imports: [
      "import '@carbon/web-components/es/components/date-picker/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=17544-268170&t=hgJuU7m9Y6EM076g-4',
  {
    variant: { State: 'Skeleton' },
    example: () =>
      html`<cds-date-picker-input-skeleton
        range></cds-date-picker-input-skeleton>`,
    imports: [
      "import '@carbon/web-components/es/components/date-picker/index.js'",
    ],
  }
);
