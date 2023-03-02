/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect } from 'react';

import ProgressBar from './';

export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
};

export const Default = () => (
  <ProgressBar label="Progress bar label" helperText="Optional helper text" />
);
Default.storyName = 'Indeterminate Progress Bar';

export const DeterminateProgressBar = () => (
  <ProgressBar
    label="Progress bar label"
    helperText="Optional helper text"
    value={75}
  />
);
