/**
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import styles from './_storybook-styles.scss?inline';

import Welcome from './Welcome';

export default {
  title: 'Overview/Welcome',
  parameters: {
    styles,
    layout: 'fullscreen',
    options: {
      showPanel: false,
    },
    chromatic: { disableSnapshot: true },
  },
};

export const overview = () => <Welcome />;
overview.storyName = 'Welcome';
