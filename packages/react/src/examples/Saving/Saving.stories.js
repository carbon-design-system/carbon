/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import './_story-styles.scss';
import DocsPage from './Saving.mdx';
import { AutoSaving } from './example/preview-components/AutoSaving';
import { ManualSaving } from './example/preview-components/ManualSaving';

export default {
  title: 'Examples/Saving',
  component: () => {},
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: DocsPage,
    },
  },
};

const AutoSavingPattern = (args) => {
  return <AutoSaving {...args} />;
};

export const autoSaving = AutoSavingPattern.bind({});
autoSaving.storyName = 'Auto';
autoSaving.args = {};

const ManualSavingPattern = (args) => {
  return <ManualSaving {...args} />;
};

export const manualSaving = ManualSavingPattern.bind({});
manualSaving.storyName = 'Manual';
manualSaving.args = {};
