/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';

import { pkg } from '../../../settings';
import uuidv4 from '../../../global/js/utils/uuidv4';

import { FilterPanelCheckbox } from '.';

const blockClass = `${pkg.prefix}--filter-panel-checkbox`;
const componentName = FilterPanelCheckbox.displayName;

// values to use
const className = `class-${uuidv4()}`;
const count = 5;
const dataTestId = uuidv4();
const id = uuidv4();
const labelText = `hello, world (${uuidv4()})`;

const renderComponent = ({ ...rest } = {}) =>
  render(
    <FilterPanelCheckbox id={id} labelText={labelText} {...{ ...rest }} />
  );

describe(componentName, () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
  it('renders a component FilterPanelCheckbox', async () => {
    const { container } = renderComponent();

    // NOTE
    // FilterPanelCheckbox returns the Carbon Checkbox directly.
    // Carbon Checkbox renders and applies props as:
    //   <div className-prop-only>
    //     <checkbox all-other-props />
    //   </div>

    // Test wrapper div exists.
    expect(container.querySelector(`.${blockClass}`)).toBeInTheDocument();
    // Test checkbox exists.
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('renders a count', async () => {
    const filterPanelLabelClass = `${pkg.prefix}--filter-panel-label`;
    const { container } = renderComponent({ count });
    expect(
      container.querySelector(`.${filterPanelLabelClass}__count`).textContent
    ).toBe('5');
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
    renderComponent({ ref });
    expect(ref.current).toBeInTheDocument();
  });

  it('adds the Devtools attribute to the containing node', async () => {
    renderComponent({ 'data-testid': dataTestId });
    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      componentName
    );
  });
});
