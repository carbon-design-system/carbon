/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TableBatchAction } from '../';

describe('TableBatchAction', () => {
  it('should render a <button>', () => {
    render(<TableBatchAction />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should support custom icons through `renderIcon`', () => {
    const renderIcon = jest.fn((props) => (
      <svg {...props} data-testid="icon">
        <circle cx="16" cy="16" r="8" />
      </svg>
    ));
    render(<TableBatchAction iconDescription="test" renderIcon={renderIcon} />);

    expect(renderIcon).toHaveBeenCalled();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('should support labeling the button with `iconDescription`', () => {
    render(<TableBatchAction iconDescription="test" />);
    expect(screen.getByLabelText('test')).toBeInTheDocument();
  });

  it('should return an error when `renderIcon` is provided without `iconDescription` or children', () => {
    const renderIcon = () => null;

    const result = TableBatchAction.propTypes.iconDescription({
      renderIcon,
    });

    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe(
      'renderIcon property specified without also providing an iconDescription property.'
    );
  });

  it('should not return an error when `renderIcon` is provided with children', () => {
    const renderIcon = () => null;

    const result = TableBatchAction.propTypes.iconDescription({
      children: 'Archive',
      renderIcon,
    });

    expect(result).toBeUndefined();
  });
});
