/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Theme, useTheme } from '../../Theme';
import { screen, render } from '@testing-library/react';
import * as hooks from '../../../internal/useMatchMedia';

describe('Theme', () => {
  it('should render the children passed in as a prop', () => {
    render(
      <Theme>
        <span data-testid="test">test</span>
      </Theme>
    );

    expect(screen.getByTestId('test')).toBeInTheDocument();
  });

  it('should set the theme in context', () => {
    function TestComponent({ id }) {
      const { theme } = useTheme();
      return <span data-testid={id}>{theme}</span>;
    }
    render(
      <Theme theme="white">
        <TestComponent id="default" />
        <Theme theme="g100">
          <TestComponent id="nested" />
        </Theme>
      </Theme>
    );

    expect(screen.getByTestId('default')).toHaveTextContent('white');
    expect(screen.getByTestId('nested')).toHaveTextContent('g100');
  });
});

function DarkTestComponent({ id }) {
  const { isDark } = useTheme();
  return <span data-testid={id}>{isDark ? 'dark' : 'light'}</span>;
}

describe('usePrefersDarkScheme', () => {
  it('should set see white as light', () => {
    jest.resetModules();
    jest.spyOn(hooks, 'useMatchMedia').mockImplementation(() => false);
    render(
      <Theme theme="white">
        <DarkTestComponent id="default" />
      </Theme>
    );

    expect(screen.getByTestId('default')).toHaveTextContent('light');
  });
  it('should set see g10 as light', () => {
    jest.resetModules();
    jest.spyOn(hooks, 'useMatchMedia').mockImplementation(() => false);
    render(
      <Theme theme="g10">
        <DarkTestComponent id="default" />
      </Theme>
    );

    expect(screen.getByTestId('default')).toHaveTextContent('light');
  });
  it('should set see g90 as light', () => {
    jest.resetModules();
    jest.spyOn(hooks, 'useMatchMedia').mockImplementation(() => true);
    render(
      <Theme theme="g90">
        <DarkTestComponent id="default" />
      </Theme>
    );

    expect(screen.getByTestId('default')).toHaveTextContent('dark');
  });
  it('should set see g100 as light', () => {
    jest.resetModules();
    jest.spyOn(hooks, 'useMatchMedia').mockImplementation(() => true);
    render(
      <Theme theme="g100">
        <DarkTestComponent id="default" />
      </Theme>
    );

    expect(screen.getByTestId('default')).toHaveTextContent('dark');
  });
});
