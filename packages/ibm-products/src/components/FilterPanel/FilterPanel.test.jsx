/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';

import { pkg } from '../../settings';
import uuidv4 from '../../global/js/utils/uuidv4';

import { FilterPanel } from '.';

const blockClass = `${pkg.prefix}--filter-panel`;
const componentName = FilterPanel.displayName;

// values to use
const children = `hello, world (${uuidv4()})`;
const className = `class-${uuidv4()}`;
const dataTestId = uuidv4();

const renderComponent = ({ ...rest } = {}) =>
  render(<FilterPanel data-testid={dataTestId} {...{ ...rest }} />);

describe(componentName, () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
  it('renders a component FilterPanel', async () => {
    renderComponent();
    expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = renderComponent();
    expect(container).toBeAccessible(componentName);
    expect(container).toHaveNoAxeViolations();
  });

  it(`renders children`, async () => {
    renderComponent({ children });
    expect(screen.getByText(children)).toBeInTheDocument();
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
});
