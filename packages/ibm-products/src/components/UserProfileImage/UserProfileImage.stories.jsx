/**
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { UserProfileImage } from '.';
import image from './headshot.jpg'; // cspell:disable-line
import DocsPage from './UserProfileImage.docs-page';
import { Annotation } from '../../../.storybook/Annotation';
// import styles from './_storybook.scss'; // import storybook which includes component and additional storybook styles

const defaultArgs = {
  backgroundColor: 'light-cyan',
  theme: 'light',
  size: 'xl',
};

export default {
  title: 'Deprecated/UserProfileImage',
  component: UserProfileImage,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: {
        type: 'select',
      },
      options: ['light-cyan', 'dark-cyan'],
    },
    theme: {
      control: {
        type: 'select',
      },
      options: ['light', 'dark'],
    },
    kind: {
      control: {
        type: 'radio',
      },
      options: ['user', 'group'],
    },
    size: {
      control: {
        type: 'radio',
      },
      options: ['xl', 'lg', 'md'],
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
  parameters: {
    // styles,
    chromatic: { disableSnapshot: true },
    docs: {
      page: DocsPage,
    },
  },
  decorators: [
    (story) => (
      <div>
        <Annotation
          type="deprecation-notice"
          text={
            <div>
              This component is deprecated and will be removed in the next major
              version. Please migrate to {/* cspell:disable-next-line */}
              <a href="/?path=/docs/components-useravatar--docs">UserAvatar</a>.
            </div>
          }
        >
          {story()}
        </Annotation>
      </div>
    ),
  ],
};

const Template = (args) => {
  return <UserProfileImage {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
  kind: 'user',
  tooltipText: 'Thomas Watson',
};

export const WithGroupIcon = Template.bind({});
WithGroupIcon.args = {
  ...defaultArgs,
  kind: 'group',
};

export const WithInitials = Template.bind({});
WithInitials.args = {
  ...defaultArgs,
  initials: 'thomas j. watson',
  tooltipText: 'Thomas Watson',
};

export const WithImage = Template.bind({});
WithImage.args = {
  ...defaultArgs,
  image,
  imageDescription: 'image here',
};

export const WithImageAndTooltip = Template.bind({});
WithImageAndTooltip.args = {
  ...defaultArgs,
  image,
  imageDescription: 'image here',
  tooltipText: 'Display Name',
};
