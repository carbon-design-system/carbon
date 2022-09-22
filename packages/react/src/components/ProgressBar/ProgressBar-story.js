/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect } from 'react';

import {
  withKnobs,
  text,
  boolean,
  number,
  select,
} from '@storybook/addon-knobs';
import ProgressBar from '../ProgressBar';

const sizes = {
  'Small  (small)': 'small',
  'Big (big) - default': 'big',
};

const types = {
  'Default  (default)': 'default',
  'Inline (inline)': 'inline',
  'indented (indented)': 'indented',
};

const props = () => ({
  helperText: text('Helper text (helperText)', 'Optional helper text'),
  hideLabel: boolean('Hide the label (hideLabel)', false),
  label: text('Label text (label)', 'Progress bar label'),
  max: number('Maximum value (max)', 100),
  size: select('Size (size)', sizes, 'big'),
  type: select('Type (type)', types, 'default'),
  value: number('Current value (value)', 75),
});

export default {
  title: 'Experimental/unstable_ProgressBar',
  component: ProgressBar,
  decorators: [withKnobs],
};

export const Default = () => (
  <ProgressBar
    label="Progress bar label"
    helperText="Optional helper text"
    value={75}
  />
);

export const Indeterminate = () => (
  <ProgressBar label="Progress bar label" helperText="Optional helper text" />
);

export const Example = () => {
  const size = 728;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      const interval = setInterval(() => {
        setProgress((currentProgress) => {
          const advancement = Math.random() * 8;
          if (currentProgress + advancement < size) {
            return currentProgress + advancement;
          } else {
            clearInterval(interval);
            return size;
          }
        });
      }, 50);
    }, 3000);
  }, []);

  const running = progress > 0;

  let helperText = running
    ? `${progress.toFixed(1)}MB of ${size}MB`
    : 'Fetching assets...';
  if (progress >= size) {
    helperText = 'Done';
  }

  return (
    <ProgressBar
      value={running ? progress : null}
      max={size}
      label="Export data"
      helperText={helperText}
    />
  );
};

export const Playground = () => <ProgressBar {...props()} />;
