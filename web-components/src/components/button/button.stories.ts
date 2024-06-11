/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import Add16 from '@carbon/web-components/es/icons/add/16';
import {
  BUTTON_KIND,
  BUTTON_TYPE,
  BUTTON_SIZE,
  BUTTON_TOOLTIP_ALIGNMENT,
  BUTTON_TOOLTIP_POSITION,
} from './button';
import './index';

const kind = {
  [`Primary button (${BUTTON_KIND.PRIMARY})`]: BUTTON_KIND.PRIMARY,
  [`Secondary button (${BUTTON_KIND.SECONDARY})`]: BUTTON_KIND.SECONDARY,
  [`Tertiary button (${BUTTON_KIND.TERTIARY})`]: BUTTON_KIND.TERTIARY,
  [`Danger button (${BUTTON_KIND.DANGER})`]: BUTTON_KIND.DANGER,
  [`Danger tertiary button (${BUTTON_KIND.DANGER_TERTIARY})`]:
    BUTTON_KIND.DANGER_TERTIARY,
  [`Danger ghost button (${BUTTON_KIND.DANGER_GHOST})`]:
    BUTTON_KIND.DANGER_GHOST,
  [`Ghost button (${BUTTON_KIND.GHOST})`]: BUTTON_KIND.GHOST,
};

const types = {
  [`Button`]: BUTTON_TYPE.BUTTON,
  [`Reset`]: BUTTON_TYPE.RESET,
  [`Submit`]: BUTTON_TYPE.SUBMIT,
};

const alignmentOptions = {
  ['Start']: BUTTON_TOOLTIP_ALIGNMENT.START,
  ['Center']: BUTTON_TOOLTIP_ALIGNMENT.CENTER,
  ['End']: BUTTON_TOOLTIP_ALIGNMENT.END,
};

const positionOptions = {
  ['Top']: BUTTON_TOOLTIP_POSITION.TOP,
  ['Right']: BUTTON_TOOLTIP_POSITION.RIGHT,
  ['Bottom']: BUTTON_TOOLTIP_POSITION.BOTTOM,
  ['Left']: BUTTON_TOOLTIP_POSITION.LEFT,
};

const sizes = {
  [`Small size (${BUTTON_SIZE.SMALL})`]: BUTTON_SIZE.SMALL,
  [`Medium size (${BUTTON_SIZE.MEDIUM})`]: BUTTON_SIZE.MEDIUM,
  [`Large size (${BUTTON_SIZE.LARGE})`]: BUTTON_SIZE.LARGE,
  [`XL size (${BUTTON_SIZE.EXTRA_LARGE})`]: BUTTON_SIZE.EXTRA_LARGE,
  [`2XL size (${BUTTON_SIZE.EXTRA_EXTRA_LARGE})`]:
    BUTTON_SIZE.EXTRA_EXTRA_LARGE,
};

const defaultArgs = {
  kind: BUTTON_KIND.PRIMARY,
  tooltipAlignment: BUTTON_TOOLTIP_ALIGNMENT.CENTER,
  tooltipPosition: BUTTON_TOOLTIP_POSITION.TOP,
};

const controls = {
  buttonClassName: {
    control: 'text',
    description: 'Specify an optional className to be added to your Button',
  },
  dangerDescription: {
    control: 'text',
    description:
      'Specify the message read by screen readers for the danger button variant',
  },
  disabled: {
    control: 'boolean',
    description: 'Specify whether the Button should be disabled, or not',
  },
  href: {
    control: 'string',
    description:
      'Optionally specify an href for your Button to become an <code><a></code> element',
  },
  isExpressive: {
    control: 'boolean',
    description: 'Specify whether the Button is expressive, or not',
  },
  isSelected: {
    control: 'boolean',
    description:
      'Specify whether the Button is currently selected. Only applies to the Ghost variant.',
  },
  kind: {
    control: 'select',
    description: 'Specifiy the kind of Button you want to create',
    options: kind,
  },
  linkRole: {
    control: 'text',
    description: 'Optional prop to specify the role of the Button',
  },
  size: {
    control: 'select',
    description:
      'Specify the size of the button, from the following list of sizes:',
    options: sizes,
  },
  tooltipAlignment: {
    control: 'radio',
    description:
      'Specify the alignment of the tooltip to the icon-only button. Can be one of: start, center, or end.',
    options: alignmentOptions,
  },
  tooltipPosition: {
    control: 'radio',
    description:
      'Specify the direction of the tooltip for icon-only buttons. Can be either top, right, bottom, or left.',
    options: positionOptions,
  },
  type: {
    control: 'radio',
    description: 'Optional prop to specify the type of the Button',
    options: types,
  },
  onClick: {
    table: {
      disable: true,
    },
  },
};

export const Default = {
  argTypes: controls,
  args: defaultArgs,
  render: ({
    buttonClassName,
    dangerDescription,
    disabled,
    href,
    isExpressive,
    isSelected,
    kind,
    linkRole,
    size,
    tooltipAlignment,
    tooltipPosition,
    type,
  }) => html` <cds-button
    button-class-name="${buttonClassName}"
    danger-description="${dangerDescription}"
    ?disabled="${disabled}"
    href="${href}"
    ?isExpressive="${isExpressive}"
    ?isSelected="${isSelected}"
    kind="${kind}"
    link-role="${linkRole}"
    size="${size}"
    tooltip-alignment="${tooltipAlignment}"
    tooltip-position="${tooltipPosition}"
    type="${type}">
    Button
  </cds-button>`,
};

export const Danger = {
  argTypes: controls,
  args: defaultArgs,
  render: ({
    buttonClassName,
    dangerDescription,
    disabled,
    href,
    isExpressive,
    isSelected,
    linkRole,
    size,
    tooltipAlignment,
    tooltipPosition,
    type,
  }) => html` <cds-button
      button-class-name="${buttonClassName}"
      danger-description="${dangerDescription}"
      ?disabled="${disabled}"
      href="${href}"
      ?isExpressive="${isExpressive}"
      ?isSelected="${isSelected}"
      kind="danger"
      link-role="${linkRole}"
      size="${size}"
      tooltip-alignment="${tooltipAlignment}"
      tooltip-position="${tooltipPosition}"
      type="${type}">
      Button
    </cds-button>
    <cds-button
      button-class-name="${buttonClassName}"
      danger-description="${dangerDescription}"
      ?disabled="${disabled}"
      href="${href}"
      ?isExpressive="${isExpressive}"
      ?isSelected="${isSelected}"
      kind="danger--tertiary"
      link-role="${linkRole}"
      size="${size}"
      tooltip-alignment="${tooltipAlignment}"
      tooltip-position="${tooltipPosition}"
      type="${type}">
      Tertiary Danger Button
    </cds-button>
    <cds-button
      button-class-name="${buttonClassName}"
      danger-description="${dangerDescription}"
      ?disabled="${disabled}"
      href="${href}"
      ?isExpressive="${isExpressive}"
      ?isSelected="${isSelected}"
      kind="danger--ghost"
      link-role="${linkRole}"
      size="${size}"
      tooltip-alignment="${tooltipAlignment}"
      tooltip-position="${tooltipPosition}"
      type="${type}">
      Ghost Danger Button
    </cds-button>`,
};

export const Ghost = {
  argTypes: controls,
  args: defaultArgs,
  render: ({
    buttonClassName,
    dangerDescription,
    disabled,
    href,
    isExpressive,
    isSelected,
    linkRole,
    size,
    tooltipAlignment,
    tooltipPosition,
    type,
  }) => html` <cds-button
    button-class-name="${buttonClassName}"
    danger-description="${dangerDescription}"
    ?disabled="${disabled}"
    href="${href}"
    ?isExpressive="${isExpressive}"
    ?isSelected="${isSelected}"
    kind="ghost"
    link-role="${linkRole}"
    size="${size}"
    tooltip-alignment="${tooltipAlignment}"
    tooltip-position="${tooltipPosition}"
    type="${type}">
    Button
  </cds-button>`,
};

export const IconButton = {
  argTypes: controls,
  args: defaultArgs,
  render: ({
    buttonClassName,
    dangerDescription,
    disabled,
    href,
    isExpressive,
    isSelected,
    kind,
    linkRole,
    size,
    tooltipAlignment,
    tooltipPosition,
    type,
    onClick,
  }) => html` <cds-button
    button-class-name="${buttonClassName}"
    danger-description="${dangerDescription}"
    ?disabled="${disabled}"
    href="${href}"
    ?isExpressive="${isExpressive}"
    ?isSelected="${isSelected}"
    kind="${kind}"
    link-role="${linkRole}"
    size="${size}"
    tooltip-alignment="${tooltipAlignment}"
    tooltip-position="${tooltipPosition}"
    tooltip-text="Icon Description"
    type="${type}"
    @click="${onClick}">
    ${Add16({ slot: 'icon' })}
  </cds-button>`,
};

export const Secondary = {
  argTypes: controls,
  args: defaultArgs,
  render: ({
    buttonClassName,
    dangerDescription,
    disabled,
    href,
    isExpressive,
    isSelected,
    linkRole,
    size,
    tooltipAlignment,
    tooltipPosition,
    type,
  }) => html` <cds-button
    button-class-name="${buttonClassName}"
    danger-description="${dangerDescription}"
    ?disabled="${disabled}"
    href="${href}"
    ?isExpressive="${isExpressive}"
    ?isSelected="${isSelected}"
    kind="secondary"
    link-role="${linkRole}"
    size="${size}"
    tooltip-alignment="${tooltipAlignment}"
    tooltip-position="${tooltipPosition}"
    type="${type}">
    Button
  </cds-button>`,
};

export const SetOfButtons = {
  argTypes: controls,
  args: defaultArgs,
  render: ({
    buttonClassName,
    dangerDescription,
    disabled,
    href,
    isExpressive,
    isSelected,
    linkRole,
    size,
    tooltipAlignment,
    tooltipPosition,
    type,
  }) => html` <cds-button-set>
    <cds-button
      button-class-name="${buttonClassName}"
      danger-description="${dangerDescription}"
      ?disabled="${disabled}"
      href="${href}"
      ?isExpressive="${isExpressive}"
      ?isSelected="${isSelected}"
      kind="secondary"
      link-role="${linkRole}"
      size="${size}"
      tooltip-alignment="${tooltipAlignment}"
      tooltip-position="${tooltipPosition}"
      type="${type}">
      Secondary button
    </cds-button>
    <cds-button
      button-class-name="${buttonClassName}"
      danger-description="${dangerDescription}"
      ?disabled="${disabled}"
      href="${href}"
      ?isExpressive="${isExpressive}"
      ?isSelected="${isSelected}"
      kind="primary"
      link-role="${linkRole}"
      size="${size}"
      tooltip-alignment="${tooltipAlignment}"
      tooltip-position="${tooltipPosition}"
      type="${type}">
      Primary button </cds-button
    ><cds-button-set></cds-button-set
  ></cds-button-set>`,
};

export const Skeleton = {
  render: () => html` <cds-button-skeleton> </cds-button-skeleton>
    <cds-button-skeleton> </cds-button-skeleton>`,
};

export const Tertiary = {
  argTypes: controls,
  args: defaultArgs,
  render: ({
    buttonClassName,
    dangerDescription,
    disabled,
    href,
    isExpressive,
    isSelected,
    linkRole,
    size,
    tooltipAlignment,
    tooltipPosition,
    type,
  }) => html` <cds-button
    button-class-name="${buttonClassName}"
    danger-description="${dangerDescription}"
    ?disabled="${disabled}"
    href="${href}"
    ?isExpressive="${isExpressive}"
    ?isSelected="${isSelected}"
    kind="tertiary"
    link-role="${linkRole}"
    size="${size}"
    tooltip-alignment="${tooltipAlignment}"
    tooltip-position="${tooltipPosition}"
    type="${type}">
    Button
  </cds-button>`,
};

const meta = {
  title: 'Components/Button',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

export default meta;
