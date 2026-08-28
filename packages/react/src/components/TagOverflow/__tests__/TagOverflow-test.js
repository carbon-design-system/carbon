/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { TagOverflow } from '..';
import { fiveTags } from '../utils';

const prefix = 'cds';
const blockClass = `${prefix}--tag-overflow`;
const componentName = TagOverflow.displayName;

// Values to use
const className = 'test-class';
const dataTestId = 'tag-overflow-test-id';
const tagWidth = 60;

const tagOverflowProps = {
  items: fiveTags,
};

describe(componentName, () => {
  let warn;

  beforeEach(() => {
    warn = jest.spyOn(console, 'warn').mockImplementation(jest.fn());
    window.innerWidth = 500;
    fireEvent(window, new Event('resize'));
  });

  afterEach(() => {
    warn.mockRestore();
  });

  it('renders a component TagOverflow', async () => {
    render(<TagOverflow data-testid={dataTestId} />);
    expect(screen.getByTestId(dataTestId)).toHaveClass(blockClass);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<TagOverflow />);
    expect(container).toHaveNoAxeViolations();
  });

  it('applies className to the containing node', async () => {
    render(<TagOverflow className={className} data-testid={dataTestId} />);
    expect(screen.getByTestId(dataTestId)).toHaveClass(className);
  });

  it('adds additional props to the containing node', async () => {
    render(<TagOverflow data-testid={dataTestId} />);
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node', async () => {
    const ref = React.createRef();
    render(<TagOverflow ref={ref} />);
    expect(ref.current).toHaveClass(blockClass);
  });

  it('adds the Devtools attribute to the containing node', async () => {
    render(<TagOverflow data-testid={dataTestId} />);
    expect(screen.getByTestId(dataTestId)).toHaveAttribute(
      'data-component-name',
      componentName
    );
  });

  it('renders all as visible tags when space is available', async () => {
    const tagCount = tagOverflowProps.items.length;
    window.innerWidth = tagWidth * tagCount + 40;

    render(<TagOverflow {...tagOverflowProps} />);

    const firstTagLabel = tagOverflowProps.items[0].label;
    const lastTagLabel = tagOverflowProps.items[tagCount - 1].label;

    screen.getByText(firstTagLabel, {
      selector: `.${blockClass}__item--tag span`,
    });

    screen.getByText(lastTagLabel, {
      selector: `.${blockClass}__item--tag span`,
    });
  });

  it('obeys max visible', async () => {
    render(<TagOverflow {...tagOverflowProps} maxVisible={3} />);
    await waitFor(() => {
      expect(screen.getByText('+2')).toBeTruthy();
    });
  });
});
