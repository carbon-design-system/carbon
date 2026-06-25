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

import { StringFormatter } from '.';

const blockClass = `${pkg.prefix}--string-formatter`;
const componentName = StringFormatter.displayName;

/**
 * Values to use
 */
const className = `class-${uuidv4()}`;
const dataTestId = uuidv4();
const widthValue = '234px';
const longValueString =
  'Buttons are used to initialize an action, either in the background or foreground of an experience. There are several kinds of buttons. Primary buttons should be used for the principle call to action on the page. Secondary buttons should be used for secondary actions on each page. Danger buttons should be used for a negative action (such as Delete) on the page. Modify the behavior of the button by changing its event properties. Small buttons may be used when there is not enough space for a regular sized button. This issue is most found in tables. Small button should have three words or less. When words are not enough, icons can be used in buttons to better communicate what the button does. Icons are always paired with text.';
const shortValueString = 'test content';

global.ResizeObserver = class {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
};

/**
 * Rendering function
 */
const renderComponent = ({ ...rest } = {}) =>
  render(<StringFormatter {...rest} />);

/**
 * Tests...
 */
describe(componentName, () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('renders a component StringFormatter', async () => {
    renderComponent({
      'data-testid': dataTestId,
      value: longValueString,
    });

    expect(screen.getByTestId(dataTestId)).toHaveClass(blockClass);
  });

  it('has no accessibility violations', async () => {
    const { container } = renderComponent({
      'data-testid': dataTestId,
      value: longValueString,
    });

    expect(container).toBeAccessible(componentName);
    expect(container).toHaveNoAxeViolations();
  });

  it('applies className to the containing node', async () => {
    renderComponent({
      'data-testid': dataTestId,
      value: longValueString,
      className,
    });

    expect(screen.getByTestId(dataTestId)).toHaveClass(className);
  });

  it('adds additional props to the containing node', async () => {
    renderComponent({
      'data-testid': dataTestId,
      value: longValueString,
      className,
    });
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node', async () => {
    const ref = React.createRef();
    renderComponent({
      'data-testid': dataTestId,
      value: longValueString,
      ref,
    });
    expect(ref.current).toHaveClass(blockClass);
  });

  it('adds the Devtools attribute to the containing node', async () => {
    renderComponent({
      'data-testid': dataTestId,
      value: longValueString,
    });
    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      componentName
    );
  });

  it('should truncate text via the `truncate` prop', async () => {
    const { container } = renderComponent({
      value: shortValueString,
      truncate: true,
    });
    expect(
      container.querySelector(`.${blockClass}--truncate`)
    ).toHaveTextContent(/test content/i);
  });

  it('should apply correct style attribute when `width` provided', async () => {
    const { container } = renderComponent({
      value: shortValueString,
      width: widthValue,
      truncate: true,
    });
    const pageContent = container.querySelector(`.${blockClass}--truncate`);
    const style = getComputedStyle(pageContent);
    expect(style.maxWidth).toBe(widthValue);
  });
});
