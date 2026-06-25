/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react'; // https://testing-library.com/docs/react-testing-library/intro

import { pkg } from '../../settings';
import uuidv4 from '../../global/js/utils/uuidv4';

import { EditTearsheetNarrow } from '.';

const blockClass = `${pkg.prefix}--edit-tearsheet-narrow`;
const componentName = EditTearsheetNarrow.displayName;

// values to use
const children = `hello, world (${uuidv4()})`;
const className = `class-${uuidv4()}`;
const dataTestId = uuidv4();

describe(componentName, () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('renders a component EditTearsheetNarrow', async () => {
    render(<EditTearsheetNarrow> </EditTearsheetNarrow>);
    expect(screen.getByRole('main')).toHaveClass(blockClass);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<EditTearsheetNarrow> </EditTearsheetNarrow>);
    expect(container).toBeAccessible(componentName);
    expect(container).toHaveNoAxeViolations();
  });

  it(`renders children`, async () => {
    render(<EditTearsheetNarrow>{children}</EditTearsheetNarrow>);
    screen.getByText(children);
  });

  it('applies className to the containing node', async () => {
    render(<EditTearsheetNarrow className={className}> </EditTearsheetNarrow>);
    expect(screen.getByRole('main')).toHaveClass(className);
  });

  it('adds additional props to the containing node', async () => {
    render(
      <EditTearsheetNarrow data-testid={dataTestId}> </EditTearsheetNarrow>
    );
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node', async () => {
    const ref = React.createRef();
    render(<EditTearsheetNarrow ref={ref}> </EditTearsheetNarrow>);
    expect(ref.current).toHaveClass(blockClass);
  });

  it('adds the Devtools attribute to the containing node', async () => {
    render(
      <EditTearsheetNarrow data-testid={dataTestId}> </EditTearsheetNarrow>
    );

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      componentName
    );
  });
});
