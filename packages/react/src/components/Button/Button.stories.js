/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
import { Add } from '@carbon/icons-react';
import { default as Button, ButtonSkeleton } from '../Button';
import ButtonSet from '../ButtonSet';
import { Theme } from '../Theme';
import mdx from './Button.mdx';

export default {
  title: 'Components/Button',
  component: Button,
  subcomponents: {
    ButtonSet,
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
      options: ['sm', 'md', 'lg', 'xl', '2xl'],
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
    small: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const _Default = (args) => {
  return <Button {...args}>Button</Button>;
};

export const Secondary = (args) => {
  return (
    <Button kind="secondary" {...args}>
      Button
    </Button>
  );
};

export const Tertiary = (args) => {
  return (
    <Button kind="tertiary" {...args}>
      Button
    </Button>
  );
};

export const ThemeTest = () => {
  return (
    <Theme theme="g100">
      <Button kind="primary" disabled>
        Hello world
      </Button>
      <Button kind="secondary" disabled>
        Hello world
      </Button>
      <Button kind="tertiary" disabled>
        Hello world
      </Button>
      <Button kind="ghost" disabled>
        Hello world
      </Button>
    </Theme>
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
        Tertiary Danger Button
      </Button>
      &nbsp;
      <Button kind="danger--ghost" {...args}>
        Ghost Danger Button
      </Button>
    </>
  );
};

export const Ghost = (args) => {
  return (
    <Button kind="ghost" {...args}>
      Button
    </Button>
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

export const SetOfButtons = (args) => {
  return (
    <ButtonSet>
      <Button kind="secondary" {...args}>
        Secondary button
      </Button>
      <Button kind="primary" {...args}>
        Primary button
      </Button>
    </ButtonSet>
  );
};

export const Skeleton = () => (
  <div>
    <ButtonSkeleton />
    &nbsp;
    <ButtonSkeleton size="sm" />
  </div>
);
