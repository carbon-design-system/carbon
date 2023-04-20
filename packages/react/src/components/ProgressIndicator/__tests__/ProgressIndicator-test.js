/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { ProgressIndicator, ProgressStep } from '../ProgressIndicator';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

describe('ProgressIndicator', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra props onto outermost element', () => {
      const { container } = render(
        <ProgressIndicator data-testid="test-id">
          <ProgressStep
            complete
            label="First step"
            description="Step 1: Getting started with Carbon Design System"
            secondaryLabel="Optional label"
          />
          <ProgressStep
            current
            label="Second step with tooltip"
            description="Step 2: Getting started with Carbon Design System"
          />
        </ProgressIndicator>
      );

      expect(container.firstChild).toHaveAttribute('data-testid', 'test-id');
    });

    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(
        <ProgressIndicator className="custom-class">
          <ProgressStep
            complete
            label="First step"
            description="Step 1: Getting started with Carbon Design System"
            secondaryLabel="Optional label"
          />
          <ProgressStep
            current
            label="Second step with tooltip"
            description="Step 2: Getting started with Carbon Design System"
          />
        </ProgressIndicator>
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should respect currentIndex prop', () => {
      render(
        <ProgressIndicator currentIndex={0}>
          <ProgressStep
            label="First step"
            description="Step 1: Getting started with Carbon Design System"
            secondaryLabel="Optional label"
          />
          <ProgressStep
            label="Second step with tooltip"
            description="Step 2: Getting started with Carbon Design System"
          />
        </ProgressIndicator>
      );

      expect(screen.getAllByRole('listitem')[0]).toHaveClass(
        'cds--progress-step--current'
      );
    });

    it('should call onChange when expected', async () => {
      const onChange = jest.fn();
      render(
        <ProgressIndicator onChange={onChange} currentIndex={1}>
          <ProgressStep
            complete
            label="First step"
            description="Step 1: Getting started with Carbon Design System"
            secondaryLabel="Optional label"
          />
          <ProgressStep
            current
            label="Second step with tooltip"
            description="Step 2: Getting started with Carbon Design System"
          />
        </ProgressIndicator>
      );

      await userEvent.click(screen.getByTitle('First step'));

      expect(onChange).toHaveBeenCalled();
    });

    it('should respect spaceEqually prop', () => {
      render(
        <ProgressIndicator spaceEqually>
          <ProgressStep
            complete
            label="First step"
            description="Step 1: Getting started with Carbon Design System"
            secondaryLabel="Optional label"
          />
          <ProgressStep
            current
            label="Second step with tooltip"
            description="Step 2: Getting started with Carbon Design System"
          />
        </ProgressIndicator>
      );

      expect(screen.getByRole('list')).toHaveClass(
        'cds--progress--space-equal'
      );
    });

    it('should respect vertical prop', () => {
      render(
        <ProgressIndicator vertical>
          <ProgressStep
            complete
            label="First step"
            description="Step 1: Getting started with Carbon Design System"
            secondaryLabel="Optional label"
          />
          <ProgressStep
            current
            label="Second step with tooltip"
            description="Step 2: Getting started with Carbon Design System"
          />
        </ProgressIndicator>
      );

      expect(screen.getByRole('list')).toHaveClass('cds--progress--vertical');
    });
  });
});

describe('ProgressStep', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra props onto outermost element', () => {
      const { container } = render(
        <ProgressStep label="First step" data-testid="test-id" />
      );

      expect(container.firstChild.firstChild).toHaveAttribute(
        'data-testid',
        'test-id'
      );
    });

    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(
        <ProgressStep label="First step" className="custom-class" />
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should respect complete prop', () => {
      render(<ProgressStep label="First step" complete />);

      expect(screen.getByText('Complete')).toBeInTheDocument();
      expect(screen.getByRole('listitem')).toHaveClass(
        'cds--progress-step--complete'
      );
    });

    it('should respect current prop', () => {
      render(<ProgressStep label="First step" current />);

      expect(screen.getByText('Current')).toBeInTheDocument();
      expect(screen.getByRole('listitem')).toHaveClass(
        'cds--progress-step--current'
      );
    });

    it('should respect description prop', () => {
      render(<ProgressStep label="First step" description="Step 1" />);

      expect(screen.getByText('First step')).toBeInTheDocument();
    });

    it('should respect disabled prop', () => {
      render(<ProgressStep label="First step" disabled />);

      expect(screen.getByRole('listitem')).toHaveClass(
        'cds--progress-step--disabled'
      );
      expect(screen.getByRole('button')).toBeDisabled();
      expect(screen.getByRole('button')).toHaveClass(
        'cds--progress-step-button--unclickable'
      );
    });

    it('should respect index prop', () => {
      render(<ProgressStep label="First step" index={3} />);

      expect(screen.getByRole('button')).toHaveAttribute('index', '3');
    });

    it('should respect invalid prop', () => {
      render(<ProgressStep label="First step" invalid />);

      expect(screen.getByText('Invalid')).toBeInTheDocument();
    });

    it('should respect label prop', () => {
      render(<ProgressStep label="First step" />);

      expect(screen.getByRole('button')).toHaveAttribute('title', 'First step');
    });

    it('should call onClick when expected', async () => {
      const onClick = jest.fn();
      render(<ProgressStep label="First step" onClick={onClick} />);

      await userEvent.click(screen.getByRole('button'));
      expect(onClick).toHaveBeenCalled();
    });

    it('should respect secondaryLabel prop', () => {
      render(
        <ProgressStep label="First step" secondaryLabel="Prompt for step" />
      );

      expect(screen.getByText('Prompt for step')).toBeInTheDocument();
    });

    it('should respect translateWithId prop', () => {
      const translations = {
        'carbon.progress-step.complete': 'Terminé',
        'carbon.progress-step.incomplete': 'Partiel',
        'carbon.progress-step.current': 'Actuel',
        'carbon.progress-step.invalid': 'Non valide',
      };

      render(
        <ProgressIndicator>
          <ProgressStep
            label="First step"
            complete
            translateWithId={(messageId) => {
              return translations[messageId];
            }}
          />
          <ProgressStep
            label="First step"
            invalid
            translateWithId={(messageId) => {
              return translations[messageId];
            }}
          />
          <ProgressStep
            label="First step"
            current
            translateWithId={(messageId) => {
              return translations[messageId];
            }}
          />
          <ProgressStep
            label="First step"
            translateWithId={(messageId) => {
              return translations[messageId];
            }}
          />
        </ProgressIndicator>
      );

      expect(screen.getByText('Terminé')).toBeInTheDocument();
      expect(screen.getByText('Actuel')).toBeInTheDocument();
      expect(screen.getByText('Non valide')).toBeInTheDocument();
      expect(screen.getByText('Partiel')).toBeInTheDocument();
    });
  });
});
