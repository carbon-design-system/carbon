/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import './_story-styles.scss';
import DocsPage from './CoachmarkStacked.mdx';
import { CoachmarkStackedExample } from './example/components/CoachmarkStackedExample';

export default {
  title: 'Examples/Coachmark/Coachmark Stacked',
  component: () => {},
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: DocsPage,
    },
  },
};

const CoachmarkStackedPattern = (args) => {
  return <CoachmarkStackedExample {...args} prefix='c4p' />;
};

export const CoachmarkStack = CoachmarkStackedPattern.bind({});
CoachmarkStack.args = {};
