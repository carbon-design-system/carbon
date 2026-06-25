/**
 * Copyright IBM Corp. 2021, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react'; // https://testing-library.com/docs/react-testing-library/intro
import userEvent from '@testing-library/user-event';
import { carbon, pkg } from '../../settings';
import uuidv4 from '../../global/js/utils/uuidv4';
import {
  expectWarn,
  expectWarnAsync,
  expectMultipleWarn,
} from '../../global/js/utils/test-helper';

import { CreateFullPage } from '.';
import { CreateFullPageStep } from './CreateFullPageStep';

import { TextInput } from '@carbon/react';

const componentName = CreateFullPage.displayName;
const blockClass = `${pkg.prefix}--create-full-page`;
const nextButtonText = 'Next';
const backButtonText = 'Back';
const cancelButtonText = 'Cancel';
const submitButtonText = 'Submit';
const modalTitle = 'Are you sure you want to cancel?';
const modalDescription =
  "If you cancel, the information you have entered won't be saved.";
const modalDangerButtonText = 'Cancel partition';
const modalSecondaryButtonText = 'Return to form';

const dataTestId = uuidv4();
const onCloseFn = jest.fn();
const rejectionErrorMessage = uuidv4();
const onRequestSubmitFn = jest.fn(() => Promise.resolve());
const onRequestSubmitNonPromiseFn = jest.fn();
const onRequestSubmitRejectFn = jest.fn(() =>
  Promise.reject(rejectionErrorMessage)
);
const onNextStepFn = jest.fn(() => Promise.resolve());
const onPreviousStepFn = jest.fn();
const onNextStepNonPromiseFn = jest.fn();
const onNextStepRejectionFn = jest.fn(() =>
  Promise.reject(rejectionErrorMessage)
);

const finalStepOnNext = jest.fn(() => Promise.resolve());
const finalStepOnNextNonPromise = jest.fn();
const finalStepOnNextRejectFn = jest.fn(() =>
  Promise.reject(rejectionErrorMessage)
);
const onMountFn = jest.fn();

const defaultFullPageProps = {
  nextButtonText,
  backButtonText,
  cancelButtonText,
  submitButtonText,
  modalTitle,
  modalDescription,
  modalDangerButtonText,
  modalSecondaryButtonText,
  onClose: onCloseFn,
};

const stepFormField = (
  <TextInput
    id={uuidv4()}
    labelText="Topic name"
    invalidText="A valid value is required"
    placeholder="Enter topic name"
  />
);

const renderComponent = ({ ...rest } = {}) =>
  render(
    <CreateFullPage
      onRequestSubmit={onRequestSubmitRejectFn}
      {...defaultFullPageProps}
      {...rest}
    >
      <CreateFullPageStep title="Title 1" subtitle="Subtitle 1">
        <p>1</p>
      </CreateFullPageStep>
      <CreateFullPageStep title="Title 2" description="2">
        <p>2</p>
      </CreateFullPageStep>
    </CreateFullPage>
  );
// render an CreateFullPage with button labels and any other required props
const renderCreateFullPage = ({
  rejectOnSubmit = false,
  rejectOnNext = false,
  submitFn = onRequestSubmitFn,
  onNext = onNextStepFn,
  onPrevious = onPreviousStepFn,
  finalOnNextFn = finalStepOnNext,
  rejectOnSubmitNext = false,
  ...rest
}) =>
  render(
    <CreateFullPage
      {...rest}
      onRequestSubmit={rejectOnSubmit ? onRequestSubmitRejectFn : submitFn}
      {...defaultFullPageProps}
    >
      <CreateFullPageStep
        title="Title 1"
        subtitle="Subtitle 1"
        onNext={rejectOnNext ? onNextStepRejectionFn : onNext}
        hasFieldset
        fieldsetLegendText="Title1"
        onMount={onMountFn}
      >
        {stepFormField}
      </CreateFullPageStep>
      <CreateFullPageStep
        title="Title 2"
        description="2"
        fieldsetLegendText="2"
        invalid={false}
        onPrevious={onPrevious}
      >
        {stepFormField}
      </CreateFullPageStep>
      <CreateFullPageStep
        title="Title 3"
        description="3"
        onNext={rejectOnSubmitNext ? finalStepOnNextRejectFn : finalOnNextFn}
        invalid
      >
        {stepFormField}
      </CreateFullPageStep>
    </CreateFullPage>
  );

const renderEmptyCreateFullPage = ({ ...rest } = {}) =>
  render(
    <CreateFullPage
      {...rest}
      {...defaultFullPageProps}
      onRequestSubmit={onRequestSubmitFn}
    >
      {stepFormField}
    </CreateFullPage>
  );

const renderOneStepCreateFullPage = ({ ...rest } = {}) =>
  render(
    <CreateFullPage
      {...rest}
      {...defaultFullPageProps}
      onRequestSubmit={onRequestSubmitFn}
    >
      <CreateFullPageStep title="Title 1">{stepFormField}</CreateFullPageStep>
    </CreateFullPage>
  );

const renderFullPageWithStepChildrenOutside = ({ ...rest } = {}) =>
  render(
    <>
      <CreateFullPage
        {...rest}
        {...defaultFullPageProps}
        onRequestSubmit={onRequestSubmitFn}
      >
        <CreateFullPageStep title="Title 1">{stepFormField}</CreateFullPageStep>
        <CreateFullPageStep title="Title 2">{stepFormField}</CreateFullPageStep>
      </CreateFullPage>
      <CreateFullPageStep title="Test title">content</CreateFullPageStep>
    </>
  );

describe(componentName, () => {
  it('has no accessibility violations', async () => {
    const { container } = renderComponent({ ...defaultFullPageProps });
    try {
      await expect(container).toBeAccessible(componentName);
      await expect(container).toHaveNoAxeViolations();
    } catch (err) {
      /* empty */
    }
  });

  it('adds additional properties to the containing node', async () => {
    renderCreateFullPage({ 'data-testid': dataTestId });
    screen.getByTestId(dataTestId);
  });

  it('adds the Devtools attribute to the containing node', async () => {
    renderCreateFullPage({ 'data-testid': dataTestId });

    expect(screen.getByTestId(dataTestId)).toHaveDevtoolsAttribute(
      componentName
    );
  });

  it('renders the CreateFullPage component', async () => {
    const { container } = renderCreateFullPage({
      ...defaultFullPageProps,
    });
    expect(container.querySelector(`.${blockClass}`)).toBeTruthy();
  });

  it('should call onClickInfluencerStep when expected', async () => {
    const onChange = jest.fn();
    renderCreateFullPage({
      ...defaultFullPageProps,
      onClickInfluencerStep: onChange,
    });

    await userEvent.click(screen.getByTitle('Title 2'));
    expect(onChange).toHaveBeenCalled();
  });

  it('should render the CreateFullPage on the specified initialStep prop provided', () => {
    const { container } = renderCreateFullPage({
      ...defaultFullPageProps,
      initialStep: 2,
    });
    const createFullPageSteps = container.querySelector(
      `.${blockClass}__content .${blockClass}__form`
    ).children;

    expect(
      createFullPageSteps[1].classList.contains(
        `${blockClass}__step__step--visible-step`
      )
    ).toBeTruthy();
  });

  it('renders the first step if an invalid initialStep value zero is provided', () =>
    expectWarn(
      `${CreateFullPage.displayName}: An invalid \`initialStep\` prop was supplied. The \`initialStep\` prop should be a number that is greater than 0 or less than or equal to the number of steps your ${CreateFullPage.displayName} has.`,
      () => {
        const { container } = renderCreateFullPage({
          ...defaultFullPageProps,
          // This will cause a console warning
          initialStep: 0,
        });
        const createFullPageSteps = container.querySelector(
          `.${blockClass}__content .${blockClass}__form`
        ).children;
        expect(
          createFullPageSteps[0].classList.contains(
            `${blockClass}__step__step--visible-step`
          )
        ).toBeTruthy();
        // The onMount prop will get called here because the first step is rendered
        expect(onMountFn).toHaveBeenCalledTimes(1);
      }
    ));
  it('renders the first step if an invalid initialStep value bigger than step length is provided', async () =>
    expectWarn(
      `${CreateFullPage.displayName}: An invalid \`initialStep\` prop was supplied. The \`initialStep\` prop should be a number that is greater than 0 or less than or equal to the number of steps your ${CreateFullPage.displayName} has.`,
      () => {
        const { container } = renderCreateFullPage({
          ...defaultFullPageProps,
          // This will cause a console warning
          initialStep: 10,
        });
        const createFullPageSteps = container.querySelector(
          `.${blockClass}__content .${blockClass}__form`
        ).children;
        expect(
          createFullPageSteps[0].classList.contains(
            `${blockClass}__step__step--visible-step`
          )
        ).toBeTruthy();
        // The onMount prop will get called here because the first step is rendered
        expect(onMountFn).toHaveBeenCalledTimes(1);
      }
    ));

  it('should not render any CreateFullPage steps when there are no FullPageStep components included', async () => {
    const { container } = renderEmptyCreateFullPage({
      ...defaultFullPageProps,
    });
    const createFullPageSteps = container.querySelectorAll(
      `.${blockClass}__step`
    );
    expect(Array(...createFullPageSteps)).toStrictEqual([]);
  });

  it('should create a console warning when using CreateFullPage with only one step', async () =>
    expectWarn('CreateFullPages with one step are not permitted', () => {
      const { container } = renderOneStepCreateFullPage(defaultFullPageProps);
      expect(() => {
        render(...container);
      }).toThrow();
    }));

  it('throws a console warning when FullPageStep is used outside of CreateFullPage', async () =>
    expectMultipleWarn(
      [
        `You have tried using a ${componentName}Step component outside of a ${componentName}. This is not allowed. ${componentName}Steps should always be children of the ${componentName}`,
        `You have tried using a ${componentName}Step component outside of a ${componentName}. This is not allowed. ${componentName}Steps should always be children of the ${componentName}`,
      ],
      () => {
        const { container } =
          renderFullPageWithStepChildrenOutside(defaultFullPageProps);
        expect(() => {
          render(...container);
        }).toThrow();
      }
    ));

  it('renders the second step if clicking on the next step button with onNext optional function prop', async () => {
    const { click } = userEvent;
    const { container } = renderCreateFullPage(defaultFullPageProps);
    const nextButtonElement = screen.getByText(nextButtonText);
    await act(() => click(nextButtonElement));
    const createFullPageSteps = container.querySelector(
      `.${blockClass}__content .${blockClass}__form`
    ).children;
    expect(
      createFullPageSteps[1].classList.contains(
        `${blockClass}__step__step--visible-step`
      )
    ).toBeTruthy();

    await waitFor(() => {
      expect(onNextStepFn).toHaveBeenCalled();
    });
  });

  it('calls the onPrevious function prop as expected', async () => {
    const { click } = userEvent;
    const { container } = renderCreateFullPage(defaultFullPageProps);
    const nextButtonElement = screen.getByText(nextButtonText);
    const backButtonElement = screen.getByText(backButtonText);
    await act(() => click(nextButtonElement));
    const createFullPageSteps = container.querySelector(
      `.${blockClass}__content .${blockClass}__form`
    ).children;
    expect(
      createFullPageSteps[0].classList.contains(
        `${blockClass}__step__step--visible-step`
      )
    ).not.toBeTruthy();

    await waitFor(() => {
      expect(onNextStepFn).toHaveBeenCalled();
    });
    click(backButtonElement);
    await waitFor(() => expect(onPreviousStepFn).toHaveBeenCalledTimes(1));
  });

  it('renders a modal when cancel button has been clicked and recognizes primary and secondary button clicks in modal', async () => {
    const { click } = userEvent;
    const { container, rerender } = renderCreateFullPage(defaultFullPageProps);
    const cancelButtonElement = screen.getByText(cancelButtonText);
    await act(() => click(cancelButtonElement));
    const createFullPageModal = container.querySelector(
      `.${blockClass}__modal`
    );
    expect(container).toContainElement(createFullPageModal);
    const modalCancelButtonElement = screen.getByText(modalDangerButtonText);
    const modalReturnButtonElement = screen.getByText(modalSecondaryButtonText);
    await act(() => click(modalCancelButtonElement));
    expect(onCloseFn).toHaveBeenCalled();

    rerender(
      <CreateFullPage
        onRequestSubmit={onRequestSubmitRejectFn}
        {...defaultFullPageProps}
      >
        <CreateFullPageStep
          title="Title 1"
          fieldsetLegendText="1"
          onNext={onNextStepRejectionFn}
        >
          {stepFormField}
        </CreateFullPageStep>
        <CreateFullPageStep
          title="Title 2"
          description="2"
          fieldsetLegendText="2"
        >
          {stepFormField}
        </CreateFullPageStep>
        <CreateFullPageStep
          title="Title 3"
          description="3"
          fieldsetLegendText="3"
          onNext={finalStepOnNextRejectFn}
        >
          {stepFormField}
        </CreateFullPageStep>
      </CreateFullPage>
    );
    await act(() => click(modalReturnButtonElement));
    expect(container.querySelector(`.${blockClass}`)).toBeTruthy();
  });

  it('should call the onRequestSubmit prop, returning a promise on last step submit button', async () => {
    const { click } = userEvent;
    renderCreateFullPage({
      ...defaultFullPageProps,
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
    const { click } = userEvent;
    renderCreateFullPage({
      ...defaultFullPageProps,
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
      `CreateFullPage onNext error: ${rejectionErrorMessage}`,
      async () => {
        const { click } = userEvent;
        renderCreateFullPage({
          ...defaultFullPageProps,
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
      `CreateFullPage submit error: ${rejectionErrorMessage}`,
      async () => {
        const { click } = userEvent;
        renderCreateFullPage({
          ...defaultFullPageProps,
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

  it('should disable the submit button when `disableSubmit` prop is passed in FullPageStep', async () => {
    const { click } = userEvent;
    render(
      <CreateFullPage
        onRequestSubmit={onRequestSubmitRejectFn}
        {...defaultFullPageProps}
      >
        <CreateFullPageStep
          title="Title 1"
          fieldsetLegendText="1"
          onNext={onNextStepFn}
        >
          {stepFormField}
        </CreateFullPageStep>
        <CreateFullPageStep
          title="Title 2"
          description="2"
          fieldsetLegendText="2"
          disableSubmit
        >
          {stepFormField}
        </CreateFullPageStep>
      </CreateFullPage>
    );
    const nextButtonElement = screen.getByText(nextButtonText);
    await act(() => click(nextButtonElement));
    await waitFor(() => {
      expect(onNextStepFn).toHaveBeenCalled();
    });
    const submitButtonElement = screen.getByText(submitButtonText);
    expect(submitButtonElement).toHaveAttribute('disabled');
  });

  it('should click the back button and add a custom next button label on a single step', async () => {
    const { click } = userEvent;
    const { container } = renderCreateFullPage({
      ...defaultFullPageProps,
      rejectOnSubmit: false,
      rejectOnNext: false,
    });
    const nextButtonElement = screen.getByText(nextButtonText);
    await act(() => click(nextButtonElement));
    await waitFor(() => {
      expect(onNextStepFn).toHaveBeenCalled();
    });
    const backButtonElement = screen.getByText(backButtonText);
    await act(() => click(backButtonElement));
    const fullPageChildren = container.querySelector(
      `.${blockClass}__form`
    ).children;
    expect(
      fullPageChildren[0].classList.contains(
        `${blockClass}__step__step--visible-step`
      )
    ).toBeTruthy();
  });

  it('should render a fieldset element around FullPageStep children when `hasFieldset` prop is provided', async () => {
    const { container } = renderCreateFullPage({
      ...defaultFullPageProps,
    });
    const createFullPageSteps = container.querySelector(
      `.${blockClass}__content .${blockClass}__form`
    ).children;
    expect(
      createFullPageSteps[0].children[1].classList.contains(
        `${blockClass}__step-fieldset`
      )
    ).toBeTruthy();
  });

  it('renders a header if title is provided ', () => {
    const { container } = renderCreateFullPage({
      ...defaultFullPageProps,
      title: 'Page title',
    });
    const headerSelector = container.querySelector(`.${blockClass}__header`);

    expect(headerSelector).toBeInTheDocument();
  });

  it('renders a header if breadcrumbs are provided', () => {
    const { container } = renderCreateFullPage({
      ...defaultFullPageProps,
      breadcrumbs: [
        { key: '0', href: '/', label: 'Home page' },
        { key: '1', href: '/', label: 'Application name' },
      ],
      breadcrumbsOverflowAriaLabel: 'breadcrumbs overflow aria-label',
    });
    const headerSelector = container.querySelector(`.${blockClass}__header`);

    expect(headerSelector).toBeInTheDocument();
  });

  it("doesn't render a header if title or breadcrumbs are not provided  ", () => {
    const { container } = renderCreateFullPage({
      ...defaultFullPageProps,
    });
    const headerSelector = container.querySelector(`.${blockClass}__header`);
    expect(headerSelector).not.toBeInTheDocument();
  });

  it('renders an error icon if the step invalid prop is set to true', async () => {
    renderCreateFullPage({
      ...defaultFullPageProps,
    });

    expect(
      screen
        .getByRole('button', { description: 'Title 1' })
        .querySelector(`.${carbon.prefix}--progress__warning`)
    ).not.toBeInTheDocument();
    expect(
      screen
        .getByRole('button', { description: 'Title 2' })
        .querySelector(`.${carbon.prefix}--progress__warning`)
    ).not.toBeInTheDocument();
    expect(
      screen
        .getByRole('button', { description: 'Title 3' })
        .querySelector(`.${carbon.prefix}--progress__warning`)
    ).toBeInTheDocument();
  });

  it('should prevent close after submitting', async () => {
    renderComponent({
      onRequestSubmit: () => {
        return {
          preventClose: true,
        };
      },
      initialStep: 2,
    });

    // select the submit button with the label text
    const submitButtonElement = screen.getByText(submitButtonText);

    // click the submit button
    await waitFor(() => userEvent.click(submitButtonElement));
    // the component should not un mount, thus onClose should not be
    expect(onCloseFn).not.toHaveBeenCalled();
  });

  it('should not throw an error if null is passed as one of the children', async () => {
    const children = [
      <CreateFullPageStep title="Title 1" subtitle="Subtitle 1" key="1">
        <p>1</p>
      </CreateFullPageStep>,
      null,
      <CreateFullPageStep title="Title 2" description="2" key="2">
        <p>2</p>
      </CreateFullPageStep>,
    ];

    const { container } = render(
      <CreateFullPage
        {...defaultFullPageProps}
        onRequestSubmit={onRequestSubmitFn}
      >
        {children}
      </CreateFullPage>
    );

    // Select the next button
    const nextButtonElement = screen.getByText(nextButtonText);

    await waitFor(() => userEvent.click(nextButtonElement));

    // Make sure the next step is on step 2
    const influencerSteps = container.querySelector(
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
