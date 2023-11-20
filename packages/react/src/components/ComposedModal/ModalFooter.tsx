import React, { type ReactNode, type MouseEvent, type Ref } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import ButtonSet from '../ButtonSet';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { noopFn } from '../../internal/noopFn';
import InlineLoading from '../InlineLoading';

interface SecondaryButtonProps {
  buttonText: ReactNode;
  onClick(evt: MouseEvent): void;
}
export interface SecondaryButtonSetProps {
  closeModal(evt: MouseEvent): void;
  disabled?: boolean;
  onRequestClose(evt: MouseEvent): void;
  secondaryButtonText?: string;
  secondaryButtons?: [SecondaryButtonProps, SecondaryButtonProps];
  secondaryClassName?: string;
}

function SecondaryButtonSet({
  secondaryButtons,
  secondaryButtonText,
  secondaryClassName,
  closeModal,
  onRequestClose,
  disabled,
}: SecondaryButtonSetProps) {
  function handleRequestClose(evt: MouseEvent) {
    closeModal(evt);
    onRequestClose(evt);
  }

  if (Array.isArray(secondaryButtons) && secondaryButtons.length <= 2) {
    return secondaryButtons.map(({ buttonText, onClick: onButtonClick }, i) => (
      <Button
        key={`${buttonText}-${i}`}
        className={secondaryClassName}
        kind="secondary"
        onClick={onButtonClick || handleRequestClose}>
        {buttonText}
      </Button>
    ));
  }
  if (secondaryButtonText) {
    return (
      <Button
        disabled={disabled}
        className={secondaryClassName}
        onClick={handleRequestClose}
        kind="secondary">
        {secondaryButtonText}
      </Button>
    );
  }
  return null;
}

SecondaryButtonSet.propTypes = {
  closeModal: PropTypes.func,
  disabled: PropTypes.bool,
  onRequestClose: PropTypes.func,
  secondaryButtonText: PropTypes.string,
  secondaryButtons: (props, propName, componentName) => {
    if (props.secondaryButtons) {
      if (
        !Array.isArray(props.secondaryButtons) ||
        props.secondaryButtons.length !== 2
      ) {
        return new Error(
          `${propName} needs to be an array of two button config objects`
        );
      }

      const shape = {
        buttonText: PropTypes.node,
        onClick: PropTypes.func,
      };

      props[propName].forEach((secondaryButton) => {
        PropTypes.checkPropTypes(
          shape,
          secondaryButton,
          propName,
          componentName
        );
      });
    }

    return null;
  },
  secondaryClassName: PropTypes.string,
};

export interface ModalFooterProps {
  /**
   * Pass in content that will be rendered in the Modal Footer
   */
  children: ReactNode;

  /**
   * Specify a custom className to be applied to the Modal Footer container
   */
  className?: string;

  /**
   * Specify an optional function that is called whenever the modal is closed
   */
  closeModal?(evt: MouseEvent): void;

  /**
   * Specify whether the primary button should be replaced with danger button.
   * Note that this prop is not applied if you render primary/danger button by yourself
   */
  danger?: boolean;

  /**
   * The `ref` callback for the primary button.
   */
  inputref?: Ref<HTMLButtonElement>;

  /**
   * Specify an optional function for when the modal is requesting to be
   * closed
   */
  onRequestClose?(): void;

  /**
   * Specify an optional function for when the modal is requesting to be
   * submitted
   */
  onRequestSubmit?(): void;

  /**
   * Specify whether the primary button should be disabled
   */
  primaryButtonDisabled?: boolean;

  /**
   * Specify the text for the primary button
   */
  primaryButtonText?: string;

  /**
   * Specify a custom className to be applied to the primary button
   */
  primaryClassName?: string;

  /**
   * Specify the text for the secondary button
   */
  secondaryButtonText?: string;

  /**
   * Specify an array of config objects for secondary buttons
   */
  secondaryButtons?: [SecondaryButtonProps, SecondaryButtonProps];

  /**
   * Specify a custom className to be applied to the secondary button
   */
  secondaryClassName?: string;

  /**
   * loading status
   */
  loadingStatus?: string;

  /**
   * Specify the description for the loading text
   */
  loadingDescription?: string;

  /**
   * Specify the description for the loading text
   */
  loadingIconDescription?: string;

  /**
   * Provide an optional handler to be invoked when loading is
   * successful
   */
  onLoadingSuccess?(): void;
}

export const ModalFooter = React.forwardRef<HTMLElement, ModalFooterProps>(
  function ModalFooter(
    {
      children,
      className: customClassName,
      closeModal = noopFn,
      danger,
      inputref,
      onRequestClose = noopFn,
      onRequestSubmit = noopFn,
      primaryButtonDisabled,
      primaryButtonText,
      primaryClassName,
      secondaryButtonText,
      secondaryButtons,
      secondaryClassName,
      loadingStatus = 'inactive',
      loadingDescription,
      loadingIconDescription,
      onLoadingSuccess = noopFn,
      ...rest
    },
    ref
  ) {
    const prefix = usePrefix();

    const footerClass = cx(
      `${prefix}--modal-footer`,
      customClassName,
      Array.isArray(secondaryButtons) && secondaryButtons.length === 2
        ? `${prefix}--modal-footer--three-button`
        : null
    );
    const primaryButtonClass = cx(
      primaryClassName,
      loadingStatus !== 'inactive' ? `${prefix}--btn--loading` : null
    );

    const loadingActive = loadingStatus !== 'inactive';

    const secondaryButtonProps = {
      closeModal,
      secondaryButtons,
      secondaryButtonText,
      secondaryClassName,
      onRequestClose,
      disabled: loadingActive,
    };

    return (
      <ButtonSet
        className={footerClass}
        {...rest}
        // @ts-expect-error: Invalid derived types, will be fine once explicit types are added
        ref={ref}
        aria-busy={loadingActive}>
        {/* @ts-expect-error: Invalid derived types, will be fine once explicit types are added */}
        <SecondaryButtonSet {...secondaryButtonProps} />
        {primaryButtonText && (
          <Button
            onClick={onRequestSubmit}
            className={primaryButtonClass}
            disabled={loadingActive || primaryButtonDisabled}
            kind={danger ? 'danger' : 'primary'}
            ref={inputref}>
            {loadingStatus === 'inactive' ? (
              primaryButtonText
            ) : (
              <InlineLoading
                status={loadingStatus}
                description={loadingDescription}
                iconDescription={loadingIconDescription}
                className={`${prefix}--inline-loading--btn`}
                onSuccess={onLoadingSuccess}
              />
            )}
          </Button>
        )}
        {children}
      </ButtonSet>
    );
  }
);

ModalFooter.propTypes = {
  /**
   * Pass in content that will be rendered in the Modal Footer
   */
  children: PropTypes.node,

  /**
   * Specify a custom className to be applied to the Modal Footer container
   */
  className: PropTypes.string,

  /**
   * Specify an optional function that is called whenever the modal is closed
   */
  closeModal: PropTypes.func,

  /**
   * Specify whether the primary button should be replaced with danger button.
   * Note that this prop is not applied if you render primary/danger button by yourself
   */
  danger: PropTypes.bool,

  /**
   * The `ref` callback for the primary button.
   */
  // @ts-expect-error: Invalid derived type
  inputref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any,
    }),
  ]),

  /**
   * Specify the description for the loading text
   */
  loadingDescription: PropTypes.string,

  /**
   * Specify the description for the loading text
   */
  loadingIconDescription: PropTypes.string,

  /**
   * loading status
   */
  loadingStatus: PropTypes.oneOf(['inactive', 'active', 'finished', 'error']),

  /**
   * Provide an optional handler to be invoked when loading is
   * successful
   */
  onLoadingSuccess: PropTypes.func,

  /**
   * Specify an optional function for when the modal is requesting to be
   * closed
   */
  onRequestClose: PropTypes.func,

  /**
   * Specify an optional function for when the modal is requesting to be
   * submitted
   */
  onRequestSubmit: PropTypes.func,

  /**
   * Specify whether the primary button should be disabled
   */
  primaryButtonDisabled: PropTypes.bool,

  /**
   * Specify the text for the primary button
   */
  primaryButtonText: PropTypes.string,

  /**
   * Specify a custom className to be applied to the primary button
   */
  primaryClassName: PropTypes.string,

  /**
   * Specify the text for the secondary button
   */
  secondaryButtonText: PropTypes.string,

  /**
   * Specify an array of config objects for secondary buttons
   * (`Array<{
   *   buttonText: string,
   *   onClick: function,
   * }>`).
   */
  secondaryButtons: (props, propName, componentName) => {
    if (props.secondaryButtons) {
      if (
        !Array.isArray(props.secondaryButtons) ||
        props.secondaryButtons.length !== 2
      ) {
        return new Error(
          `${propName} needs to be an array of two button config objects`
        );
      }

      const shape = {
        buttonText: PropTypes.node,
        onClick: PropTypes.func,
      };

      props[propName].forEach((secondaryButton) => {
        PropTypes.checkPropTypes(
          shape,
          secondaryButton,
          propName,
          componentName
        );
      });
    }

    return null;
  },

  /**
   * Specify a custom className to be applied to the secondary button
   */
  secondaryClassName: PropTypes.string,
};
