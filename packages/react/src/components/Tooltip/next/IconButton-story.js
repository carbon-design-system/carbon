/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Add16 } from '@carbon/icons-react';
import React from 'react';
import { IconButton } from './IconButton';
import { FeatureFlags } from '../../FeatureFlags';

export default {
  title: 'Experimental/unstable_IconButton',
  component: IconButton,
  includeStories: [],
  decorators: [
    (Story) => {
      return (
        <FeatureFlags flags={{ 'enable-v11-release': true }}>
          <Story />
        </FeatureFlags>
      );
    },
  ],
};

export const Default = () => {
  return (
    <IconButton label="Create">
      <Add16 />
    </IconButton>
  );
};
