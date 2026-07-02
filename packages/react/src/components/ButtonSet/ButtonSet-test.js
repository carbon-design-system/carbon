/**
 * Copyright IBM Corp. 2016, 2025 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import ButtonSet from '../ButtonSet';

describe('ButtonSet', () => {
  it('should support rendering elements through the `children` prop', () => {
    render(
      <ButtonSet data-testid="test">
        <span data-testid="child">child</span>
      </ButtonSet>
    );
    expect(screen.getByTestId('test')).toContainElement(
      screen.getByTestId('child')
    );
  });

  it('should support a custom className on the outermost element', () => {
    const { container } = render(<ButtonSet className="test" />);
    expect(container.firstChild).toHaveClass('test');
  });

  it('should spread props onto the outermost element', () => {
    const { container } = render(<ButtonSet data-testid="test" />);
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });

  it('should support a `ref` that is placed on the outermost element', () => {
    const ref = jest.fn();
    const { container } = render(<ButtonSet ref={ref} />);
    expect(ref).toHaveBeenCalledWith(container.firstChild);
  });

  describe('stacked', () => {
    it('should set the stacked class when stacked is provided', () => {
      render(<ButtonSet data-testid="test" stacked />);
      expect(screen.getByTestId('test')).toHaveClass('cds--btn-set--stacked');
    });
  });

  describe('fluid', () => {
    it('should apply fluid class when fluid prop is true', () => {
      render(<ButtonSet data-testid="test" fluid />);
      expect(screen.getByTestId('test')).toHaveClass('cds--btn-set--fluid');
    });

    it('should not apply fluid class when fluid prop is false', () => {
      render(<ButtonSet data-testid="test" fluid={false} />);
      expect(screen.getByTestId('test')).not.toHaveClass('cds--btn-set--fluid');
    });

    it('should override stacked prop when fluid is true', () => {
      render(<ButtonSet data-testid="test" fluid stacked />);
      expect(screen.getByTestId('test')).toHaveClass('cds--btn-set--fluid');
      // Fluid should take precedence, so stacked class may not be applied initially
    });

    it('should render fluid inner wrapper when fluid is true', () => {
      const { container } = render(
        <ButtonSet data-testid="test" fluid>
          <button>Button 1</button>
        </ButtonSet>
      );
      const fluidInner = container.querySelector('.cds--btn-set__fluid-inner');
      expect(fluidInner).toBeInTheDocument();
    });

    it('should not render fluid inner wrapper when fluid is false', () => {
      const { container } = render(
        <ButtonSet data-testid="test">
          <button>Button 1</button>
        </ButtonSet>
      );
      const fluidInner = container.querySelector('.cds--btn-set__fluid-inner');
      expect(fluidInner).not.toBeInTheDocument();
    });

    it('should sort buttons by kind in horizontal layout (ghost < tertiary < secondary < danger < primary)', () => {
      const { container } = render(
        <ButtonSet fluid>
          <button data-testid="primary" kind="primary">
            Primary
          </button>
          <button data-testid="ghost" kind="ghost">
            Ghost
          </button>
          <button data-testid="tertiary" kind="tertiary">
            Tertiary
          </button>
        </ButtonSet>
      );
      const buttons = container.querySelectorAll('button');
      // In horizontal layout: ghost (1) < tertiary (3) < primary (6)
      expect(buttons[0]).toHaveAttribute('data-testid', 'ghost');
      expect(buttons[1]).toHaveAttribute('data-testid', 'tertiary');
      expect(buttons[2]).toHaveAttribute('data-testid', 'primary');
    });

    it('should reverse button order when stacked in narrow container', async () => {
      const { act } = require('@testing-library/react');

      // Mock ResizeObserver
      let resizeCallback;
      global.ResizeObserver = jest.fn((callback) => {
        resizeCallback = callback;
        return {
          observe: jest.fn(),
          disconnect: jest.fn(),
        };
      });

      // Mock getComputedStyle
      window.getComputedStyle = jest.fn(() => ({
        getPropertyValue: (prop) =>
          prop === '--flex-direction' ? 'column' : '',
      }));

      const { container, rerender } = render(
        <ButtonSet fluid>
          <button data-testid="primary" kind="primary">
            Primary
          </button>
          <button data-testid="ghost" kind="ghost">
            Ghost
          </button>
          <button data-testid="tertiary" kind="tertiary">
            Tertiary
          </button>
        </ButtonSet>
      );

      // Trigger resize to stacked state
      await act(async () => {
        if (resizeCallback) {
          resizeCallback();
        }
      });

      const buttons = container.querySelectorAll('button');
      // Reversed order when stacked
      expect(buttons[0]).toHaveAttribute('data-testid', 'primary');
      expect(buttons[1]).toHaveAttribute('data-testid', 'tertiary');
      expect(buttons[2]).toHaveAttribute('data-testid', 'ghost');
    });
  });
});
