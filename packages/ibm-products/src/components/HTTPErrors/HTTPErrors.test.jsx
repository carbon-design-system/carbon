/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';

import { pkg } from '../../settings';

import uuidv4 from '../../global/js/utils/uuidv4';

import { HTTPError404 } from './HTTPError404';
import { HTTPError403 } from './HTTPError403';
import { HTTPErrorOther } from './HTTPErrorOther';

const blockClass = `${pkg.prefix}--http-errors`;
const componentName = HTTPError404.displayName;

const dataTestId = uuidv4();
const className = 'className';
const errorCodeLabel = uuidv4();
const description = uuidv4();
const ref = React.createRef();
const title = uuidv4();
const defaultProps = {
  title,
  className,
  errorCodeLabel,
  description,
  links: [
    {
      text: 'Carbon Design System',
      href: 'https://www.carbondesignsystem.com/',
    },
    {
      text: 'Carbon for IBM Products component library',
      href: 'https://github.com/carbon-design-system/ibm-products',
    },
  ],
  ref,
  'data-testid': dataTestId,
};

describe(componentName, () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
  it('has no accessibility violations', async () => {
    const { container } = render(
      <main>
        <HTTPError404 {...defaultProps} />
      </main>
    );
    expect(container).toBeAccessible(componentName);
    expect(container).toHaveNoAxeViolations();
  });

  it('Renders the component `HTTPErrors` if flag is enabled', async () => {
    const { container } = render(<HTTPError404 {...defaultProps} />);
    expect(container.querySelector(`.${blockClass}`)).not.toBeNull();
    expect(screen.getByText(title)).toBeVisible();
    const link = screen.getByRole('link', { name: 'Carbon Design System' });
    expect(link.href).toEqual('https://www.carbondesignsystem.com/');
  });

  it('adds a class to the containing node', async () => {
    expect(
      render(<HTTPError404 {...defaultProps} />).container.querySelector(
        `.${className}`
      )
    ).toBeInTheDocument();
  });

  it('should render the HTTPError404 component', async () => {
    const { container } = render(<HTTPError404 {...defaultProps} />);
    expect(screen.getByText(errorCodeLabel)).toBeVisible();
    expect(screen.getByText(description)).toBeVisible();
    expect(screen.getByText('Carbon for IBM Products component library'));
    expect(ref.current.classList.contains(blockClass)).toBeTruthy();
    expect(
      container.querySelector(`.${blockClass}[data-testid="${dataTestId}"]`)
    ).toBeInTheDocument();
  });

  it("adds the Devtools attribute to the `HTTPError404`'s containing node", async () => {
    render(<HTTPError404 {...defaultProps} data-testid={dataTestId} />);

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      componentName
    );
  });

  it('should render the HTTPError403 component', async () => {
    const { container } = render(<HTTPError403 {...defaultProps} />);
    expect(screen.getByText(errorCodeLabel)).toBeVisible();
    expect(screen.getByText(description)).toBeVisible();
    expect(screen.getByText('Carbon for IBM Products component library'));
    expect(ref.current.classList.contains(blockClass)).toBeTruthy();
    expect(
      container.querySelector(`.${blockClass}[data-testid="${dataTestId}"]`)
    ).toBeInTheDocument();
  });

  it("adds the Devtools attribute to the `HTTPError403`'s containing node", async () => {
    render(<HTTPError403 {...defaultProps} data-testid={dataTestId} />);

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      HTTPError403.displayName
    );
  });

  it('should render the HTTPErrorOther component', async () => {
    const { container } = render(<HTTPErrorOther {...defaultProps} />);
    expect(screen.getByText(errorCodeLabel)).toBeVisible();
    expect(screen.getByText(description)).toBeVisible();
    expect(screen.getByText('Carbon for IBM Products component library'));
    expect(ref.current.classList.contains(blockClass)).toBeTruthy();
    expect(
      container.querySelector(`.${blockClass}[data-testid="${dataTestId}"]`)
    ).toBeInTheDocument();
  });

  it("adds the Devtools attribute to the `HTTPErrorOther`'s containing node", async () => {
    render(<HTTPErrorOther {...defaultProps} data-testid={dataTestId} />);

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      HTTPErrorOther.displayName
    );
  });
});
