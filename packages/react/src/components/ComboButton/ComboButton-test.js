/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { MenuItem } from '../Menu';

import { ComboButton } from './';

describe('ComboButton', () => {
  it('should support a ref on the outermost element', () => {
    const ref = jest.fn();
    const { container } = render(
      <ComboButton label="Primary action" ref={ref}>
        <MenuItem label="Additional action" />
      </ComboButton>
    );
    expect(ref).toHaveBeenCalledWith(container.firstChild);
  });

  it('should support a custom class name on the outermost element', () => {
    const { container } = render(
      <ComboButton label="Primary action" className="test">
        <MenuItem label="Additional action" />
      </ComboButton>
    );
    expect(container.firstChild).toHaveClass('test');
  });

  it('should forward additional props on the outermost element', () => {
    const { container } = render(
      <ComboButton label="Primary action" data-testid="test">
        <MenuItem label="Additional action" />
      </ComboButton>
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });

  it('should render props.label on the trigger button', () => {
    render(
      <ComboButton label="Test">
        <MenuItem label="Additional action" />
      </ComboButton>
    );
    expect(screen.getAllByRole('button')[0]).toHaveTextContent(/^Test$/);
  });

  it('should emit props.onClick on primary action click', async () => {
    const onClick = jest.fn();
    render(
      <ComboButton label="Test" onClick={onClick}>
        <MenuItem label="Additional action" />
      </ComboButton>
    );

    expect(onClick).toHaveBeenCalledTimes(0);
    await userEvent.click(screen.getAllByRole('button')[0]);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should open a menu on click on the trigger button', async () => {
    render(
      <ComboButton label="Primary action">
        <MenuItem label="Additional action" />
      </ComboButton>
    );

    await userEvent.click(screen.getAllByRole('button')[1]);

    expect(screen.getByRole('menu')).toBeTruthy();
    expect(screen.getByRole('menuitem')).toHaveTextContent(
      /^Additional action$/
    );
  });

  it('should support being disabled', () => {
    render(
      <ComboButton label="Primary action" disabled>
        <MenuItem label="Additional action" />
      </ComboButton>
    );

    // primary action button
    expect(screen.getAllByRole('button')[0]).toBeDisabled();

    // trigger button
    expect(screen.getAllByRole('button')[1]).toBeDisabled();
  });
});
