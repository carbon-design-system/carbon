/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { ScrollGradient } from '../ScrollGradient';

const prefix = 'cds';
const blockClass = `${prefix}--scroll-gradient`;
const componentName = ScrollGradient.displayName;

const childDataTestId = 'scroll-gradient-child';
const childrenContent = (
  <div data-testid={childDataTestId} style={{ padding: 16 }}>
    <p>Lorem ipsum dolor sit amet.</p>
    <p>Lorem ipsum dolor sit amet.</p>
    <p>Lorem ipsum dolor sit amet.</p>
    <p>Lorem ipsum dolor sit amet.</p>
    <p>Lorem ipsum dolor sit amet.</p>
    <p>Lorem ipsum dolor sit amet.</p>
  </div>
);

const renderComponent = (props = {}, children = childrenContent) =>
  render(<ScrollGradient {...props}>{children}</ScrollGradient>);

describe(componentName, () => {
  it('renders the component', () => {
    const { container } = renderComponent({ 'data-testid': 'scroll-gradient' });
    expect(screen.getByTestId('scroll-gradient')).toHaveClass(blockClass);
    expect(container).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = renderComponent();
    expect(container).toHaveNoAxeViolations();
  });

  it('renders children', () => {
    renderComponent();
    expect(screen.getByTestId(childDataTestId)).toBeInTheDocument();
  });

  it('applies className to the containing node', () => {
    renderComponent({ className: 'my-custom-class', 'data-testid': 'root' });
    expect(screen.getByTestId('root')).toHaveClass('my-custom-class');
  });

  it('spreads additional props onto the containing node', () => {
    renderComponent({ 'data-testid': 'root', 'data-custom': 'value' });
    expect(screen.getByTestId('root')).toHaveAttribute('data-custom', 'value');
  });

  it('forwards a ref to the root element', () => {
    const ref = React.createRef();
    renderComponent({ ref });
    expect(ref.current).toHaveClass(blockClass);
  });

  it('forwards a ref to the scroll element via getScrollElementRef', () => {
    const scrollRef = React.createRef();
    renderComponent({ getScrollElementRef: (el) => (scrollRef.current = el) });
    expect(scrollRef.current).toHaveClass(`${blockClass}__content`);
  });

  it('adds the data-component-name attribute to the containing node', () => {
    renderComponent({ 'data-testid': 'root' });
    expect(screen.getByTestId('root')).toHaveAttribute(
      'data-component-name',
      componentName
    );
  });

  it('hides the start gradient when hideStartGradient is true', () => {
    const { container } = renderComponent({ hideStartGradient: true });
    expect(
      container.querySelector(`.${blockClass}__start-vertical`)
    ).not.toBeInTheDocument();
    expect(
      container.querySelector(`.${blockClass}__start-horizontal`)
    ).not.toBeInTheDocument();
  });

  it('shows the start gradient by default', () => {
    const { container } = renderComponent();
    expect(
      container.querySelector(`.${blockClass}__start-vertical`)
    ).toBeInTheDocument();
    expect(
      container.querySelector(`.${blockClass}__start-horizontal`)
    ).toBeInTheDocument();
  });

  it('always renders the end gradient elements', () => {
    const { container } = renderComponent();
    expect(
      container.querySelector(`.${blockClass}__end-vertical`)
    ).toBeInTheDocument();
    expect(
      container.querySelector(`.${blockClass}__end-horizontal`)
    ).toBeInTheDocument();
  });

  it('applies scrollElementClassName to the scroll container', () => {
    const { container } = renderComponent({
      scrollElementClassName: 'custom-scroll',
    });
    expect(container.querySelector(`.${blockClass}__content`)).toHaveClass(
      'custom-scroll'
    );
  });
});
