/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

const sharedProgressBarProps = {
  label: figma.string('Label text'),
  value: figma.enum('Progress', {
    '0%': 0,
    '25%': 25,
    '50%': 50,
    '75%': 75,
  }),
  type: figma.enum('Alignment', {
    Inline: 'inline',
    Indent: 'indented',
  }),
  status: figma.enum('Status', {
    Active: 'active',
    Success: 'finished',
    Error: 'error',
  }),
  size: figma.enum('Size', {
    Big: 'big',
    Small: 'small',
  }),
  helperText: figma.string('Helper text'),
  helperTextError: figma.string('Error text'),
  helperTextSuccess: figma.string('Success text'),
};

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=9506-402924&t=j280IIQF1o3iLkV2-4',
  {
    variant: { Status: 'Active' },
    props: sharedProgressBarProps,
    example: (props) =>
      html`<cds-progress-bar
        helper-text=${props.helperText}
        label=${props.label}
        size=${props.size}
        status=${props.status}
        type=${props.type}
        value=${props.value}></cds-progress-bar>`,
    imports: [
      "import '@carbon/web-components/es/components/progress-bar/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=9506-402924&t=j280IIQF1o3iLkV2-4',
  {
    variant: { Status: 'Error' },
    props: sharedProgressBarProps,
    example: (props) =>
      html`<cds-progress-bar
        helper-text=${props.helperTextError}
        label=${props.label}
        size=${props.size}
        status=${props.status}
        type=${props.type}
        value=${props.value}></cds-progress-bar>`,
    imports: [
      "import '@carbon/web-components/es/components/progress-bar/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=9506-402924&t=j280IIQF1o3iLkV2-4',
  {
    variant: { Status: 'Success' },
    props: sharedProgressBarProps,
    example: (props) =>
      html`<cds-progress-bar
        helper-text=${props.helperTextSuccess}
        label=${props.label}
        size=${props.size}
        status=${props.status}
        type=${props.type}
        value=${props.value}></cds-progress-bar>`,
    imports: [
      "import '@carbon/web-components/es/components/progress-bar/index.js'",
    ],
  }
);
