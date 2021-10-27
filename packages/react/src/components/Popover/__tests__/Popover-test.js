/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { Popover, PopoverContent } from '../../Popover';

describe('Popover', () => {
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
    it('should support custom rendering with the `as` prop', () => {
      render(
        <Popover open>
          <PopoverContent as="article" data-testid="test">
            test
          </PopoverContent>
        </Popover>
      );
      expect(screen.getByTestId('test').tagName).toBe('ARTICLE');
    });

    it('should support a custom class name on the outermost element', () => {
      render(
        <Popover open>
          <PopoverContent className="test" data-testid="test">
            test
          </PopoverContent>
        </Popover>
      );
      expect(screen.getByTestId('test')).toHaveClass('test');
    });

    it('should forward additional props on the outermost element', () => {
      render(
        <Popover open>
          <PopoverContent id="test" data-testid="test">
            test
          </PopoverContent>
        </Popover>
      );
      expect(screen.getByTestId('test')).toHaveAttribute('id', 'test');
    });
  });
});
