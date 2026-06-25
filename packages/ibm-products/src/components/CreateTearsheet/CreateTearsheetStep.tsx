/**
 * Copyright IBM Corp. 2021, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  forwardRef,
  useContext,
  useEffect,
  useState,
  isValidElement,
  PropsWithChildren,
  useRef,
  RefObject,
} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Column, FormGroup, Grid } from '@carbon/react';
import { StepsContext, StepNumberContext } from './CreateTearsheet';
import { pkg } from '../../settings';
import pconsole from '../../global/js/utils/pconsole';
import { usePreviousValue, useRetrieveStepData } from '../../global/js/hooks';

const componentName = 'CreateTearsheetStep';
const blockClass = `${pkg.prefix}--tearsheet-create__step`;

// Default values for props
const defaults = {
  hasFieldset: true,
  includeStep: true,
};

type fieldsetLegendTextProps =
  | {
      /**
       * This optional prop will render your form content inside of a fieldset html element
       * and is defaulted to true.
       * You can set this prop to `false` if you have multiple fieldset elements or want to control the children of your Full Page's step content.
       */
      hasFieldset: false;
      /**
       * This is the required legend text that appears above a fieldset html element for accessibility purposes.
       * You can set the `hasFieldset` prop to false if you have multiple fieldset elements or want to control the children of your Full Page's step content.
       * Otherwise, use CSS to hide/remove this label text.
       */
      fieldsetLegendText?: string;
      /**
       * This is the required legend id that appears as the aria-labelledby of fieldset for accessibility purposes.
       */
      fieldsetLegendId?: React.ReactNode;
    }
  | {
      /**
       * This optional prop will render your form content inside of a fieldset html element
       * and is defaulted to true.
       * You can set this prop to `false` if you have multiple fieldset elements or want to control the children of your Full Page's step content.
       */
      hasFieldset?: true;
      /**
       * This is the required legend text that appears above a fieldset html element for accessibility purposes.
       * You can set the `hasFieldset` prop to false if you have multiple fieldset elements or want to control the children of your Full Page's step content.
       * Otherwise, use CSS to hide/remove this label text.
       */
      fieldsetLegendText: string;
      /**
       * This is the required legend id that appears as the aria-labelledby of fieldset for accessibility purposes.
       */
      fieldsetLegendId: React.ReactNode;
    };

interface CreateTearsheetStepBaseProps extends PropsWithChildren {
  /**
   * Content that shows in the tearsheet step
   */
  children?: React.ReactNode;

  /**
   * Sets an optional className to be added to the tearsheet step
   */
  className?: string;

  /**
   * Sets an optional description on the step component
   */
  description?: React.ReactNode;

  /**
   * This will conditionally disable the submit button in the multi step Tearsheet
   */
  disableSubmit?: boolean;

  /**
   * Configuration options for customizing the behavior of the experimentalSecondary submit button.
   */
  experimentalSecondarySubmit?: ExperimentalSecondarySubmit;

  /**
   * This prop is used to help track dynamic steps. If this value is `false` then the step is not included in the visible steps or the ProgressIndicator
   * steps. If this value is `true` then the step will be included in the list of visible steps, as well as being included in the ProgressIndicator step list
   */
  includeStep?: boolean;

  /**
   * This prop can be used on the first step to mark it as an intro step, which will not render the progress indicator steps
   */
  introStep?: boolean;

  /**
   * This optional prop will indicate an error icon on the progress indicator step item
   */
  invalid?: boolean;

  /**
   * Optional function to be called on initial mount of a step.
   * For example, this can be used to fetch data that is required on a particular step.
   */
  onMount?: () => void;

  /**
   * Optional function to be called when you move to the next step.
   * For example, this can be used to validate input fields before proceeding to the next step.
   * This function can _optionally_ return a promise that is either resolved or rejected and the CreateTearsheet will handle the submitting state of the next button.
   */
  onNext?: () => Promise<void>;

  /**
   * Optional function to be called when you move to the previous step.
   */
  onPrevious?: () => void;

  /**
   * This will conditionally disable the secondary (Back) button in the multi step Tearsheet
   */
  secondaryButtonDisabled?: boolean;

  /**
   * Sets the optional secondary label on the progress step component
   */
  secondaryLabel?: string;

  /**
   * Sets an optional subtitle on the step component
   */
  subtitle?: string;

  /**
   * Sets the title text for a tearsheet step
   */
  title: React.ReactNode;
}
interface PreviousStateProps {
  currentStep: number | undefined;
}
type CreateTearsheetStepProps = CreateTearsheetStepBaseProps &
  fieldsetLegendTextProps;

/**
 * Configuration options for customizing the behavior of the experimentalSecondary submit button.
 *
 * @property {string} [labelText] - Optional text to replace the default button text.
 * @property {boolean} [disabled] - If true, the button will be disabled and not clickable.
 * @property {boolean} [hideSecondarySubmit] - If true, the button will be hidden from view.
 * @property {() => void} [onClick] - Optional click handler function to be executed when the button is clicked.
 */
export type ExperimentalSecondarySubmit = {
  labelText?: string;
  disabled?: boolean;
  hideSecondarySubmit?: boolean;
  onClick?: () => void;
};

export const CreateTearsheetStep = forwardRef(
  (
    {
      // The component props, in alphabetical order (for consistency).

      children,
      className,
      description,
      disableSubmit,
      experimentalSecondarySubmit,
      fieldsetLegendText,
      fieldsetLegendId,
      hasFieldset = defaults.hasFieldset,
      includeStep = defaults.includeStep,
      introStep,
      invalid,
      onMount,
      onNext,
      onPrevious,
      secondaryButtonDisabled,
      secondaryLabel,
      subtitle,
      title,

      // Collect any other property values passed in.
      ...rest
    }: CreateTearsheetStepProps,
    ref
  ) => {
    const localRef = useRef<HTMLDivElement>(null);
    const stepRef = ref || localRef;
    const stepRefValue = (stepRef as RefObject<HTMLDivElement>).current;
    const stepsContext = useContext(StepsContext);
    const stepNumber = useContext(StepNumberContext);
    const [shouldIncludeStep, setShouldIncludeStep] =
      useState<boolean>(includeStep);
    const previousState = usePreviousValue({
      currentStep: stepsContext?.currentStep,
    }) as PreviousStateProps | undefined;

    useRetrieveStepData({
      stepsContext,
      stepNumber,
      introStep: !!introStep,
      shouldIncludeStep,
      secondaryLabel: secondaryLabel || '',
      title,
      invalid: !!invalid,
    });

    // This useEffect reports back the onMount value so that they can be used
    // in the appropriate custom hooks.
    useEffect(() => {
      if (
        stepNumber === stepsContext?.currentStep &&
        previousState?.currentStep !== stepsContext?.currentStep
      ) {
        stepsContext?.setOnMount(onMount);
        stepsContext?.setExperimentalSecondarySubmit(
          experimentalSecondarySubmit
        );
      }
    }, [
      onMount,
      experimentalSecondarySubmit,
      stepsContext,
      stepNumber,
      previousState?.currentStep,
    ]);

    // Used to take the `includeStep` prop and use it as a local state value
    useEffect(() => {
      setShouldIncludeStep(includeStep);
    }, [includeStep, stepsContext, title]);

    // Whenever we are the current step, supply our disableSubmit and onNext values to the
    // steps container context so that it can manage the 'Next' button appropriately.
    useEffect(() => {
      if (stepNumber === stepsContext?.currentStep) {
        stepsContext.setIsDisabled(!!disableSubmit);
        stepsContext?.setOnNext(onNext); // needs to be updated here otherwise there could be stale state values from only initially setting onNext
        stepsContext?.setOnPrevious(onPrevious);
        stepsContext?.setSecondaryButtonDisabled?.(!!secondaryButtonDisabled);

        //Handle props for experimentalSecondarySubmit button, depending on state change
        stepsContext?.setExperimentalSecondarySubmit(
          experimentalSecondarySubmit
        );
      }
    }, [
      stepsContext,
      stepNumber,
      disableSubmit,
      onNext,
      onPrevious,
      secondaryButtonDisabled,
      stepRef,
      stepRefValue,
      experimentalSecondarySubmit,
    ]);

    const renderDescription = () => {
      if (description) {
        if (typeof description === 'string') {
          return <p className={`${blockClass}--description`}>{description}</p>;
        }
        if (isValidElement(description)) {
          return (
            <div className={`${blockClass}--description`}>{description}</div>
          );
        }
      }
      return null;
    };

    return stepsContext ? (
      <div
        ref={stepRef as RefObject<HTMLDivElement>}
        inert={stepNumber !== stepsContext?.currentStep}
      >
        <Grid
          {
            // Pass through any other property values as HTML attributes.
            ...rest
          }
          className={cx(blockClass, className, {
            [`${blockClass}__step--hidden-step`]:
              stepNumber !== stepsContext?.currentStep,
            [`${blockClass}__step--visible-step`]:
              stepNumber === stepsContext?.currentStep,
          })}
        >
          <Column xlg={12} lg={12} md={8} sm={4}>
            <h4 className={`${blockClass}--title`}>{title}</h4>

            {subtitle && (
              <h5 className={`${blockClass}--subtitle`}>{subtitle}</h5>
            )}

            {renderDescription()}
          </Column>

          <Column span={100}>
            {hasFieldset ? (
              <FormGroup
                legendText={fieldsetLegendText}
                className={`${blockClass}--fieldset`}
                legendId={fieldsetLegendId}
              >
                {children}
              </FormGroup>
            ) : (
              children
            )}
          </Column>
        </Grid>
      </div>
    ) : (
      pconsole.warn(
        `You have tried using a ${componentName} component outside of a CreateTearsheet. This is not allowed. ${componentName}s should always be children of the CreateTearsheet`
      )
    );
  }
);

CreateTearsheetStep.propTypes = {
  /**
   * Content that shows in the tearsheet step
   */
  children: PropTypes.node,

  /**
   * Sets an optional className to be added to the tearsheet step
   */
  className: PropTypes.string,

  /**
   * Sets an optional description on the step component
   */
  description: PropTypes.node,

  /**
   * This will conditionally disable the submit button in the multi step Tearsheet
   */
  disableSubmit: PropTypes.bool,

  /**
   * Configuration options for customizing the behavior of the experimentalSecondary submit button.
   *
   * @property {string} [labelText] - Optional text to replace the default button text.
   * @property {boolean} [disabled] - If true, the button will be disabled and not clickable.
   * @property {boolean} [hideSecondarySubmit] - If true, the button will be hidden from view.
   * @property {() => void} [onClick] - Optional click handler function to be executed when the button is clicked.
   */
  /**@ts-ignore*/
  experimentalSecondarySubmit: PropTypes.shape({
    labelText: PropTypes.string,
    disabled: PropTypes.bool,
    hideSecondarySubmit: PropTypes.bool,
    onClick: PropTypes.func,
  }),

  /**
   * This is the required legend id that appears as the aria-labelledby of fieldset for accessibility purposes.
   */
  /**@ts-ignore*/
  fieldsetLegendId: PropTypes.node,

  /**
   * This is the required legend text that appears above a fieldset html element for accessibility purposes.
   * You can set the `hasFieldset` prop to false if you have multiple fieldset elements or want to control the children of your Full Page's step content.
   * Otherwise, use CSS to hide/remove this label text.
   */
  /**@ts-ignore*/
  fieldsetLegendText: PropTypes.string,

  /**
   * This optional prop will render your form content inside of a fieldset html element
   * and is defaulted to true.
   * You can set this prop to `false` if you have multiple fieldset elements or want to control the children of your Full Page's step content.
   */
  /**@ts-ignore*/
  hasFieldset: PropTypes.bool,

  /**
   * This prop is used to help track dynamic steps. If this value is `false` then the step is not included in the visible steps or the ProgressIndicator
   * steps. If this value is `true` then the step will be included in the list of visible steps, as well as being included in the ProgressIndicator step list
   */
  includeStep: PropTypes.bool,

  /**
   * This prop can be used on the first step to mark it as an intro step, which will not render the progress indicator steps
   */
  introStep: PropTypes.bool,

  /**
   * This optional prop will indicate an error icon on the progress indicator step item
   */
  invalid: PropTypes.bool,

  /**
   * Optional function to be called on initial mount of a step.
   * For example, this can be used to fetch data that is required on a particular step.
   */
  onMount: PropTypes.func,

  /**
   * Optional function to be called when you move to the next step.
   * For example, this can be used to validate input fields before proceeding to the next step.
   * This function can _optionally_ return a promise that is either resolved or rejected and the CreateTearsheet will handle the submitting state of the next button.
   */
  onNext: PropTypes.func,

  /**
   * Optional function to be called when you move to the previous step.
   */
  onPrevious: PropTypes.func,

  /**
   * This will conditionally disable the secondary (Back) button in the multi step Tearsheet
   */
  secondaryButtonDisabled: PropTypes.bool,

  /**
   * Sets the optional secondary label on the progress step component
   */
  secondaryLabel: PropTypes.string,

  /**
   * Sets an optional subtitle on the step component
   */
  subtitle: PropTypes.string,

  /**
   * Sets the title text for a tearsheet step
   */
  title: PropTypes.node.isRequired,
};
