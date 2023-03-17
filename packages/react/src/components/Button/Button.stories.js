/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
// TODO - remove extra icons
import { Add, ArrowRight, Search } from '@carbon/icons-react';
import { default as Button, ButtonSkeleton } from '../Button';
import ButtonSet from '../ButtonSet';
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

export const Default = (args) => {
  // TODO - delete test zone + restore this line
  // return <Button {...args}>Button</Button>;

  // TEST ZONE
  return (
    <>
      {/* SMALL */}
      <Button renderIcon={Search} size="sm" {...args}>
        SMALL with long text that will wrap at
      </Button>
      <div style={{ height: '5px' }}></div>
      <Button renderIcon={Search} size="sm" kind="secondary" {...args}>
        SMALL with long text that will wrap at some point soon
      </Button>

      <div>-</div>
      {/* MEDIUM */}
      <Button renderIcon={Search} size="md" {...args}>
        MEDIUM with long text that will wrap
      </Button>
      <div style={{ height: '5px' }}></div>
      <Button renderIcon={Search} size="md" kind="secondary" {...args}>
        MEDIUM with long text that will wrap at some point soon
      </Button>

      <div>-</div>
      {/* LARGE */}
      <Button renderIcon={Search} size="lg" {...args}>
        LARGE with long text that will wrap
      </Button>
      <div style={{ height: '5px' }}></div>
      <Button renderIcon={Search} size="lg" kind="secondary" {...args}>
        LARGE with long text that will wrap at some point soon
      </Button>

      <div>-</div>
      {/* XL and 2XL */}
      <Button renderIcon={ArrowRight} size="xl" kind="tertiary" {...args}>
        X-LARGE has align-items: baseline, so it wraps nicely
      </Button>
      <div style={{ height: '5px' }}></div>
      <Button renderIcon={ArrowRight} size="2xl" kind="tertiary" {...args}>
        2X-LARGE has align-items: baseline, so it wraps nicely
      </Button>
    </>
  );
  // END TEST ZONE
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
