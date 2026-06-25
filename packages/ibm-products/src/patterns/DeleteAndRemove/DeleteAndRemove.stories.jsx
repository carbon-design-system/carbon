/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import styles from './_story-styles.scss?inline';
import DocsPage from './DeleteAndRemove.mdx';
import { HighImpactDeletion } from './example/preview-components/HighImpactDeletion';
import { HighImpactDeletionWithConnectedItems } from './example/preview-components/HighImpactDeletionWithConnectedItems';
import { HighImpactBatchDeletion } from './example/preview-components/HighImpactBatchDeletion';
import { MediumImpactDeletion } from './example/preview-components/MediumImpactDeletion';
import { LowImpactDeletion } from './example/preview-components/LowImpactDeletion';

export default {
  title: 'Patterns/Delete and remove',
  component: () => {},
  tags: ['autodocs'],
  parameters: {
    styles,
    docs: {
      page: DocsPage,
    },
  },
};

const HighImpactDeletionPattern = (args) => {
  return <HighImpactDeletion {...args} />;
};

export const highImpactDeletion = HighImpactDeletionPattern.bind({});
highImpactDeletion.storyName = 'High impact deletion';
highImpactDeletion.args = {};

const HighImpactDeletionWithConnectedItemsPattern = (args) => {
  return <HighImpactDeletionWithConnectedItems {...args} />;
};

export const highImpactDeletionWithConnectedItems =
  HighImpactDeletionWithConnectedItemsPattern.bind({});
highImpactDeletionWithConnectedItems.storyName =
  'Deletion with connected items';
highImpactDeletionWithConnectedItems.args = {};

const HighImpactBatchDeletionPattern = (args) => {
  return <HighImpactBatchDeletion {...args} />;
};

export const highImpactBatchDeletion = HighImpactBatchDeletionPattern.bind({});
highImpactBatchDeletion.storyName = 'Batch deletion';
highImpactBatchDeletion.args = {};

const MediumImpactDeletionPattern = (args) => {
  return <MediumImpactDeletion {...args} />;
};

export const mediumImpactDeletion = MediumImpactDeletionPattern.bind({});
mediumImpactDeletion.storyName = 'Medium impact deletion';
mediumImpactDeletion.args = {};

const LowImpactDeletionPattern = (args) => {
  return <LowImpactDeletion {...args} />;
};

export const lowImpactDeletion = LowImpactDeletionPattern.bind({});
lowImpactDeletion.storyName = 'Low impact deletion';
lowImpactDeletion.args = {};
