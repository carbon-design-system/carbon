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

import { FilterPanelLabel } from '.';

const blockClass = `${pkg.prefix}--filter-panel-label`;
const componentName = FilterPanelLabel.displayName;

// values to use
const className = `class-${uuidv4()}`;
const count = 5;
const dataTestId = uuidv4();
const labelText = `hello, world (${uuidv4()})`;

const renderComponent = ({ ...rest } = {}) =>
  render(
    <FilterPanelLabel
      data-testid={dataTestId}
      labelText={labelText}
      {...{ ...rest }}
    />
  );

describe(componentName, () => {
  it('renders a component FilterPanelLabel', async () => {
    renderComponent();
    expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
  });

  it('renders a count', async () => {
    const { container } = renderComponent({ count });
    expect(container.querySelector(`.${blockClass}__count`).textContent).toBe(
      '5'
    );
  });

  it('has no accessibility violations', async () => {
    const { container } = renderComponent();
    expect(container).toBeAccessible(componentName);
    expect(container).toHaveNoAxeViolations();
  });

  it('applies className to the containing node', async () => {
    renderComponent({ className });
    expect(screen.getByTestId(dataTestId)).toHaveClass(className);
  });

  it('forwards a ref to an appropriate node', async () => {
    const ref = React.createRef();
    renderComponent({ className, ref });
    expect(ref.current).toHaveClass(blockClass);
  });

  it('adds the Devtools attribute to the containing node', async () => {
    renderComponent();

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      componentName
    );
  });
});
