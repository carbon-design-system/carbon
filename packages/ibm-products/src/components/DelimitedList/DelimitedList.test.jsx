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

import { DelimitedList } from '.';

const blockClass = `${pkg.prefix}--delimited-list`;
const componentName = DelimitedList.displayName;

// values to use
const className = `class-${uuidv4()}`;
const dataTestId = uuidv4();

describe(componentName, () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('renders a component DelimitedList', async () => {
    render(<DelimitedList />);
    expect(document.querySelectorAll(`.${blockClass}`).length).toBe(1);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<DelimitedList />);
    expect(container).toBeAccessible(componentName);
    expect(container).toHaveNoAxeViolations();
  });

  it('applies className to the containing node', async () => {
    render(<DelimitedList className={className} />);
    expect(document.querySelector(`.${blockClass}`)).toHaveClass(className);
  });

  it('adds additional props to the containing node', async () => {
    render(<DelimitedList data-testid={dataTestId} />);
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node', async () => {
    const ref = React.createRef();
    render(<DelimitedList ref={ref} />);
    expect(ref.current).toHaveClass(blockClass);
  });

  it('adds the Devtools attribute to the containing node', async () => {
    render(<DelimitedList data-testid={dataTestId} />);

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      componentName
    );
  });

  it('delimits a list using a comma', async () => {
    render(<DelimitedList delimiter=", " items={['Item 1', 'Item 2']} />);
    expect(screen.getByText(/Item 1, Item 2/)).toBeInTheDocument();
  });

  // `testing-library` only renders HTML using jsdom, and CSS is never
  // applied. As such, the CSS-only properties used to shorten a list
  // and append "..." can't be tested for.

  // it('truncates a list using an ellipsis', async () => {
  //   render(
  //     <div style={{ width: '8rem' }}>
  //       <DelimitedList
  //         delimiter=", "
  //         items={['Item 1', 'Item 2', 'Item 3', 'Item 4']}
  //       />
  //     </div>
  //   );
  //   expect(screen.getByText(/Item 1, Item 2, It.../)).toBeInTheDocument();
  // });
});
