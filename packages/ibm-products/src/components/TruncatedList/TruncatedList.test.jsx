/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react'; // https://testing-library.com/docs/react-testing-library/intro

import { pkg } from '../../settings';
import uuidv4 from '../../global/js/utils/uuidv4';

import { TruncatedList } from '.';
import { ListItem } from '@carbon/react';

const blockClass = `${pkg.prefix}--truncated-list`;
const componentName = TruncatedList.displayName;

// values to use
const className = `class-${uuidv4()}`;
const dataTestId = uuidv4();

describe(componentName, () => {
  const { getComputedStyle } = window;

  beforeEach(() => {
    window.getComputedStyle = jest.fn();
  });

  afterEach(() => {
    window.getComputedStyle = getComputedStyle;
  });

  it('renders a component TruncatedList', async () => {
    render(
      <TruncatedList data-testid={dataTestId}>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
      </TruncatedList>
    );
    expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <TruncatedList>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
      </TruncatedList>
    );
    expect(container).toBeAccessible(componentName);
    expect(container).toHaveNoAxeViolations();
  });

  it(`renders children`, async () => {
    render(
      <TruncatedList>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
      </TruncatedList>
    );
    screen.getByText(/Item 2/);
  });

  it('applies className to the containing node', async () => {
    render(
      <TruncatedList data-testid={dataTestId} className={className}>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
      </TruncatedList>
    );
    expect(screen.getByTestId(dataTestId)).toHaveClass(className);
  });

  it('adds additional props to the containing node', async () => {
    render(
      <TruncatedList data-testid={dataTestId}>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
      </TruncatedList>
    );
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node', async () => {
    const ref = React.createRef();
    render(
      <TruncatedList ref={ref}>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
      </TruncatedList>
    );
    expect(ref.current).toHaveClass(blockClass);
  });

  it('adds the Devtools attribute to the containing node', async () => {
    render(
      <TruncatedList data-testid={dataTestId}>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
      </TruncatedList>
    );

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      componentName
    );
  });

  it('renders a limited number of items when collapsed', async () => {
    const { container } = render(
      <TruncatedList collapsedItemsLimit={2} expandedItemsLimit={4}>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
        <ListItem>Item 3</ListItem>
        <ListItem>Item 4</ListItem>
        <ListItem>Item 5</ListItem>
      </TruncatedList>
    );

    expect(container.getElementsByTagName('li').length).toBe(2);
  });
});
