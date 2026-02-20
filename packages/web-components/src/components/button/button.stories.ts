/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import '../badge-indicator/index';
import {
  BUTTON_KIND,
  BUTTON_TYPE,
  BUTTON_SIZE,
  BUTTON_TOOLTIP_ALIGNMENT,
  BUTTON_TOOLTIP_POSITION,
} from './button';
import './index';

import Add16 from '@carbon/icons/es/add/16.js';
import Notification16 from '@carbon/icons/es/notification/16.js';
import Filter16 from '@carbon/icons/es/filter/16.js';
import { iconLoader } from '../../globals/internal/icon-loader';

/**
 * Prop parity
 * - as
 * - tooltipDropShadow
 * - tooltipHighContrast
 * - autoAlign
 * - hasIconOnly - not needed
 * - iconDescription ~ tooltipText + set aria-label on icons manually
 */

const textButtonControls = [
  'disabled',
  'href',
  'isExpressive',
  'kind',
  'rel',
  'icon',
  'linkRole',
  'size',
  'tabindex',
  'target',
  'type',
];

const iconButtonControls = [
  ...textButtonControls,
  'isSelected',
  'count',
  'tooltipAlignment',
  'tooltipPosition',
  'tooltipText',
];

const kind = [
  BUTTON_KIND.PRIMARY,
  BUTTON_KIND.SECONDARY,
  BUTTON_KIND.TERTIARY,
  BUTTON_KIND.GHOST,
  BUTTON_KIND.DANGER,
  BUTTON_KIND.DANGER_TERTIARY,
  BUTTON_KIND.DANGER_GHOST,
];

const types = [BUTTON_TYPE.BUTTON, BUTTON_TYPE.RESET, BUTTON_TYPE.SUBMIT];

const sizes = [
  BUTTON_SIZE.EXTRA_SMALL,
  BUTTON_SIZE.SMALL,
  BUTTON_SIZE.MEDIUM,
  BUTTON_SIZE.LARGE,
  BUTTON_SIZE.EXTRA_LARGE,
  BUTTON_SIZE.EXTRA_EXTRA_LARGE,
];

/**
 * TODO:
 * This currently renders as "right", "", "left".
 * In React, it renders as "start", "center", "end".
 * Needs investigation for parity.
 */
const alignmentOptions = {
  Start: BUTTON_TOOLTIP_ALIGNMENT.START,
  Center: BUTTON_TOOLTIP_ALIGNMENT.CENTER,
  End: BUTTON_TOOLTIP_ALIGNMENT.END,
};

const positionOptions = [
  BUTTON_TOOLTIP_POSITION.TOP,
  BUTTON_TOOLTIP_POSITION.RIGHT,
  BUTTON_TOOLTIP_POSITION.BOTTOM,
  BUTTON_TOOLTIP_POSITION.LEFT,
];

const sharedArgTypes = {
  disabled: {
    description: 'Specify whether the Button should be disabled, or not',
    type: { name: 'boolean' },
    table: { defaultValue: { summary: false } },
  },
  dangerDescription: {
    description:
      'Specify the message read by screen readers for the danger button variants',
    control: 'text',
    type: { name: 'string' },
    table: { defaultValue: { summary: '"danger"' } },
  },
  href: {
    description:
      'Optionally specify an href for your Button to become an `<a>` element',
    control: 'text',
    type: { name: 'string' },
  },
  kind: {
    description:
      'Specify the kind of Button you want to create. `primary`, `secondary`,`tertiary`, `ghost`, `danger`, `danger-tertiary`, `danger-ghost`',
    options: kind,
    type: { name: 'BUTTON_KIND' },
    control: { type: 'select' },
    table: { defaultValue: { summary: '"primary"' } },
  },
  linkRole: {
    /**
     * TODO:
     * In React, the `role` prop applies to both `<button>` and `<a>`.
     * Here, it only applies to `<a>`. Needs parity investigation.
     */
    description:
      'Optional prop to specify the link role when using an `<a>` element',
    control: 'text',
    type: { name: 'string' },
  },
  type: {
    description: 'Optional prop to specify the type of the Button',
    options: types,
    control: { type: 'radio' },
    type: { name: 'BUTTON_TYPE' },
    table: { defaultValue: { summary: '"button"' } },
  },
  size: {
    options: sizes,
    description:
      'Specify the size of the button, from the following list of sizes: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`',
    type: { name: 'BUTTON_SIZE' },
    control: { type: 'select' },
    table: { defaultValue: { summary: '"lg"' } },
  },
  rel: {
    description: 'Optionally specify a `rel` when using an `<a>` element.',
    control: 'text',
    type: { name: 'string' },
  },
  tooltipAlignment: {
    options: [Object.keys(alignmentOptions)],
    description:
      'Specify the alignment of the tooltip to the icon-only button. Can be one of: start, center, or end.',
    control: { type: 'radio' },
    type: { name: 'enum' },
    table: { defaultValue: { summary: 'center' } },
  },
  tooltipPosition: {
    options: positionOptions,
    description:
      'Specify the position of the tooltip to the icon-only button. Can be one of: top, right, bottom, or left.',
    control: { type: 'radio' },
    type: { name: 'enum' },
    table: { defaultValue: { summary: 'top' } },
  },
  tooltipDropShadow: {
    table: { defaultValue: { summary: false } },
  },
  tooltipHighContrast: {
    table: { defaultValue: { summary: true } },
  },
  tooltipText: {
    /**
     * TODO:
     * Tooltip text does not work when `href` is provided.
     * Needs investigation for parity with React.
     */
    description:
      'Specify the text content to be placed inside the tooltip for icon-only buttons',
    control: 'text',
    type: { name: 'string' },
  },
  isExpressive: {
    description: 'Specify whether the Button is expressive, or not',
    type: { name: 'boolean' },
    table: { defaultValue: { summary: false } },
  },
  isSelected: {
    description:
      'Specify whether the Button is currently selected. Only applies to the icon only Ghost variant.',
    type: { name: 'boolean' },
    table: { defaultValue: { summary: false } },
  },
  target: {
    description: 'Optionally specify a `target` when using an `<a>` element',
    control: 'text',
    type: { name: 'string' },
  },
  count: {
    description:
      'The count prop for `cds-badge-indicator` when slotted into the button. This prop is supported only when `kind="ghost"`, and `size="lg"`.',
    type: { name: 'number' },
    control: { type: 'number', min: 0 },
  },
  tabindex: {
    description: 'Optional prop to specify the tabindex of the Button',
    control: 'number',
    type: { name: 'number' },
  },
  icon: {
    control: { type: 'select' },
    options: ['Add', 'None'],
    type: { name: 'HTMLElement' },
    table: { category: 'Slot' },
    description: 'Places the slotted icon inside the Button. `slot="icon"`',
    mapping: {
      Add: (props) => iconLoader(Add16, props),
      Notification: (props) => iconLoader(Notification16, props),
      Filter: (props) => iconLoader(Filter16, props),
      None: undefined,
    },
  },
};

const baseButtonTemplate = (args) => html`
  <cds-button
    @click=${args.onClick}
    danger-description=${ifDefined(args.dangerDescription)}
    ?disabled=${args.disabled}
    href=${ifDefined(args.href)}
    ?isExpressive=${args.isExpressive}
    kind=${ifDefined(args.kind)}
    rel=${ifDefined(args.rel)}
    link-role=${ifDefined(args.linkRole)}
    target=${ifDefined(args.target)}
    tabindex=${ifDefined(args.tabindex)}
    size=${ifDefined(args.size)}
    type=${ifDefined(args.type)}>
    Button ${args.icon?.({ slot: 'icon' })}
  </cds-button>
`;

const iconButtonTemplate = (args) => html`
  <cds-button
    @click=${args.onClick}
    danger-description=${ifDefined(args.dangerDescription)}
    ?disabled=${args.disabled}
    href=${ifDefined(args.href)}
    ?isExpressive=${args.isExpressive}
    ?isSelected=${args.isSelected}
    kind=${ifDefined(args.kind)}
    rel=${ifDefined(args.rel)}
    link-role=${ifDefined(args.linkRole)}
    target=${ifDefined(args.target)}
    tabindex=${ifDefined(args.tabindex)}
    size=${ifDefined(args.size)}
    tooltip-text=${ifDefined(args.tooltipText)}
    tooltip-alignment=${ifDefined(args.tooltipAlignment)}
    tooltip-position=${ifDefined(args.tooltipPosition)}
    type=${ifDefined(args.type)}>
    ${args.icon?.({ slot: 'icon' })}
    ${args.count === undefined
      ? null
      : args.count > 0
        ? html`<cds-badge-indicator count=${args.count}></cds-badge-indicator>`
        : html`<cds-badge-indicator></cds-badge-indicator>`}
  </cds-button>
`;

const meta = {
  title: 'Components/Button',
  argTypes: sharedArgTypes,
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    controls: { include: textButtonControls },
  },
  render: baseButtonTemplate,
};

export default meta;

export const Default = {
  argTypes: {
    ...sharedArgTypes,
  },
  parameters: {
    controls: {
      include: [...textButtonControls, 'dangerDescription'],
    },
  },
};
export const Secondary = {
  args: { kind: BUTTON_KIND.SECONDARY },
  argTypes: {
    ...sharedArgTypes,
    kind: {
      table: { readonly: true },
    },
  },
};
export const Tertiary = {
  args: { kind: BUTTON_KIND.TERTIARY },
  argTypes: {
    ...sharedArgTypes,
    kind: {
      table: { readonly: true },
    },
  },
};

export const Ghost = {
  args: { kind: BUTTON_KIND.GHOST },
  argTypes: {
    ...sharedArgTypes,
    kind: {
      table: { readonly: true },
    },
  },
};

export const Danger = {
  args: { kind: BUTTON_KIND.DANGER },
  argTypes: {
    ...sharedArgTypes,
    kind: {
      table: { readonly: true },
    },
  },
  parameters: {
    controls: {
      include: [...textButtonControls, 'dangerDescription'],
    },
  },
};

export const DangerTertiary = {
  args: { kind: BUTTON_KIND.DANGER_TERTIARY },
  argTypes: {
    ...sharedArgTypes,
    kind: {
      table: { readonly: true },
    },
  },
  parameters: {
    controls: {
      include: [...textButtonControls, 'dangerDescription'],
    },
  },
};

export const DangerGhost = {
  args: { kind: BUTTON_KIND.DANGER_GHOST },
  argTypes: {
    ...sharedArgTypes,
    kind: {
      table: { readonly: true },
    },
  },
  parameters: {
    controls: {
      include: [...textButtonControls, 'dangerDescription'],
    },
  },
};

export const IconButton = {
  render: iconButtonTemplate,
  parameters: {
    controls: { include: [...iconButtonControls, 'dangerDescription'] },
  },
  argTypes: {
    count: { table: { readonly: true } },
    icon: {
      options: ['Add', 'Filter'],
    },
  },
  args: {
    kind: BUTTON_KIND.PRIMARY,
    icon: 'Add',
    tooltipText: 'Icon Description',
  },
};

export const IconButtonWithBadge = {
  render: iconButtonTemplate,
  parameters: {
    controls: { include: iconButtonControls },
  },
  argTypes: {
    icon: {
      options: ['Notification'],
      description:
        'Icon to display in the button with badge. Choose between Notification and Filter icons.',
    },
    kind: {
      table: { readonly: true },
      description:
        'Specify the kind of Button you want to create. This control must be set to `ghost` if using the `cds-badge-indicator`.',
    },
    size: {
      table: { readonly: true },
      description:
        'Specify the size of the button. This control must be set to `lg` if using the `cds-badge-indicator`.',
    },
  },
  args: {
    count: 4,
    kind: BUTTON_KIND.GHOST,
    icon: 'Notification',
    tooltipText: 'Notification',
    size: BUTTON_SIZE.LARGE,
  },
};

// TODO: move into a separate story file, after meeting feature parity with fluid attribute
export const SetOfButtons = {
  argTypes: {
    stacked: {
      control: 'boolean',
      description:
        'Specify the button arrangement of the set (vertically stacked or horizontal)',
      type: { name: 'bool' },
    },
  },
  parameters: {
    controls: {
      include: ['stacked'],
    },
  },
  render: (args) => html`
    <cds-button-set ?stacked=${args.stacked}>
      <cds-button kind="secondary">Secondary</cds-button>
      <cds-button kind="primary">Primary</cds-button>
    </cds-button-set>
  `,
};

export const Skeleton = {
  argTypes: {
    size: { options: sizes, control: 'select' },
    href: { control: 'text' },
  },
  parameters: {
    controls: {
      include: ['size', 'href'],
    },
  },
  render: (args) =>
    html`<cds-button-skeleton
      size=${ifDefined(args.size)}
      href=${ifDefined(args.href)}>
    </cds-button-skeleton>`,
};
