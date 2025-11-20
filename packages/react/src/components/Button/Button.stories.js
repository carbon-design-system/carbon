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

export default {
  title: 'Components/Button',
  component: Button,
  subcomponents: {
    ButtonSkeleton,
  },
  argTypes: {
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
    },
    size: {
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      control: { type: 'select' },
    },
    children: {
      control: false,
    },
    renderIcon: {
      control: false,
    },
    as: {
      control: false,
    },
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = (args) => {
  return (
    <Stack gap={7}>
      <Button {...args}>Button</Button>
      <Button renderIcon={Add} {...args}>
        Button
      </Button>
    </Stack>
  );
};

export const Secondary = (args) => {
  return (
    <Stack gap={7}>
      <Button kind="secondary" {...args}>
        Button
      </Button>
      <Button kind="secondary" renderIcon={Add} {...args}>
        Button
      </Button>
    </Stack>
  );
};

export const Tertiary = (args) => {
  return (
    <Stack gap={7}>
      <Button kind="tertiary" {...args}>
        Button
      </Button>
      <Button kind="tertiary" renderIcon={Add} {...args}>
        Button
      </Button>
    </Stack>
  );
};

export const Danger = (args) => {
  return (
    <>
      <Button kind="danger" {...args}>
        Button
      </Button>
      &nbsp;
      <Button kind="danger--tertiary" {...args}>
        Danger tertiary button
      </Button>
      &nbsp;
      <Button kind="danger--ghost" {...args}>
        Danger ghost button
      </Button>
    </>
  );
};

export const Ghost = (args) => {
  return (
    <Stack gap={7}>
      <Button kind="ghost" {...args}>
        Button
      </Button>
      <Button kind="ghost" renderIcon={Add} {...args}>
        Button
      </Button>
    </Stack>
  );
};

export const IconButton = (args) => (
  <Button
    renderIcon={Add}
    iconDescription="Icon Description"
    hasIconOnly
    onClick={action('onClick')}
    {...args}
  />
);

export const IconButtonWithBadge = (args) => {
  const { badgeCount } = args;

  return (
    <Button
      kind="ghost"
      size="lg"
      badgeCount={badgeCount}
      hasIconOnly
      renderIcon={Notification}
      iconDescription="Notification"
      onClick={action('onClick')}
      autoAlign
      {...args}
    />
  );
};

IconButtonWithBadge.args = {
  badgeCount: 4,
};

export const Skeleton = () => {
  return (
    <div>
      <ButtonSkeleton />
      &nbsp;
      <ButtonSkeleton size="sm" />
    </div>
  );
};
