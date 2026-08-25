/**
 * Copyright IBM Corp. 2024, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { UserAvatar } from '../UserAvatar';
import { User } from '@carbon/icons-react';

const prefix = 'cds';
const blockClass = `${prefix}--user-avatar`;
const componentName = UserAvatar.displayName;

const renderComponent = ({ ...rest } = {}) =>
  render(<UserAvatar {...{ ...rest }} />);

describe(componentName, () => {
  it('should render a circle with the correct background color class', async () => {
    render(<UserAvatar backgroundColor="order-1-cyan" data-testid="ua" />);
    const element = screen.getByTestId('ua');
    expect(element.className).toContain('order-1-cyan');
  });

  it('should render an icon for the avatar image', async () => {
    const { container } = renderComponent({ renderIcon: User });
    const renderedSVG = container.getElementsByTagName('svg');
    expect(renderedSVG).toBeTruthy();
  });

  it('has no accessibility violations', async () => {
    const { container } = renderComponent({ renderIcon: User });
    expect(container).toHaveNoAxeViolations();
  });

  it('applies className to the containing node', async () => {
    const customClass = 'test';
    renderComponent({
      className: customClass,
      'data-testid': 'ua',
    });
    const element = screen.getByTestId('ua');
    expect(element).toHaveClass(customClass);
  });

  it('adds additional props to the containing node', async () => {
    renderComponent({ 'data-testid': 'ua' });
    screen.getByTestId('ua');
  });

  it('forwards a ref to an appropriate node', async () => {
    const ref = React.createRef();
    renderComponent({ ref });
    expect(ref.current).toHaveClass(blockClass);
  });

  it('adds the data-component-name attribute to the containing node', async () => {
    renderComponent({ 'data-testid': 'ua' });
    expect(screen.getByTestId('ua')).toHaveAttribute(
      'data-component-name',
      componentName
    );
  });

  it('should render the correct size class based on size prop', async () => {
    renderComponent({ size: 'md', 'data-testid': 'ua' });
    const element = screen.getByTestId('ua');
    expect(element.className).toContain('md');
  });

  it('should render the initials when passed the name prop', async () => {
    renderComponent({ name: 'Display name' });
    expect(screen.getByText(/DN/)).toBeTruthy();
  });

  it('should render the initials when simply passing two names to the name prop', async () => {
    renderComponent({ name: 'DN' });
    expect(screen.getByText(/DN/)).toBeTruthy();
  });

  it('should render a tooltip if the tooltipText is supplied', async () => {
    renderComponent({ tooltipText: 'Display name', 'data-testid': 'ua' });
    const element = screen.getByTestId('ua');
    const tooltipElement = element.closest(`span.${prefix}--tooltip`);
    expect(tooltipElement).toBeTruthy();
  });

  it('should not render a tooltip if the tooltipText is not supplied', async () => {
    renderComponent({ tooltipText: '', 'data-testid': 'ua' });
    const element = screen.getByTestId('ua');
    const tooltipElement = element.closest(`span.${prefix}--tooltip`);
    expect(tooltipElement).not.toBeTruthy();
  });

  it('should render image for the avatar image', async () => {
    const { container } = renderComponent({
      image: '/path/to/headshot.jpg',
      imageDescription: 'test alt text',
    });
    const imagePath = container.querySelector('img').getAttribute('src');
    expect(typeof imagePath).toBe('string');
  });
});
