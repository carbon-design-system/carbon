/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';

import PropTypes from 'prop-types';

import {
  InterstitialScreenContext,
  blockClass,
  ActionType,
  disableButtonConfigType,
} from './context';
import {
  Button,
  ButtonSet,
  InlineLoading,
  ModalFooter,
  usePrefix,
} from '@carbon/react';
import { clamp } from '../../global/js/utils/clamp';
import { ArrowRight } from '@carbon/react/icons';
import { getDevtoolsProps } from '../../global/js/utils/devtools';

type actionButtonRendererArgs = {
  handleGotoStep?: (value: number) => void;
  progStep?: number;
  stepCount?: number;
  disableButtonConfig?: disableButtonConfigType;
};

export interface InterstitialScreenFooterProps {
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className?: string;
  /**
   * The label for the Previous button.
   */
  previousButtonLabel?: string;

  /**
   * The label for the skip button.
   */
  skipButtonLabel?: string;
  /**
   * The label for the start button.
   */
  startButtonLabel?: string;
  /**
   * The label for the Next button.
   */
  nextButtonLabel?: string;
  /**
   * This is an optional callback prop that allows to render your custom footer action buttons.
   * note: this is applicable when not using custom actionButtonRenderer
   */
  actionButtonRenderer?: (config: actionButtonRendererArgs) => React.ReactNode;

  /**
   * optional asynchronous callback on action button click
   */
  onAction?: (actionName: ActionType, config: actionButtonRendererArgs) => void;
}
const InterstitialScreenFooter = React.forwardRef<
  HTMLDivElement,
  InterstitialScreenFooterProps
>((props, ref) => {
  const {
    className = '',
    skipButtonLabel = 'Skip',
    previousButtonLabel = 'Back',
    nextButtonLabel = 'Next',
    startButtonLabel = 'Get Started',
    actionButtonRenderer,
    onAction,
    ...rest
  } = props;

  const footerBlockClass = `${blockClass}--footer`;
  const {
    handleClose,
    progStep,
    handleGotoStep,
    stepCount,
    disableButtonConfig,
    isFullScreen,
  } = useContext(InterstitialScreenContext);
  const startButtonRef = useRef<HTMLButtonElement | null>(null);
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);
  const [loadingAction, setLoadingAction] = useState('');

  const carbonPrefix = usePrefix();

  const isMultiStep = !!stepCount && stepCount > 1;
  const progStepFloor = 0;
  const progStepCeil = stepCount - 1;
  //this will focus the start button on last step when next button is hidden and start button is shown
  useEffect(() => {
    if (progStep + 1 === stepCount && startButtonRef.current) {
      startButtonRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progStep]);

  const handleAction = async (actionType: ActionType) => {
    setLoadingAction(actionType);

    const abortContinue = await onAction?.(actionType, {
      handleGotoStep,
      progStep,
      stepCount,
      disableButtonConfig,
    });

    setLoadingAction('');

    // Skip navigation if onAction explicitly returns true
    if (abortContinue) {
      return;
    }

    if (actionType === 'next' || actionType === 'back') {
      const stepDelta = actionType === 'next' ? 1 : -1;
      const targetStep = clamp(
        progStep + stepDelta,
        progStepFloor,
        progStepCeil
      );
      handleGotoStep?.(targetStep as number);
    } else {
      handleClose?.(actionType);
    }
  };

  // Usage
  const handleStart = () => handleAction('start');
  const handleSkip = () => handleAction('skip');
  const handleClickNext = () => handleAction('next');
  const handleClickPrev = () => handleAction('back');

  const getRenderIcon = useMemo(() => {
    if (loadingAction !== 'start' && isMultiStep && progStep === progStepCeil) {
      return { renderIcon: ArrowRight };
    }
    return {};
  }, [loadingAction, isMultiStep, progStep, progStepCeil]);

  const getFooterContent = () => (
    <ButtonSet>
      {isMultiStep && skipButtonLabel !== '' && (
        <Button
          className={`${blockClass}--skip-btn`}
          kind="ghost"
          size="lg"
          title={skipButtonLabel}
          onClick={handleSkip}
          disabled={disableButtonConfig?.skip}
        >
          {skipButtonLabel}
          {loadingAction === 'skip' && <InlineLoading />}
        </Button>
      )}

      {isMultiStep && progStep > 0 && (
        <Button
          className={`${blockClass}--prev-btn`}
          kind="secondary"
          size="lg"
          title={previousButtonLabel}
          disabled={disableButtonConfig?.back}
          onClick={handleClickPrev}
        >
          {previousButtonLabel}
          {loadingAction === 'back' && <InlineLoading />}
        </Button>
      )}

      {isMultiStep && progStep < progStepCeil && (
        <Button
          className={`${blockClass}--next-btn`}
          renderIcon={loadingAction !== 'next' ? ArrowRight : undefined}
          ref={nextButtonRef}
          size="lg"
          title={nextButtonLabel}
          disabled={disableButtonConfig?.next}
          onClick={handleClickNext}
        >
          {nextButtonLabel}
          {loadingAction === 'next' && <InlineLoading />}
        </Button>
      )}
      {((isMultiStep && progStep === progStepCeil) || !isMultiStep) && (
        <Button
          className={`${blockClass}--start-btn`}
          ref={startButtonRef}
          size="lg"
          title={startButtonLabel}
          disabled={disableButtonConfig?.start}
          onClick={handleStart}
          {...getRenderIcon}
        >
          {startButtonLabel}
          {loadingAction === 'start' && <InlineLoading />}
        </Button>
      )}
    </ButtonSet>
  );
  const footerContent = actionButtonRenderer
    ? actionButtonRenderer({
        handleGotoStep,
        progStep,
        stepCount,
        disableButtonConfig,
      })
    : getFooterContent();

  return isFullScreen ? (
    <div
      ref={ref}
      className={`${footerBlockClass} ${className}  ${carbonPrefix}--modal-footer`}
      {...getDevtoolsProps('InterstitialScreenFooter')}
      {...rest}
    >
      {footerContent}
    </div>
  ) : (
    <ModalFooter
      className={`${footerBlockClass} ${className}`}
      ref={ref}
      {...rest}
    >
      {footerContent}
    </ModalFooter>
  );
});

export default InterstitialScreenFooter;

InterstitialScreenFooter.propTypes = {
  /**
   * This is an optional callback prop that allows to render your custom footer action buttons.
   */
  actionButtonRenderer: PropTypes.func,
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,

  /**
   * The label for the Next button.
   */
  nextButtonLabel: PropTypes.string,
  /**
   * optional asynchronous callback on action button click (skip, previous, next and start)
   * note: this is applicable when not using custom actionButtonRenderer
   */
  onAction: PropTypes.func,
  /**
   * The label for the Previous button.
   *
   */
  previousButtonLabel: PropTypes.string,
  /**
   * The label for the skip button.
   */
  skipButtonLabel: PropTypes.string,
  /**
   * The label for the start button.
   */
  startButtonLabel: PropTypes.string,
};
