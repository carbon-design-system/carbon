/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Link from '../Link';

const prefix = 'cds';

describe('Link', () => {
  it('should render an <a> element', () => {
    render(<Link href="https://carbondesignsystem.com">test</Link>);
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveClass(`${prefix}--link`);
  });

  it('should inherit the href property', () => {
    const href = 'https://carbondesignsystem.com';
    render(
      <Link data-testid="link" href={href}>
        test
      </Link>
    );
    expect(screen.getByTestId('link')).toHaveAttribute('href', href);
  });

  it('should include child content', () => {
    const child = 'test';
    render(
      <Link data-testid="link" href="https://carbondesignsystem.com">
        {child}
      </Link>
    );
    expect(screen.getByTestId('link')).toHaveTextContent(child);
  });

  it('should support a custom class on the element with a link role', () => {
    render(
      <Link href="https://carbondesignsystem.com" className="custom-class">
        test
      </Link>
    );
    expect(screen.getByRole('link')).toHaveClass('custom-class');
  });

  it('should support being disabled', () => {
    render(
      <Link href="https://carbondesignsystem.com" disabled>
        test
      </Link>
    );
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('link')).not.toHaveAttribute('href');
    expect(screen.getByRole('link')).toHaveAttribute('aria-disabled', 'true');
  });

  it('should support the inline link variant', () => {
    render(
      <Link href="https://carbondesignsystem.com" inline>
        test
      </Link>
    );
    expect(screen.getByRole('link')).toHaveClass(`${prefix}--link--inline`);
  });

  it.each(['sm', 'md', 'lg'])('should support the %s size variant', (size) => {
    render(
      <Link href="https://carbondesignsystem.com" size={size}>
        test
      </Link>
    );
    expect(screen.getByRole('link')).toHaveClass(`${prefix}--link--${size}`);
  });

  it('should add rel="noopener" automatically if target="_blank"', () => {
    render(
      <Link href="https://carbondesignsystem.com" target="_blank">
        test
      </Link>
    );
    expect(screen.getByRole('link')).toHaveAttribute('rel', 'noopener');
  });

  it('should receive keyboard focus', async () => {
    render(
      <Link href="/" className="some-class">
        A simple link
      </Link>
    );

    expect(document.body).toHaveFocus();
    await userEvent.tab();
    expect(screen.getByText('A simple link')).toHaveFocus();
  });

  it('should not receive keyboard focus when disabled', async () => {
    render(
      <Link href="/" disabled className="some-class">
        A simple link
      </Link>
    );
    expect(document.body).toHaveFocus();
    await userEvent.tab();
    expect(document.body).toHaveFocus();
  });

  describe('automated verification testing', () => {
    it('should have no aXe violations', async () => {
      render(
        <Link href="/" className="some-class">
          A simple link
        </Link>
      );
      await expect(screen.getByText('A simple link')).toHaveNoAxeViolations();
    });

    it('should have no Accessibility Checker violations', async () => {
      render(
        <main>
          <Link href="/" className="some-class">
            A simple link
          </Link>
        </main>
      );
      await expect(screen.getByText('A simple link')).toHaveNoACViolations(
        'Link'
      );
    });
  });

  describe('Component API', () => {
    it('should support a `ref` on the element with role of link', () => {
      const ref = jest.fn();
      render(
        <Link href="https://carbondesignsystem.com" ref={ref}>
          A simple link
        </Link>
      );
      expect(ref).toHaveBeenCalledWith(screen.getByRole('link'));
    });
  });
});
