/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from 'storybook/actions';
import { Add, Notification } from '@carbon/icons-react';
import { default as Button, ButtonSkeleton } from '../Button';
import { Stack } from '../Stack';
import mdx from './Button.mdx';
import './button-story.scss';

// Note: we explicitly define the defaultValue here, as the Button component takes `props` and forwards them
// to the underlying `button` or `a` element, so Storybook cannot infer the default values from the component itself

const sharedArgTypes = {
  disabled: {
    table: { defaultValue: { summary: false } },
  },
  dangerDescription: {
    table: { defaultValue: { summary: 'danger' } },
  },
  autoAlign: {
    if: { arg: 'hasIconOnly' },
    table: { defaultValue: { summary: false } },
  },
  hasIconOnly: {
    table: { defaultValue: { summary: false } },
  },
  kind: {
    options: [
      'primary',
      'secondary',
      'tertiary',
      'ghost',
      'danger',
      'danger--tertiary',
      'danger--ghost',
    ],
    control: { type: 'select' },
    table: { defaultValue: { summary: 'primary' } },
  },
  type: {
    table: { defaultValue: { summary: 'button' } },
  },
  size: {
    options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    control: { type: 'select' },
    table: { defaultValue: { summary: 'lg' } },
  },
  tooltipAlignment: {
    if: { arg: 'hasIconOnly' },
    table: { defaultValue: { summary: 'center' } },
  },
  tooltipDropShadow: {
    if: { arg: 'hasIconOnly' },
    table: { defaultValue: { summary: false } },
  },
  tooltipHighContrast: {
    if: { arg: 'hasIconOnly' },
    table: { defaultValue: { summary: true } },
  },
  tooltipPosition: {
    if: { arg: 'hasIconOnly' },
    table: { defaultValue: { summary: 'top' } },
  },
  isExpressive: {
    table: { defaultValue: { summary: false } },
    // if: { arg: 'hasIconOnly', exists: false },
  },
  isSelected: {
    if: { arg: 'hasIconOnly' },
    table: { defaultValue: { summary: false } },
  },
  iconDescription: {
    control: 'text',
    if: { arg: 'hasIconOnly' },
  },
  renderIcon: {
    control: { type: 'select' },
    options: ['Add', 'Notification', undefined],
    mapping: {
      Add: Add,
      Notification: Notification,
      none: undefined,
    },
  },
};

const sharedArgs = {
  onClick: () => action('onClick'),
};

export default {
  title: 'Components/Button',
  component: Button,
  subcomponents: { ButtonSkeleton },
  argTypes: sharedArgTypes,
  args: sharedArgs,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = (args) => <Button {...args}>Button</Button>;

export const Secondary = (args) => <Button {...args}>Button</Button>;

Secondary.args = {
  kind: 'secondary',
};

export const Tertiary = (args) => <Button {...args}>Button</Button>;

Tertiary.args = {
  kind: 'tertiary',
};

export const Danger = (args) => {
  return (
    <>
      <Button {...args} kind="danger">
        Button
      </Button>
      &nbsp;
      <Button {...args} kind="danger--tertiary">
        Danger tertiary button
      </Button>
      &nbsp;
      <Button {...args} kind="danger--ghost">
        Danger ghost button
      </Button>
    </>
  );
};

Danger.argTypes = {
  kind: {
    control: false,
  },
};

export const Ghost = (args) => <Button {...args}>Button</Button>;

Ghost.args = {
  kind: 'ghost',
};

export const IconButton = (args) => <Button {...args} />;

IconButton.args = {
  hasIconOnly: true,
  renderIcon: 'Add',
  iconDescription: 'Icon Description',
};

export const IconButtonWithBadge = (args) => {
  return <Button {...args} />;
};

IconButtonWithBadge.args = {
  kind: 'ghost',
  size: 'lg',
  badgeCount: 4,
  hasIconOnly: true,
  renderIcon: Notification,
  iconDescription: 'Notification',
  autoAlign: true,
};

export const Skeleton = (args) => <ButtonSkeleton {...args} />;

Skeleton.parameters = {
  controls: {
    exclude: [
      'disabled',
      'dangerDescription',
      'autoAlign',
      'hasIconOnly',
      'kind',
      'isSelected',
      'iconDescription',
      'rel',
      'role',
      'tabIndex',
      'target',
      'type',
      'tooltipAlignment',
      'tooltipDropShadow',
      'tooltipHighContrast',
      'tooltipPosition',
      'isExpressive',
      'renderIcon',
    ],
  },
};
