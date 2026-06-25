/**
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { Monster } from '@carbon/react/icons';

import { TooltipTrigger } from '.';
// import { pkg } from '../../settings';
// import DocsPage from './TooltipTrigger.docs-page';

import styles from './_storybook-styles.scss?inline';

export default {
  title: 'Internal/TooltipTrigger',
  component: TooltipTrigger,
  parameters: {
    styles,
  },
  tags: ['autodocs'],
};

const Template = (args) => {
  return <TooltipTrigger {...args} />;
};

export const Icon = Template.bind({});
Icon.args = {
  children: <Monster size={16} />,
};

export const Text = Template.bind({});
Text.args = {
  children: 'Text',
};
