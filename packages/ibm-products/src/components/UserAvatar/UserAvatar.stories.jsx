//story

/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { UserAvatar } from '.';
import { Theme, useTheme } from '@carbon/react';
import mdx from './UserAvatar.mdx';
import styles from './_storybook-styles.scss?inline';
import { Add, Group, User } from '@carbon/react/icons';
import headshot from './_story-assets/headshot.jpg';

export default {
  title: 'Components/UserAvatar',
  component: UserAvatar,
  tags: ['autodocs'],
  // TODO: Define argTypes for props not represented by standard JS types.
  // argTypes: {
  //   egProp: { control: 'color' },
  // },
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
    renderIcon: {
      control: {
        type: 'select',
      },
      options: ['No icon', 'User', 'Group', 'Add'],
      mapping: { 'No icon': '', User: User, Group: Group, Add: Add },
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
        'top-left',
        'top-right',
        'bottom',
        'bottom-left',
        'bottom-right',
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
    styles,
    docs: {
      page: mdx,
    },
  },
};

const ThemeText = () => {
  const { theme, isDark } = useTheme();

  return (
    <p className="theme-text">
      {`useTheme reveals theme: '${theme}', isDark: '${isDark}'`}
    </p>
  );
};

/**
 * TODO: Declare template(s) for one or more scenarios.
 */
const Template = (args) => {
  return (
    <main>
      <UserAvatar
        // TODO: handle events with action or local handler.
        // onTodo={action('onTodo log action')}
        {...args}
      />
    </main>
  );
};
const ThemeTemplate = (args) => {
  return (
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
};
/**
 * TODO: Declare one or more stories, generally one per design scenario.
 * NB no need for a 'Playground' because all stories have all controls anyway.
 */
export const Default = ThemeTemplate.bind({});
Default.storyName = 'Default';
Default.args = {
  // TODO: Component args - https://storybook.js.org/docs/react/writing-stories/args#UserAvatar-args
  name: 'thomas j. watson',
  tooltipText: 'TW, Thomas J. Watson user profile',
  renderIcon: 'No icon',
};

export const WithImage = Template.bind({});
WithImage.storyName = 'WithImage';
WithImage.args = {
  image: headshot,
  tooltipText: 'TW, Thomas J. Watson user profile',
  imageDescription: 'Avatar of Thomas J. Watson',
};
