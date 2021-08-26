/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import UnstableContentSwitcher from './UnstableContentSwitcher';
import Switch from '../Switch';

export default {
  title: 'Components/UnstableContentSwitcher',
  decorators: [withKnobs],

  parameters: {
    component: UnstableContentSwitcher,

    subcomponents: {
      Switch,
    },
  },
};

export const Unstable_ContentSwitcher = () => (
  <UnstableContentSwitcher onChange={() => {}}>
    <Switch name="one" text="First section" />
    <Switch name="two" text="Second section" />
    <Switch name="three" text="Third section" />
  </UnstableContentSwitcher>
);



