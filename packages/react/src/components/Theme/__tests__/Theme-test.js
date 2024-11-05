/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  Theme,
  useTheme,
  GlobalTheme,
  usePrefersDarkScheme,
} from '../../Theme';
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

  it('should call usePrefersDarkScheme', () => {
    jest.resetModules();
    usePrefersDarkScheme(); //mock the function

    jest.spyOn(hooks, 'useMatchMedia').mockImplementation(() => false);
    render(
      <Theme theme="g10">
        <DarkTestComponent id="default-dark" />
      </Theme>
    );

    expect(screen.getByTestId('default-dark')).toHaveTextContent('light');
    expect(hooks.useMatchMedia).toHaveBeenCalledWith(
      '(prefers-color-scheme: dark)'
    );
  });
});

describe('GlobalTheme', () => {
  it('should set the theme globally', () => {
    jest.resetModules();
    function TestComponent({ id }) {
      const { theme } = useTheme();
      return (
        <span className="test" data-testid={id}>
          {theme}
        </span>
      );
    }

    const { container } = render(
      <GlobalTheme theme="white">
        <TestComponent id="default" />
      </GlobalTheme>
    );

    expect(screen.getByTestId('default')).toHaveTextContent('white');
    //it does not have any styles or class name like cds--white
    const divElement = screen.getByTestId('default');
    const hasCarbonClassName = Array.from(divElement.classList).some(
      (className) => className.startsWith('cds--')
    );
    expect(hasCarbonClassName).toBe(false);
  });
});
