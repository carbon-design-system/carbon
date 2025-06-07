/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import IconIndicator from '../index';

describe('IconIndicator', () => {
  it('should use a custom label', () => {
    render(<IconIndicator kind="failed" label="label" />);
    expect(screen.getByText('label')).toBeInTheDocument();
  });

  it('should update with size prop', () => {
    render(<IconIndicator kind="failed" label="label" size={20} />);
    expect(screen.getByText('label')).toHaveClass('cds--icon-indicator--20');
  });

  it('should update with kind prop', () => {
    render(<IconIndicator kind="pending" label="label" size={20} />);
    expect(document.querySelector('svg')).toHaveClass(
      'cds--icon-indicator--pending'
    );
  });

  it('should support a custom class name on the outermost element', () => {
    const { container } = render(
      <IconIndicator kind="failed" label="label" className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should support a ref on the outermost element', () => {
    const ref = jest.fn();
    const { container } = render(
      <IconIndicator kind="failed" label="label" ref={ref} />
    );
    expect(ref).toHaveBeenCalledWith(container.firstChild);
  });
});
