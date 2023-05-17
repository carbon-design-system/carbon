/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Edit } from '@carbon/icons-react';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { IconButton } from '../';

describe('IconButton', () => {
  it('should support labelling with label', () => {
    render(
      <IconButton label="edit">
        <Edit />
      </IconButton>
    );
    expect(screen.getByLabelText('edit')).toBeInTheDocument();
  });

  it('should support data-testid on the <button> element', () => {
    render(
      <IconButton label="edit" data-testid="icon-button">
        <Edit />
      </IconButton>
    );
    const button = screen.getByTestId('icon-button');
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe('BUTTON');
  });

  it('should forward extra props to the underlying <button> element', () => {
    render(
      <IconButton label="edit" data-testid="icon-button" disabled>
        <Edit />
      </IconButton>
    );
    expect(screen.getByTestId('icon-button')).toBeDisabled();
  });

  it('should support a `ref` on the underlying <button> element', () => {
    const ref = jest.fn();
    render(
      <IconButton label="edit" data-testid="icon-button" ref={ref}>
        <Edit />
      </IconButton>
    );
    expect(ref).toHaveBeenCalledWith(screen.getByTestId('icon-button'));
  });
});
