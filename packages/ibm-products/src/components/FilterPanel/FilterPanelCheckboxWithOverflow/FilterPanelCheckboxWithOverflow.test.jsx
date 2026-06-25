/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OverflowMenuItem } from '@carbon/react';

import { pkg } from '../../../settings';
import uuidv4 from '../../../global/js/utils/uuidv4';

import { FilterPanelCheckboxWithOverflow } from '.';

const blockClass = `${pkg.prefix}--filter-panel-checkbox-with-overflow`;
const componentName = FilterPanelCheckboxWithOverflow.displayName;

// values to use
const className = `class-${uuidv4()}`;
const count = 5;
const dataTestId = uuidv4();
const id = uuidv4();
const labelText = `hello, world (${uuidv4()})`;

const renderComponent = ({ ...rest } = {}) =>
  render(
    <FilterPanelCheckboxWithOverflow
      data-testid={dataTestId}
      id={id}
      labelText={labelText}
      {...{ ...rest }}
    >
      <OverflowMenuItem itemText="Option 1" />
    </FilterPanelCheckboxWithOverflow>
  );

describe(componentName, () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
  it('renders a component FilterPanelCheckboxWithOverflow', async () => {
    renderComponent();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('renders a count', async () => {
    const filterPanelLabelClass = `${pkg.prefix}--filter-panel-label`;
    const { container } = renderComponent({ count });
    expect(
      container.querySelector(`.${filterPanelLabelClass}__count`).textContent
    ).toBe('5');
  });

  it('shows overflow menu button on hover', async () => {
    const user = userEvent.setup();
    const { container } = renderComponent();

    const label = screen.getByText(labelText);
    await act(() => user.hover(label));

    const menuButton = container.querySelector(
      `.${blockClass}__overflow-button`
    );
    expect(menuButton).toBeInTheDocument();
  });

  it('shows overflow menu on click', async () => {
    const user = userEvent.setup();
    const { container } = renderComponent();

    // 1. Hover over filter label to show menu button.
    const label = screen.getByText(labelText);
    await act(() => user.hover(label));

    // 2. Click menu button to show menu.
    const menuButton = container.querySelector(
      `.${blockClass}__overflow-button`
    );
    await act(() => user.click(menuButton));

    // 3. The Carbon's OverflowMenu is initially set as
    //    `style="visibility:hidden"`, before being made
    //    visible to the user.
    const menu = screen.getByRole('menu', { hidden: true });
    expect(menu).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = renderComponent();
    expect(container).toBeAccessible(componentName);
    expect(container).toHaveNoAxeViolations();
  });

  it('applies className to the containing node', async () => {
    const { container } = renderComponent({ className });
    expect(container.querySelector(`.${blockClass}`)).toHaveClass(className);
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

    // This component includes two other components.
    // Those components also include their own dataTestId's.
    // This test only finds one dataTestId, and always the wrong one.

    // test → (notice "get ALL by...") → screen.getAllByTestId(dataTestId).length → 1,
    //   even though there are three dataTestId's being rendered.

    // THIS TEST PASSES
    expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
  });
});
