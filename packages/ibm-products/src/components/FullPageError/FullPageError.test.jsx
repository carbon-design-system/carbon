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

import { FullPageError } from '.';

const blockClass = `${pkg.prefix}--full-page-error`;
const componentName = FullPageError.displayName;

// values to use
const children = `hello, world (${uuidv4()})`;
const className = `class-${uuidv4()}`;
const dataTestId = uuidv4();

const label = uuidv4();
const description = uuidv4();
const ref = React.createRef();
const title = uuidv4();
const defaultProps = {
  title,
  className,
  label,
  description,
  ref,
  'data-testid': dataTestId,
};

describe(componentName, () => {
  it('renders a component FullPageError', () => {
    render(<FullPageError {...defaultProps} />);
    expect(screen.getByRole('main')).toHaveClass(blockClass);
  });

  it('has no accessibility violations', () => {
    const { container } = render(<FullPageError {...defaultProps} />);
    expect(container).toBeAccessible(componentName);
    expect(container).toHaveNoAxeViolations();
  });

  it('renders children', () => {
    render(<FullPageError {...defaultProps}>{children}</FullPageError>);
    expect(screen.getByText(children)).toBeInTheDocument();
  });

  it('applies className to the containing node', () => {
    render(<FullPageError {...defaultProps} />);
    expect(screen.getByRole('main')).toHaveClass(className);
  });

  it('adds additional props to the containing node', () => {
    render(<FullPageError {...defaultProps} />);
    expect(screen.getByTestId(dataTestId)).toBeInTheDocument();
  });

  it('forwards a ref to an appropriate node', () => {
    const ref = React.createRef();
    render(<FullPageError {...defaultProps} ref={ref} />);
    expect(ref.current).toHaveClass(blockClass);
  });

  it('adds the Devtools attribute to the containing node', () => {
    render(<FullPageError {...defaultProps} />);
    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      componentName
    );
  });

  it('renders error label', () => {
    render(<FullPageError {...defaultProps} />);
    const labelElement = screen.getByText(label).closest('span');
    expect(labelElement).toContainHTML('<span aria-hidden="true">↳ </span>');
  });

  it('renders description', () => {
    render(<FullPageError {...defaultProps} />);
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('renders title', () => {
    render(<FullPageError {...defaultProps} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });
  it('renders custom svg illustration if kind is custom', async () => {
    const { container } = render(
      <FullPageError {...defaultProps} kind="custom" />
    );
    const svgElement = container.querySelector(`.${blockClass}__svg`);
    expect(svgElement).toHaveClass(`${blockClass}__custom`);
  });
  it('renders 404 svg illustration if kind is 404', async () => {
    const { container } = render(
      <FullPageError {...defaultProps} kind="404" />
    );
    const svgElement = container.querySelector(`.${blockClass}__svg`);
    expect(svgElement).toHaveClass(`${blockClass}__404`);
  });
  it('renders 403 svg illustration if kind is 403', async () => {
    const { container } = render(
      <FullPageError {...defaultProps} kind="403" />
    );
    const svgElement = container.querySelector(`.${blockClass}__svg`);
    expect(svgElement).toHaveClass(`${blockClass}__403`);
  });
});
