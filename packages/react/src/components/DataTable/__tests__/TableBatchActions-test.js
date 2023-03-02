/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { TableBatchActions } from '../';

describe('TableBatchActions', () => {
  it('should set the active class when `shouldShowBatchActions` is true', () => {
    const { container } = render(
      <TableBatchActions
        shouldShowBatchActions
        totalSelected={10}
        onCancel={jest.fn()}
      />
    );
    expect(container.firstChild).toHaveClass('cds--batch-actions--active');
  });

  it('should support a custom className on the outermost element', () => {
    const { container } = render(
      <TableBatchActions
        className="custom-class"
        totalSelected={10}
        onCancel={jest.fn()}
      />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should spread props onto the outermost element', () => {
    const { container } = render(
      <TableBatchActions
        data-testid="test"
        totalSelected={10}
        onCancel={jest.fn()}
      />
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });

  it('should show a different message depending on count of items selected', () => {
    render(<TableBatchActions onCancel={jest.fn()} totalSelected={1} />);
    expect(screen.getByText('1 item selected')).toBeInTheDocument();

    render(<TableBatchActions onCancel={jest.fn()} totalSelected={2} />);
    expect(screen.getByText('2 items selected')).toBeInTheDocument();
  });

  it('should invoke the `onCancel` hook if the action is canceled', () => {
    const onCancel = jest.fn();

    render(
      <TableBatchActions
        shouldShowBatchActions
        onCancel={onCancel}
        totalSelected={10}
      />
    );

    userEvent.click(screen.getByText('Cancel'));
    expect(onCancel).toHaveBeenCalled();
  });
});
