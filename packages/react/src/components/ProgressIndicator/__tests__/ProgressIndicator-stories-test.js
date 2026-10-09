/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Default, Interactive, Skeleton } from '../ProgressIndicator.stories';

jest.mock('storybook/actions', () => ({ action: () => jest.fn() }));
jest.mock('../ProgressIndicator.mdx', () => ({}));

describe('ProgressIndicator story controls', () => {
  it('updates the default story from args', () => {
    const { rerender } = render(<Default {...Default.args} />);

    rerender(
      <Default
        {...Default.args}
        currentIndex={2}
        spaceEqually
        secondaryLabel="Updated label"
      />
    );

    expect(screen.getByRole('list')).toHaveClass('cds--progress--space-equal');
    expect(screen.getAllByRole('listitem')[2]).toHaveClass(
      'cds--progress-step--current'
    );
    expect(screen.getByText('Updated label')).toBeInTheDocument();

    rerender(<Default {...Default.args} vertical spaceEqually />);
    expect(screen.getByRole('list')).toHaveClass('cds--progress--vertical');
    expect(screen.getByRole('list')).not.toHaveClass(
      'cds--progress--space-equal'
    );
  });

  it('updates the interactive story and calls the supplied onChange', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const { rerender } = render(
      <Interactive {...Interactive.args} onChange={onChange} />
    );

    rerender(
      <Interactive
        {...Interactive.args}
        currentIndex={2}
        vertical
        onChange={onChange}
      />
    );
    expect(screen.getByRole('list')).toHaveClass('cds--progress--vertical');
    expect(screen.getAllByRole('listitem')[2]).toHaveClass(
      'cds--progress-step--current'
    );

    await user.click(screen.getByRole('button', { name: 'Click me Complete' }));
    expect(onChange).toHaveBeenCalledWith(0);
  });

  it('updates the skeleton orientation', () => {
    const { rerender } = render(<Skeleton {...Skeleton.args} />);
    expect(screen.getByRole('list')).not.toHaveClass('cds--progress--vertical');

    rerender(<Skeleton {...Skeleton.args} vertical />);
    expect(screen.getByRole('list')).toHaveClass('cds--progress--vertical');
  });
});
