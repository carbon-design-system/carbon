/**
 * Copyright IBM Corp. 2021, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect } from 'react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';
import mdx from './ProgressBar.mdx';

import ProgressBar from './';

export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const sharedArgs = {
  helperText: '75 MB of 100 MB',
  hideLabel: false,
  label: 'Uploading files',
  max: 100,
  size: 'big',
  status: 'active',
  type: 'default',
  value: 75,
};

const sharedArgTypes = {
  helperText: {
    control: { type: 'text' },
  },
  hideLabel: {
    control: { type: 'boolean' },
  },
  label: {
    control: { type: 'text' },
  },
  max: {
    control: { type: 'number' },
  },
  size: {
    options: ['small', 'big'],
    control: { type: 'select' },
  },
  status: {
    options: ['active', 'finished', 'error'],
    control: { type: 'select' },
  },
  type: {
    options: ['default', 'inline', 'indented'],
    control: { type: 'select' },
  },
  value: {
    control: { type: 'number' },
  },
};

export const Default = (args) => <ProgressBar {...args} />;

Default.args = {
  ...sharedArgs,
};

Default.argTypes = {
  ...sharedArgTypes,
};

export const Indeterminate = (args) => <ProgressBar {...args} />;

Indeterminate.args = {
  ...sharedArgs,
  helperText: 'Preparing files...',
  label: 'Preparing upload',
  value: undefined,
};

Indeterminate.argTypes = {
  ...sharedArgTypes,
  status: {
    table: { readonly: true },
  },
  value: {
    control: false,
    table: { readonly: true },
  },
};

Indeterminate.parameters = {
  controls: {
    include: ['helperText', 'hideLabel', 'label', 'size', 'status', 'type'],
  },
};

export const Determinate = ({ hideLabel, label, size: barSize, type }) => {
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
      hideLabel={hideLabel}
      label={label}
      helperText={helperText}
      size={barSize}
      type={type}
    />
  );
};

Determinate.args = {
  ...sharedArgs,
  helperText: 'Fetching assets...',
  label: 'Exporting data',
  max: 728,
  status: 'active',
  value: undefined,
};

Determinate.argTypes = {
  ...sharedArgTypes,
  helperText: {
    control: false,
    table: { readonly: true },
  },
  max: {
    control: false,
    table: { readonly: true },
  },
  status: {
    control: false,
    table: { readonly: true },
  },
  value: {
    control: false,
    table: { readonly: true },
  },
};

Determinate.parameters = {
  controls: {
    include: ['hideLabel', 'label', 'size', 'type'],
  },
};

export const _WithLayer = (args) => (
  <WithLayer>
    <ProgressBar {...args} />
  </WithLayer>
);

_WithLayer.args = {
  ...sharedArgs,
  helperText: '42 MB of 100 MB',
  value: 42,
};

_WithLayer.argTypes = {
  ...sharedArgTypes,
};
