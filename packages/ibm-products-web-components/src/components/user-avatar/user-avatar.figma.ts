/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';
import './user-avatar';

const sharedProps = {
  name: figma.string('Initials text'),
  size: figma.enum('Size', {
    'Extra large': 'xl',
    Large: 'lg',
    Medium: 'md',
    Small: 'sm',
  }),

  tooltipProps: figma.nestedProps('Tooltip', {
    text: figma.string('Tooltip text'),
    tooltipAlignment: figma.enum('🚫 Position', {
      Top: 'top',
      Right: 'right',
      Bottom: 'bottom',
      Left: 'left',
    }),
  }),

  bgProps: figma.nestedProps('Background', {
    color: figma.enum('Color', {
      Cyan: figma.enum('Sequence', {
        Primary: 'order-1-cyan',
        Secondary: 'order-7-cyan',
      }),
      Gray: figma.enum('Sequence', {
        Primary: 'order-2-gray',
        Secondary: 'order-8-gray',
      }),
      Green: figma.enum('Sequence', {
        Primary: 'order-3-green',
        Secondary: 'order-9-green',
      }),
      Magenta: figma.enum('Sequence', {
        Primary: 'order-4-magenta',
        Secondary: 'order-10-magenta',
      }),
      Purple: figma.enum('Sequence', {
        Primary: 'order-5-purple',
        Secondary: 'order-11-purple',
      }),
      Teal: figma.enum('Sequence', {
        Primary: 'order-6-teal',
        Secondary: 'order-12-teal',
      }),
    }),
  }),
  Type: figma.enum('Type', {
    'Single user': 'User',
    'User group': 'Group',
  }),
};

figma.connect(
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=15368-59379&t=lbewdWdJ4JB5izcw-4',
  {
    variant: { Type: 'Image' },
    props: sharedProps,

    example: ({ tooltipProps, name, size }) =>
      html`<c4p-user-avatar
        tooltip-alignment=${tooltipProps.tooltipAlignment}
        tooltip-text=${tooltipProps.text}
        name=${name}
        size=${size}
        image="/path/to/image"
        image-description="Alt text for image"
      >
      </c4p-user-avatar> `,
    imports: [
      "import '@carbon/ibm-products-web-components/es/components/user-avatar/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=15368-59379&t=lbewdWdJ4JB5izcw-4',
  {
    variant: { Type: 'Initials' },
    props: sharedProps,
    example: ({ tooltipProps, name, size, bgProps }) =>
      html`<c4p-user-avatar
        tooltip-alignment=${tooltipProps.tooltipAlignment}
        tooltip-text=${tooltipProps.text}
        name=${name}
        size=${size}
        background-color=${bgProps.color}
      >
      </c4p-user-avatar> `,
    imports: [
      "import '@carbon/ibm-products-web-components/es/components/user-avatar/index.js'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=15368-59379&t=lbewdWdJ4JB5izcw-4',
  {
    variant: { Type: 'Single user' },
    props: sharedProps,
    example: ({ tooltipProps, name, size, bgProps, Type }) =>
      html`<c4p-user-avatar
        tooltip-alignment=${tooltipProps.tooltipAlignment}
        tooltip-text=${tooltipProps.text}
        name=${name}
        size=${size}
        background-color=${bgProps.color}
      >
        <!-- Icon loaded via iconLoader helper from '@carbon/web-components' -->
        \${iconLoader(${Type}, { slot: 'rendericon' })}
      </c4p-user-avatar> `,
    imports: [
      "import '@carbon/ibm-products-web-components/es/components/user-avatar/index.js'",
      "import iconLoader from '@carbon/web-components/es/globals/internal/icon-loader.js'",
      "import User from '@carbon/icons/es/user/16'",
    ],
  }
);

figma.connect(
  'https://www.figma.com/design/0F9dKH2abAd7gSfvnacfWf/-v11--IBM-Products-%E2%80%93-Carbon-Design-System?node-id=15368-59379&t=lbewdWdJ4JB5izcw-4',
  {
    variant: { Type: 'User group' },
    props: sharedProps,
    example: ({ tooltipProps, name, size, bgProps, Type }) =>
      html`<c4p-user-avatar
        tooltip-alignment=${tooltipProps.tooltipAlignment}
        tooltip-text=${tooltipProps.text}
        name=${name}
        size=${size}
        background-color=${bgProps.color}
      >
        <!-- Icon loaded via iconLoader helper from '@carbon/web-components' -->
        \${iconLoader(${Type}, { slot: 'rendericon' })}
      </c4p-user-avatar> `,
    imports: [
      "import '@carbon/ibm-products-web-components/es/components/user-avatar/index.js'",
      "import iconLoader from '@carbon/web-components/es/globals/internal/icon-loader.js'",
      "import Group from '@carbon/icons/es/group/16'",
    ],
  }
);
