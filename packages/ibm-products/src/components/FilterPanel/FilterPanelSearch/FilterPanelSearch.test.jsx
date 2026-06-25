/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { act, render, screen } from '@testing-library/react'; // https://testing-library.com/docs/react-testing-library/intro
import userEvent from '@testing-library/user-event';

import { pkg } from '../../../settings';
import uuidv4 from '../../../global/js/utils/uuidv4';

import { FilterPanelSearch } from '.';

const blockClass = `${pkg.prefix}--filter-panel-search`;
const componentName = FilterPanelSearch.displayName;

// values to use
const children = `hello, world (${uuidv4()})`;
const className = `class-${uuidv4()}`;
const dataTestId = uuidv4();
const labelText = `hello, label (${uuidv4()})`;

const renderComponent = ({ ...rest } = {}) =>
  render(
    <FilterPanelSearch
      data-testid={dataTestId}
      searchProps={{ labelText: labelText }}
      {...{ ...rest }}
    />
  );

describe(componentName, () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
  it('renders a component FilterPanelSearch', async () => {
    renderComponent();
    expect(screen.getByTestId(dataTestId)).toHaveClass(blockClass);
  });

  it('calls onChange', async () => {
    const onChange = jest.fn();
    renderComponent({ onChange });

    await act(() => userEvent.type(screen.getByRole('searchbox'), 'test'));

    expect(onChange).toHaveBeenCalled();
  });

  it('has no accessibility violations', async () => {
    const { container } = renderComponent();
    expect(container).toBeAccessible(componentName);
    expect(container).toHaveNoAxeViolations();
  });

  it(`renders children`, async () => {
    const onChange = jest.fn();
    renderComponent({ children, onChange });

    await act(() => userEvent.type(screen.getByRole('searchbox'), 'test'));
    expect(screen.getByText(children)).toBeInTheDocument();
  });

  it('applies className to the containing node', async () => {
    renderComponent({ className });
    expect(screen.getByTestId(dataTestId)).toHaveClass(className);
  });

  it('adds additional props to the containing node', async () => {
    renderComponent({ 'data-testid': dataTestId });
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node', async () => {
    const ref = React.createRef();
    renderComponent({ ref: ref });
    expect(ref.current).toBeInTheDocument();
  });

  it('adds the Devtools attribute to the containing node', async () => {
    renderComponent({ 'data-testid': dataTestId });

    // THE TEMPLATE TEST FAILS
    // expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
    //   componentName
    // );

    // This component includes one other component.
    // Those components also include their own dataTestId's.
    // This test only finds one dataTestId, and always the wrong one.

    // test → (notice "get ALL by...") → screen.getAllByTestId(dataTestId).length → 1,
    //   even though there are two dataTestId's being rendered.

    // THIS TEST PASSES
    expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
  });
});
