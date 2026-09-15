/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

const sharedTabProps = {
  label: figma.string('Label text'),
  disabled: figma.enum('State', {
    Disabled: true,
  }),
  icon: figma.instance('Swap icon'),
  secondaryLabel: figma.boolean('Show 2nd label', {
    true: figma.textContent('2nd label'),
  }),
};

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/-v11--Carbon-Design-System?node-id=103086-4853&t=qzeFExzcZKEytj8o-4',
  {
    variant: { Type: 'Text + Icon' },
    props: sharedTabProps,
    example: (props) =>
      html`<cds-tab disabled=${props.disabled}>
        ${props.label} ${props.icon}
      </cds-tab>`,
    imports: ["import '@carbon/web-components/es/components/tabs/index.js'"],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/-v11--Carbon-Design-System?node-id=103086-4853&t=qzeFExzcZKEytj8o-4',
  {
    variant: {
      Type: 'Text + Icon',
      Style: 'Contained',
      'Show 2nd label': 'True',
    },
    props: sharedTabProps,
    example: (props) =>
      html`<cds-tab
        disabled=${props.disabled}
        secondary-label=${props.secondaryLabel}>
        ${props.label} ${props.icon}
      </cds-tab>`,
    imports: ["import '@carbon/web-components/es/components/tabs/index.js'"],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/-v11--Carbon-Design-System?node-id=103086-4853&t=qzeFExzcZKEytj8o-4',
  {
    variant: { Type: 'Icon only' },
    props: sharedTabProps,
    example: (props) =>
      html`<cds-tab
        icon-only
        disabled=${props.disabled}
        aria-label=${props.label}>
        ${props.icon}
      </cds-tab>`,
    imports: ["import '@carbon/web-components/es/components/tabs/index.js'"],
  }
);

// vertical tabs items
figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=75769-1965&t=PaZ3ZnEGQGMgXgBW-4',
  {
    props: {
      label: figma.string('Text'),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
    },
    example: (props) =>
      html`<cds-tab disabled=${props.disabled}>${props.label}</cds-tab>`,
    imports: ["import '@carbon/web-components/es/components/tabs/index.js'"],
  }
);
