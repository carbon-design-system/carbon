/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { HeaderGlobalAction } from '../';

describe('HeaderGlobalAction', () => {
  it('should support labeling through aria-label', () => {
    render(
      <HeaderGlobalAction aria-label="test">
        <svg />
      </HeaderGlobalAction>
    );
    expect(screen.getByLabelText('test')).toBeInTheDocument();
  });

  it('should support a custom `className` prop on the button element', () => {
    render(
      <HeaderGlobalAction aria-label="test" className="test">
        <svg />
      </HeaderGlobalAction>
    );
    expect(screen.getByLabelText('test')).toHaveClass('test');
  });

  it('should spread extra props on the button element', () => {
    render(
      <HeaderGlobalAction aria-label="test" data-testid="test">
        <svg />
      </HeaderGlobalAction>
    );
    expect(screen.getByLabelText('test')).toHaveAttribute(
      'data-testid',
      'test'
    );
  });

  it('should support a `ref` that is placed on the <button> element', () => {
    const ref = jest.fn();
    render(
      <HeaderGlobalAction aria-label="test" ref={ref}>
        <svg />
      </HeaderGlobalAction>
    );
    expect(ref).toHaveBeenCalledWith(screen.getByLabelText('test'));
  });

  it('should toggle the active class when `isActive` is set', () => {
    const { rerender } = render(
      <HeaderGlobalAction aria-label="test">
        <svg />
      </HeaderGlobalAction>
    );
    expect(screen.getByLabelText('test')).not.toHaveClass(
      'cds--header__action--active'
    );

    rerender(
      <HeaderGlobalAction aria-label="test" isActive>
        <svg />
      </HeaderGlobalAction>
    );
    expect(screen.getByLabelText('test')).toHaveClass(
      'cds--header__action--active'
    );
  });

  it('should call `onClick` when the <button> is clicked', () => {
    const onClick = jest.fn();
    render(
      <HeaderGlobalAction aria-label="test" onClick={onClick}>
        <svg />
      </HeaderGlobalAction>
    );

    userEvent.click(screen.getByLabelText('test'));

    expect(onClick).toHaveBeenCalled();
  });
});
