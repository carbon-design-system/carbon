/* eslint-disable react/prop-types */
/**
 * Copyright IBM Corp. 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import { carbon, pkg } from '../../settings';
import { EditTearsheet } from './EditTearsheet';
import { EditTearsheetForm } from './EditTearsheetForm';
import uuidv4 from '../../global/js/utils/uuidv4';

import userEvent from '@testing-library/user-event';
const { click } = userEvent.setup({
  // delay: null, // prev version
  advanceTimers: jest.advanceTimersByTime,
});

const { prefix } = pkg;

const editTearsheetBlockClass = `${prefix}--tearsheet-edit`;
const componentName = EditTearsheet.displayName;

// values to use
const className = `class-${uuidv4()}`;
const dataTestId = uuidv4();
const form1Title = uuidv4();
const form2Title = uuidv4();
const form3Title = uuidv4();
const form4Title = uuidv4();
const form1Description = uuidv4();
const form1Subtitle = uuidv4();

const onCloseFn = jest.fn();
const onCloseReturnsTrue = jest.fn(() => true);
const onRequestSubmitFn = jest.fn();
const ref = React.createRef();
const ariaLabel = 'test-aria-label';

const defaultProps = {
  title: 'Edit topic',
  description: 'Specify details for the topic you want to update',
  submitButtonText: 'Save',
  cancelButtonText: 'Cancel',
  className: 'test-class-name',
  label: '',
  influencerWidth: 'narrow',
  onClose: onCloseFn,
  onRequestSubmit: onRequestSubmitFn,
  open: true,
  ref,
  ariaLabel,
};

const renderEditTearsheet = ({ ...rest } = {}) =>
  render(
    <EditTearsheet onRequestSubmit={onRequestSubmitFn} {...rest}>
      <EditTearsheetForm
        title={form1Title}
        fieldsetLegendText={form1Title}
        fieldsetLegendId={form1Title}
        description={form1Description}
        subtitle={form1Subtitle}
      >
        form 1 content
        <button type="button" disabled>
          Test
        </button>
        <input aria-label="step1-input" type="text" />
      </EditTearsheetForm>
      <EditTearsheetForm title={form2Title} hasFieldset={false}>
        form 2 content
      </EditTearsheetForm>
      <EditTearsheetForm
        title={form3Title}
        fieldsetLegendText={form3Title}
        fieldsetLegendId={form3Title}
      >
        form 3 content
      </EditTearsheetForm>
      <EditTearsheetForm
        title={form4Title}
        fieldsetLegendText={form4Title}
        fieldsetLegendId={form4Title}
      >
        form 4 content
      </EditTearsheetForm>
    </EditTearsheet>
  );

const renderEmptyEditTearsheet = ({ ...rest } = {}) =>
  render(
    <EditTearsheet onRequestSubmit={onRequestSubmitFn} {...rest}>
      <p>Child element that persists across all forms</p>
    </EditTearsheet>
  );

const initialDefaultPortalTargetBody = pkg.isFeatureEnabled(
  'default-portal-target-body',
  true
);

describe(componentName, () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.useFakeTimers();
    pkg.feature['default-portal-target-body'] = false;

    //todo: remove once carbon fixes issue on side nav
    jest.spyOn(console, 'error').mockImplementation((msg) => {
      if (
        typeof msg === 'string' &&
        msg.includes('Received `true` for a non-boolean attribute `inert`')
      ) {
        return;
      }
      console.warn(msg); // or optionally call the original
    });
  });

  afterEach(() => {
    jest.useRealTimers();
    pkg.feature['default-portal-target-body'] = initialDefaultPortalTargetBody;
    console.error.mockRestore();
  });

  it('renders the EditTearsheet component', async () => {
    renderEditTearsheet({
      ...defaultProps,
    });
    const tearsheetElement = screen.getByRole('dialog', {
      name: ariaLabel,
    }).parentElement;
    expect(tearsheetElement).toBeTruthy();
    expect(tearsheetElement).toHaveClass(editTearsheetBlockClass);
    expect(ref.current).not.toBeNull();
  });

  it('should not render any EditTearsheetForm when there are no EditTearsheetForm components included', async () => {
    const { container } = renderEmptyEditTearsheet(defaultProps);
    const editTearsheetForms = container.querySelectorAll(
      `.${editTearsheetBlockClass}__form`
    );
    expect(Array(...editTearsheetForms)).toStrictEqual([]);
  });

  it('has no accessibility violations', async () => {
    renderEditTearsheet({ ...defaultProps });
    const tearsheetElement = document.querySelector(
      `.${editTearsheetBlockClass}`
    );
    await expect(tearsheetElement).toBeAccessible(componentName);
    jest.useRealTimers();
    await expect(tearsheetElement).toHaveNoAxeViolations();
    jest.useFakeTimers();
  });

  it('adds additional props to the containing node', async () => {
    render(
      <EditTearsheet
        data-testid={dataTestId}
        onRequestSubmit={onRequestSubmitFn}
      ></EditTearsheet>
    );
    screen.getByTestId(dataTestId);
  });

  it('renders the primaryButtonLabel and secondaryButtonLabel properties', async () => {
    renderEditTearsheet({ ...defaultProps });
    screen.getByText(defaultProps.submitButtonText);
    screen.getByText(defaultProps.cancelButtonText);
  });

  it('calls onClose() when the tearsheet is closed', async () => {
    render(
      <EditTearsheet
        {...{ ...defaultProps }}
        onClose={onCloseReturnsTrue}
        onRequestSubmit={onRequestSubmitFn}
        open
      />
    );
    const editTearsheet = document.querySelector(`.${carbon.prefix}--modal`);
    expect(editTearsheet).toHaveClass('is-visible');
    const closeButton = screen.getByLabelText('Close');
    await act(() => click(closeButton));
    expect(editTearsheet).not.toHaveClass('is-visible');
  });

  it('calls the submit handler when the primary button is clicked', async () => {
    render(
      <EditTearsheet
        {...{ ...defaultProps }}
        onClose={onCloseReturnsTrue}
        onRequestSubmit={onRequestSubmitFn}
        open
      />
    );

    const editTearsheet = document.querySelector(`.${carbon.prefix}--modal`);
    expect(editTearsheet).toHaveClass('is-visible');
    const submitButton = screen.getByText('Save');

    await act(() => click(submitButton));
    expect(onRequestSubmitFn).toHaveBeenCalledTimes(1);
  });

  it('disables submit when submit button is clicked until onRequestSubmit processing completes', async () => {
    const onRequestSubmitLong = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
    };
    render(
      <EditTearsheet
        {...{ ...defaultProps }}
        onRequestSubmit={onRequestSubmitLong}
        open
      />
    );

    const editTearsheet = document.querySelector(`.${carbon.prefix}--modal`);
    expect(editTearsheet).toHaveClass('is-visible');
    const submitButton = screen.getByText('Save');
    expect(submitButton.disabled).toEqual(false);

    await act(() => click(submitButton));
    expect(submitButton.disabled).toBeTruthy();
    //wait up to a sec until state expected to change
    await waitFor(() => expect(submitButton.disabled).toEqual(false));
  });

  it('applies className to the root node', async () => {
    renderEditTearsheet({ className });
    const editTearsheet = document.querySelector(`.${carbon.prefix}--modal`);
    expect(editTearsheet).toHaveClass(className);
  });

  it('renders the influencer with a nav item that matches the form title', async () => {
    renderEditTearsheet({ ...defaultProps });

    const tearsheetElement = screen.getByRole('dialog', {
      name: ariaLabel,
    }).parentElement;
    expect(
      tearsheetElement.querySelector(`.${carbon.prefix}--side-nav__link-text`)
    ).toHaveTextContent(form1Title);
    expect(
      screen.getByRole('heading', { name: form1Title })
    ).toBeInTheDocument();
  });

  it('should call the provided callback function when the form is changed', async () => {
    const onFormChange = jest.fn();
    renderEditTearsheet({
      ...defaultProps,
      onFormChange,
    });
    const tearsheetElement = screen.getByRole('dialog', {
      name: ariaLabel,
    }).parentElement;
    const form2NavLink = tearsheetElement.querySelectorAll(
      `.${carbon.prefix}--side-nav__link-text`
    )[2];

    await act(() => click(form2NavLink));
    expect(onFormChange).toHaveBeenCalledTimes(1);
    expect(onFormChange).toHaveBeenCalledWith(2);
  });
});
