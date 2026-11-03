/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './story.scss';

import React from 'react';
import { UserAvatar } from './UserAvatar';
import { Theme, useTheme } from '../Theme';
import mdx from './UserAvatar.mdx';
import { Add, Group, User } from '@carbon/icons-react';
import headshot from './_story-assets/headshot.jpg';

const ThemeText = () => {
  const { theme, isDark } = useTheme();
  return (
    <p className="theme-text">
      {`useTheme reveals theme: '${theme}', isDark: '${isDark}'`}
    </p>
  );
};

export default {
  title: 'Components/UserAvatar',
  component: UserAvatar,
  tags: ['autodocs', 'ibm-products-migrated'],
  argTypes: {
    backgroundColor: {
      control: {
        type: 'select',
      },
      options: [
        'order-1-cyan',
        'order-2-gray',
        'order-3-green',
        'order-4-magenta',
        'order-5-purple',
        'order-6-teal',
        'order-7-cyan',
        'order-8-gray',
        'order-9-green',
        'order-10-magenta',
        'order-11-purple',
        'order-12-teal',
      ],
    },
    className: { table: { disable: true } },
    renderIcon: {
      control: {
        type: 'select',
      },
      options: ['No icon', 'User', 'Group', 'Add'],
      mapping: { 'No icon': undefined, User: User, Group: Group, Add: Add },
    },
    size: {
      control: {
        type: 'radio',
      },
      options: ['xl', 'lg', 'md', 'sm'],
    },
    tooltipAlignment: {
      control: {
        type: 'select',
      },
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'right',
      ],
    },
  },
  args: {
    size: 'md',
    tooltipAlignment: 'right',
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const ThemeTemplate = (args) => (
  <main>
    <Theme theme="white">
      <section className="theme-section">
        <ThemeText />
        <UserAvatar {...args} />
      </section>
    </Theme>
    <Theme theme="g10">
      <section className="theme-section">
        <ThemeText />
        <UserAvatar {...args} />
      </section>
    </Theme>
    <Theme theme="g90">
      <section className="theme-section">
        <ThemeText />
        <UserAvatar {...args} />
      </section>
    </Theme>
    <Theme theme="g100">
      <section className="theme-section">
        <ThemeText />
        <UserAvatar {...args} />
      </section>
    </Theme>
  </main>
);

export const Default = ThemeTemplate.bind({});
Default.storyName = 'Default';
Default.args = {
  name: 'thomas j. watson',
  tooltipText: 'TW, Thomas J. Watson user profile',
};

export const WithImage = (args) => (
  <main>
    <UserAvatar {...args} />
  </main>
);
WithImage.storyName = 'WithImage';
WithImage.args = {
  image: headshot,
  tooltipText: 'TW, Thomas J. Watson user profile',
  imageDescription: 'Avatar of Thomas J. Watson',
};
