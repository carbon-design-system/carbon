/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import ShapeIndicator from '../index';

describe('ShapeIndicator', () => {
  it('should use a custom label', () => {
    render(<ShapeIndicator kind="failed" label="label" />);
    expect(screen.getByText('label')).toBeInTheDocument();
  });

  it('should update with textSize prop', () => {
    render(<ShapeIndicator kind="failed" label="label" textSize={14} />);
    expect(screen.getByText('label')).toHaveClass('cds--shape-indicator--14');
  });

  it('should update with kind prop', () => {
    render(<ShapeIndicator kind="critical" label="label" size={14} />);
    expect(document.querySelector('svg')).toHaveClass(
      'cds--shape-indicator--critical'
    );
  });

  it('should support a custom class name on the outermost element', () => {
    const { container } = render(
      <ShapeIndicator kind="failed" label="label" className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should support a ref on the outermost element', () => {
    const ref = jest.fn();
    const { container } = render(
      <ShapeIndicator kind="failed" label="label" ref={ref} />
    );
    expect(ref).toHaveBeenCalledWith(container.firstChild);
  });
});
