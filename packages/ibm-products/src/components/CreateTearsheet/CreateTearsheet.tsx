/**
 * Copyright IBM Corp. 2021, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  Dispatch,
  ForwardedRef,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
  createContext,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  useCreateComponentFocus,
  useCreateComponentStepChange,
  usePreviousValue,
  useResetCreateComponent,
  useValidCreateStepCount,
} from '../../global/js/hooks';
import { deprecateProp } from '../../global/js/utils/props-helper';

import { CreateInfluencer } from '../CreateInfluencer';
import { Form } from '@carbon/react';
import PropTypes from 'prop-types';
import { TearsheetShell } from '../Tearsheet/TearsheetShell';
import cx from 'classnames';
import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { getNumberOfHiddenSteps } from '../../global/js/utils/getNumberOfHiddenSteps';
import { lastIndexInArray } from '../../global/js/utils/lastIndexInArray';
import { pkg } from '../../settings';
import { ExperimentalSecondarySubmit } from './CreateTearsheetStep';

const componentName = 'CreateTearsheet';
const blockClass = `${pkg.prefix}--tearsheet-create`;

// This is a general context for the steps container
// containing information about the state of the container
// and providing some callback methods for steps to use

export interface StepsContextType {
  currentStep: number;
  setExperimentalSecondarySubmit: Dispatch<
    SetStateAction<ExperimentalSecondarySubmit | undefined>
  >;
  setIsDisabled: Dispatch<SetStateAction<boolean>>;
  setOnPrevious: (fn: any) => void;
  setOnNext: (fn: any) => void;
  setOnMount: (fn: any) => void;
  setSecondaryButtonDisabled?: Dispatch<SetStateAction<boolean>>;
  setStepData: Dispatch<SetStateAction<Step[]>>;
  stepData: Step[];
}
export const StepsContext = createContext<StepsContextType | null>(null);

// This is a context supplied separately to each step in the container
// to let it know what number it is in the sequence of steps
export const StepNumberContext = createContext(-1);

export interface CreateTearsheetProps extends PropsWithChildren {
  /**
   * The back button text
   */
  backButtonText: string;

  /**
   * The cancel button text
   */
  cancelButtonText: string;

  /**
   * The main content of the tearsheet
   */
  // children?: ReactNode;

  /**
   * An optional class or classes to be added to the outermost element.
   */
  className?: string;

  /**
   * The experimentalSecondary submit button text
   */
  experimentalSecondarySubmitText?: string;

  /**
   * Optional prop that allows you to pass any component.
   */
  decorator?: ReactNode;

  /**
   * Specifies elements to focus on first on render.
   */
  firstFocusElement?: string;

  /**
   * A description of the flow, displayed in the header area of the tearsheet.
   */
  description?: ReactNode;

  /**
   * Specify a CSS selector that matches the DOM element that should be
   * focused when the Modal opens.
   */
  selectorPrimaryFocus?: string;

  /**
   * To indicate an error occurred in the Tearsheet step
   * Used to pass this value to TearsheetShell
   */
  hasError?: boolean;

  /**
   * Used to set the size of the influencer
   */
  influencerWidth?: 'narrow' | 'wide';

  /**
   * This can be used to open the component to a step other than the first step.
   * For example, a create flow was previously in progress, data was saved, and
   * is now being completed.
   */
  initialStep?: number;

  /**
   * A label for the tearsheet, displayed in the header area of the tearsheet
   * to maintain context for the tearsheet (e.g. as the title changes from page
   * to page of a multi-page task).
   */
  label?: ReactNode;

  /**
   * The next button text
   */
  nextButtonText: string;

  /**
   * An optional handler that is called when the user closes the tearsheet (by
   * clicking the close button, if enabled, or clicking outside, if enabled).
   * Returning `false` here prevents the modal from closing.
   */
  onClose?: () => void;

  /**
   * Specify a handler for submitting the multi step tearsheet (final step).
   * This function can _optionally_ return a promise that is either resolved or rejected and the CreateTearsheet will handle the submitting state of the create button.
   */
  onRequestSubmit: () => void;

  /**
   * Specifies whether the tearsheet is currently open.
   */
  open?: boolean;

  /**
   * The submit button text
   */
  submitButtonText: string;

  /**
   * The main title of the tearsheet, displayed in the header area.
   */
  title?: ReactNode;

  /**
   * The position of the top of tearsheet in the viewport. The 'normal'
   * position (the default) is a short distance down from the top of the
   * viewport, leaving room at the top for a global header bar to show through
   * from below. The 'lower' position provides a little extra room at the top
   * to allow an action bar navigation or breadcrumbs to also show through.
   */
  verticalPosition?: 'normal' | 'lower';

  // Deprecated props
  /**
   * @deprecated Property replaced by `decorator`
   */
  slug?: ReactNode;
}

interface Step {
  introStep?: boolean;
  secondaryLabel?: string;
  shouldIncludeStep?: boolean;
  title?: string;
}

export const CreateTearsheet = forwardRef(
  (
    {
      // The component props, in alphabetical order (for consistency).

      backButtonText,
      cancelButtonText,
      children,
      className,
      experimentalSecondarySubmitText,
      firstFocusElement,
      description,
      hasError,
      influencerWidth = 'narrow',
      initialStep,
      label,
      nextButtonText,
      onClose,
      onRequestSubmit,
      open,
      selectorPrimaryFocus,
      slug: deprecated_slug,
      decorator,
      submitButtonText,
      title,
      verticalPosition = 'normal',

      // Collect any other property values passed in.
      ...rest
    }: CreateTearsheetProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const [createTearsheetActions, setCreateTearsheetActions] = useState([]);
    const [shouldViewAll, setShouldViewAll] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [loadingPrevious, setLoadingPrevious] = useState<boolean>(false);
    const [onPrevious, setOnPrevious] = useState();
    const [onNext, setOnNext] = useState();
    const [onMount, setOnMount] = useState();
    const [secondaryButtonDisabled, setSecondaryButtonDisabled] =
      useState(false);
    const [stepData, setStepData] = useState<Step[]>([]);
    const [firstIncludedStep, setFirstIncludedStep] = useState(1);
    const [lastIncludedStep, setLastIncludedStep] = useState<number>();
    const [experimentalSecondarySubmit, setExperimentalSecondarySubmit] =
      useState<ExperimentalSecondarySubmit>();
    const previousState = usePreviousValue({ currentStep, open });
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const firstItem =
        stepData.findIndex((item) => item?.shouldIncludeStep) + 1;
      const lastItem = lastIndexInArray(stepData, 'shouldIncludeStep', true);
      if (firstItem !== firstIncludedStep) {
        setCurrentStep(firstItem);
        setFirstIncludedStep(firstItem);
      }
      if (lastItem !== lastIncludedStep) {
        setLastIncludedStep(lastItem);
      }
      if (open && initialStep) {
        const numberOfHiddenSteps = getNumberOfHiddenSteps(
          stepData,
          initialStep
        );
        setCurrentStep(Number(initialStep + numberOfHiddenSteps));
      }
    }, [firstIncludedStep, initialStep, lastIncludedStep, open, stepData]);

    useCreateComponentFocus({
      previousState,
      currentStep,
      blockClass: `.${blockClass} .${pkg.prefix}--tearsheet-create__step`,
      onMount,
      firstFocusElement: firstFocusElement || selectorPrimaryFocus,
    });
    useValidCreateStepCount(stepData.length, componentName);
    useResetCreateComponent({
      firstIncludedStep,
      previousState,
      /**@ts-ignore */
      open,
      setCurrentStep,
      stepData,
      /**@ts-ignore */
      initialStep,
      totalSteps: stepData?.length,
      componentName,
    });
    useCreateComponentStepChange({
      firstIncludedStep,
      lastIncludedStep,
      stepData,
      onPrevious,
      onNext,
      isSubmitDisabled: isDisabled,
      setCurrentStep,
      setIsSubmitting,
      setShouldViewAll,
      /**@ts-ignore */
      setLoadingPrevious,
      loadingPrevious,
      onClose,
      onRequestSubmit,
      componentName,
      currentStep,
      shouldViewAll,
      backButtonText,
      cancelButtonText,
      submitButtonText,
      nextButtonText,
      isSubmitting,
      secondaryButtonDisabled,
      componentBlockClass: blockClass,
      experimentalSecondarySubmit,
      experimentalSecondarySubmitText: experimentalSecondarySubmit?.labelText
        ? experimentalSecondarySubmit.labelText
        : experimentalSecondarySubmitText,
      setCreateComponentActions: setCreateTearsheetActions,
    });

    return (
      <TearsheetShell
        {...getDevtoolsProps(componentName)}
        {...rest}
        {...{
          ref,
          actions: createTearsheetActions,
          className: cx(blockClass, className),
          description,
          influencer: (
            <CreateInfluencer currentStep={currentStep} stepData={stepData} />
          ),
          influencerWidth,
          label,
          onClose,
          open,
          size: 'wide',
          decorator: decorator || deprecated_slug,
          title,
          verticalPosition,
          closeIconDescription: '',
        }}
        currentStep={currentStep}
        hasError={hasError}
        selectorPrimaryFocus={selectorPrimaryFocus}
      >
        <div className={`${blockClass}__content`} ref={contentRef}>
          <Form
            aria-label={title}
            onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
              e.preventDefault()
            }
          >
            <StepsContext.Provider
              value={{
                currentStep,
                setExperimentalSecondarySubmit,
                setIsDisabled,
                setOnPrevious: (fn) => setOnPrevious(() => fn),
                setOnNext: (fn) => setOnNext(() => fn),
                setOnMount: (fn) => setOnMount(() => fn),
                setSecondaryButtonDisabled,
                setStepData,
                stepData,
              }}
            >
              {React.Children.toArray(children)
                .filter(Boolean)
                .map((child, index) => (
                  <StepNumberContext.Provider value={index + 1} key={index}>
                    {child}
                  </StepNumberContext.Provider>
                ))}
            </StepsContext.Provider>
          </Form>
        </div>
      </TearsheetShell>
    );
  }
);

// Return a placeholder if not released and not enabled by feature flag

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
CreateTearsheet.displayName = componentName;

const deprecatedProps = {
  /**
   *  @deprecated Property replaced by `decorator`
   */
  slug: deprecateProp(PropTypes.node, 'Property replaced by `decorator`'),
};
// Note that the descriptions here should be kept in sync with those for the
// corresponding props for TearsheetNarrow and TearsheetShell components.
CreateTearsheet.propTypes = {
  /**
   * The back button text
   */
  backButtonText: PropTypes.string.isRequired,

  /**
   * The cancel button text
   */
  cancelButtonText: PropTypes.string.isRequired,

  /**
   * The main content of the tearsheet
   */
  children: PropTypes.node,

  /**
   * An optional class or classes to be added to the outermost element.
   */
  className: PropTypes.string,

  /**
   *  Optional prop that allows you to pass any component.
   */
  decorator: PropTypes.node,

  /**
   * A description of the flow, displayed in the header area of the tearsheet.
   */
  description: PropTypes.node,

  /**
   * The experimentalSecondary submit button text
   */
  experimentalSecondarySubmitText: PropTypes.string,

  /**
   * Specifies elements to focus on first on render.
   */
  firstFocusElement: PropTypes.string,

  /**
   * To indicate an error occurred in the Tearsheet step
   * Used to pass this value to TearsheetShell
   */
  hasError: PropTypes.bool,

  /**
   * Used to set the size of the influencer
   */
  influencerWidth: PropTypes.oneOf(['narrow', 'wide']),

  /**
   * This can be used to open the component to a step other than the first step.
   * For example, a create flow was previously in progress, data was saved, and
   * is now being completed.
   */
  initialStep: PropTypes.number,

  /**
   * A label for the tearsheet, displayed in the header area of the tearsheet
   * to maintain context for the tearsheet (e.g. as the title changes from page
   * to page of a multi-page task).
   */
  label: PropTypes.node,

  /**
   * The next button text
   */
  nextButtonText: PropTypes.string.isRequired,

  /**
   * An optional handler that is called when the user closes the tearsheet (by
   * clicking the close button, if enabled, or clicking outside, if enabled).
   * Returning `false` here prevents the modal from closing.
   */
  onClose: PropTypes.func,

  /**
   * Specify a handler for submitting the multi step tearsheet (final step).
   * This function can _optionally_ return a promise that is either resolved or rejected and the CreateTearsheet will handle the submitting state of the create button.
   */
  onRequestSubmit: PropTypes.func.isRequired,

  /**
   * Specifies whether the tearsheet is currently open.
   */
  open: PropTypes.bool,

  /**
   * Specify a CSS selector that matches the DOM element that should be
   * focused when the Modal opens.
   */
  selectorPrimaryFocus: PropTypes.string,

  /**
   * The submit button text
   */
  submitButtonText: PropTypes.string.isRequired,

  /**
   * The main title of the tearsheet, displayed in the header area.
   */
  title: PropTypes.node,

  /**
   * The position of the top of tearsheet in the viewport. The 'normal'
   * position (the default) is a short distance down from the top of the
   * viewport, leaving room at the top for a global header bar to show through
   * from below. The 'lower' position provides a little extra room at the top
   * to allow an action bar navigation or breadcrumbs to also show through.
   */
  verticalPosition: PropTypes.oneOf(['normal', 'lower']),
  ...deprecatedProps,
};
