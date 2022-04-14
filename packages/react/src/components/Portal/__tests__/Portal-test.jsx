/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { Portal } from '../';

describe('Portal', () => {
  it('should render its children in the document', () => {
    render(
      <Portal>
        <span data-testid="test" />
      </Portal>
    );
    expect(screen.getByTestId('test')).toBeInTheDocument();
  });

  it('should support rendering in a custom container', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    function TestComponent() {
      const ref = React.useRef(null);

      if (ref.current === null) {
        ref.current = container;
      }

      return (
        <Portal container={ref}>
          <span data-testid="test" />
        </Portal>
      );
    }

    render(<TestComponent />);

    expect(container).toContainElement(screen.getByTestId('test'));
    document.body.removeChild(container);
  });
});
