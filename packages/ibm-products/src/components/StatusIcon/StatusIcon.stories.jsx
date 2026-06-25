//
// Copyright IBM Corp. 2021, 2024
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import React from 'react';

import { StatusIcon } from '.';

// import styles from './_storybook-styles.scss?inline'; // import storybook which includes component and additional storybook styles
import DocsPage from './StatusIcon.docs-page';

export default {
  title: 'Patterns/Prebuilt patterns/StatusIcon',
  component: StatusIcon,
  tags: ['autodocs'],
  argTypes: {
    kind: {
      control: {
        type: 'select',
        labels: [
          'fatal',
          'critical',
          'major-warning',
          'minor-warning',
          'undefined',
          'unknown',
          'normal',
          'info',
          'in-progress',
          'running',
          'pending',
        ],
      },
    },
    size: {
      control: {
        type: 'select',
      },
      labels: ['sm', 'md', 'lg', 'xl'],
    },
    theme: {
      control: {
        type: 'radio',
      },
      labels: ['light', 'dark'],
    },
  },
  parameters: {
    // styles,
    docs: {
      page: DocsPage,
    },
  },
};

const defaultProps = {
  kind: 'fatal',
  size: 'sm',
  theme: 'light',
  iconDescription: 'Fatal',
};

const Template = (args) => {
  return <StatusIcon {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  ...defaultProps,
};
