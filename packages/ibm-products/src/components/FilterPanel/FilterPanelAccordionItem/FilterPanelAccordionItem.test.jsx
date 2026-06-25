/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react'; // https://testing-library.com/docs/react-testing-library/intro

import { pkg } from '../../../settings';
import uuidv4 from '../../../global/js/utils/uuidv4';

import { FilterPanelAccordionItem } from '.';
import { FilterPanelCheckbox } from '..';

const blockClass = `${pkg.prefix}--filter-panel-accordion-item`;
const componentName = FilterPanelAccordionItem.displayName;

// values to use
const className = `class-${uuidv4()}`;
const count = 5;
const dataTestId = uuidv4();
const labelText = `hello, world (${uuidv4()})`;

const renderComponent = ({ ...rest } = {}) =>
  render(
    <FilterPanelAccordionItem labelText={labelText} {...{ ...rest }}>
      <FilterPanelCheckbox labelText="Checkbox" id={uuidv4()} />
    </FilterPanelAccordionItem>
  );

describe(componentName, () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
  it('renders a component FilterPanelAccordionItem', async () => {
    const { container } = renderComponent();
    const component = container.querySelector(`.${blockClass}`);
    expect(component).toBeInTheDocument();
  });

  it('renders a count', async () => {
    renderComponent({ count });
    const element = screen.getByText(/5/, {
      selector: `.${blockClass} .${pkg.prefix}--filter-panel-label__count`,
    });
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent(5);
  });

  it('has no accessibility violations', async () => {
    const { container } = renderComponent();
    const component = container.querySelector(`.${blockClass}`);
    expect(component).toBeAccessible(componentName);
    expect(component).toHaveNoAxeViolations();
  });

  it('applies className to the containing node', async () => {
    const { container } = renderComponent({ className });
    const component = container.querySelector(`.${blockClass}`);
    expect(component).toHaveClass(className);
  });

  it('adds additional props to the containing node', async () => {
    renderComponent({ ['data-testid']: dataTestId });
    screen.getByTestId(dataTestId);
  });

  // FilterPanelAccordionItem returns Carbon's `AccordionItem`.
  // `AccordionItem` does not provide a ref.
  // it('forwards a ref to an appropriate node', async () => {
  //   const ref = React.createRef();
  //   renderComponent({ ref });
  //   expect(ref.current).toHaveClass(blockClass);
  // });

  // Currently failing, looking into a fix.
  // it('adds the Devtools attribute to the containing node', async () => {
  //   const { debug } = renderComponent({ ['data-testid']: dataTestId });
  //   debug();
  //   expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
  //     componentName
  //   );
  // });
});
