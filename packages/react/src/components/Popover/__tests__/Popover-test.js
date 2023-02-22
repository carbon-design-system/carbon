/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { Popover, PopoverContent } from '../../Popover';

describe('Popover', () => {
  it('should support a ref on the outermost element', () => {
    const ref = jest.fn();
    const { container } = render(
      <Popover open ref={ref}>
        <PopoverContent>test</PopoverContent>
      </Popover>
    );
    expect(ref).toHaveBeenCalledWith(container.firstChild);
  });

  it('should support custom rendering with the `as` prop', () => {
    const { container } = render(
      <Popover as="article" open data-testid="test">
        <PopoverContent>test</PopoverContent>
      </Popover>
    );
    expect(container.firstChild.tagName).toBe('ARTICLE');
  });

  it('should support a custom class name on the outermost element', () => {
    const { container } = render(
      <Popover className="test" open>
        <PopoverContent>test</PopoverContent>
      </Popover>
    );
    expect(container.firstChild).toHaveClass('test');
  });

  it('should forward additional props on the outermost element', () => {
    const { container } = render(
      <Popover data-testid="test" open>
        <PopoverContent>test</PopoverContent>
      </Popover>
    );
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });

  describe('PopoverContent', () => {
    it('should support a ref on the popover-content element', () => {
      const ref = jest.fn();
      const { container } = render(
        <PopoverContent ref={ref}>test</PopoverContent>
      );
      expect(ref).toHaveBeenCalledWith(container.firstChild.firstChild);
    });

    it('should support a custom class name on the popover content', () => {
      render(
        <PopoverContent className="test" data-testid="test">
          test
        </PopoverContent>
      );
      // NOTE: the popover should render popover-content as the first child and
      // popover-caret as the second child
      expect(screen.getByTestId('test').firstChild).toHaveClass('test');
    });

    it('should forward additional props on the outermost element', () => {
      const { container } = render(
        <PopoverContent id="test" data-testid="test">
          test
        </PopoverContent>
      );
      expect(container.firstChild).toHaveAttribute('id', 'test');
    });
  });
});
