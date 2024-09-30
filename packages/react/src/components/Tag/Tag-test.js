/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Add } from '@carbon/icons-react';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Tag, { TagSkeleton } from './';
import DismissibleTag from './DismissibleTag';
import { AILabel } from '../AILabel';
import { Asleep } from '@carbon/icons-react';

const prefix = 'cds';

describe('Tag', () => {
  describe('automated accessibility testing', () => {
    it('should have no Axe violations', async () => {
      const { container } = render(<Tag type="red">test-tag</Tag>);
      await expect(container).toHaveNoAxeViolations();
    });

    it('should have no AC violations', async () => {
      const { container } = render(
        <main>
          <Tag type="red">Dog</Tag>
        </main>
      );
      await expect(container).toHaveNoACViolations('Tag');
    });
  });

  it('should have an appropriate aria-label when (filterable)', () => {
    const { container } = render(
      <DismissibleTag type="red" title="Close tag" text="Tag content" />
    );
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const button = container.querySelector('[aria-label]');
    const accessibilityLabel = button.getAttribute('aria-label');
    // This check would mirror our "Accessibility label must contain at least all of visible label"
    // requirement
    expect(accessibilityLabel).toEqual(expect.stringContaining('Close tag'));
  });

  it('should allow for a custom label', () => {
    render(<Tag type="red">Johnny Ramone</Tag>);
    expect(screen.getByText('Johnny Ramone')).toBeInTheDocument();
  });

  it('should allow for a custom icon', () => {
    render(
      <Tag type="red" renderIcon={() => <Add data-testid="test" />}>
        Dee Dee Ramone
      </Tag>
    );

    expect(screen.getByTestId('test')).toBeInTheDocument();
  });

  it('should respect slug prop', () => {
    render(<Tag type="red" slug={<AILabel />} />);

    expect(
      screen.getByRole('button', { name: 'AI - Show information' })
    ).toBeInTheDocument();
  });

  describe('Skeleton Tag', () => {
    it('should render a skeleton state', () => {
      const { container } = render(<TagSkeleton />);

      const skeletonTag = container.querySelector(`.${prefix}--tag`);

      expect(skeletonTag).toHaveClass(`${prefix}--skeleton`);
    });

    it('should render a skeleton state with a small size', () => {
      const { container } = render(<TagSkeleton size="sm" />);

      const skeletonTag = container.querySelector(`.${prefix}--tag`);

      expect(skeletonTag).toHaveClass(`${prefix}--layout--size-sm`);
    });
  });

  it('should render with different types', () => {
    const types = [
      'red',
      'magenta',
      'purple',
      'blue',
      'cyan',
      'teal',
      'green',
      'gray',
      'cool-gray',
      'warm-gray',
      'high-contrast',
      'outline',
    ];

    types.forEach((type) => {
      const { container } = render(<Tag type={type}>Tag content</Tag>);
      expect(container.firstChild).toHaveClass(`${prefix}--tag--${type}`);
    });
  });

  it('should render with custom className', () => {
    const { container } = render(<Tag className="some-class">Tag content</Tag>);
    expect(container.firstChild).toHaveClass('some-class');
  });

  it('should render with icon', () => {
    render(<Tag renderIcon={Asleep}>Tag content</Tag>);
    expect(screen.getByText('Tag content')).toBeInTheDocument();
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('should render as a filter tag', () => {
    consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const { container } = render(<Tag filter>Tag content</Tag>);
    expect(container.firstChild).toHaveClass(`${prefix}--tag--filter`);
    consoleSpy.mockRestore();
  });

  it('should render with different sizes', () => {
    const sizes = ['sm', 'md', 'lg'];

    sizes.forEach((size) => {
      const { container } = render(<Tag size={size}>Tag content</Tag>);
      expect(container.firstChild).toHaveClass(
        `${prefix}--tag ${prefix}--tag--${size} ${prefix}--layout--size-${size}`
      );
    });
  });

  it('should render as disabled', () => {
    const { container } = render(<Tag disabled>Disabled Tag</Tag>);
    expect(container.firstChild).toHaveClass(`${prefix}--tag--disabled`);
  });

  it('should handle close button click', () => {
    consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const mockOnClose = jest.fn();
    render(
      <Tag type="red" filter onClose={mockOnClose} title="Close tag">
        onClose
      </Tag>
    );
    const closeButton = screen.getByTitle('Close tag');
    closeButton.click();
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    consoleSpy.mockRestore();
  });
});
