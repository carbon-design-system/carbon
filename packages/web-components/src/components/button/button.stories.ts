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
import { iconLoader } from '../../globals/internal/icon-loader';

// TODO: missing props in comparison to react:
// tooltipDropShadow
// tooltipHighContrast
// autoAlign
// iconDescription

// TODO: additional props supported in WC but not in react:
// buttonClassName
// batchAction (no relevant logic, only attribute. ignore?)
// autofocus
// download
// hreflang
// ping
// hasMainContent
// _hasIcon (private ignore. is equivalent to public hasIconOnly in react)

const textButtonControls = [
  // 'autofocus',
  // 'buttonClassName',
  'dangerDescription',
  'disabled',
  'href',
  'isExpressive',
  'kind',
  'rel',
  'iconSlot',
  'linkRole',
  'size',
  'tabindex',
  'target',
  'type',
];
const iconButtonControls = [
  ...textButtonControls,
  'isSelected',
  // 'autoAlign',
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

// TODO: this renders as "right", "", "left". in comparison to react which renders as "start", "center", "end". need to investigate for parity.
const alignmentOptions = {
  ['Start']: BUTTON_TOOLTIP_ALIGNMENT.START,
  ['Center']: BUTTON_TOOLTIP_ALIGNMENT.CENTER,
  ['End']: BUTTON_TOOLTIP_ALIGNMENT.END,
};

const positionOptions = [
  BUTTON_TOOLTIP_POSITION.TOP,
  BUTTON_TOOLTIP_POSITION.RIGHT,
  BUTTON_TOOLTIP_POSITION.BOTTOM,
  BUTTON_TOOLTIP_POSITION.LEFT,
];

const sizes = [
  BUTTON_SIZE.EXTRA_SMALL,
  BUTTON_SIZE.SMALL,
  BUTTON_SIZE.MEDIUM,
  BUTTON_SIZE.LARGE,
  BUTTON_SIZE.EXTRA_LARGE,
  BUTTON_SIZE.EXTRA_EXTRA_LARGE,
];

const sharedArgTypes = {
  autofocus: {
    description:
      'Optionally specify whether the Button should be auto-focused on page load',
    type: { name: 'boolean' },
  },
  autoAlign: {
    table: { defaultValue: { summary: false } },
  },
  disabled: {
    description: 'Specify whether the Button should be disabled, or not',
    type: { name: 'boolean' },
    table: { defaultValue: { summary: false } },
  },
  buttonClassName: {
    description: 'Optionally specify a class to be added to the button element',
    control: 'text',
    type: { name: 'string' },
  },
  dangerDescription: {
    description:
      'Specify the message read by screen readers for the danger button variants',
    control: 'text',
    type: { name: 'string' },
    table: { defaultValue: { summary: 'danger' } },
  },
  href: {
    description:
      'Optionally specify an href for your Button to become an `<a>` element',
    control: 'text',
    type: { name: 'string' },
  },
  kind: {
    description: 'Specify the kind of Button you want to create',
    options: kind,
    type: { name: 'enum' },
    control: { type: 'select' },
    table: { defaultValue: { summary: 'primary' } },
  },
  linkRole: {
    // TODO: doesn't meet parity with react, the `role` prop in react works on button as well as `<a>` tag, need to check
    description:
      'Optional prop to specify the link role when using an `<a>` element',
    control: 'text',
    type: { name: 'string' },
  },
  type: {
    description: 'Optional prop to specify the type of the Button',
    options: types,
    control: { type: 'radio' },
    type: { name: 'enum' },
    table: { defaultValue: { summary: 'button' } },
  },
  size: {
    options: sizes,
    description:
      'Specify the size of the button, from the following list of sizes: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`',
    type: { name: 'enum' },
    control: { type: 'select' },
    table: { defaultValue: { summary: 'lg' } },
  },
  rel: {
    description: 'Optionally specify a `rel` when using an `<a>` element.',
    control: 'text',
    type: { name: 'string' },
  },
  tooltipAlignment: {
    options: alignmentOptions,
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
    // TODO: tooltip text does not work when we pass href need to investigate
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
  iconSlot: {
    control: { type: 'select' },
    options: ['Add', 'Notification', 'None'],
    type: { name: 'HTMLElement' },
    table: { category: 'Slot' },
    description: 'Places the slotted icon inside the Button.',
    mapping: {
      Add: (props) => iconLoader(Add16, props),
      Notification: (props) => iconLoader(Notification16, props),
      None: undefined,
    },
  },
};

// Note: defining attributes with `.` would not render them in storybook code tab. we switch to ifDefined for such cases.
const baseButtonTemplate = (args) => html`
  <cds-button
    @click=${args.onClick}
    button-class-name=${ifDefined(args.buttonClassName)}
    danger-description=${ifDefined(args.dangerDescription)}
    ?disabled="${args.disabled}"
    href=${ifDefined(args.href)}
    ?isExpressive="${args.isExpressive}"
    kind=${ifDefined(args.kind)}
    rel=${ifDefined(args.rel)}
    link-role=${ifDefined(args.linkRole)}
    target=${ifDefined(args.target)}
    tabindex=${ifDefined(args.tabindex)}
    size=${ifDefined(args.size)}
    ?autofocus=${args.autofocus}
    type=${ifDefined(args.type)}>
    Button ${args.iconSlot?.({ slot: 'icon' })}
  </cds-button>
`;
const iconButtonTemplate = (args) => html`
  <cds-button
    @click=${args.onClick}
    button-class-name=${ifDefined(args.buttonClassName)}
    danger-description=${ifDefined(args.dangerDescription)}
    ?disabled="${args.disabled}"
    href=${ifDefined(args.href)}
    ?isExpressive="${args.isExpressive}"
    ?isSelected="${args.isSelected}"
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
    ${args.iconSlot?.({ slot: 'icon' })}
    ${args.count === undefined
      ? null
      : args.count > 0
        ? html`<cds-badge-indicator count=${args.count}> </cds-badge-indicator>`
        : html`<cds-badge-indicator></cds-badge-indicator>`}
  </cds-button>
`;

export const Default = {
  argTypes: sharedArgTypes,
  render: baseButtonTemplate,
};

Default.parameters = {
  controls: {
    include: textButtonControls,
  },
};

export const Secondary = {
  argTypes: sharedArgTypes,
  args: {
    kind: BUTTON_KIND.SECONDARY,
  },
  render: baseButtonTemplate,
};

Secondary.parameters = {
  controls: {
    include: textButtonControls,
  },
};

export const Tertiary = {
  argTypes: sharedArgTypes,
  args: {
    kind: BUTTON_KIND.TERTIARY,
  },
  render: baseButtonTemplate,
};

Tertiary.parameters = {
  controls: {
    include: textButtonControls,
  },
};

export const Ghost = {
  argTypes: sharedArgTypes,
  args: {
    kind: BUTTON_KIND.GHOST,
  },
  render: baseButtonTemplate,
};

Ghost.parameters = {
  controls: {
    include: textButtonControls,
  },
};

export const Danger = {
  argTypes: sharedArgTypes,
  args: {
    kind: BUTTON_KIND.DANGER,
  },
  render: baseButtonTemplate,
};

Danger.parameters = {
  controls: {
    include: textButtonControls,
  },
};

export const DangerTertiary = {
  argTypes: sharedArgTypes,
  args: {
    kind: BUTTON_KIND.DANGER_TERTIARY,
  },
  render: baseButtonTemplate,
};

DangerTertiary.parameters = {
  controls: {
    include: textButtonControls,
  },
};

export const DangerGhost = {
  argTypes: sharedArgTypes,
  args: {
    kind: BUTTON_KIND.DANGER_GHOST,
  },
  render: baseButtonTemplate,
};

DangerGhost.parameters = {
  controls: {
    include: textButtonControls,
  },
};

export const IconButton = {
  argTypes: {
    ...sharedArgTypes,
    count: {
      table: { readonly: true },
    },
  },
  args: {
    kind: BUTTON_KIND.PRIMARY,
    iconSlot: (props) => iconLoader(Add16, props), // TODO: check this again so that its set in controls as default
    tooltipText: 'Icon Description',
  },
  render: iconButtonTemplate,
};

IconButton.parameters = {
  controls: {
    include: iconButtonControls,
  },
};

export const IconButtonWithBadge = {
  argTypes: {
    ...sharedArgTypes,
    kind: {
      table: { readonly: true },
    },
    size: {
      table: { readonly: true },
    },
  },
  args: {
    count: 4,
    ...IconButton.args,
    kind: BUTTON_KIND.GHOST,
    size: BUTTON_SIZE.LARGE,
  },
  render: iconButtonTemplate,
};

IconButtonWithBadge.parameters = {
  controls: {
    include: iconButtonControls,
  },
};

// TODO: complete SetOfButtons story
export const SetOfButtons = {
  render: () => html`
    <cds-button-set>
      <cds-button kind="secondary"> Secondary button </cds-button>
      <cds-button kind="primary"> Primary button</cds-button>
    </cds-button-set>
  `,
};

// TODO: supported props on skeleton:
// autofocus,
// disabled,
// download,
// href,
// hreflang,
// ping,
// rel,
// size,
// target,
// type,
export const Skeleton = {
  argTypes: {
    size: {
      options: sizes,
      description:
        'Specify the size of the button skeleton, from the following list of sizes: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`',
      type: { name: 'enum' },
      control: { type: 'select' },
      table: { defaultValue: { summary: 'lg' } },
    },
    href: {
      description:
        'Optionally specify an href for your Button Skeleton to become an `<a>` element',
      control: 'text',
      type: { name: 'string' },
    },
  },
  render: (args) =>
    html`<cds-button-skeleton
      size="${args.size}"
      href="${args.href}"></cds-button-skeleton>`,
};

Skeleton.parameters = {
  controls: { include: [...textButtonControls, ...iconButtonControls] },
};

const meta = {
  title: 'Components/Button',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

export default meta;
