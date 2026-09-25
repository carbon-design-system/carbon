/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from 'storybook/actions';
import { ErrorBoundary, ErrorBoundaryContext } from './';
import DemoComponent from './stories/demo';
import mdx from './ErrorBoundary.mdx';

const defaultArgs = {
  buttonLabel: 'Toggle throwing error',
  children: 'Successfully rendered',
  errorMessage: 'Component threw error',
  fallback: 'Whoops',
  shouldThrowError: false,
};

const argTypes = {
  buttonLabel: { control: 'text' },
  children: { control: 'text' },
  errorMessage: { control: 'text' },
  fallback: { control: 'text' },
  onLog: { action: 'log' },
  shouldThrowError: { control: 'boolean' },
};

export default {
  title: 'Components/ErrorBoundary',
  component: ErrorBoundary,
  parameters: {
    docs: {
      page: mdx,
    },
    controls: { include: Object.keys(argTypes) },
  },
};

export const Default = (args) => {
  return <DemoComponent {...args} />;
};

Default.args = { ...defaultArgs };
Default.argTypes = { ...argTypes };

export const WithCustomContext = (args) => {
  return (
    <ErrorBoundaryContext.Provider
      value={{ log: (...logArgs) => console.log(...logArgs) }}>
      <DemoComponent {...args} />
    </ErrorBoundaryContext.Provider>
  );
};

WithCustomContext.storyName = 'with custom context';
WithCustomContext.args = { ...defaultArgs };
WithCustomContext.argTypes = { ...argTypes };
