/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import './_story-styles.scss';
import DocsPage from './CoachmarkFixed.mdx';
import { CoachmarkFixedExample } from './example/components/CoachmarkFixedExample';

export default {
  title: 'Examples/Coachmark/Coachmark Fixed',
  component: () => {},
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: DocsPage,
    },
  },
};

const CoachmarkFixedPattern = (args) => {
  return <CoachmarkFixedExample {...args} />;
};

export const CoachmarkFixed = CoachmarkFixedPattern.bind({});
CoachmarkFixed.args = {};
