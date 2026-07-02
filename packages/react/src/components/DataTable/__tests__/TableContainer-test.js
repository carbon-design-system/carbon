/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { TableContainer } from '../';
import { AILabel } from '../../AILabel';

describe('TableContainer', () => {
  it('should set the max-width class if stickyHeader is true', () => {
    const { container } = render(<TableContainer stickyHeader />);
    expect(container.firstChild).toHaveClass('cds--data-table--max-width');
  });

  it('should set the static class if useStaticWidth is true', () => {
    const { container } = render(<TableContainer useStaticWidth />);
    expect(container.firstChild).toHaveClass(
      'cds--data-table-container--static'
    );
  });

  it('should support a custom className on the outermost element', () => {
    const { container } = render(<TableContainer className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should spread props onto the <table> element', () => {
    const { container } = render(<TableContainer data-testid="test" />);
    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });

  it('should render an aiEnabled table container', () => {
    const { container } = render(
      <TableContainer aiEnabled>
        <div data-testid="child-content">Child content</div>
      </TableContainer>
    );

    const aiEnabledContainer = container.querySelector(
      '[class*="--data-table-container--ai-enabled"]'
    );
    expect(aiEnabledContainer).toBeInTheDocument();
  });

  it('should render a decorator in the table container', () => {
    const { container } = render(
      <TableContainer aiEnabled decorator={<AILabel />} title="Test title">
        <div data-testid="child-content">Child content</div>
      </TableContainer>
    );

    const decoratorWrapper = container.querySelector(
      '[class*="--data-table-header__decorator"]'
    );
    expect(decoratorWrapper).toBeInTheDocument();
  });

  describe('Header', () => {
    it('should render a header with only a `title`', () => {
      const title = 'Random title';

      const { container } = render(
        <TableContainer title={title}>
          <div>Child content</div>
        </TableContainer>
      );

      const headerEl = container.querySelector('[class*="data-table-header"]');
      const titleEl = headerEl.querySelector('h2');
      const descriptionEl = headerEl.querySelector('p');

      expect(headerEl).toBeInTheDocument();
      expect(headerEl.childElementCount).toBe(1);
      expect(titleEl).toHaveTextContent(title);
      expect(descriptionEl).toBeNull();
    });

    it('should render a header with only a `description`', () => {
      const description = 'Random description';

      const { container } = render(
        <TableContainer description={description}>
          <div>Child content</div>
        </TableContainer>
      );

      const headerEl = container.querySelector('[class*="data-table-header"]');
      const titleEl = headerEl.querySelector('h4');
      const descriptionEl = headerEl.querySelector('p');

      expect(headerEl).toBeInTheDocument();
      expect(headerEl.childElementCount).toBe(1);
      expect(descriptionEl).toHaveTextContent(description);
      expect(titleEl).toBeNull();
    });

    it('should render a header with both a `title` and a `description`', () => {
      const title = 'Random title';
      const description = 'Random description';

      const { container } = render(
        <TableContainer title={title} description={description}>
          <div>Child content</div>
        </TableContainer>
      );

      const headerEl = container.querySelector(
        '[class*="data-table-header__content"]'
      );
      const titleEl = headerEl.querySelector('h2');
      const descriptionEl = headerEl.querySelector('p');

      expect(headerEl).toBeInTheDocument();
      expect(headerEl.childElementCount).toBe(2);
      expect(titleEl).toHaveTextContent(title);
      expect(headerEl.firstChild).toHaveTextContent(title);
      expect(descriptionEl).toHaveTextContent(description);
      expect(headerEl.lastChild).toHaveTextContent(description);
    });

    it('should not render a header when neither a `title` nor a `description` is provided', () => {
      const { container } = render(
        <TableContainer>
          <div data-testid="child-content">Child content</div>
        </TableContainer>
      );

      const headerEl = container.querySelector('[class*="data-table-header"]');
      const childContent = screen.getByTestId('child-content');

      expect(childContent).toHaveTextContent('Child content');
      expect(headerEl).not.toBeInTheDocument();
    });
  });
});
