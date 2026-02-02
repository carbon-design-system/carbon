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
    // TODO: not present in WC. awaiting implementation?
    table: { defaultValue: { summary: false } },
  },
  tooltipHighContrast: {
    // TODO: not present in WC. awaiting implementation?
    table: { defaultValue: { summary: true } },
  },
  tooltipPosition: {
    table: { defaultValue: { summary: 'top' } },
  },
  isExpressive: {
    // TODO: doesn't work on icon buttons, but works for web-components icon buttons, need to investigate
    table: { defaultValue: { summary: false } },
  },
  isSelected: {
    table: { defaultValue: { summary: false } },
  },
  iconDescription: {
    control: 'text',
  },
  badgeCount: {
    description:
      'Optional badge count shown on icon-only buttons. This prop is supported only when `hasIconOnly=true`, `kind="ghost"`, and `size="lg"`.',
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

const textButtonControls = [
  'dangerDescription',
  'disabled',
  'href',
  'iconDescription',
  'isExpressive',
  'kind',
  'rel',
  'renderIcon',
  'role',
  'size',
  'tabIndex',
  'target',
  'type',
];

const skeletonControls = ['href', 'size'];

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

// Default.storyName = 'Primary (default)';

Default.parameters = {
  controls: { include: textButtonControls },
};

export const Secondary = (args) => (
  <Button {...args} onClick={action('onClick')}>
    Button
  </Button>
);

Secondary.args = {
  kind: 'secondary',
};

Secondary.parameters = {
  controls: {
    include: textButtonControls,
  },
};

export const Tertiary = (args) => (
  <Button {...args} onClick={action('onClick')}>
    Button
  </Button>
);

Tertiary.args = {
  kind: 'tertiary',
};

Tertiary.parameters = {
  controls: {
    include: textButtonControls,
  },
};

export const Ghost = (args) => (
  <Button {...args} onClick={action('onClick')}>
    Button
  </Button>
);

Ghost.args = {
  kind: 'ghost',
};

Ghost.parameters = {
  controls: {
    include: textButtonControls,
  },
};

export const Danger = (args) => (
  <Button {...args} onClick={action('onClick')}>
    Button
  </Button>
);

Danger.args = {
  kind: 'danger',
};

Danger.parameters = {
  controls: {
    include: textButtonControls,
  },
};

export const DangerTertiary = (args) => (
  <Button {...args} onClick={action('onClick')}>
    Button
  </Button>
);

DangerTertiary.args = {
  kind: 'danger--tertiary',
};

DangerTertiary.parameters = {
  controls: {
    include: textButtonControls,
  },
};

export const DangerGhost = (args) => (
  <Button {...args} onClick={action('onClick')}>
    Button
  </Button>
);

DangerGhost.args = {
  kind: 'danger--ghost',
};

DangerGhost.parameters = {
  controls: {
    include: textButtonControls,
  },
};

export const IconButton = (args) => (
  <Button {...args} onClick={action('onClick')} />
);

IconButton.argTypes = {
  ...sharedArgTypes,
  hasIconOnly: {
    table: { readonly: true },
  },
  badgeCount: {
    table: { readonly: true },
  },
};

IconButton.args = {
  hasIconOnly: true,
  renderIcon: 'Add',
  iconDescription: 'Icon Description',
};

export const IconButtonWithBadge = (args) => {
  return (
    <Button {...args} onClick={action('onClick')}>
      Button
    </Button>
  );
};

IconButtonWithBadge.argTypes = {
  ...sharedArgTypes,
  hasIconOnly: {
    table: { readonly: true },
  },
  kind: {
    table: { readonly: true },
  },
  size: {
    table: { readonly: true },
  },
};

IconButtonWithBadge.args = {
  hasIconOnly: true,
  renderIcon: 'Notification',
  iconDescription: 'Notifications',
  badgeCount: 8,
  kind: 'ghost',
  size: 'lg',
};

export const Skeleton = (args) => <ButtonSkeleton {...args} />;

Skeleton.parameters = {
  controls: {
    include: skeletonControls,
  },
};
