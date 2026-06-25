/**
 * Copyright IBM Corp. 2022, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import styles from './_storybook-styles.scss?inline';

import App from './ComponentPlayground';

export default {
  title: 'Overview/Examples',
  parameters: {
    styles,
    layout: 'fullscreen',
    chromatic: { disableSnapshot: true },
  },
};

export const playground = () => <App />;
playground.storyName = 'Component playground';
