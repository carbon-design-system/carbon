/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { HeaderMenuButton } from '../';

describe('HeaderMenuButton', () => {
  it('should label the <button> element through `aria-label`', () => {
    const { container } = render(<HeaderMenuButton aria-label="test" />);
    expect(container.firstChild).toEqual(screen.getByLabelText('test'));
  });

  it('should set the title of the <button> through `aria-label`', () => {
    render(<HeaderMenuButton aria-label="test" />);
    expect(screen.getByLabelText('test')).toHaveAttribute('title', 'test');
  });

  it('should the active class through `isActive`', () => {
    const { container, rerender } = render(
      <HeaderMenuButton aria-label="test" />
    );
    expect(container.firstChild).not.toHaveClass('cds--header__action--active');

    rerender(<HeaderMenuButton aria-label="test" isActive />);
    expect(container.firstChild).toHaveClass('cds--header__action--active');
  });

  it('should the hidden class through `isCollapsible', () => {
    const { container, rerender } = render(
      <HeaderMenuButton aria-label="test" />
    );
    expect(container.firstChild).toHaveClass(
      'cds--header__menu-toggle__hidden'
    );

    rerender(<HeaderMenuButton aria-label="test" isCollapsible />);
    expect(container.firstChild).not.toHaveClass(
      'cds--header__menu-toggle__hidden'
    );
  });

  it('should call `onClick` when the <button> is clicked', async () => {
    const onClick = jest.fn();
    render(<HeaderMenuButton aria-label="test" onClick={onClick} />);

    await userEvent.click(screen.getByLabelText('test'));
    expect(onClick).toHaveBeenCalled();
  });

  it('should support a custom close icon through `renderCloseIcon`', () => {
    render(
      <HeaderMenuButton
        aria-label="test"
        renderCloseIcon={<span data-testid="close">close</span>}
        isActive
      />
    );
    expect(screen.getByLabelText('test')).toContainElement(
      screen.getByTestId('close')
    );
  });

  it('should support a custom menu icon through `renderMenuIcon`', () => {
    render(
      <HeaderMenuButton
        aria-label="test"
        renderMenuIcon={<span data-testid="menu">menu</span>}
      />
    );
    expect(screen.getByLabelText('test')).toContainElement(
      screen.getByTestId('menu')
    );
  });

  it('should support a custom `className` prop on the outermost element', () => {
    const { container } = render(
      <HeaderMenuButton aria-label="test" className="test" />
    );
    expect(container.firstChild).toHaveClass('test');
  });

  it('should spread extra props on the outermost element', () => {
    const { container } = render(
      <HeaderMenuButton aria-label="test" data-testid="test" />
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });
});
