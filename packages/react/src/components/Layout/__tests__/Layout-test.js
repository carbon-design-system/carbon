/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { Layout, LayoutConstraint } from '../';

const prefix = 'cds';

describe('Layout', () => {
  it('should render a custom element when "as" prop is provided', () => {
    render(<Layout as="section">Content inside section</Layout>);
    const sectionElement = screen.getByText('Content inside section');
    expect(sectionElement.tagName).toBe('SECTION');
  });

  it('should apply the correct size class for Layout', () => {
    const { container } = render(<Layout size="lg">Content</Layout>);
    expect(container.firstChild).toHaveClass(`${prefix}--layout--size-lg`);
  });

  it('should apply the correct density class for Layout', () => {
    const { container } = render(<Layout density="condensed">Content</Layout>);
    expect(container.firstChild).toHaveClass(
      `${prefix}--layout--density-condensed`
    );
  });

  it('should apply custom class name to Layout', () => {
    const { container } = render(
      <Layout className="custom-class">Content</Layout>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should render children inside Layout', () => {
    render(<Layout>Child Content</Layout>);
    const child = screen.getByText('Child Content');
    expect(child).toBeInTheDocument();
  });
});

describe('LayoutConstraint', () => {
  it('should render a custom element when "as" prop is provided for LayoutConstraint', () => {
    render(
      <LayoutConstraint as="article">Content inside article</LayoutConstraint>
    );
    const articleElement = screen.getByText('Content inside article');
    expect(articleElement.tagName).toBe('ARTICLE');
  });

  it('should apply correct size constraints for LayoutConstraint', () => {
    const { container } = render(
      <LayoutConstraint size={{ min: 'sm', default: 'md', max: 'xl' }}>
        Content
      </LayoutConstraint>
    );
    expect(container.firstChild).toHaveClass(
      `${prefix}--layout-constraint--size__default-md`
    );
    expect(container.firstChild).toHaveClass(
      `${prefix}--layout-constraint--size__min-sm`
    );
    expect(container.firstChild).toHaveClass(
      `${prefix}--layout-constraint--size__max-xl`
    );
  });

  it('should apply correct density constraints for LayoutConstraint', () => {
    const { container } = render(
      <LayoutConstraint
        density={{ min: 'normal', default: 'condensed', max: 'normal' }}>
        Content
      </LayoutConstraint>
    );
    expect(container.firstChild).toHaveClass(
      `${prefix}--layout-constraint--density__default-condensed`
    );
    expect(container.firstChild).toHaveClass(
      `${prefix}--layout-constraint--density__min-normal`
    );
    expect(container.firstChild).toHaveClass(
      `${prefix}--layout-constraint--density__max-normal`
    );
  });

  it('should apply custom class name to LayoutConstraint', () => {
    const { container } = render(
      <LayoutConstraint className="custom-class">Content</LayoutConstraint>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should render children inside LayoutConstraint', () => {
    render(<LayoutConstraint>Constraint Child Content</LayoutConstraint>);
    const child = screen.getByText('Constraint Child Content');
    expect(child).toBeInTheDocument();
  });
});
