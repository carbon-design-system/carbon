/**
 * Copyright IBM Corp. 2023, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react'; // https://testing-library.com/docs/react-testing-library/intro

import uuidv4 from '../../global/js/utils/uuidv4';

import { TooltipTrigger } from '.';

const componentName = TooltipTrigger.displayName;

const className = `class-${uuidv4()}`;

// render an TooltipTrigger with button labels and any other required props
const renderComponent = ({ children, ...rest }) =>
  render(<TooltipTrigger {...rest}>{children}</TooltipTrigger>);

describe(componentName, () => {
  it('renders a component TooltipTrigger', () => {
    renderComponent({});
  });

  it('has no accessibility violations', async () => {
    renderComponent({});
  });

  it('applies className to the containing node', () => {
    renderComponent({ className });
    expect(screen.getByRole('button')).toHaveClass(className);
  });

  it('applies className to the containing node', () => {
    const testText = 'Test child';
    renderComponent({ children: testText });
    screen.getByText(testText);
  });
});
