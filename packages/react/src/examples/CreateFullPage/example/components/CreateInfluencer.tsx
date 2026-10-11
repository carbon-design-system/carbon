/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React, { PropsWithChildren, ReactNode } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Heading, ProgressIndicator, ProgressStep } from '@carbon/react';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = 'create-influencer';
const componentName = 'CreateInfluencer';

interface Step {
  introStep?: boolean;
  invalid?: boolean;
  secondaryLabel?: string;
  shouldIncludeStep?: boolean;
  title?: ReactNode;
}
interface CreateInfluencerProps {
  className?: string;
  currentStep: number;
  onClickStep?: (step: number) => void;
  stepData: Step[];
  title?: string | undefined;
}

export const CreateInfluencer = ({
  className,
  currentStep,
  onClickStep,
  stepData,
  title,
}: PropsWithChildren<CreateInfluencerProps>) => {
  const getNumberOfDynamicStepsBeforeCurrentStep = (array, key) => {
    const dynamicSteps: any[] = [];
    array.forEach((item, index) => {
      if (array[index]?.[key] === false && index <= currentStep - 1) {
        dynamicSteps.push(item);
      }
    });
    return dynamicSteps.length;
  };

  // renders the step progression components in the left influencer area
  const renderProgressSteps = () => {
    const extractedSteps = stepData?.filter((item) => !item?.introStep);
    const progressSteps = extractedSteps?.filter(
      (item) => item?.shouldIncludeStep
    );

    // To get the ProgressIndicator's `currentIndex`, accounting for dynamic steps,
    // we need to subtract the number of !shouldIncludeStep/s before the current step
    // which we get from `getNumberOfDynamicStepsBeforeCurrentStep()`
    const totalDynamicSteps =
      getNumberOfDynamicStepsBeforeCurrentStep(stepData, 'shouldIncludeStep') ||
      0;

    return (
      <div className={`${blockClass}__left-nav`}>
        {title && <Heading className={`${blockClass}__title`}>{title}</Heading>}
        {currentStep === 1 && stepData[0]?.introStep ? null : (
          <ProgressIndicator
            currentIndex={
              stepData[0]?.introStep
                ? currentStep - totalDynamicSteps - 2 // minus 2 because we need to account for the intro step in addition to `currentIndex` being 0 index based and our steps being 1 index based
                : currentStep - totalDynamicSteps - 1 // minus 1 because ProgressIndicator currentIndex prop is 0 index based, but our steps are 1 index based
            }
            spaceEqually
            vertical
            className={cx(`${blockClass}__progress-indicator`)}
            onChange={onClickStep}
          >
            {progressSteps.map((step: Step, stepIndex: number) => {
              return (
                <ProgressStep
                  label={step?.title as string}
                  key={stepIndex}
                  secondaryLabel={step.secondaryLabel || undefined}
                  invalid={step.invalid}
                />
              );
            })}
          </ProgressIndicator>
        )}
      </div>
    );
  };

  return (
    <div className={cx(blockClass, className)}>{renderProgressSteps()}</div>
  );
};

CreateInfluencer.displayName = componentName;
