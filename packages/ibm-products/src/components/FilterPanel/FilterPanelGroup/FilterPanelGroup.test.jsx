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

import { FilterPanelGroup } from '.';

const blockClass = `${pkg.prefix}--filter-panel-group`;
const componentName = FilterPanelGroup.displayName;

// values to use
const children = `hello, world (${uuidv4()})`;
const className = `class-${uuidv4()}`;
const dataTestId = uuidv4();
const count = 5;
const labelText = `hello, world (${uuidv4()})`;

const renderComponent = ({ ...rest } = {}) =>
  render(
    <FilterPanelGroup
      data-testid={dataTestId}
      labelText={labelText}
      {...{ ...rest }}
    >
      {children}
    </FilterPanelGroup>
  );

describe(componentName, () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
  it('renders a component FilterPanelGroup', async () => {
    renderComponent();
    expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
  });

  it('renders a count', async () => {
    const { container } = renderComponent({ count: count });
    expect(
      container.querySelector(`.${pkg.prefix}--filter-panel-label__count`)
        .textContent
    ).toBe('5');
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

  it('forwards a ref to an appropriate node', async () => {
    const ref = React.createRef();
    renderComponent({ className: className, ref: ref });
    expect(ref.current).toHaveClass(blockClass);
  });

  it('adds the Devtools attribute to the containing node', async () => {
    renderComponent();

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      componentName
    );
  });
});
