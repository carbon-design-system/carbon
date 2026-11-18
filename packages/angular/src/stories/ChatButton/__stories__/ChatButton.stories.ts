/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  moduleMetadata,
  type Meta,
  type StoryObj,
  type ArgTypes,
} from '@storybook/angular';
import {
  ChatButtonComponent,
  ChatButtonSkeletonComponent,
} from '@carbon/angular/chat-button';
import Add16 from '@carbon/icons/es/add/16.js';
import { iconToSvg } from '../../../../.storybook/helpers/icon-to-svg';

// ─── WC-parity stories (one-for-one with @carbon/web-components ChatButton) ──

const sizes = ['sm', 'md', 'lg'];

const sizeArgType: ArgTypes[string] = {
  options: sizes,
  control: { type: 'select' },
};

// `isQuickAction` sets `kind="ghost"` and `size="sm"`
const hideWhenQuickAction: ArgTypes[string] = {
  if: { arg: 'isQuickAction', truthy: false },
};

const chatButtonArgTypes: ArgTypes = {
  children: {
    control: { type: 'text' },
    table: { category: 'Slot' },
  },
  disabled: {
    control: { type: 'boolean' },
  },
  icon: {
    options: ['Add', 'None'],
    control: { type: 'select' },
    table: { category: 'Slot' },
  },
  isQuickAction: {
    control: { type: 'boolean' },
  },
  isSelected: {
    control: { type: 'boolean' },
  },
  kind: {
    options: ['primary', 'secondary', 'tertiary', 'ghost', 'danger'],
    control: { type: 'select' },
    ...hideWhenQuickAction,
  },
  // `cds-ng-chat-button` has no custom click event, so the story binds the
  // native `(click)` to this action arg.
  onClick: {
    action: 'onClick',
  },
  size: { ...sizeArgType, ...hideWhenQuickAction },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<any> = {
  title: 'Preview/Chat button',
  decorators: [
    moduleMetadata({
      imports: [ChatButtonComponent, ChatButtonSkeletonComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

// WC: Default
export const Default: Story = {
  args: {
    children: 'Ask AI',
    disabled: false,
    icon: 'Add',
    isQuickAction: false,
    isSelected: false,
    kind: 'primary',
    size: 'lg',
  },
  argTypes: chatButtonArgTypes,
  parameters: {
    controls: {
      include: Object.keys(chatButtonArgTypes),
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-chat-button
        [disabled]="disabled"
        [isQuickAction]="isQuickAction"
        [isSelected]="isSelected"
        [kind]="kind"
        [size]="size"
        (click)="onClick($event)">
        {{ children }}
        ${args['icon'] === 'Add' ? iconToSvg(Add16, { slot: 'icon' }) : ''}
      </cds-ng-chat-button>
    `,
  }),
};

// WC: Skeleton
export const Skeleton: Story = {
  args: {
    size: 'lg',
  },
  argTypes: {
    size: sizeArgType,
  },
  parameters: {
    controls: {
      include: ['size'],
    },
  },
  render: (args) => ({
    props: args,
    template: `<cds-ng-chat-button-skeleton [size]="size"></cds-ng-chat-button-skeleton>`,
  }),
};
