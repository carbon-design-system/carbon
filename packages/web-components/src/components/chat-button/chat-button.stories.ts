/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import Add16 from '@carbon/icons/es/add/16.js';
import { iconLoader } from '../../globals/internal/icon-loader';
import { CHAT_BUTTON_KIND, CHAT_BUTTON_SIZE } from './chat-button';
import './index';

const sizes = [
  CHAT_BUTTON_SIZE.SMALL,
  CHAT_BUTTON_SIZE.MEDIUM,
  CHAT_BUTTON_SIZE.LARGE,
];

const sizeArgType = {
  options: sizes,
  control: { type: 'select' },
};

const chatButtonArgTypes = {
  children: {
    control: { type: 'text' },
  },
  disabled: {
    control: { type: 'boolean' },
  },
  icon: {
    options: ['Add', 'None'],
    control: { type: 'select' },
    mapping: {
      Add: (props) => iconLoader(Add16, props),
      None: undefined,
    },
    table: { category: 'Slot' },
  },
  isQuickAction: {
    control: { type: 'boolean' },
  },
  isSelected: {
    control: { type: 'boolean' },
  },
  kind: {
    options: [
      CHAT_BUTTON_KIND.PRIMARY,
      CHAT_BUTTON_KIND.SECONDARY,
      CHAT_BUTTON_KIND.TERTIARY,
      CHAT_BUTTON_KIND.GHOST,
      CHAT_BUTTON_KIND.DANGER,
    ],
    control: { type: 'select' },
  },
  onClick: {
    action: 'onClick',
  },
  size: sizeArgType,
};

export const Default = {
  args: {
    children: 'Ask AI',
    disabled: false,
    icon: 'Add',
    isQuickAction: false,
    isSelected: false,
    kind: CHAT_BUTTON_KIND.PRIMARY,
    size: CHAT_BUTTON_SIZE.LARGE,
  },
  argTypes: chatButtonArgTypes,
  parameters: {
    controls: {
      include: Object.keys(chatButtonArgTypes),
    },
  },
  render: ({
    children,
    disabled,
    icon,
    isQuickAction,
    isSelected,
    kind,
    onClick,
    size,
  }) => html`
    <cds-chat-button
      ?disabled="${disabled}"
      ?is-quick-action="${isQuickAction}"
      ?is-selected="${isSelected}"
      kind="${ifDefined(kind)}"
      size="${ifDefined(size)}"
      @click="${onClick}">
      ${children} ${icon?.({ slot: 'icon' })}
    </cds-chat-button>
  `,
};

export const Skeleton = {
  args: {
    size: CHAT_BUTTON_SIZE.LARGE,
  },
  argTypes: {
    size: sizeArgType,
  },
  parameters: {
    controls: {
      include: ['size'],
    },
  },
  render: ({ size }) => html`
    <cds-chat-button-skeleton
      size="${ifDefined(size)}"></cds-chat-button-skeleton>
  `,
};

const meta = {
  title: 'Preview/Chat button',
};

export default meta;
