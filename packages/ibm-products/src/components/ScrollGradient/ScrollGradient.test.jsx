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

import { ScrollGradient } from '.';

const blockClass = `${pkg.prefix}--scroll-gradient`;
const componentName = ScrollGradient.displayName;

// values to use
const className = `class-${uuidv4()}`;
const dataTestId = uuidv4();
const childDataTestId = `child-element-${uuidv4()}`;

const contentBlockClass = `${blockClass}__content`;
// cSpell:dictionaries lorem-ipsum
const storyCopy = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet rerum aliquid perferendis, nulla nam ad excepturi, iure earum dolorum ipsa quae cum voluptatibus nemo quis debitis, aperiam repudiandae dolore deleniti.`;

const childrenContent = (
  <div style={{ padding: 16 }} data-testid={childDataTestId}>
    <p>{storyCopy}</p>
    <p>{storyCopy}</p>
    <p>{storyCopy}</p>
    <p>{storyCopy}</p>
    <p>{storyCopy}</p>
    <p>{storyCopy}</p>
  </div>
);

const renderComponent = ({ ...rest } = {}, children = childrenContent) =>
  render(<ScrollGradient {...rest}>{children}</ScrollGradient>);

describe(componentName, () => {
  it('renders a component ScrollGradient', async () => {
    renderComponent({ 'data-testid': dataTestId });
    expect(screen.getByTestId(dataTestId)).toHaveClass(blockClass);
  });

  it('has no accessibility violations', async () => {
    const { container } = renderComponent({ 'data-testid': dataTestId });
    expect(container).toBeAccessible(componentName);
    expect(container).toHaveNoAxeViolations();
  });

  it(`renders children`, async () => {
    renderComponent({ 'data-testid': dataTestId });
    screen.getByTestId(childDataTestId);
  });

  it('applies className to the containing node', async () => {
    renderComponent({
      className,
      'data-testid': dataTestId,
    });
    expect(screen.getByTestId(dataTestId)).toHaveClass(className);
  });

  it('adds additional props to the containing node', async () => {
    renderComponent({ 'data-testid': dataTestId });
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node (root element)', async () => {
    const ref = React.createRef();
    renderComponent({ ref });
    expect(ref.current).toHaveClass(blockClass);
  });

  it('forwards a ref to an appropriate node (scroll element)', async () => {
    const scrollingElement = React.createRef();
    const scrollContainerElement = (el) => (scrollingElement.current = el);
    renderComponent({ getScrollElementRef: scrollContainerElement });
    expect(scrollingElement.current).toHaveClass(contentBlockClass);
  });

  it('adds the Devtools attribute to the containing node', async () => {
    renderComponent({ 'data-testid': dataTestId });
    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      componentName
    );
  });
});
