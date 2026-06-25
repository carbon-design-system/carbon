/**
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen, act } from '@testing-library/react'; // https://testing-library.com/docs/react-testing-library/intro
import userEvent from '@testing-library/user-event';

import { pkg } from '../../settings';
import uuidv4 from '../../global/js/utils/uuidv4';

import { CreateTearsheetNarrow } from '.';

const componentName = CreateTearsheetNarrow.displayName;

// values to use
const children = `hello, world (${uuidv4()})`;
const dataTestId = uuidv4();
const onRequestCloseFn = jest.fn();
const onRequestSubmitFn = jest.fn();

const defaultProps = {
  open: true,
  title: 'Create partition',
  className: 'test-class-name',
  description: 'Select the number of partitions you want to create',
  formTitle: 'Core configuration',
  formDescription:
    'We recommend you fill out and evaluate these details at a minimum before deploying your topic.',
  primaryButtonText: 'Create action',
  secondaryButtonText: 'Cancel',
  label: 'Test label',
  onRequestClose: onRequestCloseFn,
  onRequestSubmit: onRequestSubmitFn,
};

const renderComponent = ({ ...rest } = {}) =>
  render(
    <CreateTearsheetNarrow {...defaultProps} {...rest}>
      {children}
    </CreateTearsheetNarrow>
  );

const initialDefaultPortalTargetBody = pkg.isFeatureEnabled(
  'default-portal-target-body',
  true
);

describe(componentName, () => {
  beforeAll(() => {
    pkg.feature['default-portal-target-body'] = false;
  });

  afterAll(() => {
    jest.restoreAllMocks();
    pkg.feature['default-portal-target-body'] = initialDefaultPortalTargetBody;
  });

  it('renders a component CreateTearsheetNarrow', async () => {
    renderComponent();
    expect(screen.getByText(/Create action/)).toBeVisible();
    expect(screen.getByText(defaultProps.formDescription)).toBeVisible();
    expect(screen.getByText(defaultProps.formTitle)).toBeVisible();
    expect(screen.getByText(defaultProps.secondaryButtonText)).toBeVisible();
    expect(screen.getByText(defaultProps.primaryButtonText)).toBeVisible();
  });

  it('has no accessibility violations', async () => {
    await act(async () => {
      renderComponent();
    });
    const tearsheetElement = document.querySelector(
      `.${pkg.prefix}--create-tearsheet-narrow`
    );
    await expect(tearsheetElement).toBeAccessible(componentName);
    await expect(tearsheetElement).toHaveNoAxeViolations();
  });

  it(`renders children`, async () => {
    renderComponent();
    screen.getByText(children);
  });

  it('applies className to the containing node', async () => {
    renderComponent();
    const tearsheetElement = screen.getByRole('dialog').parentElement;
    expect(tearsheetElement).toHaveClass(defaultProps.className);
  });

  it('adds additional props to the containing node', async () => {
    renderComponent({ 'data-testid': dataTestId });
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node', async () => {
    const ref = React.createRef();
    renderComponent({ ref });
    expect(ref.current).not.toBeNull();
  });

  it('adds the Devtools attribute to the containing node', async () => {
    renderComponent({ 'data-testid': dataTestId });

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      componentName
    );
  });

  it('should disable the primary action button', async () => {
    renderComponent({
      disableSubmit: true,
    });
    expect(
      screen.getByText(defaultProps.primaryButtonText).closest('button')
    ).toBeDisabled();
  });

  it('should click on both action buttons', async () => {
    const { click } = userEvent;
    renderComponent();
    await act(() => click(screen.getByText(defaultProps.primaryButtonText)));
    await act(() => click(screen.getByText(defaultProps.secondaryButtonText)));
    expect(onRequestCloseFn).toHaveBeenCalledTimes(1);
    expect(onRequestSubmitFn).toHaveBeenCalledTimes(1);
  });
});
