/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from '@testing-library/react';
import React from 'react';
import { HStack, Stack, VStack } from '../../Stack';

describe('Stack', () => {
  it('should support alternate element types with the `as` prop', () => {
    const { container } = render(
      <Stack as="section">
        <article>one</article>
        <article>two</article>
        <article>three</article>
      </Stack>
    );

    expect(container.firstChild.tagName).toBe('SECTION');
  });

  it('should support a custom className with the `className` prop', () => {
    const { container } = render(
      <Stack className="test">
        <article>one</article>
        <article>two</article>
        <article>three</article>
      </Stack>
    );

    expect(container.firstChild).toHaveClass('test');
  });

  it('should apply additional props to the outermost element', () => {
    const { container } = render(
      <Stack data-testid="test">
        <article>one</article>
        <article>two</article>
        <article>three</article>
      </Stack>
    );

    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });

  it('should forward the given ref to the outermost element', () => {
    const ref = jest.fn();
    const { container } = render(
      <Stack ref={ref}>
        <article>one</article>
        <article>two</article>
        <article>three</article>
      </Stack>
    );
    expect(ref).toHaveBeenCalledWith(container.firstChild);
  });

  describe('HStack', () => {
    it('should forward the given ref to the outermost element', () => {
      const ref = jest.fn();
      const { container } = render(
        <HStack ref={ref}>
          <article>one</article>
          <article>two</article>
          <article>three</article>
        </HStack>
      );
      expect(ref).toHaveBeenCalledWith(container.firstChild);
    });
  });

  describe('VStack', () => {
    it('should forward the given ref to the outermost element', () => {
      const ref = jest.fn();
      const { container } = render(
        <VStack ref={ref}>
          <article>one</article>
          <article>two</article>
          <article>three</article>
        </VStack>
      );
      expect(ref).toHaveBeenCalledWith(container.firstChild);
    });
  });
});
