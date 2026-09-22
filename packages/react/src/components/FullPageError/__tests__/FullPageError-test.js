/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { FullPageError } from '../FullPageError';

const prefix = 'cds';
const blockClass = `${prefix}--full-page-error`;
const componentName = FullPageError.displayName;

const defaultProps = {
  title: 'An error occurred',
  label: 'Error ###',
  description: 'Something went wrong.',
};

describe(componentName, () => {
  it('renders a component FullPageError', () => {
    render(<FullPageError {...defaultProps} />);
    expect(screen.getByRole('main')).toHaveClass(blockClass);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<FullPageError {...defaultProps} />);
    expect(container).toHaveNoAxeViolations();
  });

  it('renders children', () => {
    render(
      <FullPageError {...defaultProps}>
        <span>child content</span>
      </FullPageError>
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });

  it('applies className to the containing node', () => {
    render(<FullPageError {...defaultProps} className="extra-class" />);
    expect(screen.getByRole('main')).toHaveClass('extra-class');
  });

  it('adds additional props to the containing node', () => {
    render(<FullPageError {...defaultProps} data-testid="test-node" />);
    expect(screen.getByTestId('test-node')).toBeInTheDocument();
  });

  it('forwards a ref to an appropriate node', () => {
    const ref = React.createRef();
    render(<FullPageError {...defaultProps} ref={ref} />);
    expect(ref.current).toHaveClass(blockClass);
  });

  it('adds the data-component-name attribute to the containing node', () => {
    render(<FullPageError {...defaultProps} data-testid="test-node" />);
    expect(screen.getByTestId('test-node')).toHaveAttribute(
      'data-component-name',
      componentName
    );
  });

  it('renders error label', () => {
    render(<FullPageError {...defaultProps} label="Error 404" />);
    const labelEl = screen.getByText('Error 404').closest('span');
    expect(labelEl).toContainHTML('<span aria-hidden="true">↳ </span>');
  });

  it('renders description', () => {
    render(<FullPageError {...defaultProps} />);
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
  });

  it('renders title', () => {
    render(<FullPageError {...defaultProps} />);
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
  });

  it('renders custom svg illustration if kind is custom', () => {
    const { container } = render(
      <FullPageError {...defaultProps} kind="custom" />
    );
    const svgElement = container.querySelector(`.${blockClass}__svg`);
    expect(svgElement).toHaveClass(`${blockClass}__custom`);
  });

  it('renders 404 svg illustration if kind is 404', () => {
    const { container } = render(
      <FullPageError {...defaultProps} kind="404" />
    );
    const svgElement = container.querySelector(`.${blockClass}__svg`);
    expect(svgElement).toHaveClass(`${blockClass}__404`);
  });

  it('renders 403 svg illustration if kind is 403', () => {
    const { container } = render(
      <FullPageError {...defaultProps} kind="403" />
    );
    const svgElement = container.querySelector(`.${blockClass}__svg`);
    expect(svgElement).toHaveClass(`${blockClass}__403`);
  });
});
