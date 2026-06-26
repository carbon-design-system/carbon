/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

figma.connect(
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=1854-1776&mode=dev',
  {
    props: {
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      buttonText: figma.enum('Type', {
        // Conditionally show the buttonText in the Code Connect only if the type is 'Text + Icon'
        'Icon only': '',
        'Text + Icon': figma.string('Button text'),
      }),
      kind: figma.enum('Style', {
        Primary: 'primary',
        Secondary: 'secondary',
        Tertiary: 'tertiary',
        Ghost: 'ghost',
        'Danger primary': 'danger',
        'Danger tertiary': 'danger-tertiary',
        'Danger ghost': 'danger-ghost',
      }),
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
        'Extra small': 'xs',
        'Extra large': 'xl',
        '2X large': '2xl',
      }),
      isExpressive: figma.enum('Size', {
        Expressive: true,
      }),
      hasIconOnly: figma.enum('Type', {
        'Icon only': true,
      }),
      renderIcon: figma.instance('Swap icon'),
    },
    example: (props) =>
      html`<cds-button
        disabled=${props.disabled}
        kind=${props.kind}
        size=${props.size}
        isExpressive=${props.isExpressive}>
        ${props.buttonText} ${props.renderIcon}
      </cds-button>`,
    imports: ["import '@carbon/web-components/es/components/button/button.js'"],
  }
);

figma.connect(
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=1854-1776&mode=dev',
  {
    variant: { State: 'Skeleton' },
    props: {
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
        'Extra small': 'xs',
        'Extra large': 'xl',
        '2X large': '2xl',
      }),
    },
    example: (props) =>
      html`<cds-button-skeleton size=${props.size}></cds-button-skeleton>`,
    imports: ["import '@carbon/web-components/es/components/button/button.js'"],
  }
);
