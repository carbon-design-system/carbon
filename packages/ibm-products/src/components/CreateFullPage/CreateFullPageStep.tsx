/**
 * Copyright IBM Corp. 2021, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  ForwardedRef,
  PropsWithChildren,
  ReactNode,
  forwardRef,
  isValidElement,
  useContext,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { pkg } from '../../settings';
import { Column, FormGroup, Grid, Heading, Section } from '@carbon/react';
import { StepsContext, StepNumberContext } from './CreateFullPage';
import { usePreviousValue, useRetrieveStepData } from '../../global/js/hooks';
import pconsole from '../../global/js/utils/pconsole';

const componentName = 'CreateFullPageStep';
const blockClass = `${pkg.prefix}--create-full-page__step`;

// Default values for props
const defaults = {
  includeStep: true as boolean,
};

interface CreateFullPageStepBaseProps extends PropsWithChildren {
  /**
   * Sets an optional className to be added to the CreateFullPage step
   */
  className?: string;

  /**
   * Sets an optional description on the progress step component
   */
  description?: ReactNode;

  /**
   * This will conditionally disable the submit button in the multi step CreateFullPage
   */
  disableSubmit?: boolean;

  /**
   * This optional prop will render your form content inside of a fieldset html element
   */
  hasFieldset?: boolean;

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
   * Optional function to be called on a step change.
   * For example, this can be used to validate input fields before proceeding to the next step.
   * This function can _optionally_ return a promise that is either resolved or rejected and the CreateFullPage will handle the submitting state of the next button.
   */
  onNext?: () => void | Promise<any>;

  /**
   * Optional function to be called when you move to the previous step.
   */
  onPrevious?: () => void;

  /**
   * Sets the optional secondary label on the progress step component
   */
  secondaryLabel?: string;

  /**
   * Sets an optional subtitle on the progress step component
   */
  subtitle?: string;

  /**
   * Sets the title text for a create full page step
   */
  title: ReactNode;
}

// Try to specify the hasFieldset and fieldsetLegendText Typescript requirements.
// Basically, fieldsetLegendText should only be specified when hasFieldset is true.
// And usually, hasFieldset won't be specified at all unless it's being set to true.
type CreateFullPageStepFieldsetProps =
  | {
      // fieldsetLegendText should not be specified unless hasFieldset is true, but
      // not sure how to do that in Typescript.
      fieldsetLegendText?: string;
    }
  | {
      hasFieldset: false;

      // fieldsetLegendText should not be specified unless hasFieldset is true, but
      // not sure how to do that in Typescript.
      fieldsetLegendText?: string;
    }
  | {
      hasFieldset: true;
      fieldsetLegendText: string;
    };

export type CreateFullPageStepProps = CreateFullPageStepBaseProps &
  CreateFullPageStepFieldsetProps;

export const CreateFullPageStep = forwardRef(
  (
    {
      // The component props, in alphabetical order (for consistency).

      children,
      className,
      subtitle,
      description,
      disableSubmit,
      includeStep = defaults.includeStep,
      introStep,
      invalid,
      title,
      hasFieldset,
      fieldsetLegendText,
      onNext,
      onPrevious,
      onMount,
      secondaryLabel,

      // Collect any other property values passed in.
      ...rest
    }: CreateFullPageStepProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const stepsContext = useContext(StepsContext);
    const stepNumber = useContext(StepNumberContext);
    const [shouldIncludeStep, setShouldIncludeStep] = useState<boolean>();
    const previousState = usePreviousValue({
      currentStep: stepsContext?.currentStep,
    });

    useRetrieveStepData({
      invalid,
      stepsContext,
      stepNumber,
      introStep,
      shouldIncludeStep,
      secondaryLabel,
      title,
    });

    // This useEffect reports back the onMount value so that they can be used
    // in the appropriate custom hooks.
    useEffect(() => {
      if (
        stepNumber === stepsContext?.currentStep &&
        previousState?.currentStep !== stepsContext?.currentStep
      ) {
        stepsContext?.setOnMount(onMount);
      }
    }, [onMount, stepsContext, stepNumber, previousState?.currentStep]);

    useEffect(() => {
      setShouldIncludeStep(includeStep);
    }, [includeStep, stepsContext, title]);

    // Whenever we are the current step, supply our disableSubmit and onNext values to the
    // steps container context so that it can manage the 'Next' button appropriately.
    useEffect(() => {
      if (stepNumber === stepsContext?.currentStep) {
        stepsContext.setIsDisabled(disableSubmit as boolean);
        stepsContext?.setOnNext(onNext); // needs to be updated here otherwise there could be stale state values from only initially setting onNext
        stepsContext?.setOnPrevious(onPrevious);
      }
    }, [stepsContext, stepNumber, disableSubmit, onNext, onPrevious]);

    const span = { span: 50 }; // Half.

    const renderDescription = () => {
      if (description) {
        const common = {
          children: description,
          className: `${blockClass}-description`,
          ...span,
        };

        if (typeof description === 'string') {
          return <Column {...common} as="p" />;
        } else if (isValidElement(description)) {
          return <Column {...common} as="div" />;
        }
      }
      return null;
    };

    return stepsContext ? (
      <Section
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
        ref={ref}
      >
        <Grid>
          <Column {...span}>
            <Grid>
              <Column className={`${blockClass}-title`} as={Heading} {...span}>
                {title}
              </Column>

              {subtitle && (
                <Column className={`${blockClass}-subtitle`} as="p" {...span}>
                  {subtitle}
                </Column>
              )}

              {renderDescription()}
            </Grid>
          </Column>
        </Grid>

        {hasFieldset ? (
          <FormGroup
            legendText={fieldsetLegendText}
            className={`${blockClass}-fieldset`}
          >
            {children}
          </FormGroup>
        ) : (
          children
        )}
      </Section>
    ) : (
      pconsole.warn(
        `You have tried using a ${componentName} component outside of a CreateFullPage. This is not allowed. ${componentName}s should always be children of the CreateFullPage`
      )
    );
  }
);

CreateFullPageStep.propTypes = {
  /**
   * Content that shows in the CreateFullPage step
   */
  children: PropTypes.node,

  /**
   * Sets an optional className to be added to the CreateFullPage step
   */
  className: PropTypes.string,

  /**
   * Sets an optional description on the progress step component
   */
  description: PropTypes.node,

  /**
   * This will conditionally disable the submit button in the multi step CreateFullPage
   */
  disableSubmit: PropTypes.bool,

  /**
   * This is the legend text that appears above a fieldset html element for accessibility purposes. It is required when the optional `hasFieldset` prop is provided to a FullPageStep.
   */
  /**@ts-ignore */
  fieldsetLegendText: PropTypes.string,

  /**
   * This optional prop will render your form content inside of a fieldset html element
   */
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
   * Optional function to be called on a step change.
   * For example, this can be used to validate input fields before proceeding to the next step.
   * This function can _optionally_ return a promise that is either resolved or rejected and the CreateFullPage will handle the submitting state of the next button.
   */
  onNext: PropTypes.func,

  /**
   * Optional function to be called when you move to the previous step.
   */
  onPrevious: PropTypes.func,

  /**
   * Sets the optional secondary label on the progress step component
   */
  secondaryLabel: PropTypes.string,

  /**
   * Sets an optional subtitle on the progress step component
   */
  subtitle: PropTypes.string,

  /**
   * Sets the title text for a create full page step
   */
  title: PropTypes.node.isRequired,
};
