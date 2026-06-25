/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ComposedModal,
  Form,
  ModalBody,
  ModalFooter,
  ModalHeader,
  BreadcrumbItem,
  OverflowMenu,
  OverflowMenuItem,
} from '@carbon/react';
import {
  StepProvider,
  StepGroup,
  useStepContext,
} from '@carbon/utilities-react';
import { preview__PageHeader as PageHeader } from '@carbon/ibm-products';
import { CreateInfluencer } from './CreateInfluencer';
import { ActionSet } from './ActionSet';

const blockClass = 'create-full-page-pattern';

const CreateFullPage = ({
  breadcrumbs,
  breadcrumbsOverflowAriaLabel,
  breadcrumbOverflowTooltipAlign,
  title,
  secondaryTitle,
  children,
  cancelButtonText,
  submitButtonText,
  nextButtonText,
  backButtonText,
  modalTitle,
  modalDescription,
  modalDangerButtonText,
  modalSecondaryButtonText,
  onClose,
  onRequestSubmit,
}) => {
  return (
    <StepProvider>
      <CreateFullPageContent
        breadcrumbs={breadcrumbs}
        breadcrumbsOverflowAriaLabel={breadcrumbsOverflowAriaLabel}
        breadcrumbOverflowTooltipAlign={breadcrumbOverflowTooltipAlign}
        title={title}
        secondaryTitle={secondaryTitle}
        cancelButtonText={cancelButtonText}
        submitButtonText={submitButtonText}
        nextButtonText={nextButtonText}
        backButtonText={backButtonText}
        modalTitle={modalTitle}
        modalDescription={modalDescription}
        modalDangerButtonText={modalDangerButtonText}
        modalSecondaryButtonText={modalSecondaryButtonText}
        onClose={onClose}
        onRequestSubmit={onRequestSubmit}
      >
        {children}
      </CreateFullPageContent>
    </StepProvider>
  );
};

const CreateFullPageContent = ({
  breadcrumbs,
  breadcrumbsOverflowAriaLabel,
  breadcrumbOverflowTooltipAlign,
  title,
  secondaryTitle,
  children,
  cancelButtonText,
  submitButtonText,
  nextButtonText,
  backButtonText,
  modalTitle,
  modalDescription,
  modalDangerButtonText,
  modalSecondaryButtonText,
  onClose,
  onRequestSubmit,
  onClickInfluencerStep,
}) => {
  const {
    currentStep,
    totalSteps,
    handleNext,
    handlePrevious,
    handleGoToStep,
    formState,
    setFormState,
  } = useStepContext();

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  // Build step data for CreateInfluencer and collect step props
  const stepData = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return {
        title: child.props.title,
        secondaryLabel: child.props.secondaryLabel,
        shouldIncludeStep: true,
        disableSubmit: child.props.disableSubmit,
        invalid: child.props.invalid,
        onNext: child.props.onNext,
        onPrevious: child.props.onPrevious,
      };
    }
    return null;
  }).filter(Boolean);

  // Get current step's disableSubmit value and onNext handler
  const currentStepData = stepData[currentStep - 1];
  const isNextDisabled = currentStepData?.disableSubmit || false;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep === totalSteps) {
      setIsSubmitting(true);
      try {
        await onRequestSubmit?.(formState);
        // Don't reset to step 1 after submission - let the parent handle navigation
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Call the current step's onNext handler if it exists
      const currentOnNext = currentStepData?.onNext;
      if (currentOnNext) {
        setIsSubmitting(true);
        try {
          await currentOnNext();
          handleNext();
        } catch (error) {
          // If onNext rejects, don't proceed to next step
          console.error('Step validation failed:', error);
        } finally {
          setIsSubmitting(false);
        }
      } else {
        handleNext();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      handlePrevious();
    }
  };

  const handleCancel = () => {
    console.log('cancel partition');

    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const handleModalConfirm = () => {
    onClose?.();
    handleGoToStep(1);
    setFormState({});
    setModalIsOpen(false);
  };

  // Build action set buttons
  const actions = [
    {
      key: 'cancel',
      label: cancelButtonText,
      kind: 'ghost',
      onClick: handleCancel,
    },
    {
      key: 'back',
      label: backButtonText,
      kind: 'secondary',
      onClick: handleBack,
      disabled: currentStep === 1,
    },
    {
      key: 'next',
      label: currentStep === totalSteps ? submitButtonText : nextButtonText,
      kind: 'primary',
      onClick: handleSubmit,
      loading: isSubmitting,
      disabled: isNextDisabled,
    },
  ];

  return (
    <div className={blockClass}>
      {(title || breadcrumbs) && (
        <PageHeader.Root className={`${blockClass}__header`}>
          <PageHeader.BreadcrumbBar>
            <PageHeader.BreadcrumbOverflow
              renderOverflowBreadcrumb={(hiddenItems) => (
                <BreadcrumbItem data-floating-menu-container>
                  <OverflowMenu
                    align="bottom"
                    aria-label={
                      breadcrumbsOverflowAriaLabel ||
                      'Open and close additional breadcrumb item list.'
                    }
                  >
                    {hiddenItems.map((el, index) => (
                      <OverflowMenuItem key={index} itemText={el.innerText} />
                    ))}
                  </OverflowMenu>
                </BreadcrumbItem>
              )}
            >
              {breadcrumbs?.map((crumb, index) => (
                <BreadcrumbItem
                  key={crumb.key || index}
                  href={crumb.href || '/#'}
                >
                  {crumb.label}
                </BreadcrumbItem>
              ))}
            </PageHeader.BreadcrumbOverflow>
          </PageHeader.BreadcrumbBar>
          <PageHeader.Content title={title} />
        </PageHeader.Root>
      )}
      <div className={`${blockClass}__influencer-and-body-container`}>
        <div className={`${blockClass}__influencer`}>
          <CreateInfluencer
            stepData={stepData}
            currentStep={currentStep}
            title={secondaryTitle}
            onClickStep={onClickInfluencerStep}
          />
        </div>
        <div className={`${blockClass}__body`}>
          <div className={`${blockClass}__main`}>
            <div className={`${blockClass}__content`}>
              <Form
                className={`${blockClass}__form`}
                aria-label={title}
                onSubmit={handleSubmit}
              >
                <StepGroup>{children}</StepGroup>
              </Form>
            </div>
            <ActionSet
              className={`${blockClass}__buttons`}
              actions={actions}
              buttonSize="2xl"
              size="2xl"
            />
          </div>
        </div>
        <ComposedModal
          className={`${blockClass}__modal`}
          size="sm"
          open={modalIsOpen}
          aria-label={modalTitle}
          onClose={handleModalClose}
        >
          <ModalHeader title={modalTitle} />
          <ModalBody>
            <p>{modalDescription}</p>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              kind="secondary"
              onClick={handleModalClose}
              data-modal-primary-focus
            >
              {modalSecondaryButtonText}
            </Button>
            <Button type="button" kind="danger" onClick={handleModalConfirm}>
              {modalDangerButtonText}
            </Button>
          </ModalFooter>
        </ComposedModal>
      </div>
    </div>
  );
};

CreateFullPage.propTypes = {
  backButtonText: PropTypes.string,
  breadcrumbsOverflowAriaLabel: PropTypes.string,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
      isCurrentPage: PropTypes.bool,
    })
  ),
  cancelButtonText: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  maxVisibleBreadcrumbs: PropTypes.number,
  modalDangerButtonText: PropTypes.string.isRequired,
  modalDescription: PropTypes.string,
  modalSecondaryButtonText: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired,
  nextButtonText: PropTypes.string.isRequired,
  noTrailingSlash: PropTypes.bool,
  onClose: PropTypes.func,
  onRequestSubmit: PropTypes.func.isRequired,
  secondaryTitle: PropTypes.string,
  submitButtonText: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export { CreateFullPage };
export default CreateFullPage;
