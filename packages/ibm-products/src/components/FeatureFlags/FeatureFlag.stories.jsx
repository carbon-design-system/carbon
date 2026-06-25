/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { FeatureFlags, useFeatureFlag } from '../FeatureFlags';
import mdx from './FeatureFlags.mdx';
import { WithFeatureFlags } from '../../../.storybook/WithFeatureFlags';

export default {
  title: 'Preview/FeatureFlags',
  component: FeatureFlags,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: mdx,
    },
  },
  decorators: [
    (Story) => (
      <WithFeatureFlags
        flags={{
          'enable-test-flag-a': true,
        }}
      >
        <Story />
      </WithFeatureFlags>
    ),
  ],
};

const Template = () => {
  const enableTestFlagA = useFeatureFlag('enable-test-flag-a');
  return (
    enableTestFlagA && (
      <div>I am a feature flagged component that has been enabled.</div>
    )
  );
};

export const exampleFeatureFlag = Template.bind({});
