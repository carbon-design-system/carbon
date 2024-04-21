/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Theme, ThemeCompliment, useTheme } from '../../Theme';
import { screen, render } from '@testing-library/react';
import * as hooks from '../../../internal/useMatchMedia';

const TestComponent = ({ id }) => {
  const { theme, isDark } = useTheme();
  return (
    <span data-testid={id}>
      {theme} {isDark ? 'dark' : 'light'}
    </span>
  );
};

describe('Theme', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.spyOn(hooks, 'useMatchMedia').mockImplementation(() => true);
  });

  it('should render the children passed in as a prop', () => {
    render(
      <Theme>
        <span data-testid="test">test</span>
      </Theme>
    );

    expect(screen.getByTestId('test')).toBeInTheDocument();
  });

  it('should set the theme in context', () => {
    render(
      <Theme theme="white">
        <TestComponent id="default" />
        <Theme theme="g100">
          <TestComponent id="nested" />
        </Theme>
        <ThemeCompliment>
          <TestComponent id="nested-compliment" />
        </ThemeCompliment>
      </Theme>
    );

    expect(screen.getByTestId('default')).toHaveTextContent('white');
    expect(screen.getByTestId('default')).toHaveTextContent('light');
    expect(screen.getByTestId('nested')).toHaveTextContent('g100');
    expect(screen.getByTestId('nested')).toHaveTextContent('dark');
    expect(screen.getByTestId('nested-compliment')).toHaveTextContent('g90');
    expect(screen.getByTestId('nested-compliment')).toHaveTextContent('dark');
  });

  it('should set g10 and isDark to false', () => {
    render(
      <Theme theme="g10">
        <TestComponent id="default" />
      </Theme>
    );

    expect(screen.getByTestId('default')).toHaveTextContent('g10');
    expect(screen.getByTestId('default')).toHaveTextContent('light');
  });

  it('should set allow a theme and themeCompliment', () => {
    render(
      <Theme theme="g10" themeCompliment="white">
        <TestComponent id="default" />
        <ThemeCompliment>
          <TestComponent id="nested" />
        </ThemeCompliment>
      </Theme>
    );

    expect(screen.getByTestId('default')).toHaveTextContent('g10');
    expect(screen.getByTestId('nested')).toHaveTextContent('white');
  });
});

describe('Theme system dark', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.spyOn(hooks, 'useMatchMedia').mockImplementation(() => true);
  });

  it('Should have a dark theme and show a compliment', () => {
    render(
      // default system white/g90
      <Theme theme="system">
        <TestComponent id="default" />
        <ThemeCompliment>
          <TestComponent id="nested" />
        </ThemeCompliment>
      </Theme>
    );

    expect(screen.getByTestId('default')).toHaveTextContent('g90');
    expect(screen.getByTestId('nested')).toHaveTextContent('white');
  });
});

describe('Theme system light', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.spyOn(hooks, 'useMatchMedia').mockImplementation(() => false);
  });

  it('should use a light theme and show a compliment', () => {
    render(
      // default system white/g90
      <Theme theme="system">
        <TestComponent id="default" />
        <ThemeCompliment>
          <TestComponent id="nested" />
        </ThemeCompliment>
      </Theme>
    );

    expect(screen.getByTestId('default')).toHaveTextContent('white');
    expect(screen.getByTestId('nested')).toHaveTextContent('g90');
  });
});

describe('Theme system accepts themeSystemLight and themeSystemDark', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.spyOn(hooks, 'useMatchMedia').mockImplementation(() => true);
  });

  it('should use a dark theme g100 and a compliment of g10', () => {
    render(
      // default system white/g90
      <Theme theme="system" themeSystemDark="g100" themeSystemLight="g10">
        <TestComponent id="default" />
        <ThemeCompliment>
          <TestComponent id="nested" />
        </ThemeCompliment>
      </Theme>
    );

    expect(screen.getByTestId('default')).toHaveTextContent('g100');
    expect(screen.getByTestId('nested')).toHaveTextContent('g10');
  });
});
