/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Theme, useTheme } from '../../Theme';
import { screen, render } from '@testing-library/react';

describe('Theme', () => {
  it('should render the children passed in as a prop', () => {
    render(
      <Theme>
        <span data-testid="test">test</span>
      </Theme>
    );

    expect(screen.getByTestId('test')).toBeInTheDocument();
  });
  it.todo("should apply a given theme to it's children");
  it.todo("should apply a given theme object to it's children");
  it('should set the theme in context', () => {
    function TestComponent({ id }) {
      const { theme } = useTheme();
      return <span data-testid={id}>{theme}</span>;
    }
    render(
      <Theme theme="default">
        <TestComponent id="default" />
        <Theme theme="nested">
          <TestComponent id="nested" />
        </Theme>
      </Theme>
    );

    expect(screen.getByTestId('default')).toHaveTextContent('default');
    expect(screen.getByTestId('nested')).toHaveTextContent('nested');
  });
});
