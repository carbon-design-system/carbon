/* eslint-disable react/prop-types */
/**
 * Copyright IBM Corp. 2021, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { act } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { expectWarn, expectWarnAsync } from '../../global/js/utils/test-helper';
import { pkg, carbon } from '../../settings';
import { CreateTearsheet } from './CreateTearsheet';
import { CreateTearsheetStep } from './CreateTearsheetStep';
import uuidv4 from '../../global/js/utils/uuidv4';

import userEvent from '@testing-library/user-event';
const { click } = userEvent.setup({
  // delay: null, // prev version
  advanceTimers: jest.advanceTimersByTime,
});

const { prefix } = pkg;

const createTearsheetBlockClass = `${prefix}--tearsheet-create`;
const componentName = CreateTearsheet.displayName;

const rejectionErrorMessage = uuidv4();
const onCloseFn = jest.fn();
const onRequestSubmitFn = jest.fn(() => Promise.resolve());
const onRequestSubmitNonPromiseFn = jest.fn();
const onRequestSubmitRejectFn = jest.fn(() =>
  Promise.reject(rejectionErrorMessage)
);
const onNextStepFn = jest.fn(() => Promise.resolve());
const onNextStepNonPromiseFn = jest.fn();
const onNextStepRejectionFn = jest.fn(() =>
  Promise.reject(rejectionErrorMessage)
);

const onPreviousStepFn = jest.fn();

const finalStepOnNext = jest.fn(() => Promise.resolve());
const finalStepOnNextNonPromise = jest.fn();
const finalStepOnNextRejectFn = jest.fn(() =>
  Promise.reject(rejectionErrorMessage)
);
const submitButtonText = 'Submit';
const cancelButtonText = 'Cancel';
const backButtonText = 'Back';
const nextButtonText = 'Next';
const experimentalSecondarySubmitText = 'Secondary submit';
const experimentalSecondaryLabelText = 'Skip all step';
const onExperimentalSecondarySubmitClickFn = jest.fn();
const step3Title = uuidv4();
const step2Title = uuidv4();
const step1Title = uuidv4();
const step1Description = uuidv4();
const step1Subtitle = uuidv4();
const title = uuidv4();
const dataTestId = uuidv4();
const ref = React.createRef();
const onMountFn = jest.fn();
const ariaLabel = 'test-aria-label';
const defaultProps = {
  title,
  submitButtonText,
  cancelButtonText,
  backButtonText,
  nextButtonText,
  ref,
  onClose: onCloseFn,
  open: true,
  ariaLabel,
};

const secondStepButtonId = 'second-step-button';

const renderCreateTearsheet = ({
  rejectOnSubmit = false,
  rejectOnNext = false,
  submitFn = onRequestSubmitFn,
  onNext = onNextStepFn,
  onPrevious = onPreviousStepFn,
  finalOnNextFn = finalStepOnNext,
  rejectOnSubmitNext = false,
  experimentalSecondarySubmit = {
    labelText: '',
    disabled: false,
    hideSecondarySubmit: false,
    onClick: onExperimentalSecondarySubmitClickFn,
  },
  ...rest
}) =>
  render(
    <CreateTearsheet
      onRequestSubmit={rejectOnSubmit ? onRequestSubmitRejectFn : submitFn}
      {...rest}
    >
      <CreateTearsheetStep
        onNext={rejectOnNext ? onNextStepRejectionFn : onNext}
        title={step1Title}
        fieldsetLegendText={step1Title}
        fieldsetLegendId={step1Title}
        onMount={onMountFn}
        description={step1Description}
        subtitle={step1Subtitle}
        experimentalSecondarySubmit={{
          labelText: experimentalSecondarySubmit.labelText,
          disabled: experimentalSecondarySubmit.disabled,
          hideSecondarySubmit: experimentalSecondarySubmit.hideSecondarySubmit,
          onClick: experimentalSecondarySubmit.onClick,
        }}
      >
        step 1 content
        <button type="button" disabled>
          Test
        </button>
        <input aria-label="step1-input" type="text" />
      </CreateTearsheetStep>
      <CreateTearsheetStep
        title={step2Title}
        hasFieldset={false}
        onPrevious={onPrevious}
      >
        step 2 content
        <button type="button">Second step button one</button>
        <button id={secondStepButtonId} type="button">
          Second step button two
        </button>
      </CreateTearsheetStep>
      <CreateTearsheetStep
        title={step3Title}
        fieldsetLegendText={step3Title}
        fieldsetLegendId={step3Title}
        onNext={rejectOnSubmitNext ? finalStepOnNextRejectFn : finalOnNextFn}
      >
        step 3 content
      </CreateTearsheetStep>
    </CreateTearsheet>
  );

const renderEmptyCreateTearsheet = ({ ...rest } = {}) =>
  render(
    <CreateTearsheet onRequestSubmit={onRequestSubmitFn} {...rest}>
      <p>Child element that persists across all steps</p>
    </CreateTearsheet>
  );

const renderSingleStepCreateTearsheet = ({ ...rest } = {}) =>
  render(
    <CreateTearsheet onRequestSubmit={onRequestSubmitFn} {...rest}>
      <CreateTearsheetStep title={step1Title} fieldsetLegendText={step1Title}>
        step 1 content
      </CreateTearsheetStep>
    </CreateTearsheet>
  );

const renderInvalidCreateTearsheet = ({ ...rest } = {}) =>
  render(
    <>
      <CreateTearsheet onRequestSubmit={onRequestSubmitFn} {...rest}>
        <CreateTearsheetStep title={step1Title} hasFieldset={false}>
          step 1 content
        </CreateTearsheetStep>
        <CreateTearsheetStep title={step2Title} hasFieldset={false}>
          step 2 content
        </CreateTearsheetStep>
      </CreateTearsheet>
      <CreateTearsheetStep title="Invalid step title" hasFieldset={false}>
        Invalid step
      </CreateTearsheetStep>
    </>
  );

const initialDefaultPortalTargetBody = pkg.isFeatureEnabled(
  'default-portal-target-body',
  true
);

describe(CreateTearsheet.displayName, () => {
  beforeEach(() => {
    jest.useFakeTimers();
    pkg.feature['default-portal-target-body'] = false;
  });

  afterEach(() => {
    jest.useRealTimers();
    pkg.feature['default-portal-target-body'] = initialDefaultPortalTargetBody;
  });

  it('has no accessibility violations', async () => {
    await act(async () => {
      renderCreateTearsheet({ ...defaultProps, 'data-testid': dataTestId });
    });
    try {
      const tearsheetElement = document.querySelector(
        `.${prefix}--tearsheet-create`
      );
      await expect(tearsheetElement).toBeAccessible(
        CreateTearsheet.displayName
      );
      jest.useRealTimers();
      await expect(tearsheetElement).toHaveNoAxeViolations();
      jest.useFakeTimers();
    } catch (err) {
      console.log('accessibility test error :', err);
    }
  });

  it('renders the CreateTearsheet component', async () => {
    renderCreateTearsheet({
      ...defaultProps,
      'data-testid': dataTestId,
    });
    screen.getByTestId(dataTestId);

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      componentName
    );

    screen.getAllByText(title);
    const tearsheetElement = screen.getByRole('dialog', {
      name: ariaLabel,
    }).parentElement;
    expect(tearsheetElement).toHaveClass(createTearsheetBlockClass);
    expect(ref.current).not.toBeNull();
  });

  it('should render the tearsheet on the specified initialStep prop provided', async () => {
    renderCreateTearsheet({
      ...defaultProps,
      initialStep: 2,
    });
    const tearsheetElement = screen.getByRole('dialog', { name: ariaLabel });
    const createTearsheetSteps = tearsheetElement.querySelector(
      `.${createTearsheetBlockClass}__content .${carbon.prefix}--form`
    ).children;
    expect(
      createTearsheetSteps[1].firstElementChild.classList.contains(
        `${createTearsheetBlockClass}__step__step--visible-step`
      )
    ).toBeTruthy();
  });

  it('renders the first step if an invalid initialStep value is provided', async () =>
    expectWarn(
      `${CreateTearsheet.displayName}: An invalid \`initialStep\` prop was supplied. The \`initialStep\` prop should be a number that is greater than 0 or less than or equal to the number of steps your ${CreateTearsheet.displayName} has.`,
      () => {
        renderCreateTearsheet({
          ...defaultProps,
          // Starting on 0 step is invalid since the steps start with a value of 1
          // This will cause a console warning
          initialStep: 0,
        });
        const tearsheetElement = screen.getByRole('dialog', {
          name: ariaLabel,
        });
        const createTearsheetSteps = tearsheetElement.querySelector(
          `.${createTearsheetBlockClass}__content .${carbon.prefix}--form`
        ).children;
        expect(
          createTearsheetSteps[0].firstElementChild.classList.contains(
            `${createTearsheetBlockClass}__step__step--visible-step`
          )
        ).toBeTruthy();
        // The onMount prop will get called here because the first step is rendered
        expect(onMountFn).toHaveBeenCalledTimes(1);
      }
    ));

  it('renders the second step if clicking on the next step button with onNext optional function prop and then clicks cancel button', async () => {
    renderCreateTearsheet(defaultProps);
    const nextButtonElement = screen.getByText(nextButtonText);
    const cancelButtonElement = screen.getByText(cancelButtonText);
    await act(() => click(nextButtonElement));
    const tearsheetElement = screen.getByRole('dialog', { name: ariaLabel });
    const createTearsheetSteps = tearsheetElement.querySelector(
      `.${createTearsheetBlockClass}__content .${carbon.prefix}--form`
    ).children;
    expect(
      createTearsheetSteps[1].firstElementChild.classList.contains(
        `${createTearsheetBlockClass}__step__step--visible-step`
      )
    ).toBeTruthy();

    jest.advanceTimersByTime(1000);

    expect(onNextStepFn).toHaveBeenCalled();
    await act(() => click(cancelButtonElement));
    expect(onCloseFn).toHaveBeenCalled();
  });

  it('should focus the specified element on steps greater than the first', async () => {
    renderCreateTearsheet({
      ...defaultProps,
      firstFocusElement: `#${secondStepButtonId}`,
    });
    const nextButtonElement = screen.getByText(nextButtonText);
    await act(() => click(nextButtonElement));
    setTimeout(() => {
      jest.advanceTimersByTime(1000);
      const button = screen.getByRole('button', {
        name: 'Second step button one',
      });
      expect(button).toHaveFocus();
    }, 1000);
  });

  it('should not focus the specified element if an invalid selector is provided', async () => {
    renderCreateTearsheet({
      ...defaultProps,
      firstFocusElement: `#invalid-selector`,
    });
    const nextButtonElement = screen.getByText(nextButtonText);

    await act(() => click(nextButtonElement));
    setTimeout(() => {
      jest.advanceTimersByTime(1000);
      const button = screen.getByRole('button', {
        name: 'Second step button one',
      });

      expect(button).toHaveFocus();
    }, 1000);
  });

  it('renders first step with onNext function prop that rejects', async () =>
    expectWarnAsync(
      `CreateTearsheet onNext error: ${rejectionErrorMessage}`,
      async () => {
        renderCreateTearsheet({
          ...defaultProps,
          rejectOnSubmit: false,
          rejectOnNext: true,
        });
        const nextButtonElement = screen.getByText(nextButtonText);
        await act(() => click(nextButtonElement));
        jest.advanceTimersByTime(1000);
        expect(onNextStepRejectionFn).toHaveBeenCalled();
      }
    ));

  it('calls the onPrevious function prop as expected', async () => {
    renderCreateTearsheet(defaultProps);
    const nextButtonElement = screen.getByText(nextButtonText);
    const backButtonElement = screen.getByText(backButtonText);
    const tearsheetElement = screen.getByRole('dialog', {
      name: ariaLabel,
    });
    const createTearsheetSteps = tearsheetElement.querySelector(
      `.${createTearsheetBlockClass}__content .${carbon.prefix}--form`
    ).children;
    await act(() => {
      /* fire events that update state */
      click(nextButtonElement);
    });
    expect(
      createTearsheetSteps[1].firstElementChild.classList.contains(
        `${createTearsheetBlockClass}__step__step--visible-step`
      )
    ).toBeTruthy();
    await waitFor(() => expect(onNextStepFn).toHaveBeenCalledTimes(1));
    click(backButtonElement);
    await waitFor(() => expect(onPreviousStepFn).toHaveBeenCalledTimes(1));
  });

  it('renders the next CreateTearsheet step without onNext handler', async () => {
    const { rerender } = renderCreateTearsheet(defaultProps);
    const nextButtonElement = screen.getByText(nextButtonText);
    await act(() => click(nextButtonElement));
    await waitFor(() => {
      expect(onNextStepFn).toHaveBeenCalled();
    });
    await act(() => click(nextButtonElement));
    const tearsheetElement = screen.getByRole('dialog', {
      name: ariaLabel,
    });
    const createTearsheetSteps = tearsheetElement.querySelector(
      `.${createTearsheetBlockClass}__content .${carbon.prefix}--form`
    ).children;
    expect(
      createTearsheetSteps[2].firstElementChild.classList.contains(
        `${createTearsheetBlockClass}__step__step--visible-step`
      )
    ).toBeTruthy();
    rerender(
      <CreateTearsheet
        {...defaultProps}
        open={false}
        onRequestSubmit={onRequestSubmitFn}
      >
        <CreateTearsheetStep title={step1Title} fieldsetLegendText={step1Title}>
          step 1 content
        </CreateTearsheetStep>
        <CreateTearsheetStep title={step2Title} fieldsetLegendText={step2Title}>
          step 2 content
        </CreateTearsheetStep>
      </CreateTearsheet>
    );
  });

  it('should call the onRequestSubmit prop, returning a promise on last step submit button', async () => {
    renderCreateTearsheet({
      ...defaultProps,
      rejectOnSubmit: false,
      rejectOnNext: false,
      submitFn: onRequestSubmitFn,
      onNext: onNextStepFn,
      finalOnNextFn: null,
    });

    const nextButtonElement = screen.getByText(nextButtonText);
    await act(() => click(nextButtonElement));
    await waitFor(() => {
      expect(onNextStepFn).toHaveBeenCalled();
    });
    await act(() => click(nextButtonElement));
    await waitFor(() => {
      expect(onNextStepFn).toHaveBeenCalled();
    });
    const submitButtonElement = screen.getByText(submitButtonText);
    await act(() => click(submitButtonElement));
    await waitFor(() => {
      expect(onRequestSubmitFn).toHaveBeenCalled();
    });
  });

  it('should call the onRequestSubmit function, without a promise, on last step submit button', async () => {
    renderCreateTearsheet({
      ...defaultProps,
      rejectOnSubmit: false,
      rejectOnNext: false,
      submitFn: onRequestSubmitNonPromiseFn,
      onNext: onNextStepNonPromiseFn,
      finalOnNextFn: finalStepOnNextNonPromise,
    });
    const nextButtonElement = screen.getByText(nextButtonText);
    await act(() => click(nextButtonElement));
    await waitFor(() => {
      expect(onNextStepNonPromiseFn).toHaveBeenCalled();
    });
    await act(() => click(nextButtonElement));
    await waitFor(() => {
      expect(onNextStepNonPromiseFn).toHaveBeenCalled();
    });
    const submitButtonElement = screen.getByText(submitButtonText);
    await act(() => click(submitButtonElement));
    await waitFor(() => {
      expect(onRequestSubmitNonPromiseFn).toHaveBeenCalled();
    });
  });

  it('should call the onNext function from the final step and reject the promise', async () =>
    expectWarnAsync(
      `CreateTearsheet onNext error: ${rejectionErrorMessage}`,
      async () => {
        renderCreateTearsheet({
          ...defaultProps,
          rejectOnSubmit: false,
          rejectOnNext: false,
          submitFn: onRequestSubmitFn,
          onNext: onNextStepFn,
          finalOnNextFn: null,
          rejectOnSubmitNext: true,
        });
        const nextButtonElement = screen.getByText(nextButtonText);
        await act(() => click(nextButtonElement));
        await waitFor(() => {
          expect(onNextStepFn).toHaveBeenCalled();
        });
        await act(() => click(nextButtonElement));
        await waitFor(() => {
          expect(onNextStepFn).toHaveBeenCalled();
        });
        const submitButtonElement = screen.getByText(submitButtonText);
        await act(() => click(submitButtonElement));
        await waitFor(() => {
          expect(finalStepOnNextRejectFn).toHaveBeenCalled();
        });
      }
    ));

  it('should call the onRequestSubmit prop and reject the promise', async () =>
    expectWarnAsync(
      `CreateTearsheet submit error: ${rejectionErrorMessage}`,
      async () => {
        renderCreateTearsheet({
          ...defaultProps,
          rejectOnSubmit: true,
        });
        const nextButtonElement = screen.getByText(nextButtonText);
        await act(() => click(nextButtonElement));
        await waitFor(() => {
          expect(onNextStepFn).toHaveBeenCalled();
        });
        await act(() => click(nextButtonElement));
        await waitFor(() => {
          expect(onNextStepFn).toHaveBeenCalled();
        });
        const submitButtonElement = screen.getByText(submitButtonText);
        await act(() => click(submitButtonElement));
        await waitFor(() => {
          expect(onRequestSubmitRejectFn).toHaveBeenCalled();
        });
      }
    ));

  it('should not render any CreateTearsheet steps when there are no TearsheetStep components included', async () => {
    renderEmptyCreateTearsheet(defaultProps);
    const createTearsheetSteps = document.querySelectorAll(
      `.${createTearsheetBlockClass}__step`
    );
    expect(Array(...createTearsheetSteps)).toStrictEqual([]);
  });

  it('should click the back button and add a custom next button label on a single step', async () => {
    renderCreateTearsheet({
      ...defaultProps,
      rejectOnSubmit: false,
      rejectOnNext: false,
    });
    const nextButtonElement = screen.getByText(nextButtonText);
    await act(() => click(nextButtonElement));
    expect(onNextStepFn).toHaveBeenCalledTimes(1);
    const backButtonElement = screen.getByText(backButtonText);
    await act(() => click(backButtonElement));
    expect(onPreviousStepFn).toHaveBeenCalledTimes(1);
    const tearsheetElement = screen.getByRole('dialog', {
      name: ariaLabel,
    });
    const createTearsheetSteps = tearsheetElement.querySelector(
      `.${createTearsheetBlockClass}__content .${carbon.prefix}--form`
    ).children;
    expect(
      createTearsheetSteps[0].firstElementChild.classList.contains(
        `${createTearsheetBlockClass}__step__step--visible-step`
      )
    ).toBeTruthy();
  });

  it('should show experimentalSecondarySubmit button (4th button)', () => {
    renderCreateTearsheet({
      ...defaultProps,
      experimentalSecondarySubmitText,
    });
    const button = screen.getByText(experimentalSecondarySubmitText);
    expect(button).toBeInTheDocument();
  });

  it('should disabled experimentalSecondarySubmit button', () => {
    renderCreateTearsheet({
      ...defaultProps,
      experimentalSecondarySubmitText,
      experimentalSecondarySubmit: { disabled: true },
    });
    const button = screen.getByText(experimentalSecondarySubmitText);
    expect(button).toBeDisabled();
  });

  it('should hide experimentalSecondarySubmit button', () => {
    renderCreateTearsheet({
      ...defaultProps,
      experimentalSecondarySubmitText,
      experimentalSecondarySubmit: { hideSecondarySubmit: true },
    });
    const button = screen.queryByText(experimentalSecondarySubmitText);
    expect(button).toBeNull();
  });

  it('should rename experimentalSecondarySubmit button text', () => {
    renderCreateTearsheet({
      ...defaultProps,
      experimentalSecondarySubmitText,
      experimentalSecondarySubmit: {
        labelText: experimentalSecondaryLabelText,
      },
    });

    const button = screen.getByText(experimentalSecondaryLabelText);
    expect(button).toBeInTheDocument();
  });
  it('should call experimentalSecondarySubmit onClick', async () => {
    renderCreateTearsheet({
      ...defaultProps,
      experimentalSecondarySubmitText,
      experimentalSecondarySubmit: {
        onClick: onExperimentalSecondarySubmitClickFn,
      },
    });
    const button = screen.getByText(experimentalSecondarySubmitText);
    await act(() => click(button));
    await waitFor(() =>
      expect(onExperimentalSecondarySubmitClickFn).toHaveBeenCalled()
    );
  });

  it('should create a console warning when using CreateTearsheet with only one step', async () => {
    jest.spyOn(console, 'warn').mockImplementation(jest.fn());
    renderSingleStepCreateTearsheet(defaultProps);
    jest.spyOn(console, 'warn').mockRestore();
  });

  it('should create a console warning when using CreateTearsheet with only one step', async () =>
    expectWarn('CreateTearsheets with one step are not permitted', () => {
      renderSingleStepCreateTearsheet(defaultProps);
    }));

  it('should render an invalid create tearsheet', async () =>
    expectWarn(
      `You have tried using a ${componentName}Step component outside of a ${componentName}. This is not allowed. ${componentName}Steps should always be children of the ${componentName}`,
      () => {
        renderInvalidCreateTearsheet(defaultProps);
      }
    ));

  it('should not throw an error if null is passed as one of the children?', async () => {
    const children = [
      <CreateTearsheetStep title="Title 1" key="1" fieldsetLegendText="Title 1">
        <p>1</p>
      </CreateTearsheetStep>,
      null,
      <CreateTearsheetStep title="Title 2" key="2" fieldsetLegendText="Title 2">
        <p>2</p>
      </CreateTearsheetStep>,
    ];

    render(
      <CreateTearsheet {...defaultProps} onRequestSubmit={onRequestSubmitFn}>
        {children}
      </CreateTearsheet>
    );

    // Select the next button
    const nextButtonElement = screen.getByText(nextButtonText);

    await waitFor(() => userEvent.click(nextButtonElement));

    // Make sure the next step is on step 2
    const influencerSteps = document.querySelector(
      `.${pkg.prefix}--create-influencer__progress-indicator`
    );

    expect(
      influencerSteps.childNodes[0].classList.contains(
        `${carbon.prefix}--progress-step--complete`
      )
    ).toBe(true);

    expect(
      influencerSteps.childNodes[1].classList.contains(
        `${carbon.prefix}--progress-step--current`
      )
    ).toBe(true);
  });
});
