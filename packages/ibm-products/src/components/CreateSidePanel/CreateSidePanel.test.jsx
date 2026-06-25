/**
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen, act } from '@testing-library/react'; // https://testing-library.com/docs/react-testing-library/intro
import userEvent from '@testing-library/user-event';
import uuidv4 from '../../global/js/utils/uuidv4';

import { pkg, carbon } from '../../settings';

import { CreateSidePanel } from '.';

const componentName = CreateSidePanel.displayName;

const title = 'Test Create Side panel';
const subtitle = 'Test Create Side panel subtitle';
const formDescription =
  'This is a test description. It has several lines. It should render a side panel.';
const selectorPrimaryFocus = `.${carbon.prefix}--text-input`;
const formTitle = 'This is a test form title';
const blockClass = `${pkg.prefix}--create-side-panel`;

const renderComponent = ({ ...rest } = {}, children = <p>test</p>) =>
  render(
    <>
      <CreateSidePanel
        open
        id="create-sidepanel-id"
        {...{
          title,
          subtitle,
          formDescription,
          formTitle,
          selectorPrimaryFocus,
          primaryButtonText: 'Create',
          secondaryButtonText: 'Cancel',
          selectorPageContent: '#create-side-panel-test-page-content',
          ...rest,
        }}
      >
        {children}
      </CreateSidePanel>
      <div id="create-side-panel-test-page-content" />
    </>
  );

describe(componentName, () => {
  it('renders the side panel', async () => {
    renderComponent();
    expect(screen.getByRole('complementary')).toHaveClass(blockClass);
  });

  it('renders a title', async () => {
    renderComponent({ title });
    expect(screen.queryAllByText(/{title}/i)).toBeTruthy();
  });

  it('renders a subtitle', async () => {
    renderComponent({ subtitle });
    expect(screen.queryAllByText(/{subtitle}/i)).toBeTruthy();
  });

  it('renders a forms title', async () => {
    renderComponent({ formTitle });
    expect(screen.queryAllByText(/{formTitle}/i)).toBeTruthy();
  });

  it('renders a forms description', async () => {
    renderComponent({ formDescription });
    expect(screen.queryAllByText(/{formDescription}/i)).toBeTruthy();
  });

  it('calls onRequestSubmit() when primary button is clicked', async () => {
    const primaryHandler = jest.fn();
    renderComponent({
      onRequestSubmit: primaryHandler,
    });
    await act(() =>
      userEvent.click(screen.getByRole('button', { name: 'Create' }))
    );
    expect(primaryHandler).toBeCalledTimes(1);
  });

  it('calls onRequestClose() when secondary button is clicked', async () => {
    const secondaryHandler = jest.fn();
    renderComponent({
      onRequestClose: secondaryHandler,
    });
    await act(() =>
      userEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    );
    expect(secondaryHandler).toBeCalledTimes(1);
  });

  it('disables primary focus button when `disableSubmit` prop is provided', async () => {
    renderComponent({ disableSubmit: true, primaryButtonText: 'Create' });
    const submitButton = screen.getByRole('button', { name: 'Create' });
    const isDisabled = submitButton.className.includes('disabled');
    expect(isDisabled).toBeTruthy();
  });

  it('disables primary focus button when `disableSubmit` prop is provided', async () => {
    renderComponent({ disableSubmit: true, primaryButtonText: 'Create' });
    const submitButton = screen.getByRole('button', { name: 'Create' });
    const isDisabled = submitButton.className.includes('disabled');
    expect(isDisabled).toBeTruthy();
  });

  it('has no accessibility violations', async () => {
    const { container } = renderComponent();
    expect(container).toBeAccessible(componentName);
    expect(container).toHaveNoAxeViolations();
  });

  it('applies className to the containing node', async () => {
    const className = `class-${uuidv4()}`;
    renderComponent({ className: className });
    expect(screen.getByRole('complementary')).toHaveClass(className);
  });

  const dataTestId = uuidv4();

  it('adds additional properties to the containing node', async () => {
    renderComponent({ 'data-testid': dataTestId });
    screen.getByTestId(dataTestId);
  });

  it('forwards a ref to an appropriate node', async () => {
    const ref = React.createRef();
    renderComponent({ ref: ref });
    expect(ref.current).toEqual(screen.getByRole('complementary'));
  });

  it('adds the Devtools attribute to the containing node', async () => {
    renderComponent({ 'data-testid': dataTestId });

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      componentName
    );
  });
});
