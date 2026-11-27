/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  useEffect,
  PropsWithChildren,
  isValidElement,
  forwardRef,
  RefObject,
  useRef,
} from 'react';
import { Heading, FormGroup, Grid, Column } from '@carbon/react';
import cx from 'classnames';
import { useStepContext } from '@carbon/utilities-react';
import { useCreateTearsheetContext } from './CreateTearsheetContext';

const blockClass = 'create-tearsheet-step';

// Default values for props
const defaults = {
  hasFieldset: true,
  includeStep: true,
};

type fieldsetLegendTextProps =
  | {
      hasFieldset: false;
      fieldsetLegendText?: string;
      fieldsetLegendId?: React.ReactNode;
    }
  | {
      hasFieldset?: true;
      fieldsetLegendText?: string;
      fieldsetLegendId?: React.ReactNode;
    };

interface CreateTearsheetStepBaseProps extends PropsWithChildren {
  children?: React.ReactNode;
  className?: string;
  description?: React.ReactNode;
  subtitle?: string;
  title: React.ReactNode;
  label?: string;
  secondaryLabel?: string;
  onMount?: () => void;
  primaryFocusElement?: string;
  includeStep?: boolean;
  invalid?: boolean;
  hideSteps?: boolean;
  disableSubmit?: boolean;
}

type CreateTearsheetStepProps = CreateTearsheetStepBaseProps &
  fieldsetLegendTextProps;

export const CreateTearsheetStep = forwardRef<
  HTMLDivElement,
  CreateTearsheetStepProps
>(
  (
    {
      children,
      className,
      description,
      subtitle,
      title,
      label,
      secondaryLabel,
      onMount,
      primaryFocusElement,
      fieldsetLegendText,
      fieldsetLegendId,
      hasFieldset = defaults.hasFieldset,
      includeStep = defaults.includeStep,
      invalid,
      hideSteps,
      disableSubmit,
      ...rest
    },
    ref
  ) => {
    const localRef = useRef<HTMLDivElement>(null);
    const stepRef = ref || localRef;
    const { currentStep, totalSteps } = useStepContext();
    const { open } = useCreateTearsheetContext();

    useEffect(() => {
      if (onMount) {
        onMount();
      }
    }, [onMount]);

    useEffect(() => {
      if (primaryFocusElement && open) {
        const element = document.querySelector(
          primaryFocusElement
        ) as HTMLElement;
        setTimeout(() => {
          element?.focus();
        });
      }
    }, [primaryFocusElement, currentStep, open]);

    const renderDescription = () => {
      if (description) {
        if (typeof description === 'string') {
          return <p className={`${blockClass}__description`}>{description}</p>;
        }
        if (isValidElement(description)) {
          return (
            <div className={`${blockClass}__description`}>{description}</div>
          );
        }
      }
      return null;
    };

    // Don't render the step at all if includeStep is false
    if (!includeStep) {
      return null;
    }

    return (
      <div ref={stepRef as RefObject<HTMLDivElement>}>
        <Grid
          {...rest}
          className={cx(blockClass, className, {
            [`${blockClass}--visible-step`]: includeStep,
          })}
        >
          <Column xlg={12} lg={12} md={8} sm={4}>
            <Heading className={`${blockClass}__title`}>{title}</Heading>

            {subtitle && (
              <h5 className={`${blockClass}__subtitle`}>{subtitle}</h5>
            )}

            {renderDescription()}
          </Column>

          <Column span={100}>
            {hasFieldset ? (
              <FormGroup
                legendText={fieldsetLegendText}
                className={`${blockClass}__fieldset`}
                legendId={fieldsetLegendId}
              >
                {children}
              </FormGroup>
            ) : (
              <div className={`${blockClass}__content`}>{children}</div>
            )}
          </Column>
        </Grid>
      </div>
    );
  }
);

CreateTearsheetStep.displayName = 'CreateTearsheetStep';
