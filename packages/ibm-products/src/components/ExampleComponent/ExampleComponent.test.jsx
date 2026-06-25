/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen, act } from '@testing-library/react'; // https://testing-library.com/docs/react-testing-library/intro
import userEvent from '@testing-library/user-event';

import { pkg, carbon } from '../../settings';

import uuidv4 from '../../global/js/utils/uuidv4';

import { Add } from '@carbon/react/icons';
import { ExampleComponent } from '.';
import { expectError, expectLogging } from '../../global/js/utils/test-helper';

const blockClass = `${pkg.prefix}--example-component`;
const componentName = ExampleComponent.displayName;

const borderColor = '#acefed';
const className = `class-${uuidv4()}`;
const dataTestId = uuidv4();
const primaryButtonLabel = `hello, world (${uuidv4()})`;
const secondaryButtonLabel = `goodbye (${uuidv4()})`;

// render an ExampleComponent with button labels and any other required props
const renderComponent = ({ ...rest } = {}) =>
  render(
    <ExampleComponent
      {...{ primaryButtonLabel, secondaryButtonLabel, ...rest }}
    />
  );

describe(componentName, () => {
  it('renders a component ExampleComponent', async () => {
    renderComponent();
    expect(screen.getByRole('main')).toHaveClass(blockClass);
  });

  it('has no accessibility violations', async () => {
    const { container } = renderComponent();
    expect(container).toBeAccessible(componentName);
    expect(container).toHaveNoAxeViolations();
  });

  it(`renders the borderColor property`, async () => {
    renderComponent({ borderColor });
    const style = window.getComputedStyle(screen.getByRole('main'));
    // We'd prefer to test the actual border color style, but jsdom does not
    //render css custom properties (https://github.com/jsdom/jsdom/issues/1895)
    // so testing the property is the best we can do.
    expect(style.getPropertyValue(`--${blockClass}--border-color`)).toEqual(
      borderColor
    );
  });

  it(`renders the boxedBorder property`, async () => {
    renderComponent({ boxedBorder: true });
    expect(screen.getByRole('main')).toHaveClass(`${blockClass}--boxed-set`);
  });

  it('applies className to the containing node', async () => {
    renderComponent({ className });
    expect(screen.getByRole('main')).toHaveClass(className);
  });

  it(`renders the disabled property`, async () => {
    renderComponent({ disabled: true });
    screen
      .getAllByRole('button')
      .forEach((button) => expect(button).toHaveProperty('disabled', true));
  });

  it('notifies a click on each button', async () => {
    const primaryHandler = jest.fn();
    const secondaryHandler = jest.fn();
    renderComponent({
      onPrimaryClick: primaryHandler,
      onSecondaryClick: secondaryHandler,
    });

    const buttons = screen.getAllByRole('button');
    await act(() =>
      Promise.all(buttons.map((button) => userEvent.click(button)))
    );

    expect(primaryHandler).toBeCalledTimes(1);
    expect(secondaryHandler).toBeCalledTimes(1);
  });

  it('renders the primaryButtonLabel and secondaryButtonLabel properties', async () => {
    renderComponent();
    screen.getByText(primaryButtonLabel);
    screen.getByText(secondaryButtonLabel);
  });

  it('renders the primaryKind and secondaryKind properties', async () => {
    renderComponent({ primaryKind: 'danger', secondaryKind: 'tertiary' });
    expect(
      screen.getByRole('button', { name: `danger ${primaryButtonLabel}` })
    ).toHaveClass(`${carbon.prefix}--btn--danger`);
    expect(
      screen.getByRole('button', { name: secondaryButtonLabel })
    ).toHaveClass(`${carbon.prefix}--btn--tertiary`);
  });

  it('renders the size property', async () => {
    renderComponent({ size: 'sm' });
    screen
      .getAllByRole('button')
      .forEach((button) =>
        expect(button).toHaveClass(`${carbon.prefix}--btn--sm`)
      );
  });

  it('adds additional properties to the containing node', async () => {
    renderComponent({ 'data-testid': dataTestId });
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node', async () => {
    const ref = React.createRef();
    renderComponent({ ref });
    expect(ref.current).toEqual(screen.getByRole('main'));
  });

  it('logs an error when secondaryIcon used and feature flag disabled', async () => {
    pkg.feature['ExampleComponent.secondaryIcon'] = false;
    expectError(
      'Carbon for IBM Products (Error): Feature "ExampleComponent.secondaryIcon" not enabled. To enable see the notes on feature flags in the README.',
      () => {
        render(
          <ExampleComponent
            secondaryIcon={Add}
            {...{
              primaryButtonLabel,
              secondaryButtonLabel,
            }}
          />
        );
      }
    );
  });

  it('does NOT log an error when secondaryIcon used and feature flag enabled', async () => {
    pkg.feature['ExampleComponent.secondaryIcon'] = true;
    render(
      <ExampleComponent
        {...{
          primaryButtonLabel,
          secondaryButtonLabel,
          secondaryIcon: Add,
        }}
      />
    );
  });

  it('logs an error when useExample used and feature flag disabled', async () => {
    pkg.feature['ExampleComponent.useExample'] = false;
    expectLogging(
      {
        errors:
          'Carbon for IBM Products (Error): Feature "ExampleComponent.useExample" not enabled. To enable see the notes on feature flags in the README.',
        warnings:
          'Disabled feature "ExampleComponent.useExample" does not change the initialTime.',
      },
      () => {
        render(
          <ExampleComponent
            secondaryIcon={Add}
            {...{
              usesExampleHook: 10,
              primaryButtonLabel,
              secondaryButtonLabel: `secondary`,
            }}
          />
        );
      },
      true
      // true
    );
  });

  it('does NOT log an error when useExample used and feature flag enabled', async () => {
    pkg.feature['ExampleComponent.useExample'] = true;

    render(
      <ExampleComponent
        {...{
          usesExampleHook: 10,
          primaryButtonLabel,
          secondaryButtonLabel,
          secondaryIcon: Add,
        }}
      />
    );
  });
});
