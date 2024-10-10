/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Add } from '@carbon/icons-react';
import { getByRole, render, screen } from '@testing-library/react';
import React from 'react';
import Tag, { SelectableTag, TagSkeleton } from './';
import DismissibleTag from './DismissibleTag';
import { AILabel } from '../AILabel';
import { waitForPosition } from '../ListBox/test-helpers';
import userEvent from '@testing-library/user-event';

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

  describe('Selectable Tag', () => {
    it('should render a selectable tag', () => {
      const { container } = render(<SelectableTag text="Tag content" />);

      const selectableTag = container.querySelector(
        `.${prefix}--tag--selectable`
      );

      expect(selectableTag).toHaveClass(`${prefix}--tag--selectable`);
    });

    it('should select the selectable tag', async () => {
      const { container } = render(<SelectableTag text="Tag content" />);

      const selectableTag = container.querySelector(
        `.${prefix}--tag--selectable`
      );

      await userEvent.click(selectableTag);
      expect(selectableTag).toHaveAttribute('aria-pressed', 'true');
      expect(selectableTag).toHaveClass(`${prefix}--tag--selectable-selected`);
    });
  });

  describe('Skeleton Tag', () => {
    it('should render a skeleton state', () => {
      const { container } = render(<TagSkeleton />);

      const selectWrapper = container.querySelector(`.${prefix}--tag`);

      expect(selectWrapper).toHaveClass(`${prefix}--skeleton`);
    });

    it('should render a skeleton state with a small size', () => {
      const { container } = render(<TagSkeleton size="sm" />);

      const selectWrapper = container.querySelector(`.${prefix}--tag`);

      expect(selectWrapper).toHaveClass(`${prefix}--layout--size-sm`);
    });
  });
});
