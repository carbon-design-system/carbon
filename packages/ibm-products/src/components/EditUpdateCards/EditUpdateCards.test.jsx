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

import { EditUpdateCards } from '.';

const blockClass = `${pkg.prefix}--edit-update-cards`;
const componentName = EditUpdateCards.displayName;

// values to use
// const children = `hello, world (${uuidv4()})`;
const className = `class-${uuidv4()}`;
const dataTestId = uuidv4();

describe(componentName, () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('renders a component EditUpdateCards', async () => {
    render(<EditUpdateCards data-testid={dataTestId}> </EditUpdateCards>);
    expect(screen.getByTestId(dataTestId)).toHaveClass(blockClass);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<EditUpdateCards> </EditUpdateCards>);
    expect(container).toBeAccessible(componentName);
    expect(container).toHaveNoAxeViolations();
  });

  // it(`renders children`,  async () => {
  //  render(<EditUpdateCards>{children}</EditUpdateCards>);
  //   screen.getByText(children);
  // });

  it('applies className to the containing node', async () => {
    render(
      <EditUpdateCards className={className} data-testid={dataTestId}>
        {' '}
      </EditUpdateCards>
    );
    expect(screen.getByTestId(dataTestId)).toHaveClass(className);
  });

  it('adds additional props to the containing node', async () => {
    render(<EditUpdateCards data-testid={dataTestId}> </EditUpdateCards>);
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node', async () => {
    const ref = React.createRef();
    render(<EditUpdateCards ref={ref}> </EditUpdateCards>);
    expect(ref.current).toHaveClass(blockClass);
  });

  it('adds the Devtools attribute to the containing node', async () => {
    render(<EditUpdateCards data-testid={dataTestId}> </EditUpdateCards>);

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      componentName
    );
  });
});
