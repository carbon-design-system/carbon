/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';
import { action } from 'storybook/actions';
import { ErrorBoundary, ErrorBoundaryContext } from './';
import Button from '../Button';
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

function DemoComponent({
  buttonLabel,
  children,
  errorMessage,
  fallback,
  shouldThrowError: shouldThrowErrorArg,
}) {
  const [shouldThrowError, setShouldThrowError] = useState(shouldThrowErrorArg);

  useEffect(() => {
    setShouldThrowError(shouldThrowErrorArg);
  }, [shouldThrowErrorArg]);

  function onClick() {
    setShouldThrowError(!shouldThrowError);
  }

  return (
    <>
      <Button onClick={onClick}>{buttonLabel}</Button>
      <div>
        <ErrorBoundary fallback={fallback}>
          <ThrowError
            shouldThrowError={shouldThrowError}
            errorMessage={errorMessage}>
            {children}
          </ThrowError>
        </ErrorBoundary>
      </div>
    </>
  );
}

function ThrowError({ children, errorMessage, shouldThrowError }) {
  if (shouldThrowError) {
    throw new Error(errorMessage);
  }

  return children;
}

export const Default = (args) => {
  return <DemoComponent {...args} />;
};

Default.args = { ...defaultArgs };
Default.argTypes = { ...argTypes };

export const WithCustomContext = ({ onLog = action('log'), ...args }) => {
  return (
    <ErrorBoundaryContext.Provider value={{ log: onLog }}>
      <DemoComponent {...args} />
    </ErrorBoundaryContext.Provider>
  );
};

WithCustomContext.storyName = 'with custom context';
WithCustomContext.args = { ...defaultArgs };
WithCustomContext.argTypes = { ...argTypes };
