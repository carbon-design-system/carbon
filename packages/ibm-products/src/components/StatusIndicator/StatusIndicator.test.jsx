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

import { StatusIndicator, StatusIndicatorStep } from '.';

const blockClass = `${pkg.prefix}--status-indicator`;
const componentName = StatusIndicator.displayName;

// values to use
const className = `class-${uuidv4()}`;
const dataTestId = uuidv4();

const renderComponent = ({ ...rest } = {}) =>
  render(
    <StatusIndicator data-testid={dataTestId} {...rest}>
      <StatusIndicatorStep status="inactive" description="Waiting" />
    </StatusIndicator>
  );

describe(componentName, () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('renders a component StatusIndicator', async () => {
    renderComponent();
    screen.getByTestId(dataTestId);
  });

  it('renders a child component StatusIndicatorStep', async () => {
    renderComponent();
    expect(screen.getByText(/Waiting/)).toBeTruthy();
  });

  it('has no accessibility violations', async () => {
    const { container } = renderComponent();
    expect(container).toBeAccessible(componentName);
    expect(container).toHaveNoAxeViolations();
  });

  it('applies className to the containing node', async () => {
    renderComponent({ className: className });
    expect(screen.getByTestId(dataTestId)).toHaveClass(className);
  });

  it('adds additional props to the containing node', async () => {
    renderComponent({ className: className });
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node', async () => {
    const ref = React.createRef();
    renderComponent({ ref: ref });
    expect(ref.current).toHaveClass(blockClass);
  });

  it('adds the Devtools attribute to the containing node', async () => {
    renderComponent();
    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      componentName
    );
  });
});
