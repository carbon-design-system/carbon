/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import Icon from '../Icon';

describe('Icon', () => {
  it('should render', () => {
    expect(() => {
      render(
        <Icon width={16} height={16} viewBox="0 0 16 16">
          <circle cx={8} cy={8} r={8} />
        </Icon>
      );
    }).not.toThrow();
  });

  it('should treat focusable as a string', () => {
    const { container, rerender } = render(
      <Icon width={16} height={16} viewBox="0 0 16 16">
        <circle cx={8} cy={8} r={8} />
      </Icon>
    );

    const getContainer = () => container.querySelector('svg');
    expect(getContainer()).toHaveAttribute('focusable', 'false');

    rerender(<Icon focusable />);

    expect(getContainer()).toHaveAttribute('focusable', 'true');
  });

  it('should forward refs to the rendered SVG DOM element', () => {
    let svg;
    const ref = jest.fn((node) => {
      svg = node;
    });
    const { container } = render(<Icon ref={ref} />);
    expect(svg).toEqual(container.querySelector('svg'));
  });

  it('should be focusable if an aria label and tab index is used', () => {
    const getContainer = () => container.querySelector('svg');

    // Test without a tabIndex, should not be focusable
    const { container, rerender } = render(
      <Icon width={16} height={16} viewBox="0 0 16 16" aria-label="Mock icon">
        <circle cx={8} cy={8} r={8} />
      </Icon>
    );

    expect(getContainer()).toHaveAttribute('aria-label', 'Mock icon');
    getContainer().focus();
    expect(document.activeElement === getContainer()).toBe(false);

    // Test without aria-label and with tabIndex, should not be focusable
    // because we require a label in that case
    rerender(
      <Icon width={16} height={16} viewBox="0 0 16 16" tabIndex="0">
        <circle cx={8} cy={8} r={8} />
      </Icon>
    );

    expect(getContainer()).not.toHaveAttribute('aria-label');
    getContainer().focus();
    expect(document.activeElement === getContainer()).toBe(false);

    // Test with aria-label and tabIndex, should be focusable
    rerender(
      <Icon
        width={16}
        height={16}
        viewBox="0 0 16 16"
        aria-label="Mock icon"
        tabIndex="0">
        <circle cx={8} cy={8} r={8} />
      </Icon>
    );

    expect(getContainer()).toHaveAttribute('aria-label', 'Mock icon');
    getContainer().focus();
    expect(document.activeElement === getContainer()).toBe(true);
  });
});
