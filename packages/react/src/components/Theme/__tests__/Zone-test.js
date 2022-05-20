/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Zone } from '../../Theme';
import { screen, render } from '@testing-library/react';

describe('Zone', () => {
  it('should render the children passed in as a prop', () => {
    render(
      <Zone theme="white">
        <span data-testid="test">test</span>
      </Zone>
    );
    expect(screen.getByTestId('test')).toBeInTheDocument();
  });

  it('should support a custom class name on the outermost element', () => {
    const { container } = render(
      <Zone className="test" theme="white">
        <span>test</span>
      </Zone>
    );
    expect(container.firstChild).toHaveClass('test');
  });

  it('should spread additional props on the outermost element', () => {
    const { container } = render(
      <Zone data-testid="test" theme="white">
        <span>test</span>
      </Zone>
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });

  it.each(['white', 'g10', 'g90', 'g100'])(
    'should set the zone and %s theme classes on the outermost element',
    (theme) => {
      const { container } = render(
        <Zone theme={theme}>
          <span>test</span>
        </Zone>
      );
      expect(container.firstChild).toHaveClass('cds--zone');
      expect(container.firstChild).toHaveClass(`cds--${theme}`);
      expect(container.firstChild).toHaveClass(`cds--layer-one`);
    }
  );
});
