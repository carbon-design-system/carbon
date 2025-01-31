/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { AILabel, AILabelContent, AILabelActions } from '../';
import { Button } from '../../Button';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const prefix = 'cds';

describe('AILabel', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra props onto the popover element', () => {
      const { container } = render(<AILabel data-testid="test" />);

      expect(container.firstChild.firstChild).toHaveAttribute(
        'data-testid',
        'test'
      );
    });

    it('should render children as expected', () => {
      render(<AILabel>Children test</AILabel>);

      expect(screen.getByText('Children test')).toBeInTheDocument();
    });

    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(<AILabel className="custom-class" />);

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should respect aiText prop', () => {
      render(<AILabel aiText="IA" />);

      expect(screen.getByText('IA')).toBeInTheDocument();
    });

    it('should respect textLabel prop when kind is inline', () => {
      const wrapper = render(<AILabel kind="inline" textLabel="Test text" />);

      const additionalTextSpan = wrapper.container.querySelector(
        `.${prefix}--ai-label__additional-text`
      );
      expect(additionalTextSpan).toBeInTheDocument();
      expect(additionalTextSpan).toHaveTextContent('Test text');
    });

    it('should not populate textLabel prop when kind is not inline', () => {
      const wrapper = render(<AILabel textLabel="Test text" />);

      const additionalTextSpan = wrapper.container.querySelector(
        `.${prefix}--ai-label__additional-text`
      );
      expect(additionalTextSpan).not.toBeInTheDocument();
    });

    it('should respect align prop when autoAlign is false', () => {
      render(
        <AILabel data-testid="test" autoAlign={false} align="bottom-start" />
      );

      expect(screen.getByTestId('test')).not.toHaveClass(
        `${prefix}--popover--auto-align`
      );
      expect(screen.getByTestId('test')).toHaveClass(
        `${prefix}--popover--bottom-start`
      );
    });

    it('should apply align prop classes even when autoAlign is true', () => {
      render(<AILabel data-testid="test" align="bottom-start" />);

      expect(screen.getByTestId('test')).toHaveClass(
        `${prefix}--popover--auto-align`
      );
      expect(screen.getByTestId('test')).toHaveClass(
        `${prefix}--popover--bottom-start`
      );
    });

    it('should respect kind prop', () => {
      render(<AILabel kind="inline" />);

      expect(screen.getByRole('button')).toHaveClass(
        `${prefix}--ai-label__button--inline`
      );
    });

    it('should respect revertActive prop', () => {
      const { container } = render(<AILabel revertActive />);

      expect(container.firstChild).toHaveClass(`${prefix}--ai-label--revert`);
      expect(container.firstChild.firstChild).toHaveClass(
        `${prefix}--icon-tooltip`
      );
    });

    it('should respect revertLabel prop', () => {
      render(<AILabel revertActive revertLabel="Test revert label" />);

      expect(screen.getByText('Test revert label')).toBeInTheDocument();
    });

    it('should respect size prop', () => {
      render(<AILabel size="xl" />);

      expect(screen.getByRole('button')).toHaveClass(
        `${prefix}--ai-label__button--xl`
      );
    });
  });

  it('should handle revert click', async () => {
    render(
      <AILabel
        revertActive
        revertLabel="Test revert label"
        onRevertClick={() => {}}
      />
    );

    await userEvent.click(screen.getByRole('button'));
  });
});

describe('AILabelContent', () => {
  it('should render with content', () => {
    render(
      <AILabel>
        <AILabelContent>Children test</AILabelContent>
      </AILabel>
    );

    expect(screen.getByText('Children test')).toBeInTheDocument();
  });
});

describe('AILabelActions', () => {
  it('should render with actions', () => {
    render(
      <AILabel>
        <AILabelContent>
          Children test
          <AILabelActions>
            <Button>View details</Button>
          </AILabelActions>
        </AILabelContent>
      </AILabel>
    );

    expect(screen.getByText('View details')).toBeInTheDocument();
  });
  describe('Labels and kind prop', () => {
    it('should use empty label for inline kind', () => {
      render(<AILabel kind="inline" aiText="AI" textLabel="Text goes here" />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', '');
    });

    it('should set aria-label when kind is default', () => {
      render(<AILabel aiText="AI" />);
      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-label',
        'AI Show information'
      );
    });

    it('should let visible text serve as accessible name in inline mode', () => {
      render(<AILabel kind="inline" aiText="AI" textLabel="Text goes here" />);
      expect(
        screen.getByRole('button', { name: 'AI Text goes here' })
      ).toBeInTheDocument();
    });
  });
});
