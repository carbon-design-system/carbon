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
// to the underlying `button` or `a` element, as a result storybook cannot infer the default values from the component.

const sharedArgTypes = {
  disabled: {
    table: { defaultValue: { summary: false } },
  },
  dangerDescription: {
    table: { defaultValue: { summary: 'danger' } },
  },
  autoAlign: {
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
    table: { defaultValue: { summary: 'center' } },
  },
  tooltipDropShadow: {
    table: { defaultValue: { summary: false } },
  },
  tooltipHighContrast: {
    table: { defaultValue: { summary: true } },
  },
  tooltipPosition: {
    table: { defaultValue: { summary: 'top' } },
  },
  isExpressive: {
    table: { defaultValue: { summary: false } },
  },
  isSelected: {
    table: { defaultValue: { summary: false } },
  },
  iconDescription: {
    control: 'text',
  },
  badgeCount: {
    description: 'Optional badge count to display on the icon buttons',
    type: { name: 'number' },
    control: { type: 'number', min: 0 },
  },

  renderIcon: {
    control: { type: 'select' },
    options: ['Add', 'Notification', 'None'],
    mapping: {
      Add: (props) => <Add {...props} />,
      Notification: (props) => <Notification {...props} />,
      None: undefined,
    },
  },
};

export default {
  title: 'Components/Button',
  component: Button,
  subcomponents: { ButtonSkeleton },
  argTypes: sharedArgTypes,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = (args) => (
  <Button {...args} onClick={action('onClick')}>
    Button
  </Button>
);

Default.parameters = {
  controls: {
    exclude: [
      'hasIconOnly',
      'autoAlign',
      'isSelected',
      'badgeCount',
      'tooltipAlignment',
      'tooltipDropShadow',
      'tooltipHighContrast',
      'tooltipPosition',
    ],
  },
};

export const IconButton = (args) => (
  <Button {...args} onClick={action('onClick')} />
);

IconButton.args = {
  hasIconOnly: true,
  renderIcon: 'Add',
  iconDescription: 'Icon Description',
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
