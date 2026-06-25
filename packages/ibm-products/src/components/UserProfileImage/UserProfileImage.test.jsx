/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import uuidv4 from '../../global/js/utils/uuidv4';
import { pkg, carbon } from '../../settings';
import { UserProfileImage } from '.';
import { Group } from '@carbon/react/icons';

const blockClass = `${pkg.prefix}--user-profile-image`;
const componentName = UserProfileImage.displayName;
const dataTestId = uuidv4();
const kind = 'user';
const size = 'xl';
const theme = 'light';

const renderComponent = ({ ...rest } = {}) =>
  render(<UserProfileImage {...{ kind, size, theme, ...rest }} />);

describe(componentName, () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('should return a circle with background color', async () => {
    const { container } = renderComponent({
      backgroundColor: 'light-cyan',
    });
    const element = container.querySelector(`.${blockClass}`);

    const hasBackgroundColor = element.className.includes('light-cyan');
    expect(hasBackgroundColor).toBeTruthy();
  });

  it('should return an icon for the avatar image', async () => {
    const { container } = renderComponent();
    const renderedSVG = container.querySelector('svg');
    expect(renderedSVG).toBeTruthy();
  });

  it('should render image for the avatar image', async () => {
    const { container } = renderComponent({
      image: 'path_to_image.jpg',
      imageDescription: 'test alt text',
    });
    const imagePath = container.querySelector('img').getAttribute('src');
    expect(typeof imagePath).toBe('string');
  });

  it('should return appropriately size circle based on size prop', async () => {
    const { container } = renderComponent();
    const element = container.querySelector(`.${blockClass}`);
    const hasSizeClass = element.className.includes('xl');
    expect(hasSizeClass).toBeTruthy();
  });

  it('should recognize theme setting', async () => {
    const { container } = renderComponent();
    const element = container.querySelector(`.${blockClass}`);
    const hasThemeClass = element.className.includes('light');
    expect(hasThemeClass).toBeTruthy();
  });

  it('adds additional properties to the containing node', async () => {
    renderComponent({ 'data-testid': dataTestId });
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node', async () => {
    const ref = React.createRef();
    renderComponent({ ref });
    expect(ref.current.classList.contains(blockClass)).toBeTruthy();
  });

  it('adds the Devtools attribute to the containing node', async () => {
    renderComponent({ 'data-testid': dataTestId });

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      UserProfileImage.displayName
    );
  });

  it('applies className to the containing node', async () => {
    const customClass = 'test';
    const { container } = renderComponent({ className: customClass });
    const element = container.querySelector(`.${blockClass}`);
    expect(element).toHaveClass(customClass);
  });

  it('should render the initials when passed the initials prop', async () => {
    renderComponent({ initials: 'Display name' });
    expect(screen.getByText(/DN/)).toBeTruthy();
  });

  it('should render the initials when simply passing two initials to the initials prop', async () => {
    renderComponent({ initials: 'DN' });
    expect(screen.getByText(/DN/)).toBeTruthy();
  });

  it('should render the IconButton component if the tooltipText prop is passed', async () => {
    const { container } = renderComponent({
      tooltipText: 'Display name',
    });
    const tooltipElement = container.querySelector(
      `.${carbon.prefix}--tooltip`
    );
    expect(tooltipElement).toBeTruthy();
  });

  it('should display a custom icon if one is provided', async () => {
    const { container } = renderComponent({
      icon: (props) => <Group size={24} {...props} />,
      kind: null,
    });
    const renderedSVG = container.querySelector('svg');
    expect(renderedSVG).toBeTruthy();
  });
});
