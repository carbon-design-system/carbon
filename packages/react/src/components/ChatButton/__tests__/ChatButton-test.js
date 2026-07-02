/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import ChatButton from '../ChatButton';

describe('ChatButton', () => {
  it('should support rendering elements within the ChatButton through the `children` prop', () => {
    render(
      <ChatButton>
        <span>child</span>
      </ChatButton>
    );
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('should support a custom className on the outermost element', () => {
    const { container } = render(
      <ChatButton className="custom-class">test</ChatButton>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should use the disabled prop to set disabled on the <ChatButton>', () => {
    const { rerender } = render(<ChatButton>test</ChatButton>);
    expect(screen.getByRole('button')).toBeEnabled();

    rerender(<ChatButton disabled>test</ChatButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it.each([
    ['primary', 'cds--btn'],
    ['secondary', 'cds--btn--secondary'],
    ['ghost', 'cds--btn--ghost'],
    ['danger', 'cds--btn--danger'],
    ['tertiary', 'cds--btn--tertiary'],
  ])(
    'should set the expected classes for the ChatButton of kind: `%s`',
    (kind, className) => {
      render(
        <ChatButton className={className} kind={kind}>
          test
        </ChatButton>
      );
      expect(screen.getByText('test')).toHaveClass(className);
    }
  );

  it.each([
    ['sm', 'cds--btn--sm'],
    ['md', 'cds--btn--md'],
    ['lg', 'cds--btn--lg'],
  ])(
    'should set the expected classes for the ChatButton of size: `%s`',
    (size, className) => {
      render(
        <ChatButton className={className} size={size}>
          test
        </ChatButton>
      );
      expect(screen.getByText('test')).toHaveClass(className);
    }
  );

  it('should set kind=ghost and size=sm if isQuickAction is set on the <ChatButton>', () => {
    render(<ChatButton isQuickAction>test</ChatButton>);
    expect(screen.getByText('test')).toHaveClass('cds--btn--ghost');
    expect(screen.getByText('test')).toHaveClass('cds--btn--sm');
  });

  it('should not allow sizes larger than lg on the <ChatButton>', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<ChatButton size="xl" />);

    try {
      expect(spy).toHaveBeenCalled();
    } finally {
      spy.mockRestore();
    }
  });
});
