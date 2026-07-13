/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma, { html } from '@figma/code-connect/html';

const colorProps = {
  type: figma.enum('Color', {
    Blue: 'blue',
    Cyan: 'cyan',
    Teal: 'teal',
    Green: 'green',
    Purple: 'purple',
    Magenta: 'magenta',
    Red: 'red',
    Gray: 'gray',
    'Cool gray': 'cool-gray',
    'Warm gray': 'warm-gray',
    'High contrast': 'high-contrast',
    Outline: 'outline',
  }),
};

const sharedTagProps = {
  renderIcon: figma.boolean('Icon', {
    true: figma.instance('Swap icon'),
  }),
  text: figma.string('Tag text'),
  size: figma.enum('Size', {
    Large: 'lg',
    Small: 'sm',
  }),
  disabled: figma.enum('State', {
    Disabled: true,
  }),
};

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=16031-269750&t=RuAO38H8L12JZXpK-4',
  {
    props: {
      ...sharedTagProps,
      ...colorProps,
    },
    example: (props) =>
      html`<cds-tag
        disabled=${props.disabled}
        size=${props.size}
        type=${props.type}>
        ${props.text}
        <span slot="icon">${props.renderIcon}</span>
      </cds-tag>`,
    imports: ["import '@carbon/web-components/es/components/tag/index.js'"],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=16031-269750&t=RuAO38H8L12JZXpK-4',
  {
    variant: { Dismissible: 'True' },
    props: {
      ...sharedTagProps,
      ...colorProps,
    },
    example: (props) =>
      html`<cds-dismissible-tag
        disabled=${props.disabled}
        dismiss-tooltip-label="Dismiss"
        size=${props.size}
        text=${props.text}
        type=${props.type}>
        <span slot="icon">${props.renderIcon}</span>
      </cds-dismissible-tag>`,
    imports: ["import '@carbon/web-components/es/components/tag/index.js'"],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=46254-7550&t=RuAO38H8L12JZXpK-4',
  {
    props: {
      ...sharedTagProps,
      selected: figma.boolean('Selected'),
    },
    example: (props) =>
      html`<cds-selectable-tag
        disabled=${props.disabled}
        selected=${props.selected}
        size=${props.size}
        text=${props.text}>
        <span slot="icon">${props.renderIcon}</span>
      </cds-selectable-tag>`,
    imports: ["import '@carbon/web-components/es/components/tag/index.js'"],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=46254-10165&t=RuAO38H8L12JZXpK-4',
  {
    props: {
      ...sharedTagProps,
      ...colorProps,
    },
    example: (props) =>
      html`<cds-operational-tag
        disabled=${props.disabled}
        size=${props.size}
        text=${props.text}
        type=${props.type}>
        <span slot="icon">${props.renderIcon}</span>
      </cds-operational-tag>`,
    imports: ["import '@carbon/web-components/es/components/tag/index.js'"],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=16031-269750&t=RuAO38H8L12JZXpK-4',
  {
    variant: { State: 'Skeleton' },
    props: {
      size: figma.enum('Size', {
        Small: 'sm',
      }),
    },
    example: (props) =>
      html`<cds-tag-skeleton size=${props.size}></cds-tag-skeleton>`,
    imports: ["import '@carbon/web-components/es/components/tag/index.js'"],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=46254-7550&t=RuAO38H8L12JZXpK-4',
  {
    variant: { State: 'Skeleton' },
    props: {
      size: figma.enum('Size', {
        Small: 'sm',
      }),
    },
    example: (props) =>
      html`<cds-tag-skeleton size=${props.size}></cds-tag-skeleton>`,
    imports: ["import '@carbon/web-components/es/components/tag/index.js'"],
  }
);

figma.connect(
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=46254-10165&t=RuAO38H8L12JZXpK-4',
  {
    variant: { State: 'Skeleton' },
    props: {
      size: figma.enum('Size', {
        Small: 'sm',
      }),
    },
    example: (props) =>
      html`<cds-tag-skeleton size=${props.size}></cds-tag-skeleton>`,
    imports: ["import '@carbon/web-components/es/components/tag/index.js'"],
  }
);
