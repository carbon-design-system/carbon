/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import styles from './_story-styles.scss?inline';
import DocsPage from './CoachmarkStacked.mdx';
import { CoachmarkStackedExample } from './example/components/CoachmarkStackedExample';
import { pkg } from '../../settings';

export default {
  title: 'Patterns/Coachmark Stacked',
  component: () => {},
  tags: ['autodocs'],
  parameters: {
    styles,
    docs: {
      page: DocsPage,
    },
  },
};

const CoachmarkStackedPattern = (args) => {
  return <CoachmarkStackedExample {...args} prefix={pkg.prefix} />;
};

export const CoachmarkStack = CoachmarkStackedPattern.bind({});
CoachmarkStack.args = {};
