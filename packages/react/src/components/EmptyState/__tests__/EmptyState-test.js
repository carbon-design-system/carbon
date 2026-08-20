/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EmptyState } from '..';

describe('EmptyState', () => {
  it('renders the title', () => {
    render(<EmptyState title="No data found" />);
    expect(screen.getByText('No data found')).toBeInTheDocument();
  });

  it('renders the subtitle when provided', () => {
    render(<EmptyState title="No data" subtitle="Try again later." />);
    expect(screen.getByText('Try again later.')).toBeInTheDocument();
  });

  it('does not render a subtitle element when subtitle is omitted', () => {
    const { container } = render(<EmptyState title="No data" />);
    expect(container.querySelector('.cds--empty-state__subtitle')).toBeNull();
  });

  it('applies a custom className to the root element', () => {
    const { container } = render(
      <EmptyState className="my-custom-class" title="No data" />
    );
    expect(container.firstChild).toHaveClass('my-custom-class');
  });

  it('renders with the md size class by default', () => {
    const { container } = render(<EmptyState title="No data" />);
    expect(container.firstChild).toHaveClass('cds--empty-state--md');
  });

  it('renders with the sm size class when size="sm"', () => {
    const { container } = render(<EmptyState size="sm" title="No data" />);
    expect(container.firstChild).toHaveClass('cds--empty-state--sm');
  });

  it('forwards a ref to the root div', () => {
    const ref = React.createRef();
    render(<EmptyState ref={ref} title="No data" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('passes extra HTML attributes to the root element', () => {
    render(<EmptyState title="No data" data-testid="empty-root" />);
    expect(screen.getByTestId('empty-root')).toBeInTheDocument();
  });

  describe('illustration', () => {
    it('renders an <img> when illustration is a string URL', () => {
      render(
        <EmptyState
          title="No data"
          illustration="/img/no-data.svg"
          illustrationDescription="No data image"
        />
      );
      const img = screen.getByRole('img', { name: 'No data image' });
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', '/img/no-data.svg');
    });

    it('uses the title as alt text when illustrationDescription is omitted', () => {
      const { container } = render(
        <EmptyState title="No data found" illustration="/img/no-data.svg" />
      );
      const img = container.querySelector('img');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('alt', 'No data found');
    });

    it('renders an illustration component when a React component is passed', () => {
      const MockIllustration = (props) => (
        <svg data-testid="mock-illustration" {...props} />
      );
      render(
        <EmptyState
          title="No data"
          illustration={MockIllustration}
          illustrationDescription="Mock illustration"
        />
      );
      expect(screen.getByTestId('mock-illustration')).toBeInTheDocument();
    });

    it('applies the md illustration size class by default', () => {
      render(
        <EmptyState
          title="No data"
          illustration="/img/no-data.svg"
          illustrationDescription="No data"
        />
      );
      expect(screen.getByRole('img')).toHaveClass(
        'cds--empty-state__illustration--md'
      );
    });

    it('applies the sm illustration size class when size="sm"', () => {
      render(
        <EmptyState
          size="sm"
          title="No data"
          illustration="/img/no-data.svg"
          illustrationDescription="No data"
        />
      );
      expect(screen.getByRole('img')).toHaveClass(
        'cds--empty-state__illustration--sm'
      );
    });

    it('does not render an illustration when illustration prop is omitted', () => {
      const { container } = render(<EmptyState title="No data" />);
      expect(container.querySelector('img')).toBeNull();
      expect(container.querySelector('svg')).toBeNull();
    });
  });

  describe('action', () => {
    it('renders an action button with the provided text', () => {
      render(
        <EmptyState
          title="No data"
          action={{ text: 'Add asset', kind: 'primary' }}
        />
      );
      expect(
        screen.getByRole('button', { name: 'Add asset' })
      ).toBeInTheDocument();
    });

    it('defaults action button kind to tertiary', () => {
      render(<EmptyState title="No data" action={{ text: 'Add asset' }} />);
      expect(screen.getByRole('button', { name: 'Add asset' })).toHaveClass(
        'cds--btn--tertiary'
      );
    });

    it('calls the action onClick handler when the button is clicked', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      render(
        <EmptyState
          title="No data"
          action={{ text: 'Add asset', onClick: handleClick }}
        />
      );
      await user.click(screen.getByRole('button', { name: 'Add asset' }));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not render an action button when action is omitted', () => {
      render(<EmptyState title="No data" />);
      expect(screen.queryByRole('button')).toBeNull();
    });
  });

  describe('link', () => {
    it('renders a link with the provided text and href', () => {
      render(
        <EmptyState
          title="No data"
          link={{ text: 'Learn more', href: 'https://example.com' }}
        />
      );
      const link = screen.getByRole('link', { name: 'Learn more' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'https://example.com');
    });

    it('does not render a link when link prop is omitted', () => {
      render(<EmptyState title="No data" />);
      expect(screen.queryByRole('link')).toBeNull();
    });
  });
});
