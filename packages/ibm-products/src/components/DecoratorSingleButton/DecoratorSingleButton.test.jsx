/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react'; // https://testing-library.com/docs/react-testing-library/intro

import { pkg } from '../../settings';
import uuidv4 from '../../global/js/utils/uuidv4';

import { DecoratorSingleButton } from '.';

const { click, contextMenu } = fireEvent;

const blockClass = `${pkg.prefix}--decorator`;
const blockClassIcon = `${pkg.prefix}--decorator-icon`;
const componentName = DecoratorSingleButton.displayName;

// values to use
const className = `class-${uuidv4()}`;
const dataTestId = uuidv4();

const label = 'IP';
const score = 5;
const scoreTitle = '"Medium" magnitude. Score 5 out of 10';
const value = '192.168.0.50';
const valueTitle = 'IP address is 192.168.0.50';

const renderComponent = ({ ...rest } = {}) =>
  render(
    <DecoratorSingleButton
      kind="single-button"
      value={value}
      data-testid={dataTestId}
      {...rest}
    />
  );

describe(componentName, () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('renders a component DecoratorSingleButton', async () => {
    const { container } = renderComponent();
    const decorator = container.querySelector(`[data-testid="${dataTestId}"]`);
    expect(decorator).toBeInTheDocument();
  });

  it('renders a component DecoratorSingleButton as one button', async () => {
    renderComponent({ kind: 'single-button' });
    expect(screen.getAllByRole('button').length).toBe(1);
  });

  it('renders a label', async () => {
    renderComponent({ label: label });
    screen.getByText(label);
  });

  it('renders a value', async () => {
    renderComponent({ value: value });
    screen.getByText(value);
  });

  it('renders a score', async () => {
    renderComponent({
      score: score,
      setLabelTitle: (score, scoreThresholds, magnitude) => {
        if (typeof score !== 'number') {
          return 'Unknown score';
        }
        return `"${magnitude}" magnitude. Score ${score} out of ${
          scoreThresholds[scoreThresholds.length - 1]
        }`;
      },
    });
    screen.getByTitle(scoreTitle);
  });

  it('does not render the icon', async () => {
    const { container } = renderComponent({
      score: score,
      hideIcon: true,
    });
    const decorator = container.querySelector(`[data-testid="${dataTestId}"]`);
    expect(decorator).not.toHaveClass(blockClassIcon);
  });

  it('renders an alternate title for the value', async () => {
    renderComponent({ valueTitle: valueTitle });
    screen.getByTitle(valueTitle);
  });

  it('"single-button" registers a click event', async () => {
    const handleClick = jest.fn();

    renderComponent({
      kind: 'single-button',
      onClick: handleClick,
    });

    await act(() => click(screen.getByRole('button')));
    expect(handleClick).toBeCalled();
  });

  it('"single-button" registers a context menu click event', async () => {
    const handleContextMenu = jest.fn();

    renderComponent({
      kind: 'single-button',
      onContextMenu: handleContextMenu,
    });

    await act(() => contextMenu(screen.getByRole('button')));
    expect(handleContextMenu).toBeCalled();
  });

  it('has no accessibility violations', async () => {
    const { container } = renderComponent();
    expect(container).toBeAccessible(componentName);
    expect(container).toHaveNoAxeViolations();
  });

  it('applies className to the containing node', async () => {
    const { container } = renderComponent({ className: className });
    const decorator = container.querySelector(`[data-testid="${dataTestId}"]`);
    expect(decorator).toHaveClass(className);
  });

  it('adds additional props to the containing node', async () => {
    renderComponent({ className: className });
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node', async () => {
    const ref = React.createRef();
    renderComponent({ ref: ref });
    expect(ref.current).toHaveClass(blockClass);
  });

  it('adds the Devtools attribute to the containing node', async () => {
    renderComponent();
    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      componentName
    );
  });
});
