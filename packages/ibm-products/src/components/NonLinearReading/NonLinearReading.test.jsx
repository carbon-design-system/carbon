/**
 * Copyright IBM Corp. 2023, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen, act } from '@testing-library/react'; // https://testing-library.com/docs/react-testing-library/intro
import userEvent from '@testing-library/user-event';

import { pkg } from '../../settings';
import uuidv4 from '../../global/js/utils/uuidv4';

import { NonLinearReading } from '.';

const { click } = userEvent;

const blockClass = `${pkg.prefix}--non-linear-reading`;
const componentName = NonLinearReading.displayName;

const definition = `definition (${uuidv4()})`;
const children = `term (${uuidv4()})`;
const className = `class-${uuidv4()}`;
const dataTestId = uuidv4();

const renderComponent = ({ ...rest } = {}) => {
  return render(
    <NonLinearReading definition={definition} {...rest}>
      {children}
    </NonLinearReading>
  );
};

describe(componentName, () => {
  it('has no accessibility violations', async () => {
    const { container } = renderComponent();
    await expect(container).toBeAccessible(componentName);
    await expect(container).toHaveNoAxeViolations();
  });

  it(`renders children`, () => {
    renderComponent();
    screen.getByText(children);
  });

  it('applies className to the containing node', () => {
    renderComponent({ className: className });
    expect(document.querySelector(`.${className}`)).toBeInTheDocument();
  });

  it('adds additional props to the containing node', () => {
    renderComponent({ 'data-testid': dataTestId });
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node', () => {
    const ref = React.createRef();
    renderComponent({ ref: ref });
    expect(ref.current).toHaveClass(blockClass);
  });

  it('adds the Devtools attribute to the containing node', () => {
    renderComponent({ 'data-testid': dataTestId });
    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      componentName
    );
  });

  it('shows extra content when button is toggled open', async () => {
    const { container } = renderComponent();
    const button = container.querySelector('button');
    await act(() => click(button));
    expect(screen.queryByText(definition)).toBeInTheDocument();
  });

  it('hides extra content when button is toggled closed', async () => {
    const { container } = renderComponent();
    const button = container.querySelector('button');
    // render/expand content
    await act(() => click(button));
    expect(screen.queryByText(definition)).toBeInTheDocument();
    // "un-render"/collapse content
    await act(() => click(button));
    expect(screen.queryByText(definition)).not.toBeInTheDocument();
  });
});
