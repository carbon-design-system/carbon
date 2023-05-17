/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect } from 'react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';

import ProgressBar from './';

export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
};

export const Default = () => (
  <ProgressBar
    label="Progress bar label"
    helperText="Optional helper text"
    value={75}
  />
);

const PlaygroundStory = (args) => (
  <ProgressBar
    label="Progress bar label"
    helperText="Optional helper text"
    {...args}
  />
);

export const Playground = PlaygroundStory.bind({});

Playground.argTypes = {
  className: {
    table: {
      disable: true,
    },
  },
  hideLabel: {
    control: { type: 'boolean' },
  },
  status: {
    options: ['active', 'finished', 'error'],
    control: { type: 'select' },
  },
};

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
      status={progress === size ? 'finished' : 'active'}
      label="Export data"
      helperText={helperText}
    />
  );
};

export const _WithLayer = () => (
  <WithLayer>
    <ProgressBar
      label="Progress bar label"
      helperText="Optional helper text"
      value={42}
    />
  </WithLayer>
);
